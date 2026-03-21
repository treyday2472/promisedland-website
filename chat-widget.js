/* ============================================================
   Promised Land Property Solutions — AI Chat Widget
   Drop this script on any page. It self-injects styles + DOM.
   ============================================================ */
(function () {
  "use strict";

  var BACKEND = "https://dealbot2-0.onrender.com/api/chat";

  // ---------- State ----------
  var state = {
    open: false,
    sessionState: "start",
    visitorName: null,
    visitorPhone: null,
    visitorEmail: null,
    contactId: null,
    leadId: null,
    leadCreated: false,
    history: [],          // [{role, content}]
    askedName: false,
    askedPhone: false,
    intakeSlots: {},      // canonical field values collected so far — synced with backend
  };

  // ---------- Styles ----------
  var css = `
    #plps-chat-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 58px; height: 58px; border-radius: 50%;
      background: #c9992a; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, background .2s;
    }
    #plps-chat-btn:hover { background: #e5b040; transform: scale(1.07); }
    #plps-chat-btn svg { width: 26px; height: 26px; fill: #0f1f3d; }

    #plps-chat-badge {
      position: absolute; top: -4px; right: -4px;
      background: #ef4444; color: #fff;
      font-size: 11px; font-weight: 700;
      width: 18px; height: 18px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      display: none;
    }

    #plps-chat-window {
      position: fixed; bottom: 96px; right: 24px; z-index: 9998;
      width: 350px; max-width: calc(100vw - 32px);
      height: 520px; max-height: calc(100vh - 120px);
      background: #0f1f3d;
      border: 1px solid rgba(201,153,42,.3);
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,.55);
      display: flex; flex-direction: column;
      overflow: hidden;
      transform: scale(.85) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: transform .25s, opacity .25s;
    }
    #plps-chat-window.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    #plps-chat-header {
      background: linear-gradient(135deg, #162444, #0a1226);
      border-bottom: 1px solid rgba(201,153,42,.25);
      padding: 14px 16px;
      display: flex; align-items: center; gap: 10px;
    }
    #plps-chat-header .avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: #c9992a;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }
    #plps-chat-header .info { flex: 1; }
    #plps-chat-header .name { color: #f5f7fa; font-weight: 700; font-size: .95rem; }
    #plps-chat-header .status { color: rgba(245,247,250,.55); font-size: .78rem; }
    #plps-chat-close {
      background: none; border: none; cursor: pointer;
      color: rgba(245,247,250,.5); font-size: 20px; line-height: 1;
      padding: 4px;
    }
    #plps-chat-close:hover { color: #f5f7fa; }

    #plps-chat-messages {
      flex: 1; overflow-y: auto; padding: 14px 12px;
      display: flex; flex-direction: column; gap: 10px;
    }
    #plps-chat-messages::-webkit-scrollbar { width: 4px; }
    #plps-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #plps-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 4px; }

    .plps-msg {
      max-width: 85%;
      padding: 9px 13px;
      border-radius: 14px;
      font-size: .9rem;
      line-height: 1.5;
      word-break: break-word;
    }
    .plps-msg.bot {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.1);
      color: #f5f7fa;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .plps-msg.user {
      background: #c9992a;
      color: #0f1f3d;
      font-weight: 600;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .plps-typing {
      display: flex; gap: 4px; align-items: center;
      padding: 10px 13px;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 14px; border-bottom-left-radius: 4px;
      align-self: flex-start;
    }
    .plps-typing span {
      width: 6px; height: 6px; background: rgba(245,247,250,.5);
      border-radius: 50%; animation: plps-bounce .9s infinite;
    }
    .plps-typing span:nth-child(2) { animation-delay: .15s; }
    .plps-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes plps-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }

    #plps-chat-footer {
      padding: 10px 12px;
      border-top: 1px solid rgba(255,255,255,.08);
      display: flex; gap: 8px; align-items: flex-end;
    }
    #plps-chat-input {
      flex: 1; background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 10px; color: #f5f7fa;
      padding: 9px 12px; font-size: .9rem;
      resize: none; outline: none; max-height: 100px;
      font-family: inherit; line-height: 1.4;
    }
    #plps-chat-input:focus { border-color: #c9992a; }
    #plps-chat-input::placeholder { color: rgba(245,247,250,.35); }
    #plps-chat-send {
      width: 38px; height: 38px; border-radius: 10px;
      background: #c9992a; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background .2s;
    }
    #plps-chat-send:hover { background: #e5b040; }
    #plps-chat-send:disabled { background: rgba(201,153,42,.4); cursor: default; }
    #plps-chat-send svg { width: 16px; height: 16px; fill: #0f1f3d; }
  `;

  // ---------- Inject ----------
  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // Button
  var btn = document.createElement("button");
  btn.id = "plps-chat-btn";
  btn.title = "Chat with us";
  btn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>
    <span id="plps-chat-badge">1</span>
  `;
  document.body.appendChild(btn);

  // Window
  var win = document.createElement("div");
  win.id = "plps-chat-window";
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", "Chat with Promised Land Property Solutions");
  win.innerHTML = `
    <div id="plps-chat-header">
      <div class="avatar">🏠</div>
      <div class="info">
        <div class="name">Promised Land</div>
        <div class="status">Property Solutions · Online</div>
      </div>
      <button id="plps-chat-close" aria-label="Close chat">✕</button>
    </div>
    <div id="plps-chat-messages"></div>
    <div id="plps-chat-footer">
      <textarea id="plps-chat-input" rows="1" placeholder="Type a message…"></textarea>
      <button id="plps-chat-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(win);

  // ---------- DOM refs ----------
  var messages = document.getElementById("plps-chat-messages");
  var input    = document.getElementById("plps-chat-input");
  var sendBtn  = document.getElementById("plps-chat-send");
  var badge    = document.getElementById("plps-chat-badge");

  // ---------- Helpers ----------
  function addMsg(role, text) {
    var div = document.createElement("div");
    div.className = "plps-msg " + role;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function showTyping() {
    var t = document.createElement("div");
    t.className = "plps-typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    t.id = "plps-typing-indicator";
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    var t = document.getElementById("plps-typing-indicator");
    if (t) t.remove();
  }

  function showBadge() {
    badge.style.display = "flex";
  }

  function showLeadCreatedBanner() {
    // Insert a distinct "lead saved" message in the chat
    var div = document.createElement("div");
    div.style.cssText = [
      "background:rgba(34,197,94,.15)",
      "border:1px solid rgba(34,197,94,.35)",
      "border-radius:10px",
      "padding:10px 13px",
      "font-size:.82rem",
      "color:#4ade80",
      "font-weight:600",
      "align-self:stretch",
      "text-align:center",
      "margin-top:4px",
    ].join(";");
    div.textContent = "✅ Your inquiry has been saved! We'll text you within 24 hours.";
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // ---------- Open / close ----------
  btn.addEventListener("click", function () {
    state.open = !state.open;
    win.classList.toggle("open", state.open);
    badge.style.display = "none";
    if (state.open && messages.children.length === 0) {
      greet();
    }
    if (state.open) {
      setTimeout(function () { input.focus(); }, 250);
    }
  });

  document.getElementById("plps-chat-close").addEventListener("click", function () {
    state.open = false;
    win.classList.remove("open");
  });

  // ---------- Greeting ----------
  function greet() {
    setTimeout(function () {
      addMsg("bot", "Hi there! 👋 I'm here to help you explore your options for selling your home.");
      setTimeout(function () {
        addMsg("bot", "What's your name?");
        state.askedName = true;
      }, 700);
    }, 300);
  }

  // ---------- Send ----------
  async function sendMessage() {
    var text = input.value.trim();
    if (!text) return;

    addMsg("user", text);
    input.value = "";
    input.style.height = "auto";
    sendBtn.disabled = true;
    state.history.push({ role: "user", content: text });

    // Name capture — first response
    if (state.askedName && !state.visitorName) {
      state.visitorName = text;
    }

    showTyping();

    try {
      var res = await fetch(BACKEND, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: state.history.slice(0, -1), // exclude the one we just added
          visitor_name: state.visitorName,
          visitor_phone: state.visitorPhone,
          visitor_email: state.visitorEmail,
          contact_id: state.contactId,
          session_state: state.sessionState,
          intake_slots: state.intakeSlots,     // persisted slot state — prevents re-asks
        }),
      });

      var json = await res.json();
      hideTyping();

      if (json.ok) {
        var reply = json.reply;
        addMsg("bot", reply);
        state.history.push({ role: "assistant", content: reply });
        state.sessionState = json.session_state || "chatting";
        if (json.contact_id) state.contactId = json.contact_id;
        if (json.intake_slots) state.intakeSlots = json.intake_slots;

        // Lead successfully created via chatbot function call
        if (json.lead_created && json.lead_id && !state.leadCreated) {
          state.leadCreated = true;
          state.leadId = json.lead_id;
          showLeadCreatedBanner();
        }

        // Extract phone/email from user messages heuristically
        extractContactInfo(text);
      } else {
        addMsg("bot", "Sorry, I hit a snag. Try refreshing or fill out the form above!");
      }
    } catch (err) {
      hideTyping();
      addMsg("bot", "I'm having connection issues. You can fill out the offer form on this page instead — we'll get back to you within 24 hours!");
    }

    sendBtn.disabled = false;
    input.focus();
  }

  function extractContactInfo(text) {
    // Phone: 10 consecutive digits or formatted
    if (!state.visitorPhone) {
      var phoneMatch = text.match(/\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}/);
      if (phoneMatch) state.visitorPhone = phoneMatch[0];
    }
    // Email
    if (!state.visitorEmail) {
      var emailMatch = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) state.visitorEmail = emailMatch[0];
    }
  }

  // ---------- Input events ----------
  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 100) + "px";
  });

  // ---------- Show badge after 8 seconds to draw attention ----------
  setTimeout(function () {
    if (!state.open) showBadge();
  }, 8000);

})();
