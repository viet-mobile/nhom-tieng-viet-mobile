/*
 * 관리자 페이지 로직 / admin page logic.
 *
 * 경고(WARNING): 이 사이트는 서버가 없는 정적 사이트이므로 아래의 로그인은
 * 실제 보안 인증이 될 수 없습니다. 이 파일의 ADMIN_ID/ADMIN_PW는 브라우저에서
 * 그대로 읽을 수 있습니다. 이 로그인은 일반 방문자의 우발적인 접근을 막는
 * 용도로만 사용하고, 민감한 개인정보를 이 페이지를 통해 다루지 마세요.
 */
(function () {
  "use strict";

  var ADMIN_ID = "admin";
  var ADMIN_PW = "P)O(I*U&Y^T%R$E#W@Q!";
  var SESSION_KEY = "nhom-tieng-viet-iksan-admin-session";

  var loginSection = document.getElementById("admin-login");
  var editorSection = document.getElementById("admin-editor");
  var loginForm = document.getElementById("login-form");
  var loginError = document.getElementById("login-error");
  var logoutButton = document.getElementById("logout-button");
  var editorRowsContainer = document.getElementById("editor-rows");
  var addRowButton = document.getElementById("add-row-button");
  var savePreviewButton = document.getElementById("save-preview-button");
  var resetButton = document.getElementById("reset-button");
  var exportButton = document.getElementById("export-button");
  var exportSection = document.getElementById("export-section");
  var exportOutput = document.getElementById("export-output");
  var copyExportButton = document.getElementById("copy-export-button");
  var saveStatus = document.getElementById("save-status");

  var currentData = [];

  function isAuthed() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function setAuthed(value) {
    try {
      if (value) {
        sessionStorage.setItem(SESSION_KEY, "1");
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch (e) {
      /* ignore */
    }
  }

  function showEditor() {
    loginSection.classList.add("hidden");
    editorSection.classList.remove("hidden");
    currentData = clone(window.NhomSchedule.getEffective());
    renderEditor();
  }

  function showLogin() {
    editorSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function linesToList(text) {
    return text
      .split("\n")
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });
  }

  function listToLines(list) {
    return (list || []).join("\n");
  }

  function field(labelText, value, opts) {
    opts = opts || {};
    var wrap = document.createElement("div");
    wrap.className = "admin-field";
    var label = document.createElement("label");
    var inputId = "f-" + Math.random().toString(36).slice(2);
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    wrap.appendChild(label);

    var input;
    if (opts.multiline) {
      input = document.createElement("textarea");
      input.rows = 2;
    } else {
      input = document.createElement("input");
      input.type = opts.type || "text";
    }
    input.id = inputId;
    input.value = value === null || value === undefined ? "" : value;
    input.addEventListener("input", opts.onChange || function () {});
    wrap.appendChild(input);
    return wrap;
  }

  function renderEditor() {
    editorRowsContainer.textContent = "";
    editorRowsContainer.className = "pastel-group";

    currentData.forEach(function (row, index) {
      var box = document.createElement("div");
      box.className = "admin-editor-row bubble asym";

      var title = document.createElement("p");
      title.className = "admin-editor-row-title";
      title.textContent = row.month + "월 " + row.day + "일";
      box.appendChild(title);

      box.appendChild(field("월 / Tháng", row.month, {
        type: "number",
        onChange: function (e) { row.month = Number(e.target.value) || row.month; title.textContent = row.month + "월 " + row.day + "일"; }
      }));
      box.appendChild(field("일 / Ngày", row.day, {
        type: "number",
        onChange: function (e) { row.day = Number(e.target.value) || row.day; title.textContent = row.month + "월 " + row.day + "일"; }
      }));
      box.appendChild(field("요일 (선택) / Thứ (tùy chọn)", row.weekday, {
        onChange: function (e) { row.weekday = e.target.value || null; }
      }));
      box.appendChild(field("특이사항 (선택) / Ghi chú đặc biệt (tùy chọn)", row.special, {
        onChange: function (e) { row.special = e.target.value || null; }
      }));
      box.appendChild(field("사회자/시작기도 / Chủ tọa", row.chairman, {
        onChange: function (e) { row.chairman = e.target.value; }
      }));
      box.appendChild(field("연설 / Bài giảng", row.talk, {
        onChange: function (e) { row.talk = e.target.value; }
      }));
      box.appendChild(field("보물 찾기 / Viên ngọc", row.gems, {
        onChange: function (e) { row.gems = e.target.value; }
      }));
      box.appendChild(field("성경낭독 / Đọc KT", row.reading, {
        onChange: function (e) { row.reading = e.target.value; }
      }));
      box.appendChild(field("4번 배정 (줄바꿈으로 구분, 없으면 비움)", listToLines(row.fs4), {
        multiline: true,
        onChange: function (e) { row.fs4 = linesToList(e.target.value); }
      }));
      box.appendChild(field("5번 배정 (줄바꿈으로 구분, 없으면 비움)", listToLines(row.fs5), {
        multiline: true,
        onChange: function (e) { row.fs5 = linesToList(e.target.value); }
      }));
      box.appendChild(field("6번 배정 (줄바꿈으로 구분, 없으면 비움)", listToLines(row.fs6), {
        multiline: true,
        onChange: function (e) { row.fs6 = linesToList(e.target.value); }
      }));
      box.appendChild(field("7번 배정 (줄바꿈으로 구분, 없으면 비움)", listToLines(row.fs7), {
        multiline: true,
        onChange: function (e) { row.fs7 = linesToList(e.target.value); }
      }));

      var deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "admin-button bubble asym-sm box-c3";
      deleteButton.textContent = "삭제 / Xóa dòng";
      deleteButton.addEventListener("click", function () {
        currentData.splice(index, 1);
        renderEditor();
      });
      box.appendChild(deleteButton);

      editorRowsContainer.appendChild(box);
    });
  }

  function addRow() {
    currentData.push({
      month: 1, day: 1, weekday: null, special: null,
      chairman: "", talk: "", gems: "", reading: "",
      fs4: [], fs5: [], fs6: [], fs7: []
    });
    renderEditor();
  }

  function flashStatus(text) {
    saveStatus.textContent = text;
    window.setTimeout(function () {
      saveStatus.textContent = "";
    }, 4000);
  }

  function buildExportCode(data) {
    var lines = data.map(function (row) {
      return "    " + JSON.stringify(row);
    });
    return "  var DEFAULT_SCHEDULE = [\n" + lines.join(",\n") + "\n  ];";
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("login-id").value;
    var pw = document.getElementById("login-pw").value;
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      loginError.textContent = "";
      setAuthed(true);
      showEditor();
    } else {
      loginError.textContent = "ID 또는 비밀번호가 올바르지 않습니다. / ID hoặc mật khẩu không đúng.";
    }
  });

  logoutButton.addEventListener("click", function () {
    setAuthed(false);
    showLogin();
  });

  addRowButton.addEventListener("click", addRow);

  savePreviewButton.addEventListener("click", function () {
    window.NhomSchedule.save(currentData);
    flashStatus("이 브라우저에 임시 저장되었습니다. (다른 방문자에게는 반영되지 않습니다) / Đã lưu tạm trong trình duyệt này.");
  });

  resetButton.addEventListener("click", function () {
    window.NhomSchedule.reset();
    currentData = clone(window.NhomSchedule.getEffective());
    renderEditor();
    flashStatus("기본값으로 초기화되었습니다. / Đã khôi phục mặc định.");
  });

  exportButton.addEventListener("click", function () {
    exportOutput.value = buildExportCode(currentData);
    exportSection.classList.remove("hidden");
    exportSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  copyExportButton.addEventListener("click", function () {
    exportOutput.select();
    try {
      navigator.clipboard.writeText(exportOutput.value).then(function () {
        flashStatus("복사되었습니다. / Đã sao chép.");
      });
    } catch (e) {
      flashStatus("복사에 실패했습니다. 직접 선택하여 복사해 주세요. / Sao chép thất bại, vui lòng chọn và sao chép thủ công.");
    }
  });

  if (isAuthed()) {
    showEditor();
  } else {
    showLogin();
  }
})();
