"use client";

import { useRef, useState } from "react";

export function CustomerChat() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  return (
    <aside className="customer-chat" aria-label="Contact the salon team">
      {started && (
        <section className="customer-chat-panel" id="customer-chat-panel" aria-label="Customer chat" hidden={!open}>
          <header className="customer-chat-header">
            <strong>Lovely Nail & Spa</strong>
            <button type="button" aria-label="Close chat" onClick={close}>×</button>
          </header>
          <iframe
            src="https://operatix-profit-flow.base44.app/lovely-chat"
            title="Message the Lovely Nail & Spa team"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </section>
      )}
      <button
        className="customer-chat-launcher"
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-controls={started ? "customer-chat-panel" : undefined}
        onClick={() => { setStarted(true); setOpen(!open); }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></svg>
        {open ? "Minimize Chat" : "Chat with Our Team"}
      </button>
    </aside>
  );
}
