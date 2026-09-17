/*
 * Dữ liệu lịch nhóm họp giữa tuần / 주중 모임 일정 데이터.
 * Đây là nguồn dữ liệu MẶC ĐỊNH, dùng chung cho trang chủ (chỉ đọc)
 * và trang quản trị /admin (chỉnh sửa).
 *
 * Lưu ý: đây là trang tĩnh, không có máy chủ/cơ sở dữ liệu.
 * Thay đổi lưu qua trang quản trị chỉ được ghi vào localStorage của
 * TRÌNH DUYỆT admin đang dùng — khách khác sẽ KHÔNG thấy thay đổi đó.
 * Để áp dụng cho mọi người, phải xuất dữ liệu và thay nội dung của
 * DEFAULT_SCHEDULE bên dưới, sau đó triển khai lại trang.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "nhom-tieng-viet-iksan-schedule-v1";

  var DEFAULT_SCHEDULE = [
    { month: 9, day: 17, weekday: null, special: null,
      chairman: "정명훈 (anh Huân)", talk: "비디오 (Video)", gems: "최찬 (anh Kiên)", reading: "김현일 (anh Bảo)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: ["비디오 (Video)"] },
    { month: 9, day: 24, weekday: null, special: null,
      chairman: "최재호 (anh Tín)", talk: "정명훈 (anh Huân)", gems: "김현일 (anh Bảo)", reading: "이주복 (anh Trung)",
      fs4: ["김자영(chị Diễm My)", "김가영(chị Vân)"], fs5: ["서민아(chị Hà)", "김수빈(chị Hồng)"], fs6: ["오기숙(chị Lan)", "이선미(chị Trà My)"], fs7: [] },
    { month: 10, day: 1, weekday: null, special: null,
      chairman: "최찬 (anh Kiên)", talk: "최재호 (anh Tín)", gems: "이주복 (anh Trung)", reading: "정명훈 (anh Huân)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 10, day: 8, weekday: null, special: null,
      chairman: "김현일 (anh Bảo)", talk: "비디오 (Video)", gems: "정명훈 (anh Huân)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: ["비디오 (Video)"] },
    { month: 10, day: 15, weekday: null, special: null,
      chairman: "정명훈 (anh Huân)", talk: "이주복 (anh Trung)", gems: "최재호 (anh Tín)", reading: "최찬 (anh Kiên)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 10, day: 22, weekday: null, special: null,
      chairman: "이주복 (anh Trung)", talk: "최찬 (anh Kiên)", gems: "김현일 (anh Bảo)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: ["비디오 (Video)"] },
    { month: 10, day: 29, weekday: null, special: null,
      chairman: "최재호 (anh Tín)", talk: "김현일 (anh Bảo)", gems: "이주복 (anh Trung)", reading: "김민우 (em Vũ)",
      fs4: ["최혜린(chị Huệ Linh)", "이윤서(chị Luyến)"], fs5: ["최혜연(chị Hiền)", "정수진(chị Thơm)"], fs6: ["최혜원(chị Huệ Nhi)", "한윤경(chị Thu Hằng)"], fs7: [] },
    { month: 11, day: 5, weekday: null, special: null,
      chairman: "최찬 (anh Kiên)", talk: "정명훈 (anh Huân)", gems: "최재호 (anh Tín)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 11, day: 12, weekday: null, special: null,
      chairman: "이주복 (anh Trung)", talk: "김현일 (anh Bảo)", gems: "최찬 (anh Kiên)", reading: "정명훈 (anh Huân)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 11, day: 19, weekday: null, special: null,
      chairman: "김현일 (anh Bảo)", talk: "비디오 (Video)", gems: "이주복 (anh Trung)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 11, day: 26, weekday: "목요일", special: "베트남어 순방",
      chairman: "정명훈 (anh Huân)", talk: "이주복 (anh Trung)", gems: "최재호 (anh Tín)", reading: "최찬 (anh Kiên)",
      fs4: ["김가영(chị Vân)", "최혜연(chị Hiền)"], fs5: ["김수빈(chị Hồng)", "최혜원(chị Huệ Nhi)"], fs6: ["김현일(anh Bảo)"], fs7: [] },
    { month: 12, day: 3, weekday: null, special: null,
      chairman: "최찬 (anh Kiên)", talk: "최재호 (anh Tín)", gems: "김현일 (anh Bảo)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 12, day: 10, weekday: null, special: null,
      chairman: "최재호 (anh Tín)", talk: "비디오 (Video)", gems: "이주복 (anh Trung)", reading: "김현일 (anh Bảo)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 12, day: 17, weekday: null, special: null,
      chairman: "김현일 (anh Bảo)", talk: "정명훈 (anh Huân)", gems: "최재호 (anh Tín)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 12, day: 22, weekday: "화요일", special: "한국어 순방",
      chairman: "이주복 (anh Trung)", talk: "최찬 (anh Kiên)", gems: "김현일 (anh Bảo)", reading: "정명훈 (anh Huân)",
      fs4: ["오기숙(chị Lan)", "최혜린(chị Huệ Linh)"], fs5: ["한윤경(chị Thu Hằng)", "이선미(chị Trà My)"], fs6: ["최혜원(chị Huệ Nhi)", "김자영(chị Diễm My)"], fs7: [] },
    { month: 12, day: 31, weekday: null, special: null,
      chairman: "정명훈 (anh Huân)", talk: "최재호 (anh Tín)", gems: "이주복 (anh Trung)", reading: "최찬 (anh Kiên)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] }
  ];

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      /* ignore corrupt/blocked storage */
    }
    return null;
  }

  function getEffective() {
    var loaded = load();
    return loaded && loaded.length ? loaded : DEFAULT_SCHEDULE;
  }

  function isOverridden() {
    return load() !== null;
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function el(tag, opts) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.className) node.className = opts.className;
    if (opts.text !== undefined) node.textContent = opts.text;
    if (opts.rowspan) node.rowSpan = opts.rowspan;
    if (opts.colspan) node.colSpan = opts.colspan;
    return node;
  }

  function headerCell(tag, lines, opts) {
    var th = el(tag, opts);
    lines.forEach(function (line, index) {
      if (index === 0) {
        th.appendChild(document.createTextNode(line));
      } else {
        var span = el("span", { className: "th-vi", text: line });
        th.appendChild(span);
      }
    });
    return th;
  }

  function multiCell(list) {
    var td = el("td");
    if (!list || !list.length) {
      td.appendChild(el("span", { className: "schedule-dash", text: "–" }));
      return td;
    }
    if (list.length === 1) {
      td.textContent = list[0];
      return td;
    }
    var wrap = el("span", { className: "schedule-multi" });
    list.forEach(function (name) {
      wrap.appendChild(el("span", { text: name }));
    });
    td.appendChild(wrap);
    return td;
  }

  function dateCell(row) {
    var td = el("td", { className: "col-date" });
    var label = row.month + "월 " + row.day + "일";
    td.appendChild(document.createTextNode(label));
    if (row.weekday) {
      td.appendChild(document.createElement("br"));
      td.appendChild(document.createTextNode(row.weekday));
    }
    if (row.special) {
      var note = el("strong", { className: "schedule-note", text: row.special });
      td.appendChild(note);
    }
    return td;
  }

  function renderTable(container, data) {
    if (!container) return;
    data = data || getEffective();
    container.textContent = "";

    var wrapper = el("div", { className: "schedule-scroll" });
    var table = el("table", { className: "schedule-table" });

    var thead = el("thead");
    var tr1 = el("tr");
    tr1.appendChild(headerCell("th", ["날짜", "Ngày"], { rowspan: 2, className: "col-date" }));
    tr1.appendChild(headerCell("th", ["사회자/시작기도", "Chủ tọa/cầu nguyện đầu"], { rowspan: 2, className: "col-chair" }));
    tr1.appendChild(headerCell("th", ["성경에 담긴 보물", "KHO BÁU TỪ KINH THÁNH"], { colspan: 3, className: "group-treasure" }));
    tr1.appendChild(headerCell("th", ["야외 봉사에 힘쓰십시오", "CẢI THIỆN THÁNH CHỨC"], { colspan: 4, className: "group-fs" }));
    thead.appendChild(tr1);

    var tr2 = el("tr");
    tr2.appendChild(headerCell("th", ["연설", "Bài giảng"], { className: "group-treasure" }));
    tr2.appendChild(headerCell("th", ["보물 찾기", "Viên ngọc"], { className: "group-treasure" }));
    tr2.appendChild(headerCell("th", ["성경낭독", "Đọc KT"], { className: "group-treasure" }));
    ["4", "5", "6", "7"].forEach(function (n) {
      tr2.appendChild(headerCell("th", [n], { className: "group-fs" }));
    });
    thead.appendChild(tr2);
    table.appendChild(thead);

    var tbody = el("tbody");
    data.forEach(function (row) {
      var tr = el("tr");
      tr.appendChild(dateCell(row));
      tr.appendChild(el("td", { text: row.chairman }));
      tr.appendChild(el("td", { text: row.talk }));
      tr.appendChild(el("td", { text: row.gems }));
      tr.appendChild(el("td", { text: row.reading }));
      tr.appendChild(multiCell(row.fs4));
      tr.appendChild(multiCell(row.fs5));
      tr.appendChild(multiCell(row.fs6));
      tr.appendChild(multiCell(row.fs7));
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    wrapper.appendChild(table);
    container.appendChild(wrapper);
  }

  global.NhomSchedule = {
    DEFAULT_SCHEDULE: DEFAULT_SCHEDULE,
    getEffective: getEffective,
    isOverridden: isOverridden,
    save: save,
    reset: reset,
    renderTable: renderTable
  };
})(window);
