import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/promotion-signup.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const { validatePromotionSignup, savePromotionSignup } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const valid = { name: "Test Visitor", phone: "(407) 555-0123", email: "test@example.com", emailConsent: true, smsConsent: false };

test("validates and normalizes subscriber fields", () => {
  assert.deepEqual(validatePromotionSignup({ ...valid, name: " Test Visitor ", email: " TEST@EXAMPLE.COM " }), valid);
  for (const invalid of [{ name: "" }, { phone: "abc" }, { phone: "123" }, { email: "invalid" }, { emailConsent: false }, { smsConsent: "yes" }, { name: "a".repeat(121) }]) {
    assert.throws(() => validatePromotionSignup({ ...valid, ...invalid }));
  }
});

test("creates a private-list entry with server timestamp and consent evidence", async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options, payload: JSON.parse(options.body) };
    return Response.json({ writeResults: [{}] });
  };
  try {
    await savePromotionSignup(valid);
    const write = captured.payload.writes[0];
    assert.ok(captured.url.endsWith("/documents:commit"));
    assert.ok(write.update.name.includes("/lovelyNailPromotionList/"));
    assert.equal(write.update.fields.email.stringValue, valid.email);
    assert.equal(write.update.fields.emailConsent.booleanValue, true);
    assert.equal(write.update.fields.smsConsent.booleanValue, false);
    assert.equal(write.update.fields.smsConsentText.stringValue, "");
    assert.deepEqual(write.currentDocument, { exists: false });
    assert.deepEqual(write.updateTransforms, [{ fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" }]);
    await savePromotionSignup({ ...valid, smsConsent: true });
    assert.ok(captured.payload.writes[0].update.fields.smsConsentText.stringValue.includes("Reply STOP"));
    globalThis.fetch = async () => new Response("", { status: 403 });
    await assert.rejects(savePromotionSignup(valid), /couldn’t save/);
    globalThis.fetch = async () => { throw new Error("Offline"); };
    await assert.rejects(savePromotionSignup(valid), /Offline/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
