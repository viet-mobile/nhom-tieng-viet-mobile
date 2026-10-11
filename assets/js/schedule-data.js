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
    { month: 9, day: 17, year: 2026, weekday: null, special: null,
      chairman: "정명훈 (Huân)", talk: "비디오 (Video)", gems: "최찬 (Kiên)", reading: "김현일 (Bảo)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: ["비디오 (Video)"] },
    { month: 9, day: 24, year: 2026, weekday: null, special: null,
      chairman: "최재호 (Tín)", talk: "정명훈 (Huân)", gems: "김현일 (Bảo)", reading: "최찬 (Kiên)",
      fs4: ["김자영(Diễm My)", "김가영(Vân)"], fs5: ["서민아(Hà)", "김수빈(Hồng)"], fs6: ["이주복(Trung)"], fs7: [] },
    { month: 10, day: 1, year: 2026, weekday: null, special: null,
      chairman: "최찬 (Kiên)", talk: "최재호 (Tín)", gems: "이주복 (Trung)", reading: "정명훈 (Huân)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 10, day: 8, year: 2026, weekday: null, special: null,
      chairman: "김현일 (Bảo)", talk: "비디오 (Video)", gems: "정명훈 (Huân)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: ["비디오 (Video)"] },
    { month: 10, day: 15, year: 2026, weekday: null, special: null,
      chairman: "정명훈 (Huân)", talk: "이주복 (Trung)", gems: "최재호 (Tín)", reading: "최찬 (Kiên)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 10, day: 22, year: 2026, weekday: null, special: null,
      chairman: "이주복 (Trung)", talk: "최찬 (Kiên)", gems: "김현일 (Bảo)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: ["비디오 (Video)"] },
    { month: 10, day: 29, year: 2026, weekday: null, special: null,
      chairman: "최재호 (Tín)", talk: "김현일 (Bảo)", gems: "이주복 (Trung)", reading: "김민우 (Vũ)",
      fs4: ["최혜린(Linh)", "이윤서(Luyến)"], fs5: ["최혜연(Hiền)", "정수진(Thơm)"], fs6: ["최혜원(Nhi)", "한윤경(Hằng)"], fs7: [] },
    { month: 11, day: 5, year: 2026, weekday: null, special: null,
      chairman: "최찬 (Kiên)", talk: "정명훈 (Huân)", gems: "최재호 (Tín)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 11, day: 12, year: 2026, weekday: null, special: null,
      chairman: "이주복 (Trung)", talk: "김현일 (Bảo)", gems: "최찬 (Kiên)", reading: "정명훈 (Huân)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 11, day: 14, year: 2026, weekday: "토요일", special: null,
      event: "오전 본부 대표자 방문 특별 모임 (11월 15일 일요일 집회 없음)",
      eventVi: "Buổi họp đặc biệt với đại diện trụ sở chi nhánh vào buổi sáng (Chủ nhật 15/11 không có buổi họp)" },
    { month: 11, day: 19, year: 2026, weekday: null, special: null,
      chairman: "김현일 (Bảo)", talk: "비디오 (Video)", gems: "이주복 (Trung)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 11, day: 26, year: 2026, weekday: "목요일", special: "베트남어 순방",
      chairman: "정명훈 (Huân)", talk: "이주복 (Trung)", gems: "최재호 (Tín)", reading: "최찬 (Kiên)",
      fs4: ["김가영(Vân)", "최혜연(Hiền)"], fs5: ["김수빈(Hồng)", "최혜원(Nhi)"], fs6: ["김현일(Bảo)"], fs7: [] },
    { month: 12, day: 3, year: 2026, weekday: null, special: null,
      event: "베트남어 집회 없음",
      eventVi: "Không có nhóm họp tiếng Việt" },
    { month: 12, day: 4, year: 2026, weekday: "금요일", special: null,
      event: "군산 새만금 컨벤션 센터 한국어 순회구 파이오니아 모임(오후 2시~오후 5시15분)",
      eventVi: "Buổi họp tiên phong của vòng quanh tiếng Hàn tại Trung tâm Hội nghị Saemangeum, Gunsan (14:00~17:15)" },
    { month: 12, day: 5, year: 2026, weekday: "토요일", special: null,
      event: "천안대회회관 다언어 나 순회구 베트남어 파이오니아 모임(오후 5시~오후 8시15분)",
      eventVi: "Buổi họp tiên phong tiếng Việt của vòng quanh Đa ngôn ngữ B tại Phòng hội nghị Cheonan (17:00~20:15)" },
    { month: 12, day: 6, year: 2026, weekday: "일요일", special: null,
      event: "천안대회회관 다언어 나 순회구 베트남어 순회대회(오전 9시20분~오후 4시) - 이 날은 집회 없음",
      eventVi: "Hội nghị vòng quanh tiếng Việt của vòng quanh Đa ngôn ngữ B tại Phòng hội nghị Cheonan (09:20~16:00) - Hôm này không có buổi họp" },
    { month: 12, day: 10, year: 2026, weekday: null, special: null,
      chairman: "최재호 (Tín)", talk: "비디오 (Video)", gems: "이주복 (Trung)", reading: "김현일 (Bảo)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 12, day: 17, year: 2026, weekday: null, special: null,
      chairman: "김현일 (Bảo)", talk: "정명훈 (Huân)", gems: "최재호 (Tín)", reading: "비디오 (Video)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    { month: 12, day: 22, year: 2026, weekday: "화요일", special: "한국어 순방",
      chairman: "이주복 (Trung)", talk: "최찬 (Kiên)", gems: "김현일 (Bảo)", reading: "정명훈 (Huân)",
      fs4: ["오기숙(Lan)", "최혜린(Linh)"], fs5: ["한윤경(Hằng)", "이선미(Trà My)"], fs6: ["최혜원(Nhi)", "김자영(Diễm My)"], fs7: [] },
    { month: 12, day: 31, year: 2026, weekday: null, special: null,
      chairman: "정명훈 (Huân)", talk: "최재호 (Tín)", gems: "이주복 (Trung)", reading: "최찬 (Kiên)",
      fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: [] },
    /* ---- 2027 주중 모임 계획 (Thursday) ---- */
    {month: 1, day: 7, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "이주복 (Trung)", gems: "정명훈 (Huân)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 1, day: 14, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "김현일 (Bảo)", gems: "최재호 (Tín)", reading: "이주복 (Trung)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 1, day: 21, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "정명훈 (Huân)", gems: "최찬 (Kiên)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 1, day: 28, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "비디오 (Video)", gems: "이주복 (Trung)", reading: "최재호 (Tín)", fs4: ["정명훈(Huân)","최찬(Kiên)"], fs5: ["정수진(Thơm)","이윤서(Luyến)"], fs6: ["오기숙(Lan)","서민아(Hà)"], fs7: []},
    {month: 2, day: 4, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "이주복 (Trung)", gems: "김현일 (Bảo)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 2, day: 11, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "비디오 (Video)", gems: "정명훈 (Huân)", reading: "김민우 (Vũ)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 2, day: 18, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "정명훈 (Huân)", gems: "최재호 (Tín)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 2, day: 25, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "비디오 (Video)", gems: "최찬 (Kiên)", reading: "김현일 (Bảo)", fs4: ["정명훈(Huân)","최재호(Tín)"], fs5: ["김가영(Vân)","이선미(Trà My)"], fs6: ["김자영(Diễm My)","김수빈(Hồng)"], fs7: []},
    {month: 3, day: 4, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "이주복 (Trung)", gems: "정명훈 (Huân)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 3, day: 11, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "김현일 (Bảo)", gems: "이주복 (Trung)", reading: "최찬 (Kiên)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 3, day: 18, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "최찬 (Kiên)", gems: "정명훈 (Huân)", reading: "비디오 (Video)", fs4: ["김현일(Bảo)", "최혜린(Linh)"], fs5: ["김가영(Vân)", "정수진(Thơm)"], fs6: ["김자영(Diễm My)", "이윤서(Luyến)"], fs7: []},
    { month: 3, day: 22, year: 2027, weekday: "월요일", special: null,
      event: "예수 그리스도의 죽음의 기념식\n사회: 김현일 (Bảo) · 연사: 정명훈 (Huân)\n연제: 하느님과 그리스도께서 당신을 위해 하신 일에 감사를 나타내십시오!\n빵 기도: 최재호 (Tín) · 포도주 기도: 이주복 (Trung) · 마치는 기도: 정명훈 (Huân)",
      eventVi: "Lễ Tưởng Niệm sự hy sinh của Chúa Giê-su\nChủ tọa: Bảo · Diễn giả: Huân\nBài giảng: Hãy biết ơn điều Đức Chúa Trời và Đấng Ki-tô đã làm cho bạn!\nCầu nguyện về bánh: Tín · Cầu nguyện về rượu nho: Trung · Cầu nguyện kết thúc: Huân" },
    { month: 3, day: 25, year: 2027, weekday: null, special: null,
      event: "집회 없음",
      eventVi: "Không có nhóm họp" },
    {month: 4, day: 1, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "최재호 (Tín)", gems: "최찬 (Kiên)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 4, day: 8, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "이주복 (Trung)", gems: "최재호 (Tín)", reading: "정명훈 (Huân)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 4, day: 15, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "비디오 (Video)", gems: "이주복 (Trung)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 4, day: 22, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "정명훈 (Huân)", gems: "김현일 (Bảo)", reading: "김민우 (Vũ)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 4, day: 29, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "비디오 (Video)", gems: "정명훈 (Huân)", reading: "비디오 (Video)", fs4: ["최재호(Tín)","이주복(Trung)"], fs5: ["김수빈(Hồng)","정수진(Thơm)"], fs6: ["이윤서(Luyến)","최혜연(Hiền)"], fs7: []},
    {month: 5, day: 6, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "정명훈 (Huân)", gems: "최찬 (Kiên)", reading: "최재호 (Tín)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 5, day: 13, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "이주복 (Trung)", gems: "최재호 (Tín)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 5, day: 20, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "김현일 (Bảo)", gems: "이주복 (Trung)", reading: "최찬 (Kiên)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 5, day: 27, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "비디오 (Video)", gems: "김현일 (Bảo)", reading: "비디오 (Video)", fs4: ["최찬(Kiên)","이주복(Trung)"], fs5: ["오기숙(Lan)","한윤경(Hằng)"], fs6: ["서민아(Hà)","이선미(Trà My)"], fs7: []},
    {month: 6, day: 3, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "이주복 (Trung)", gems: "정명훈 (Huân)", reading: "김현일 (Bảo)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 6, day: 10, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "정명훈 (Huân)", gems: "최찬 (Kiên)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 6, day: 17, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "최찬 (Kiên)", gems: "최재호 (Tín)", reading: "이주복 (Trung)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 6, day: 24, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "비디오 (Video)", gems: "이주복 (Trung)", reading: "비디오 (Video)", fs4: ["최재호(Tín)","김현일(Bảo)"], fs5: ["김가영(Vân)","김수빈(Hồng)"], fs6: ["김자영(Diễm My)","정수진(Thơm)"], fs7: []},
    {month: 7, day: 1, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "이주복 (Trung)", gems: "김현일 (Bảo)", reading: "정명훈 (Huân)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 7, day: 8, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "최재호 (Tín)", gems: "정명훈 (Huân)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 7, day: 15, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "김현일 (Bảo)", gems: "최찬 (Kiên)", reading: "김민우 (Vũ)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 7, day: 22, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "정명훈 (Huân)", gems: "최재호 (Tín)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 7, day: 29, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "비디오 (Video)", gems: "이주복 (Trung)", reading: "최재호 (Tín)", fs4: ["김현일(Bảo)","최찬(Kiên)"], fs5: ["이윤서(Luyến)","최혜원(Nhi)"], fs6: ["최혜린(Linh)","최혜연(Hiền)"], fs7: []},
    {month: 8, day: 5, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "이주복 (Trung)", gems: "김현일 (Bảo)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 8, day: 12, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "비디오 (Video)", gems: "정명훈 (Huân)", reading: "김현일 (Bảo)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 8, day: 19, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "정명훈 (Huân)", gems: "최찬 (Kiên)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 8, day: 26, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "비디오 (Video)", gems: "최재호 (Tín)", reading: "최찬 (Kiên)", fs4: ["정명훈(Huân)","이주복(Trung)"], fs5: ["오기숙(Lan)","이선미(Trà My)"], fs6: ["서민아(Hà)","한윤경(Hằng)"], fs7: []},
    {month: 9, day: 2, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "이주복 (Trung)", gems: "김현일 (Bảo)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 9, day: 9, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "김현일 (Bảo)", gems: "정명훈 (Huân)", reading: "이주복 (Trung)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 9, day: 16, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "정명훈 (Huân)", gems: "이주복 (Trung)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 9, day: 23, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "최찬 (Kiên)", gems: "최재호 (Tín)", reading: "정명훈 (Huân)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 9, day: 30, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "비디오 (Video)", gems: "최찬 (Kiên)", reading: "비디오 (Video)", fs4: ["정명훈(Huân)","김자영(Diễm My)"], fs5: ["김가영(Vân)","이윤서(Luyến)"], fs6: ["김수빈(Hồng)","최혜린(Linh)"], fs7: []},
    {month: 10, day: 7, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "최재호 (Tín)", gems: "김현일 (Bảo)", reading: "김민우 (Vũ)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 10, day: 14, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "이주복 (Trung)", gems: "정명훈 (Huân)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 10, day: 21, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "정명훈 (Huân)", gems: "이주복 (Trung)", reading: "최재호 (Tín)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 10, day: 28, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "비디오 (Video)", gems: "최재호 (Tín)", reading: "비디오 (Video)", fs4: ["최찬(Kiên)","오기숙(Lan)"], fs5: ["정명훈(Huân)","김현일(Bảo)"], fs6: ["정수진(Thơm)","최혜원(Nhi)"], fs7: []},
    {month: 11, day: 4, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "정명훈 (Huân)", gems: "이주복 (Trung)", reading: "최찬 (Kiên)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 11, day: 11, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "김현일 (Bảo)", gems: "최찬 (Kiên)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 11, day: 18, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "이주복 (Trung)", gems: "정명훈 (Huân)", reading: "김현일 (Bảo)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 11, day: 25, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "비디오 (Video)", gems: "김현일 (Bảo)", reading: "비디오 (Video)", fs4: ["최재호(Tín)","최혜연(Hiền)"], fs5: ["김수빈(Hồng)","이윤서(Luyến)"], fs6: ["김가영(Vân)","서민아(Hà)"], fs7: []},
    {month: 12, day: 2, year: 2027, weekday: null, special: null, chairman: "이주복 (Trung)", talk: "정명훈 (Huân)", gems: "최재호 (Tín)", reading: "김민우 (Vũ)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 12, day: 9, year: 2027, weekday: null, special: null, chairman: "김현일 (Bảo)", talk: "비디오 (Video)", gems: "이주복 (Trung)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 12, day: 16, year: 2027, weekday: null, special: null, chairman: "정명훈 (Huân)", talk: "최찬 (Kiên)", gems: "김현일 (Bảo)", reading: "이주복 (Trung)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 12, day: 23, year: 2027, weekday: null, special: null, chairman: "최재호 (Tín)", talk: "이주복 (Trung)", gems: "최찬 (Kiên)", reading: "비디오 (Video)", fs4: ["비디오 (Video)"], fs5: ["비디오 (Video)"], fs6: ["비디오 (Video)"], fs7: []},
    {month: 12, day: 30, year: 2027, weekday: null, special: null, chairman: "최찬 (Kiên)", talk: "비디오 (Video)", gems: "최재호 (Tín)", reading: "정명훈 (Huân)", fs4: ["이주복(Trung)","한윤경(Hằng)"], fs5: ["김자영(Diễm My)","이선미(Trà My)"], fs6: ["정수진(Thơm)","최혜린(Linh)"], fs7: []}
  ];

  var WEEKEND_SCHEDULE = [
    { month: 9, day: 27, year: 2026,
      chairman: "정명훈 (Huân)",
      talkLabel: "특별공개강연 · Bài giảng đặc biệt",
      talkKo: "성경이 당신에게 어떻게 도움이 됩니까?",
      talkVi: "Kinh Thánh có thể giúp quý vị như thế nào?",
      speaker: "김현일 (Bảo)",
      wtConductor: "이주복 (Trung)", wtReader: "최찬 (Kiên)", closing: "김현일 (Bảo)" },
    { month: 10, day: 4, year: 2026,
      chairman: "이주복 (Trung)",
      talkKo: "(116) 친구를 지혜롭게 선택하라! (JW스트림)",
      talkVi: "(116) Hãy khéo chọn bạn bè!",
      speaker: "Tùng",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 10, day: 11, year: 2026,
      chairman: "최찬 (Kiên)",
      talkKo: "",
      talkVi: "(111) Sự chữa lành hoàn toàn cho nhân loại—Như thế nào?",
      speaker: "Khanh",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 10, day: 18, year: 2026,
      chairman: "최재호 (Tín)",
      talkKo: "",
      talkVi: "(131) Hãy đứng vững trước Ác Quỷ",
      speaker: "Tín",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "이주복 (Trung)" },
    { month: 10, day: 25, year: 2026,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최재호 (Tín)" },
    { month: 11, day: 1, year: 2026,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 11, day: 8, year: 2026,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 11, day: 22, year: 2026,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 11, day: 29, year: 2026,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "최석천 (Giám thị vòng quanh)",
      wtConductor: "김현일 (Bảo)", wtReader: "", wtReaderCustom: ["봉강", "Bài giảng công tác"], wtNote: "낭독 없음\nKhông đọc bài", closing: "최석천 (Giám thị vòng quanh)" },
    { month: 12, day: 13, year: 2026,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 12, day: 20, year: 2026,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 12, day: 27, year: 2026,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "김명건 (Giám thị vòng quanh)",
      wtConductor: "김현일 (Bảo)", wtReader: "", wtReaderCustom: ["봉강", "Bài giảng công tác"], wtNote: "낭독 없음\nKhông đọc bài", closing: "김명건 (Giám thị vòng quanh)" },
    { month: 1, day: 3, year: 2027,
      chairman: "최재호 (Tín)",
      talkLabel: "베트남어 공개강연 · Bài giảng công cộng tiếng Việt",
      talkKo: "미정",
      talkVi: "chưa biết",
      speaker: "정명훈 (Huân)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 1, day: 10, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최찬 (Kiên)" },
    { month: 1, day: 17, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "이주복 (Trung)" },
    { month: 1, day: 24, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최재호 (Tín)" },
    { month: 1, day: 31, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 2, day: 7, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최찬 (Kiên)" },
    { month: 2, day: 14, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "이주복 (Trung)" },
    { month: 2, day: 21, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최재호 (Tín)" },
    { month: 2, day: 28, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 3, day: 7, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 3, day: 14, year: 2027,
      chairman: "최찬 (Kiên)",
      talkLabel: "특별공개강연 · Bài giảng đặc biệt",
      talkKo: "두려움이 없는 세상 — 가능합니까?",
      talkVi: "Liệu có thể sống trong thế giới mà không còn sợ hãi?",
      speaker: "이주복 (Trung)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "이주복 (Trung)" },
    { month: 3, day: 21, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최재호 (Tín)" },
    { month: 3, day: 28, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "이주복 (Trung)" },
    { month: 4, day: 4, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최재호 (Tín)" },
    { month: 4, day: 11, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "정명훈 (Huân)" },
    { month: 4, day: 18, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최찬 (Kiên)" },
    { month: 4, day: 25, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "이주복 (Trung)" },
    { month: 5, day: 2, year: 2027,
      chairman: "최찬 (Kiên)",
      talkLabel: "베트남어 공개강연 · Bài giảng công cộng tiếng Việt",
      talkKo: "미정",
      talkVi: "chưa biết",
      speaker: "김현일 (Bảo)",
      wtConductor: "이주복 (Trung)", wtReader: "정명훈 (Huân)", closing: "김현일 (Bảo)" },
    { month: 5, day: 9, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "정명훈 (Huân)" },
    { month: 5, day: 16, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최재호 (Tín)" },
    { month: 5, day: 23, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "이주복 (Trung)" },
    { month: 5, day: 30, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최재호 (Tín)" },
    { month: 6, day: 6, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 6, day: 13, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최재호 (Tín)" },
    { month: 6, day: 20, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 6, day: 27, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "이주복 (Trung)" },
    { month: 7, day: 4, year: 2027,
      chairman: "이주복 (Trung)",
      talkLabel: "베트남어 공개강연 · Bài giảng công cộng tiếng Việt",
      talkKo: "미정",
      talkVi: "chưa biết",
      speaker: "최재호 (Tín)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "최재호 (Tín)" },
    { month: 7, day: 11, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 7, day: 18, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 7, day: 25, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최재호 (Tín)" },
    { month: 8, day: 1, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 8, day: 8, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "이주복 (Trung)" },
    { month: 8, day: 15, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최찬 (Kiên)" },
    { month: 8, day: 22, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최재호 (Tín)" },
    { month: 8, day: 29, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 9, day: 5, year: 2027,
      chairman: "정명훈 (Huân)",
      talkLabel: "베트남어 공개강연 · Bài giảng công cộng tiếng Việt",
      talkKo: "미정",
      talkVi: "chưa biết",
      speaker: "최찬 (Kiên)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 9, day: 12, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "최찬 (Kiên)" },
    { month: 9, day: 19, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "이주복 (Trung)" },
    { month: 9, day: 26, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "최재호 (Tín)" },
    { month: 10, day: 3, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 10, day: 10, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 10, day: 17, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "이주복 (Trung)" },
    { month: 10, day: 24, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "최재호 (Tín)" },
    { month: 10, day: 31, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 11, day: 7, year: 2027,
      chairman: "최재호 (Tín)",
      talkLabel: "베트남어 공개강연 · Bài giảng công cộng tiếng Việt",
      talkKo: "미정",
      talkVi: "chưa biết",
      speaker: "정명훈 (Huân)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 11, day: 14, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "이주복 (Trung)" },
    { month: 11, day: 21, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 11, day: 28, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "최찬 (Kiên)" },
    { month: 12, day: 5, year: 2027,
      chairman: "최재호 (Tín)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "이주복 (Trung)", closing: "정명훈 (Huân)" },
    { month: 12, day: 12, year: 2027,
      chairman: "최찬 (Kiên)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "정명훈 (Huân)", closing: "최재호 (Tín)" },
    { month: 12, day: 19, year: 2027,
      chairman: "이주복 (Trung)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최찬 (Kiên)", closing: "정명훈 (Huân)" },
    { month: 12, day: 26, year: 2027,
      chairman: "정명훈 (Huân)",
      talkKo: "미정 (JW스트림)",
      talkVi: "chưa biết",
      speaker: "미정 (chưa biết)",
      wtConductor: "김현일 (Bảo)", wtReader: "최재호 (Tín)", closing: "이주복 (Trung)" }
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

  function appendLines(node, text) {
    text.split("\n").forEach(function (part, index) {
      if (index > 0) node.appendChild(document.createElement("br"));
      node.appendChild(document.createTextNode(part));
    });
  }

  function headerCell(tag, lines, opts) {
    var th = el(tag, opts);
    lines.forEach(function (line, index) {
      if (index === 0) {
        appendLines(th, line);
      } else {
        var span = el("span", { className: "th-vi" });
        appendLines(span, line);
        th.appendChild(span);
      }
    });
    return th;
  }

  function splitNamePair(text) {
    if (!text) return null;
    var match = /^(.*?)\s*\(([^()]*)\)\s*$/.exec(text);
    if (!match) return null;
    return { main: match[1].trim(), sub: match[2].trim() };
  }

  function appendNameLines(container, text) {
    var pair = splitNamePair(text);
    if (!pair) {
      container.appendChild(document.createTextNode(text));
      return;
    }
    container.appendChild(document.createTextNode(pair.main));
    container.appendChild(document.createElement("br"));
    container.appendChild(el("span", { className: "name-sub", text: pair.sub }));
  }

  function nameCell(text, className) {
    var td = el("td", { className: className });
    appendNameLines(td, text);
    return td;
  }

  function multiCell(list) {
    var td = el("td", { className: "col-fs cell-fs" });
    if (!list || !list.length) {
      td.appendChild(el("span", { className: "schedule-dash", text: "–" }));
      return td;
    }
    if (list.length === 1) {
      appendNameLines(td, list[0]);
      return td;
    }
    var wrap = el("span", { className: "schedule-multi" });
    list.forEach(function (name) {
      var item = el("span");
      appendNameLines(item, name);
      wrap.appendChild(item);
    });
    td.appendChild(wrap);
    return td;
  }

  function dateCell(row, kind) {
    var td = el("td", { className: "col-date" });
    td.appendChild(document.createTextNode(row.month + "월"));
    td.appendChild(document.createElement("br"));
    td.appendChild(document.createTextNode(row.day + "일"));
    if (row.weekday) {
      td.appendChild(document.createElement("br"));
      td.appendChild(document.createTextNode(row.weekday));
    }
    if (row.special) {
      var note = el("strong", { className: "schedule-note", text: row.special });
      td.appendChild(note);
    }
    if (kind) {
      td.appendChild(el("span", { className: "schedule-kind schedule-kind-" + kind, text: kind === "weekend" ? "주말" : "주중" }));
    }
    return td;
  }

  function isPastRow(row, today) {
    var rowDate = new Date(row.year || today.getFullYear(), row.month - 1, row.day);
    return rowDate < today;
  }

  function filterUpcoming(data) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.filter(function (row) { return !isPastRow(row, today); });
  }

  function rowDate(row, today) {
    return new Date(row.year || today.getFullYear(), row.month - 1, row.day);
  }

  function mergeMeetings(weekday, weekend, today) {
    var all = [];
    weekday.forEach(function (row) { all.push({ kind: "weekday", row: row }); });
    weekend.forEach(function (row) { all.push({ kind: "weekend", row: row }); });
    all.forEach(function (item, index) {
      item.time = rowDate(item.row, today).getTime();
      item.order = index;
    });
    all.sort(function (a, b) { return a.time - b.time || a.order - b.order; });
    return all;
  }

  function labelledCell(label, colspan) {
    var td = el("td", { colspan: colspan });
    td.appendChild(el("span", { className: "cell-label", text: label[0] }));
    td.appendChild(el("span", { className: "cell-label cell-label-vi", text: label[1] }));
    return td;
  }

  function isUndecided(text) {
    return !text || /^미정/.test(text) || text === "chưa biết";
  }

  function weekendTalkCell(row) {
    var speakerKnown = !isUndecided(row.speaker);
    if (!speakerKnown) {
      /* 연사 미정: 이름표 "공개강연 (JW스트림)"만 표시 */
      var pending = labelledCell(["공개강연 (JW스트림)", "Bài giảng công cộng"], 3);
      pending.className = "cell-weekend";
      if (row.talkLabel) {
        pending.appendChild(el("strong", { className: "schedule-note", text: row.talkLabel }));
      }
      return pending;
    }
    /* 연사 확정: "공개강연 Bài giảng công cộng (번호) 제목" 한 줄 + 베트남어 제목 + 연사 */
    var td = el("td", { colspan: 3, className: "cell-weekend" });
    td.appendChild(el("span", { className: "cell-label cell-label-inline", text: "공개강연 Bài giảng công cộng" }));
    if (!isUndecided(row.talkKo)) {
      td.appendChild(document.createTextNode(" " + row.talkKo));
    }
    if (row.talkLabel) {
      td.appendChild(el("strong", { className: "schedule-note", text: row.talkLabel }));
    }
    if (!isUndecided(row.talkVi)) {
      /* 번호는 첫 줄에 이미 표시되므로 베트남어 제목에서는 뺀다 */
      var viTitle = row.talkVi.replace(/^\(\d+\)\s*/, "");
      td.appendChild(el("span", { className: "th-vi", text: viTitle }));
    }
    var speaker = el("span", { className: "talk-speaker" });
    var pair = splitNamePair(row.speaker);
    if (pair) {
      speaker.appendChild(document.createTextNode("연사: " + pair.main));
      speaker.appendChild(document.createElement("br"));
      speaker.appendChild(el("span", { className: "name-sub", text: "Diễn giả: " + pair.sub }));
    } else {
      speaker.appendChild(el("span", { className: "name-sub", text: "Diễn giả: " + row.speaker }));
    }
    td.appendChild(speaker);
    return td;
  }

  /* 이름표 한 줄("파수대 Tháp Canh") + 이름 한 줄("김현일 Bảo") */
  function labelledName(label, colspan, text, note) {
    var td = el("td", { colspan: colspan, className: "cell-weekend" });
    if (!text) return td; /* 낭독자 없음: 빈칸 */
    var labelEl = el("span", { className: "cell-label" });
    appendLines(labelEl, label[0] + "\n" + label[1]);
    td.appendChild(labelEl);
    var pair = splitNamePair(text);
    if (pair) {
      td.appendChild(document.createTextNode(pair.main + " "));
      td.appendChild(el("span", { className: "name-sub", text: pair.sub }));
    } else {
      td.appendChild(document.createTextNode(text));
    }
    if (note) {
      var noteEl = el("span", { className: "cell-note" });
      appendLines(noteEl, note);
      td.appendChild(noteEl);
    }
    return td;
  }

  function appendWeekendRow(tr, row) {
    tr.className = "row-weekend";
    tr.appendChild(nameCell(row.chairman));
    tr.appendChild(weekendTalkCell(row));
    tr.appendChild(labelledName(["파수대", "Tháp Canh"], 2, row.wtConductor, row.wtNote));
    if (row.wtReaderCustom) {
      /* 낭독 대신 다른 순서(예: 봉강)를 표시 */
      var custom = el("td", { colspan: 2, className: "cell-weekend" });
      custom.appendChild(document.createTextNode(row.wtReaderCustom[0]));
      custom.appendChild(el("span", { className: "th-vi", text: row.wtReaderCustom[1] }));
      tr.appendChild(custom);
    } else {
      tr.appendChild(labelledName(["낭독", "Đọc bài"], 2, row.wtReader));
    }
    tr.appendChild(nameCell(row.closing));
  }

  function appendWeekdayRow(tr, row) {
    tr.className = "row-weekday";
    if (row.event) {
      var eventTd = el("td", { className: "schedule-event", colspan: 9 });
      appendLines(eventTd, row.event);
      if (row.eventVi) {
        var viEl = el("span", { className: "th-vi" });
        appendLines(viEl, row.eventVi);
        eventTd.appendChild(viEl);
      }
      tr.appendChild(eventTd);
      return;
    }
    tr.appendChild(nameCell(row.chairman));
    tr.appendChild(nameCell(row.talk, "cell-treasure"));
    tr.appendChild(nameCell(row.gems, "cell-treasure"));
    tr.appendChild(nameCell(row.reading, "cell-treasure"));
    tr.appendChild(multiCell(row.fs4));
    tr.appendChild(multiCell(row.fs5));
    tr.appendChild(multiCell(row.fs6));
    tr.appendChild(multiCell(row.fs7));
    tr.appendChild(el("td"));
  }

  /* 주중 모임 + 주말 모임을 날짜순 하나의 표로 렌더링 */
  function renderTable(container, data) {
    if (!container) return;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var items = mergeMeetings(data || getEffective(), WEEKEND_SCHEDULE, today).filter(function (item) {
      return item.time >= today.getTime();
    });
    container.textContent = "";

    var wrapper = el("div", { className: "schedule-scroll" });
    var table = el("table", { className: "schedule-table" });

    /* 열 폭은 CSS(.c-*)의 비율로 고정: 4~7번 칸 동일, 공개강연 = 연설+보물+낭독 3열 */
    var colgroup = el("colgroup");
    ["c-date", "c-chair", "c-talk", "c-talk", "c-talk", "c-fs", "c-fs", "c-fs", "c-fs", "c-prayer"].forEach(function (name) {
      colgroup.appendChild(el("col", { className: name }));
    });
    table.appendChild(colgroup);

    var thead = el("thead");
    var tr1 = el("tr");
    tr1.appendChild(headerCell("th", ["날짜", "Ngày"], { rowspan: 2, className: "col-date" }));
    tr1.appendChild(headerCell("th", ["사회 및\n기도", "Chủ tọa và\ncầu nguyện"], { rowspan: 2, className: "col-chair" }));
    tr1.appendChild(headerCell("th", ["성경에 담긴 보물", "KHO BÁU TỪ KINH THÁNH"], { colspan: 3, className: "group-treasure" }));
    tr1.appendChild(headerCell("th", ["야외 봉사에 힘쓰십시오", "CẢI THIỆN THÁNH CHỨC"], { colspan: 4, className: "group-fs" }));
    tr1.appendChild(headerCell("th", ["기도", "Cầu nguyện"], { rowspan: 2, className: "col-prayer" }));
    thead.appendChild(tr1);

    var tr2 = el("tr");
    tr2.appendChild(headerCell("th", ["연설", "Bài giảng"], { className: "group-treasure" }));
    tr2.appendChild(headerCell("th", ["보물\n찾기", "Viên ngọc"], { className: "group-treasure" }));
    tr2.appendChild(headerCell("th", ["성경\n낭독", "Đọc KT"], { className: "group-treasure" }));
    ["4", "5", "6", "7"].forEach(function (n) {
      tr2.appendChild(headerCell("th", [n], { className: "group-fs" }));
    });
    thead.appendChild(tr2);
    table.appendChild(thead);

    var tbody = el("tbody");
    items.forEach(function (item) {
      var tr = el("tr");
      tr.appendChild(dateCell(item.row, item.kind));
      if (item.kind === "weekend") {
        appendWeekendRow(tr, item.row);
      } else {
        appendWeekdayRow(tr, item.row);
      }
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    wrapper.appendChild(table);
    container.appendChild(wrapper);
  }

  global.NhomSchedule = {
    WEEKEND_SCHEDULE: WEEKEND_SCHEDULE,
    DEFAULT_SCHEDULE: DEFAULT_SCHEDULE,
    getEffective: getEffective,
    isOverridden: isOverridden,
    save: save,
    reset: reset,
    renderTable: renderTable,
    filterUpcoming: filterUpcoming
  };
})(window);
