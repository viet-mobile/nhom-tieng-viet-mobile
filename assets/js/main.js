(function () {
  "use strict";

  var STORAGE_KEY = "nhom-tieng-viet-iksan-lang";
  var body = document.body;
  var toggle = document.getElementById("lang-toggle");

  function applyLang(lang) {
    body.classList.remove("lang-vi", "lang-ko");
    body.classList.add("lang-" + lang);
    document.documentElement.setAttribute("lang", lang);
    if (toggle) {
      toggle.setAttribute("aria-pressed", lang === "ko" ? "true" : "false");
    }
  }

  function getSavedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore storage errors (private mode, etc.) */
    }
  }

  var savedLang = getSavedLang();
  if (savedLang === "vi" || savedLang === "ko") {
    applyLang(savedLang);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = body.classList.contains("lang-ko") ? "ko" : "vi";
      var next = current === "vi" ? "ko" : "vi";
      applyLang(next);
      saveLang(next);
    });
  }

  var scheduleContainer = document.getElementById("schedule-container");
  if (scheduleContainer && window.NhomSchedule) {
    window.NhomSchedule.renderTable(scheduleContainer);
  }
})();
