export const promotionConsentText = "I agree to receive promotional emails from Lovely Nail & Spa. I can withdraw my consent by contacting the salon.";
export const promotionSmsConsentText = "I also agree to receive promotional text messages from Lovely Nail & Spa. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out.";
export const promotionCollection = "lovelyNailPromotionList";

export type PromotionSignup = {
  name: string;
  phone: string;
  email: string;
  emailConsent: boolean;
  smsConsent: boolean;
};

export function validatePromotionSignup(input: PromotionSignup): PromotionSignup {
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email.trim().toLowerCase();
  if (!name || name.length > 120) throw new Error("Please enter your name (up to 120 characters).");
  const digits = phone.replace(/\D/g, "");
  if (phone.length > 32 || digits.length < 7 || digits.length > 15 || !/^\+?[0-9\s().-]+$/.test(phone)) {
    throw new Error("Please enter a valid phone number.");
  }
  if (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");
  if (input.emailConsent !== true || typeof input.smsConsent !== "boolean") throw new Error("Please agree to receive promotional emails to sign up.");
  return { name, phone, email, emailConsent: true, smsConsent: input.smsConsent };
}

export async function savePromotionSignup(input: PromotionSignup): Promise<void> {
  const signup = validatePromotionSignup(input);
  const database = "projects/casabellanailsspawebsite/databases/(default)";
  const stringField = (value: string) => ({ stringValue: value });
  const response = await fetch(`https://firestore.googleapis.com/v1/${database}/documents:commit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      writes: [{
        update: {
          name: `${database}/documents/${promotionCollection}/${crypto.randomUUID()}`,
          fields: {
            name: stringField(signup.name),
            phone: stringField(signup.phone),
            email: stringField(signup.email),
            emailConsent: { booleanValue: signup.emailConsent },
            smsConsent: { booleanValue: signup.smsConsent },
            consentText: stringField(promotionConsentText),
            smsConsentText: stringField(signup.smsConsent ? promotionSmsConsentText : ""),
            consentVersion: stringField("2026-10-06"),
            salonname: stringField("Lovely Nail & Spa"),
            source: stringField("nailslovely.com"),
          },
        },
        currentDocument: { exists: false },
        updateTransforms: [{ fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" }],
      }],
    }),
  });
  if (!response.ok) throw new Error("We couldn’t save your signup. Please try again or call (407) 654-0254.");
}
