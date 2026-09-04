(function () {
  "use strict";

  var form = document.getElementById("leadForm");
  if (!form || form.dataset.turnstileProtected === "yes") return;
  form.dataset.turnstileProtected = "yes";

  var started = document.createElement("input");
  started.type = "hidden";
  started.name = "form_started_at";
  started.value = String(Date.now());
  form.appendChild(started);

  var trap = document.createElement("div");
  trap.setAttribute("aria-hidden", "true");
  trap.style.cssText = "position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden";
  trap.innerHTML = '<label>Company website <input type="text" name="company_website" tabindex="-1" autocomplete="off"></label>';
  form.appendChild(trap);

  var challenge = document.createElement("div");
  challenge.id = "sellerTurnstile";
  challenge.style.margin = "12px 0";
  var submit = form.querySelector('[type="submit"]');
  var stepOneContinue = document.getElementById("step1ContinueBtn");
  if (stepOneContinue) stepOneContinue.parentNode.insertBefore(challenge, stepOneContinue);
  else if (submit) submit.parentNode.insertBefore(challenge, submit);
  else form.appendChild(challenge);

  function showVerificationError() {
    var error = document.getElementById("formError") || document.getElementById("submitError");
    if (error) {
      error.textContent = "Please complete the security check and try again.";
      error.style.display = "block";
    } else {
      challenge.textContent = "Please complete the security check and try again.";
      challenge.style.color = "#b42318";
    }
    if (submit) {
      submit.disabled = false;
      submit.textContent = submit.dataset.originalText || "Submit";
    }
  }

  if (submit) submit.dataset.originalText = submit.textContent;
  form.addEventListener("submit", function (event) {
    if (form.dataset.continuationReady === "yes") return;
    var proof = form.querySelector('[name="cf-turnstile-response"]');
    if (!proof || !proof.value) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showVerificationError();
    }
  }, true);

  var widgetId = null;

  window.resetSellerTurnstile = function () {
    if (window.turnstile && widgetId !== null) window.turnstile.reset(widgetId);
  };

  window.onSellerTurnstileLoaded = function () {
    if (!window.turnstile) return;
    widgetId = window.turnstile.render("#sellerTurnstile", {
      sitekey: "0x4AAAAAAEkfZOqnFgiY7jKx",
      action: "web_lead_submit",
      theme: "auto"
    });
  };

  var api = document.createElement("script");
  api.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onSellerTurnstileLoaded&render=explicit";
  api.async = true;
  api.defer = true;
  document.head.appendChild(api);
})();
