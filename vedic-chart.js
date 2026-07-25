/*
  Bản Đồ Sao Vệ Đà — Vedic (Jyotiṣa) birth chart tool.
  Vanilla JS, no framework. Planetary positions from Astronomy Engine
  (astronomy-engine.min.js, must load before this file) — VSOP87/ELP2000
  based, accurate to well under an arcminute for the classical 7 grahas.
  Ayanāṁśa: Lahiri (Chitrapaksha), standard linear approximation.
  Rahu/Ketu: Meeus mean lunar node (quartic) + published periodic
  correction terms for an approximate true/oscillating node.
  House system: Whole Sign. All computation runs client-side; nothing is
  sent to a server. Sharing uses a URL with vd*-prefixed query params.
*/
(function () {
  'use strict';
  if (typeof window.Astronomy === 'undefined') {
    console.error('vedic-chart.js: window.Astronomy not loaded — check astronomy-engine.min.js is included first.');
    return;
  }
  var Astronomy = window.Astronomy;
  var DEG = Math.PI / 180;

  // ---------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------
  var SIGNS = ['Mesha (Bạch Dương)', 'Vrishabha (Kim Ngưu)', 'Mithuna (Song Tử)', 'Karka (Cự Giải)', 'Simha (Sư Tử)', 'Kanya (Xử Nữ)', 'Tula (Thiên Bình)', 'Vrischika (Thiên Yết)', 'Dhanu (Nhân Mã)', 'Makara (Ma Kết)', 'Kumbha (Bảo Bình)', 'Meena (Song Ngư)'];
  /* Tên tiếng Việt gọn, dùng trong câu văn — tên đầy đủ "Vrishabha (Kim Ngưu)"
     đọc trong tiêu đề thì hay, nhưng nhắc lại giữa câu thì rất nặng. */
  var SIGNS_VI = ['Bạch Dương', 'Kim Ngưu', 'Song Tử', 'Cự Giải', 'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Thiên Yết', 'Nhân Mã', 'Ma Kết', 'Bảo Bình', 'Song Ngư'];
  var SIGNS_SHORT = ['Mes', 'Vri', 'Mit', 'Kar', 'Sim', 'Kan', 'Tul', 'Vrs', 'Dha', 'Mak', 'Kum', 'Mee'];
  var PLANET_META = [
    { id: 'sun', viet: 'Mặt Trời', sk: 'Surya', glyph: '☉' },
    { id: 'moon', viet: 'Mặt Trăng', sk: 'Chandra', glyph: '☾' },
    { id: 'mars', viet: 'Sao Hỏa', sk: 'Mangala', glyph: '♂' },
    { id: 'mercury', viet: 'Sao Thủy', sk: 'Budha', glyph: '☿' },
    { id: 'jupiter', viet: 'Sao Mộc', sk: 'Guru', glyph: '♃' },
    { id: 'venus', viet: 'Sao Kim', sk: 'Shukra', glyph: '♀' },
    { id: 'saturn', viet: 'Sao Thổ', sk: 'Shani', glyph: '♄' },
    { id: 'rahu', viet: 'Rahu', sk: 'Rahu', glyph: '☊' },
    { id: 'ketu', viet: 'Ketu', sk: 'Ketu', glyph: '☋' }
  ];
  var NAKSHATRAS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'P.Phalguni', 'U.Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'P.Ashadha', 'U.Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'P.Bhadra', 'U.Bhadra', 'Revati'];
  var NAK_LORDS = ['Ketu', 'Sao Kim', 'Mặt Trời', 'Mặt Trăng', 'Sao Hỏa', 'Rahu', 'Sao Mộc', 'Sao Thổ', 'Sao Thủy'];
  var SI_LAYOUT = [[11, 0, 1, 2], [10, null, null, 3], [9, null, null, 4], [8, 7, 6, 5]];
  var STAGES = ['Đang định vị bầu trời…', 'Đang hiệu chỉnh Lahiri…', 'Đang dựng các nhà…', 'Đang soi chiếu Nakshatra…'];
  var HOUSE_THEMES = ['Bản thân, ngoại hình, tính cách', 'Tài chính, gia đình, lời nói', 'Giao tiếp, anh chị em, can đảm', 'Nhà cửa, mẹ, hạnh phúc nội tâm', 'Con cái, sáng tạo, học vấn cao', 'Sức khỏe, kẻ thù, công việc hàng ngày', 'Hôn nhân, đối tác, hợp đồng', 'Bí mật, chuyển hóa, thừa kế', 'May mắn, thầy, tôn giáo, du lịch xa', 'Sự nghiệp, danh tiếng, địa vị', 'Thu nhập, bạn bè, ước mơ', 'Chi tiêu, mất mát, giải thoát, nước ngoài'];
  var SIGN_TRAITS = [
    ['năng động, dũng cảm, tiên phong', 'Có thể biểu hiện qua hành động nhanh và thích khởi xướng.'],
    ['kiên nhẫn, yêu vật chất, ổn định', 'Có thể biểu hiện qua gu thẩm mỹ và khả năng tích lũy.'],
    ['linh hoạt, thông minh, đa tài', 'Có thể biểu hiện qua trí tuệ sắc bén và giao tiếp tốt.'],
    ['nhạy cảm, trực giác mạnh, gắn bó gia đình', 'Có thể biểu hiện qua cảm xúc sâu và sự thấu hiểu.'],
    ['tự tin, sáng tạo, lãnh đạo bẩm sinh', 'Có thể biểu hiện qua sức hút cá nhân và sự hào phóng.'],
    ['phân tích, cẩn thận, cầu toàn', 'Có thể biểu hiện qua khả năng tổ chức và chú ý chi tiết.'],
    ['hài hòa, công bằng, ngoại giao', 'Có thể biểu hiện qua sự yêu cái đẹp và cân bằng.'],
    ['sâu sắc, bí ẩn, mãnh liệt', 'Có thể biểu hiện qua sức mạnh chuyển hóa nội tâm.'],
    ['lạc quan, triết lý, yêu tự do', 'Có thể biểu hiện qua tầm nhìn rộng và đạo đức cao.'],
    ['kỷ luật, tham vọng, kiên trì', 'Có thể biểu hiện qua khả năng xây dựng dài hạn.'],
    ['độc lập, nhân đạo, phi truyền thống', 'Có thể biểu hiện qua tư duy đổi mới, hướng cộng đồng.'],
    ['trực giác, giàu trí tưởng tượng, từ bi', 'Có thể biểu hiện qua khả năng nghệ thuật và tâm linh.']
  ];
  /* 2026-07-25 — DANH SÁCH NƠI SINH, kèm `tzid` (IANA time zone) + `alias`.
     [city, admin, country, lat, lon, tzid, alias]
     · `tzid` thay cho offset cứng ở bản trước: offset thật được tính LẠI theo
       ĐÚNG NGÀY SINH bằng Intl.DateTimeFormat (xem offsetForLocalTime), nên
       lịch sử múi giờ + giờ mùa hè được xử lý đúng mà không cần thư viện.
       Đây là sửa lỗi quan trọng nhất về độ chính xác: bản cũ ghi cứng
       `tz: 7` cho Việt Nam, trong khi Sài Gòn giai đoạn ~1959–1975 thực tế
       là UTC+8 → sai 1 giờ → Lagna lệch ~15° → ĐỔI HẲN CUNG MỆNH.
     · `alias` là chuỗi từ khoá không dấu để tìm được "sai gon", "saigon",
       "hcm", "thu duc"… (bản cũ gõ "Sài" ra 0 kết quả). */
  var LOC_RAW = [
    ['TP. Hồ Chí Minh', 'Hồ Chí Minh', 'Việt Nam', 10.82, 106.63, 'Asia/Ho_Chi_Minh', 'sai gon saigon sg hcm tphcm tp hcm ho chi minh'],
    ['Thủ Đức', 'Hồ Chí Minh', 'Việt Nam', 10.85, 106.75, 'Asia/Ho_Chi_Minh', 'thu duc'],
    ['Hà Nội', 'Hà Nội', 'Việt Nam', 21.03, 105.85, 'Asia/Ho_Chi_Minh', 'hanoi ha noi'],
    ['Đà Nẵng', 'Đà Nẵng', 'Việt Nam', 16.05, 108.22, 'Asia/Ho_Chi_Minh', 'da nang danang'],
    ['Hải Phòng', 'Hải Phòng', 'Việt Nam', 20.86, 106.68, 'Asia/Ho_Chi_Minh', 'hai phong'],
    ['Huế', 'Thừa Thiên Huế', 'Việt Nam', 16.46, 107.58, 'Asia/Ho_Chi_Minh', 'hue thua thien'],
    ['Nha Trang', 'Khánh Hòa', 'Việt Nam', 12.24, 109.19, 'Asia/Ho_Chi_Minh', 'nha trang khanh hoa'],
    ['Đà Lạt', 'Lâm Đồng', 'Việt Nam', 11.94, 108.45, 'Asia/Ho_Chi_Minh', 'da lat dalat lam dong'],
    ['Cần Thơ', 'Cần Thơ', 'Việt Nam', 10.03, 105.78, 'Asia/Ho_Chi_Minh', 'can tho'],
    ['Vũng Tàu', 'Bà Rịa - Vũng Tàu', 'Việt Nam', 10.35, 107.08, 'Asia/Ho_Chi_Minh', 'vung tau ba ria'],
    ['Biên Hòa', 'Đồng Nai', 'Việt Nam', 10.95, 106.82, 'Asia/Ho_Chi_Minh', 'bien hoa dong nai'],
    ['Thủ Dầu Một', 'Bình Dương', 'Việt Nam', 10.98, 106.65, 'Asia/Ho_Chi_Minh', 'thu dau mot binh duong'],
    ['Tân An', 'Long An', 'Việt Nam', 10.53, 106.41, 'Asia/Ho_Chi_Minh', 'tan an long an'],
    ['Mỹ Tho', 'Tiền Giang', 'Việt Nam', 10.36, 106.36, 'Asia/Ho_Chi_Minh', 'my tho tien giang'],
    ['Bến Tre', 'Bến Tre', 'Việt Nam', 10.24, 106.38, 'Asia/Ho_Chi_Minh', 'ben tre'],
    ['Vĩnh Long', 'Vĩnh Long', 'Việt Nam', 10.25, 105.97, 'Asia/Ho_Chi_Minh', 'vinh long'],
    ['Trà Vinh', 'Trà Vinh', 'Việt Nam', 9.93, 106.34, 'Asia/Ho_Chi_Minh', 'tra vinh'],
    ['Sóc Trăng', 'Sóc Trăng', 'Việt Nam', 9.60, 105.98, 'Asia/Ho_Chi_Minh', 'soc trang'],
    ['Rạch Giá', 'Kiên Giang', 'Việt Nam', 10.01, 105.08, 'Asia/Ho_Chi_Minh', 'rach gia kien giang'],
    ['Cà Mau', 'Cà Mau', 'Việt Nam', 9.18, 105.15, 'Asia/Ho_Chi_Minh', 'ca mau'],
    ['Bạc Liêu', 'Bạc Liêu', 'Việt Nam', 9.29, 105.72, 'Asia/Ho_Chi_Minh', 'bac lieu'],
    ['Cao Lãnh', 'Đồng Tháp', 'Việt Nam', 10.46, 105.63, 'Asia/Ho_Chi_Minh', 'cao lanh dong thap'],
    ['Long Xuyên', 'An Giang', 'Việt Nam', 10.39, 105.44, 'Asia/Ho_Chi_Minh', 'long xuyen an giang'],
    ['Châu Đốc', 'An Giang', 'Việt Nam', 10.70, 105.12, 'Asia/Ho_Chi_Minh', 'chau doc'],
    ['Tây Ninh', 'Tây Ninh', 'Việt Nam', 11.31, 106.10, 'Asia/Ho_Chi_Minh', 'tay ninh'],
    ['Phan Thiết', 'Bình Thuận', 'Việt Nam', 10.93, 108.10, 'Asia/Ho_Chi_Minh', 'phan thiet binh thuan'],
    ['Phan Rang', 'Ninh Thuận', 'Việt Nam', 11.56, 108.99, 'Asia/Ho_Chi_Minh', 'phan rang thap cham ninh thuan'],
    ['Tuy Hòa', 'Phú Yên', 'Việt Nam', 13.10, 109.30, 'Asia/Ho_Chi_Minh', 'tuy hoa phu yen'],
    ['Quy Nhơn', 'Bình Định', 'Việt Nam', 13.78, 109.22, 'Asia/Ho_Chi_Minh', 'quy nhon binh dinh'],
    ['Quảng Ngãi', 'Quảng Ngãi', 'Việt Nam', 15.12, 108.80, 'Asia/Ho_Chi_Minh', 'quang ngai'],
    ['Tam Kỳ', 'Quảng Nam', 'Việt Nam', 15.57, 108.47, 'Asia/Ho_Chi_Minh', 'tam ky quang nam'],
    ['Hội An', 'Quảng Nam', 'Việt Nam', 15.88, 108.34, 'Asia/Ho_Chi_Minh', 'hoi an'],
    ['Đông Hà', 'Quảng Trị', 'Việt Nam', 16.81, 107.10, 'Asia/Ho_Chi_Minh', 'dong ha quang tri'],
    ['Đồng Hới', 'Quảng Bình', 'Việt Nam', 17.48, 106.60, 'Asia/Ho_Chi_Minh', 'dong hoi quang binh'],
    ['Hà Tĩnh', 'Hà Tĩnh', 'Việt Nam', 18.34, 105.91, 'Asia/Ho_Chi_Minh', 'ha tinh'],
    ['Vinh', 'Nghệ An', 'Việt Nam', 18.68, 105.68, 'Asia/Ho_Chi_Minh', 'vinh nghe an'],
    ['Thanh Hóa', 'Thanh Hóa', 'Việt Nam', 19.81, 105.78, 'Asia/Ho_Chi_Minh', 'thanh hoa'],
    ['Ninh Bình', 'Ninh Bình', 'Việt Nam', 20.25, 105.98, 'Asia/Ho_Chi_Minh', 'ninh binh'],
    ['Nam Định', 'Nam Định', 'Việt Nam', 20.44, 106.18, 'Asia/Ho_Chi_Minh', 'nam dinh'],
    ['Thái Bình', 'Thái Bình', 'Việt Nam', 20.45, 106.34, 'Asia/Ho_Chi_Minh', 'thai binh'],
    ['Hưng Yên', 'Hưng Yên', 'Việt Nam', 20.65, 106.05, 'Asia/Ho_Chi_Minh', 'hung yen'],
    ['Hải Dương', 'Hải Dương', 'Việt Nam', 20.94, 106.33, 'Asia/Ho_Chi_Minh', 'hai duong'],
    ['Bắc Ninh', 'Bắc Ninh', 'Việt Nam', 21.19, 106.08, 'Asia/Ho_Chi_Minh', 'bac ninh'],
    ['Việt Trì', 'Phú Thọ', 'Việt Nam', 21.30, 105.40, 'Asia/Ho_Chi_Minh', 'viet tri phu tho'],
    ['Thái Nguyên', 'Thái Nguyên', 'Việt Nam', 21.59, 105.85, 'Asia/Ho_Chi_Minh', 'thai nguyen'],
    ['Bắc Giang', 'Bắc Giang', 'Việt Nam', 21.27, 106.19, 'Asia/Ho_Chi_Minh', 'bac giang'],
    ['Lạng Sơn', 'Lạng Sơn', 'Việt Nam', 21.85, 106.76, 'Asia/Ho_Chi_Minh', 'lang son'],
    ['Cao Bằng', 'Cao Bằng', 'Việt Nam', 22.67, 106.26, 'Asia/Ho_Chi_Minh', 'cao bang'],
    ['Hà Giang', 'Hà Giang', 'Việt Nam', 22.82, 104.98, 'Asia/Ho_Chi_Minh', 'ha giang'],
    ['Tuyên Quang', 'Tuyên Quang', 'Việt Nam', 21.82, 105.21, 'Asia/Ho_Chi_Minh', 'tuyen quang'],
    ['Yên Bái', 'Yên Bái', 'Việt Nam', 21.72, 104.90, 'Asia/Ho_Chi_Minh', 'yen bai'],
    ['Lào Cai', 'Lào Cai', 'Việt Nam', 22.49, 103.97, 'Asia/Ho_Chi_Minh', 'lao cai sa pa sapa'],
    ['Sơn La', 'Sơn La', 'Việt Nam', 21.33, 103.91, 'Asia/Ho_Chi_Minh', 'son la'],
    ['Hòa Bình', 'Hòa Bình', 'Việt Nam', 20.81, 105.34, 'Asia/Ho_Chi_Minh', 'hoa binh'],
    ['Điện Biên Phủ', 'Điện Biên', 'Việt Nam', 21.66, 103.02, 'Asia/Ho_Chi_Minh', 'dien bien phu'],
    ['Buôn Ma Thuột', 'Đắk Lắk', 'Việt Nam', 12.69, 108.05, 'Asia/Ho_Chi_Minh', 'buon ma thuot dak lak darlac'],
    ['Pleiku', 'Gia Lai', 'Việt Nam', 13.98, 108.00, 'Asia/Ho_Chi_Minh', 'pleiku gia lai'],
    ['Kon Tum', 'Kon Tum', 'Việt Nam', 14.35, 108.00, 'Asia/Ho_Chi_Minh', 'kon tum'],
    ['Gia Nghĩa', 'Đắk Nông', 'Việt Nam', 11.99, 107.69, 'Asia/Ho_Chi_Minh', 'gia nghia dak nong'],
    ['Bảo Lộc', 'Lâm Đồng', 'Việt Nam', 11.55, 107.81, 'Asia/Ho_Chi_Minh', 'bao loc'],
    ['Cam Ranh', 'Khánh Hòa', 'Việt Nam', 11.92, 109.16, 'Asia/Ho_Chi_Minh', 'cam ranh'],
    ['Phú Quốc', 'Kiên Giang', 'Việt Nam', 10.22, 103.96, 'Asia/Ho_Chi_Minh', 'phu quoc'],
    ['Bangkok', 'Bangkok', 'Thailand', 13.75, 100.52, 'Asia/Bangkok', 'bangkok thai lan'],
    ['Phnom Penh', '', 'Cambodia', 11.56, 104.92, 'Asia/Phnom_Penh', 'phnom penh campuchia'],
    ['Vientiane', '', 'Laos', 17.97, 102.60, 'Asia/Vientiane', 'vientiane lao'],
    ['Yangon', '', 'Myanmar', 16.87, 96.20, 'Asia/Yangon', 'yangon rangoon myanmar'],
    ['Singapore', '', 'Singapore', 1.35, 103.82, 'Asia/Singapore', 'singapore'],
    ['Kuala Lumpur', 'Federal Territory', 'Malaysia', 3.14, 101.69, 'Asia/Kuala_Lumpur', 'kuala lumpur malaysia'],
    ['Jakarta', 'Jakarta', 'Indonesia', -6.21, 106.85, 'Asia/Jakarta', 'jakarta indonesia'],
    ['Manila', 'Metro Manila', 'Philippines', 14.60, 120.98, 'Asia/Manila', 'manila philippines'],
    ['Hong Kong', '', 'China', 22.32, 114.17, 'Asia/Hong_Kong', 'hong kong hongkong'],
    ['Taipei', '', 'Taiwan', 25.03, 121.57, 'Asia/Taipei', 'taipei dai bac taiwan'],
    ['Beijing', 'Beijing', 'China', 39.90, 116.41, 'Asia/Shanghai', 'beijing bac kinh'],
    ['Shanghai', 'Shanghai', 'China', 31.23, 121.47, 'Asia/Shanghai', 'shanghai thuong hai'],
    ['Guangzhou', 'Guangdong', 'China', 23.13, 113.26, 'Asia/Shanghai', 'guangzhou quang chau'],
    ['Seoul', 'Seoul', 'South Korea', 37.57, 126.98, 'Asia/Seoul', 'seoul han quoc'],
    ['Tokyo', 'Tokyo', 'Japan', 35.68, 139.65, 'Asia/Tokyo', 'tokyo nhat ban'],
    ['Osaka', 'Osaka', 'Japan', 34.69, 135.50, 'Asia/Tokyo', 'osaka'],
    ['Delhi', 'Delhi', 'India', 28.61, 77.21, 'Asia/Kolkata', 'delhi new delhi an do'],
    ['Mumbai', 'Maharashtra', 'India', 19.08, 72.88, 'Asia/Kolkata', 'mumbai bombay'],
    ['Bangalore', 'Karnataka', 'India', 12.97, 77.59, 'Asia/Kolkata', 'bangalore bengaluru'],
    ['Kolkata', 'West Bengal', 'India', 22.57, 88.36, 'Asia/Kolkata', 'kolkata calcutta'],
    ['Chennai', 'Tamil Nadu', 'India', 13.08, 80.27, 'Asia/Kolkata', 'chennai madras'],
    ['Varanasi', 'Uttar Pradesh', 'India', 25.32, 82.97, 'Asia/Kolkata', 'varanasi benares kashi'],
    ['Kathmandu', '', 'Nepal', 27.72, 85.32, 'Asia/Kathmandu', 'kathmandu nepal'],
    ['Colombo', '', 'Sri Lanka', 6.93, 79.86, 'Asia/Colombo', 'colombo sri lanka'],
    ['Dhaka', '', 'Bangladesh', 23.81, 90.41, 'Asia/Dhaka', 'dhaka bangladesh'],
    ['Karachi', 'Sindh', 'Pakistan', 24.86, 67.01, 'Asia/Karachi', 'karachi pakistan'],
    ['Dubai', 'Dubai', 'United Arab Emirates', 25.20, 55.27, 'Asia/Dubai', 'dubai uae'],
    ['Riyadh', '', 'Saudi Arabia', 24.71, 46.68, 'Asia/Riyadh', 'riyadh saudi'],
    ['Istanbul', 'Istanbul', 'Turkey', 41.01, 28.98, 'Europe/Istanbul', 'istanbul tho nhi ky'],
    ['Cairo', '', 'Egypt', 30.04, 31.24, 'Africa/Cairo', 'cairo ai cap'],
    ['Moscow', 'Moscow', 'Russia', 55.75, 37.62, 'Europe/Moscow', 'moscow moskva nga'],
    ['Warsaw', 'Masovian', 'Poland', 52.23, 21.01, 'Europe/Warsaw', 'warsaw ba lan'],
    ['Prague', '', 'Czechia', 50.08, 14.44, 'Europe/Prague', 'prague praha sec'],
    ['Budapest', '', 'Hungary', 47.50, 19.04, 'Europe/Budapest', 'budapest hungary'],
    ['Vienna', 'Vienna', 'Austria', 48.21, 16.37, 'Europe/Vienna', 'vienna wien ao'],
    ['Berlin', 'Berlin', 'Germany', 52.52, 13.40, 'Europe/Berlin', 'berlin duc'],
    ['Munich', 'Bavaria', 'Germany', 48.14, 11.58, 'Europe/Berlin', 'munich munchen'],
    ['Frankfurt', 'Hesse', 'Germany', 50.11, 8.68, 'Europe/Berlin', 'frankfurt'],
    ['Zurich', '', 'Switzerland', 47.38, 8.54, 'Europe/Zurich', 'zurich thuy si'],
    ['Amsterdam', 'North Holland', 'Netherlands', 52.37, 4.90, 'Europe/Amsterdam', 'amsterdam ha lan'],
    ['Brussels', '', 'Belgium', 50.85, 4.35, 'Europe/Brussels', 'brussels bi'],
    ['Paris', 'Île-de-France', 'France', 48.85, 2.35, 'Europe/Paris', 'paris phap'],
    ['Lyon', '', 'France', 45.76, 4.84, 'Europe/Paris', 'lyon'],
    ['Marseille', '', 'France', 43.30, 5.37, 'Europe/Paris', 'marseille'],
    ['London', 'England', 'United Kingdom', 51.51, -0.13, 'Europe/London', 'london anh'],
    ['Dublin', '', 'Ireland', 53.35, -6.26, 'Europe/Dublin', 'dublin ireland'],
    ['Madrid', 'Madrid', 'Spain', 40.42, -3.70, 'Europe/Madrid', 'madrid tay ban nha'],
    ['Barcelona', 'Catalonia', 'Spain', 41.39, 2.17, 'Europe/Madrid', 'barcelona'],
    ['Lisbon', '', 'Portugal', 38.72, -9.14, 'Europe/Lisbon', 'lisbon lisboa bo dao nha'],
    ['Rome', 'Lazio', 'Italy', 41.90, 12.50, 'Europe/Rome', 'rome roma y'],
    ['Milan', 'Lombardy', 'Italy', 45.46, 9.19, 'Europe/Rome', 'milan milano'],
    ['Athens', '', 'Greece', 37.98, 23.73, 'Europe/Athens', 'athens hy lap'],
    ['Bucharest', '', 'Romania', 44.43, 26.10, 'Europe/Bucharest', 'bucharest romania'],
    ['Stockholm', 'Stockholm', 'Sweden', 59.33, 18.07, 'Europe/Stockholm', 'stockholm thuy dien'],
    ['Oslo', '', 'Norway', 59.91, 10.75, 'Europe/Oslo', 'oslo na uy'],
    ['Copenhagen', '', 'Denmark', 55.68, 12.57, 'Europe/Copenhagen', 'copenhagen dan mach'],
    ['Helsinki', '', 'Finland', 60.17, 24.94, 'Europe/Helsinki', 'helsinki phan lan'],
    ['New York', 'New York', 'United States', 40.71, -74.01, 'America/New_York', 'new york nyc my'],
    ['Boston', 'Massachusetts', 'United States', 42.36, -71.06, 'America/New_York', 'boston'],
    ['Washington', 'District of Columbia', 'United States', 38.91, -77.04, 'America/New_York', 'washington dc'],
    ['Miami', 'Florida', 'United States', 25.76, -80.19, 'America/New_York', 'miami florida'],
    ['Chicago', 'Illinois', 'United States', 41.88, -87.63, 'America/Chicago', 'chicago'],
    ['Houston', 'Texas', 'United States', 29.76, -95.37, 'America/Chicago', 'houston texas'],
    ['Dallas', 'Texas', 'United States', 32.78, -96.80, 'America/Chicago', 'dallas'],
    ['Denver', 'Colorado', 'United States', 39.74, -104.99, 'America/Denver', 'denver'],
    ['Los Angeles', 'California', 'United States', 34.05, -118.24, 'America/Los_Angeles', 'los angeles la'],
    ['San Jose', 'California', 'United States', 37.34, -121.89, 'America/Los_Angeles', 'san jose'],
    ['San Francisco', 'California', 'United States', 37.77, -122.42, 'America/Los_Angeles', 'san francisco sf'],
    ['Seattle', 'Washington', 'United States', 47.61, -122.33, 'America/Los_Angeles', 'seattle'],
    ['Honolulu', 'Hawaii', 'United States', 21.31, -157.86, 'Pacific/Honolulu', 'honolulu hawaii'],
    ['Toronto', 'Ontario', 'Canada', 43.65, -79.38, 'America/Toronto', 'toronto canada'],
    ['Montreal', 'Quebec', 'Canada', 45.50, -73.57, 'America/Toronto', 'montreal'],
    ['Vancouver', 'British Columbia', 'Canada', 49.28, -123.12, 'America/Vancouver', 'vancouver'],
    ['Mexico City', 'Mexico City', 'Mexico', 19.43, -99.13, 'America/Mexico_City', 'mexico city'],
    ['Bogotá', '', 'Colombia', 4.71, -74.07, 'America/Bogota', 'bogota colombia'],
    ['Lima', '', 'Peru', -12.05, -77.04, 'America/Lima', 'lima peru'],
    ['Santiago', '', 'Chile', -33.45, -70.67, 'America/Santiago', 'santiago chile'],
    ['Buenos Aires', 'Buenos Aires', 'Argentina', -34.60, -58.38, 'America/Argentina/Buenos_Aires', 'buenos aires'],
    ['São Paulo', 'São Paulo', 'Brazil', -23.55, -46.63, 'America/Sao_Paulo', 'sao paulo brazil'],
    ['Rio de Janeiro', 'Rio de Janeiro', 'Brazil', -22.91, -43.17, 'America/Sao_Paulo', 'rio de janeiro'],
    ['Lagos', '', 'Nigeria', 6.52, 3.38, 'Africa/Lagos', 'lagos nigeria'],
    ['Nairobi', '', 'Kenya', -1.29, 36.82, 'Africa/Nairobi', 'nairobi kenya'],
    ['Johannesburg', 'Gauteng', 'South Africa', -26.20, 28.05, 'Africa/Johannesburg', 'johannesburg nam phi'],
    ['Sydney', 'New South Wales', 'Australia', -33.87, 151.21, 'Australia/Sydney', 'sydney uc'],
    ['Melbourne', 'Victoria', 'Australia', -37.81, 144.96, 'Australia/Melbourne', 'melbourne'],
    ['Brisbane', 'Queensland', 'Australia', -27.47, 153.03, 'Australia/Brisbane', 'brisbane'],
    ['Perth', 'Western Australia', 'Australia', -31.95, 115.86, 'Australia/Perth', 'perth'],
    ['Auckland', 'Auckland', 'New Zealand', -36.85, 174.76, 'Pacific/Auckland', 'auckland new zealand'],
  ];
  var LOCATIONS = LOC_RAW.map(function (r) {
    return { city: r[0], admin: r[1], country: r[2], lat: r[3], lon: r[4], tzid: r[5], alias: r[6] || '' };
  });

  // ---------------------------------------------------------------------
  // Astro engine
  // ---------------------------------------------------------------------
  function norm360(x) { return ((x % 360) + 360) % 360; }

  /* ── MÚI GIỜ THEO ĐÚNG NGÀY SINH (2026-07-25) ─────────────────────────
     Trước đây mỗi thành phố mang một offset cứng (`tz: 7`) cộng một
     checkbox DST bấm tay. Sai với mọi ca sinh ở nơi/thời điểm có luật giờ
     khác hôm nay — ví dụ Sài Gòn ~1959–1975 là UTC+8, châu Âu/Mỹ có DST
     đổi theo từng năm. Giờ dùng dữ liệu múi giờ LỊCH SỬ mà chính trình
     duyệt đã có sẵn (ICU/tzdata) qua Intl.DateTimeFormat — không thêm
     thư viện, không tải gì.

     zoneOffsetAtUTC: xem một mốc UTC đó hiện ra mấy giờ ở tzid → hiệu số
     chính là offset đang có hiệu lực tại mốc đó.
     offsetForLocalTime: ta lại có giờ ĐỊA PHƯƠNG chứ không có UTC, nên đoán
     một vòng rồi tính lại — đủ để ra đúng offset kể cả sát ranh giới DST. */
  function zoneOffsetAtUTC(tzid, utcDate) {
    var dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: tzid, hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    var p = {};
    dtf.formatToParts(utcDate).forEach(function (x) { p[x.type] = x.value; });
    var asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, (+p.hour) % 24, +p.minute, +p.second);
    /* Làm tròn về phút: utcDate có thể mang cả milliseconds (vd. new Date()),
       chia thẳng ra giờ sẽ cho 6.99999… → in ra thành "UTC+6:60". */
    return Math.round((asUTC - utcDate.getTime()) / 60000) / 60;
  }
  function offsetForLocalTime(tzid, y, m, d, hh, mm) {
    var guess = Date.UTC(y, m - 1, d, hh, mm);
    var off1 = zoneOffsetAtUTC(tzid, new Date(guess));
    return zoneOffsetAtUTC(tzid, new Date(guess - off1 * 3600000));
  }
  /* Offset dùng cho một địa điểm + một thời điểm sinh. Toạ độ nhập tay
     (không có tzid) vẫn dùng đúng số người dùng khai. */
  function resolveOffset(loc, dateStr, timeStr) {
    if (!loc) return 0;
    if (!loc.tzid) return typeof loc.tz === 'number' ? loc.tz : 0;
    var dp = String(dateStr || '').split('-').map(Number);
    if (dp.length < 3 || !dp[0]) {
      try { return zoneOffsetAtUTC(loc.tzid, new Date()); } catch (e) { return 0; }
    }
    var tp = String(timeStr || '12:00').split(':').map(Number);
    try {
      return offsetForLocalTime(loc.tzid, dp[0], dp[1], dp[2], tp[0] || 0, tp[1] || 0);
    } catch (e) { return typeof loc.tz === 'number' ? loc.tz : 0; }
  }
  function fmtOffset(h) {
    var sign = h < 0 ? '-' : '+';
    var tot = Math.round(Math.abs(h) * 60); /* quy về phút TRƯỚC khi tách giờ/phút */
    var hh = Math.floor(tot / 60), mm = tot % 60;
    return 'UTC' + sign + hh + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '');
  }

  function julianDay(y, m, d, h) {
    if (m <= 2) { y--; m += 12; }
    var A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + h / 24 + B - 1524.5;
  }

  function ayanamsaLahiri(jd) {
    return 23.85306 + 0.013969444 * ((jd - 2451545.0) / 365.2425);
  }

  function meanNodeLongitude(T) {
    return norm360(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + Math.pow(T, 3) / 467441 - Math.pow(T, 4) / 60616000);
  }


  /* TRUE NODE — nút dao động (osculating) tính TRỰC TIẾP từ vector vị trí +
     vận tốc của Mặt Trăng (2026-07-25). Bản cũ dùng mean node + 5 số hạng
     chu kỳ xấp xỉ, đo lại với Swiss Ephemeris thì lệch tới 32.8′ (~0.55°) —
     đủ để nhảy sang Nakshatra khác. Cách này: h = r × v là pháp tuyến mặt
     phẳng quỹ đạo tức thời, hướng nút lên = ẑ × h ⇒ Ω = atan2(hx, −hy).
     Đo lại với Swiss TRUE_NODE: max 0.57′ — ngang mức sai số của cả engine. */
  function trueNodeTropical(date) {
    var st = Astronomy.GeoMoonState(date);
    var r = Astronomy.Ecliptic(new Astronomy.Vector(st.x, st.y, st.z, st.t)).vec;
    var v = Astronomy.Ecliptic(new Astronomy.Vector(st.vx, st.vy, st.vz, st.t)).vec;
    var hx = r.y * v.z - r.z * v.y;
    var hy = r.z * v.x - r.x * v.z;
    return norm360(Math.atan2(hx, -hy) / DEG);
  }

  function tropicalLongitudesAt(date) {
    var out = {};
    out.sun = Astronomy.SunPosition(date).elon;
    out.moon = Astronomy.EclipticGeoMoon(date).lon;
    ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'].forEach(function (b) {
      var vec = Astronomy.GeoVector(b, date, true);
      out[b.toLowerCase()] = Astronomy.Ecliptic(vec).elon;
    });
    return out;
  }

  function ascendantTropical(date, lonDeg, latDeg) {
    var gastHours = Astronomy.SiderealTime(date);
    var lst = norm360(gastHours * 15 + lonDeg);
    var tilt = Astronomy.e_tilt(date);
    var eps = tilt.tobl;
    var ascRad = Math.atan2(
      Math.cos(lst * DEG),
      -(Math.sin(eps * DEG) * Math.tan(latDeg * DEG) + Math.cos(eps * DEG) * Math.sin(lst * DEG))
    );
    return norm360(ascRad / DEG);
  }

  function getSign(deg) { return Math.floor(norm360(deg) / 30); }
  function getNak(deg) { return Math.floor(norm360(deg) / (360 / 27)); }
  function getPada(deg) { return Math.floor((norm360(deg) % (360 / 27)) / (360 / 108)) + 1; }
  function getDegInSign(deg) { return (norm360(deg) % 30).toFixed(1); }

  function dateFromLocal(y, m, d, utcHraw) {
    // utcHraw may be negative or > 24; JS Date normalizes overflow across the day boundary correctly.
    return new Date(Date.UTC(y, m - 1, d, 0, 0, 0) + utcHraw * 3600000);
  }

  function buildChart(f) {
    var parts = f.date.split('-').map(Number);
    var y = parts[0], m = parts[1], d = parts[2];
    var timeStr = f.unknownTime ? '12:00' : f.time;
    var tparts = timeStr.split(':').map(Number);
    var hh = tparts[0], mm = tparts[1];
    /* Offset tính theo ĐÚNG ngày/giờ sinh tại nơi sinh (xem resolveOffset) */
    var tz = resolveOffset(f.location, f.date, timeStr);
    var tzNow = f.location.tzid ? (function () { try { return zoneOffsetAtUTC(f.location.tzid, new Date()); } catch (e) { return tz; } })() : tz;
    var utcHraw = hh - tz + mm / 60;
    var dayShift = Math.floor(utcHraw / 24);
    var utcH = norm360(utcHraw / 15) * 15 / 15; // keep simple; display handled separately
    utcH = ((utcHraw % 24) + 24) % 24;
    var jd = julianDay(y, m, d, utcHraw);
    var date = dateFromLocal(y, m, d, utcHraw);
    var datePrev = new Date(date.getTime() - 12 * 3600 * 1000);
    var dateNext = new Date(date.getTime() + 12 * 3600 * 1000);

    var lonsNow = tropicalLongitudesAt(date);
    var lonsPrev = tropicalLongitudesAt(datePrev);
    var lonsNext = tropicalLongitudesAt(dateNext);

    var T = (jd - 2451545.0) / 36525;
    var meanNode = meanNodeLongitude(T);
    var trueNode = trueNodeTropical(date);
    var rahuTropical = f.nodeType === 'true' ? trueNode : meanNode;
    // node motion is always slightly retrograde on average; approximate speed via 1-day-later mean node for both modes
    var meanNodeNext = meanNodeLongitude(((julianDay(y, m, d, utcHraw + 24) - 2451545.0) / 36525));

    var ay = ayanamsaLahiri(jd);
    var sidereal = function (lon) { return norm360(lon - ay); };

    var order = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];
    var lagnaTropical = f.unknownTime ? null : ascendantTropical(date, f.location.lon, f.location.lat);
    var lagna = lagnaTropical == null ? null : sidereal(lagnaTropical);
    var ls = lagna == null ? null : getSign(lagna);

    var planets = order.map(function (key, i) {
      var lon = sidereal(lonsNow[key]);
      var speed = lonsNext[key] - lonsPrev[key];
      if (speed > 180) speed -= 360; if (speed < -180) speed += 360;
      var signIndex = getSign(lon);
      var house = ls == null ? null : ((signIndex - ls + 12) % 12) + 1;
      return Object.assign({}, PLANET_META[i], {
        longitude: lon, degreeInSign: getDegInSign(lon), signIndex: signIndex, signName: SIGNS[signIndex],
        speed: speed, retrograde: speed < 0, house: house,
        nakshatraIndex: getNak(lon), nakshatraName: NAKSHATRAS[getNak(lon)], pada: getPada(lon)
      });
    });
    // Rahu / Ketu
    var rahuSidereal = sidereal(rahuTropical);
    var ketuSidereal = norm360(rahuSidereal + 180);
    var rahuSpeed = meanNodeNext - meanNode; if (rahuSpeed > 180) rahuSpeed -= 360; if (rahuSpeed < -180) rahuSpeed += 360;
    [rahuSidereal, ketuSidereal].forEach(function (lon, idx) {
      var meta = PLANET_META[7 + idx];
      var signIndex = getSign(lon);
      var house = ls == null ? null : ((signIndex - ls + 12) % 12) + 1;
      planets.push(Object.assign({}, meta, {
        longitude: lon, degreeInSign: getDegInSign(lon), signIndex: signIndex, signName: SIGNS[signIndex],
        speed: rahuSpeed, retrograde: true, house: house,
        nakshatraIndex: getNak(lon), nakshatraName: NAKSHATRAS[getNak(lon)], pada: getPada(lon)
      }));
    });

    var houses = ls == null ? null : Array.from({ length: 12 }, function (_, hIdx) {
      var signIndex = (ls + hIdx) % 12;
      return { house: hIdx + 1, signIndex: signIndex, signName: SIGNS[signIndex], planets: planets.filter(function (p) { return p.house === hIdx + 1; }) };
    });

    var warnings = [];
    if (f.unknownTime) warnings.push('Không rõ giờ sinh — dùng 12:00 quy ước, bỏ qua Lagna/houses');
    if (y < 1900 || y > 2100) warnings.push('Năm sinh ngoài khoảng 1900–2100 — độ chính xác có thể giảm nhẹ');
    if (f.location.tzid && Math.abs(tz - tzNow) > 0.01) {
      warnings.push('Múi giờ tại nơi sinh vào ' + f.date + ' là ' + fmtOffset(tz) + ', khác với ' + fmtOffset(tzNow) + ' của hôm nay — đã dùng giá trị lịch sử');
    }
    /* Việt Nam trước 13/6/1975: Bắc và Nam từng dùng hai múi giờ khác nhau
       (Nam +8, Bắc +7 trong nhiều giai đoạn), mà dữ liệu tzdata chỉ có MỘT
       vùng Asia/Ho_Chi_Minh đi theo lịch sử miền Nam. Không tự đoán thay
       người dùng — nói rõ và mời nhập tay nếu họ biết khác. */
    if (f.location.country === 'Việt Nam' && (y < 1975 || (y === 1975 && m <= 6))) {
      warnings.push('Sinh tại Việt Nam trước 13/6/1975: hai miền từng dùng múi giờ khác nhau — nếu bạn biết chắc múi giờ nơi mình sinh, hãy nhập toạ độ + offset thủ công');
    }

    var ascInfoForVarga = ls == null ? null : { signIndex: ls, degreeInSign: getDegInSign(lagna) };

    return {
      metadata: { engine: 'Astronomy Engine (VSOP87 / ELP2000)', zodiac: 'sidereal', ayanamsa: 'Lahiri', ayanamsaDegrees: ay, houseSystem: 'Whole Sign', nodeType: f.nodeType, julianDayUT: jd },
      input: { name: f.name, localDate: f.date, localTime: timeStr, location: f.location, utcOffsetUsed: tz, utcOffsetToday: tzNow, tzid: f.location.tzid || null, utcHour: utcH, dayShift: dayShift, warnings: warnings },
      ascendant: lagna == null ? null : { longitude: lagna, degreeInSign: getDegInSign(lagna), signIndex: ls, signName: SIGNS[ls], nakshatra: NAKSHATRAS[getNak(lagna)], pada: getPada(lagna) },
      planets: planets, houses: houses,
      /* Daśā chỉ cần vị trí Mặt Trăng — luôn tính được, kể cả khi không rõ
         giờ sinh (khi đó Mặt Trăng có thể lệch nên có cảnh báo riêng). */
      dasha: calcDasha(planets[1].longitude, date),
      /* D9/D10 (2026-07-25) — xem hàm buildVargaChart() ngay bên dưới. */
      d9: buildVargaChart(9, ascInfoForVarga, planets),
      d10: buildVargaChart(10, ascInfoForVarga, planets)
    };
  }

  /* ══ VARGA (BIỂU ĐỒ PHÂN CHIA) — D9 Navāṁśa & D10 Daśāṁśa (2026-07-25) ═══
     Quy tắc kinh điển (Parāśara). D9: chia mỗi cung 30° thành 9 phần
     3°20′. Vì 3 nhóm cách (chuyển động/cố định/hai chiều) lặp đúng chu kỳ
     3 cung, toàn vòng hoàng đạo hoá ra chia đều thành 108 phần liên tục kể
     từ 0° Bạch Dương — nên công thức rút gọn đúng cho mọi cung:
       navamsa = floor(kinh độ trong cung × 9/30) rồi cộng dồn theo cung.
     D10: KHÔNG có tính rút gọn liên tục đó. Theo Parāśara: cung "lẻ" (số
     thứ tự 1,3,5… tức 0-indexed CHẴN: Bạch Dương, Song Tử, Sư Tử…) đếm
     phần từ chính cung đó; cung "chẵn" (0-indexed LẺ: Kim Ngưu, Cự Giải…)
     đếm phần từ cung thứ 9 tính từ nó (offset +8, coi bản thân là phần 1).
     Đã đối chiếu hai công thức với các bảng ví dụ kinh điển hay được trích
     (vd: Kim Ngưu 0° D10 khởi ở Ma Kết) trước khi đưa vào đây. */
  function vargaSignIndex(kind, signIndex, degInSign) {
    if (kind === 9) {
      var pada = Math.floor(degInSign / (30 / 9));
      return (signIndex * 9 + pada) % 12;
    }
    if (kind === 10) {
      var part = Math.floor(degInSign / 3);
      var start = (signIndex % 2 === 0) ? signIndex : (signIndex + 8) % 12;
      return (start + part) % 12;
    }
    return signIndex;
  }

  /* ascInfo: {signIndex, degreeInSign} của Lagna D1, hoặc null nếu không rõ
     giờ sinh (khi đó biểu đồ phân chia vẫn tính được vị trí hành tinh, chỉ
     thiếu Lagna/nhà — cùng quy ước với D1). planetsD1: mảng planets gốc. */
  function buildVargaChart(kind, ascInfo, planetsD1) {
    var ascSign = ascInfo == null ? null : vargaSignIndex(kind, ascInfo.signIndex, Number(ascInfo.degreeInSign));
    var planets = planetsD1.map(function (p) {
      var vsi = vargaSignIndex(kind, p.signIndex, Number(p.degreeInSign));
      var house = ascSign == null ? null : ((vsi - ascSign + 12) % 12) + 1;
      return Object.assign({}, p, {
        d1SignIndex: p.signIndex, signIndex: vsi, signName: SIGNS[vsi],
        house: house,
        /* Vargottama: cùng cung ở cả D1 lẫn biểu đồ phân chia này — truyền
           thống xem là dấu của sự ổn định/bền hơn cho chủ đề của hành tinh đó. */
        vargottama: vsi === p.signIndex
      });
    });
    var houses = ascSign == null ? null : Array.from({ length: 12 }, function (_, hIdx) {
      var si = (ascSign + hIdx) % 12;
      return { house: hIdx + 1, signIndex: si, signName: SIGNS[si], planets: planets.filter(function (p) { return p.house === hIdx + 1; }) };
    });
    return {
      kind: kind,
      ascendant: ascSign == null ? null : { signIndex: ascSign, signName: SIGNS[ascSign] },
      planets: planets, houses: houses
    };
  }

  /* ══ VIMŚOTTARĪ DAŚĀ (2026-07-25) ═══════════════════════════════════
     Lớp "khi nào" của Jyotiṣa — thứ làm Vệ Đà khác chiêm tinh phương Tây,
     và là phần bản đầu ghi rõ "chưa có". Tính được 100% từ vị trí Mặt Trăng:
     Mặt Trăng đang ở Nakshatra nào, đã đi qua bao nhiêu phần của Nakshatra
     đó, thì phần còn lại chính là phần còn lại của đại vận đầu tiên.
     Vòng 9 chủ vận cộng lại đúng 120 năm. Antardaśā (tiểu vận) trong một
     đại vận của chủ A dài: nămA × nămB / 120.
     Quy ước năm: 365.2425 ngày (năm dương lịch trung bình) — một số phái
     dùng năm 360 ngày, khi đó mốc sẽ lệch vài tháng ở các vận xa. */
  var DASHA_ORDER = ['ketu', 'venus', 'sun', 'moon', 'mars', 'rahu', 'jupiter', 'saturn', 'mercury'];
  var DASHA_YEARS = { ketu: 7, venus: 20, sun: 6, moon: 10, mars: 7, rahu: 18, jupiter: 16, saturn: 19, mercury: 17 };
  var DASHA_VIET = { ketu: 'Ketu', venus: 'Sao Kim', sun: 'Mặt Trời', moon: 'Mặt Trăng', mars: 'Sao Hỏa', rahu: 'Rahu', jupiter: 'Sao Mộc', saturn: 'Sao Thổ', mercury: 'Sao Thủy' };
  var YEAR_MS = 365.2425 * 24 * 3600 * 1000;

  function addYears(date, years) { return new Date(date.getTime() + years * YEAR_MS); }

  function calcDasha(moonLongitude, birthDate) {
    var NAK = 360 / 27;
    var nakIdx = Math.floor(norm360(moonLongitude) / NAK);
    var elapsed = (norm360(moonLongitude) % NAK) / NAK;      /* 0..1 trong Nakshatra */
    var startIdx = nakIdx % 9;                                /* chủ Nakshatra = chủ đại vận đầu */
    var seq = [], cursor = birthDate;
    for (var k = 0; k < 9; k++) {
      var lord = DASHA_ORDER[(startIdx + k) % 9];
      var full = DASHA_YEARS[lord];
      var span = k === 0 ? full * (1 - elapsed) : full;       /* vận đầu chỉ còn phần dư */
      var end = addYears(cursor, span);
      seq.push({ lord: lord, viet: DASHA_VIET[lord], start: cursor, end: end, years: span, fullYears: full, partial: k === 0 });
      cursor = end;
    }
    return { balanceYears: DASHA_YEARS[DASHA_ORDER[startIdx]] * (1 - elapsed), sequence: seq, nakshatraIndex: nakIdx };
  }

  /* Tiểu vận trong một đại vận: cùng thứ tự 9 chủ, bắt đầu từ chính chủ đại
     vận đó. Với đại vận đầu (bị cắt dở) ta vẫn dựng đủ 9 tiểu vận theo tỉ lệ
     của đại vận ĐẦY ĐỦ rồi cắt bỏ phần đã trôi qua trước lúc sinh — đúng
     cách các phần mềm Jyotiṣa vẫn làm. */
  function calcAntardasha(maha) {
    var i0 = DASHA_ORDER.indexOf(maha.lord), out = [];
    var fullStart = maha.partial ? addYears(maha.end, -maha.fullYears) : maha.start;
    var cursor = fullStart;
    for (var k = 0; k < 9; k++) {
      var lord = DASHA_ORDER[(i0 + k) % 9];
      var span = maha.fullYears * DASHA_YEARS[lord] / 120;
      var end = addYears(cursor, span);
      if (end > maha.start) {
        out.push({ lord: lord, viet: DASHA_VIET[lord], start: new Date(Math.max(cursor.getTime(), maha.start.getTime())), end: end, years: span });
      }
      cursor = end;
    }
    return out;
  }

  function activeAt(list, when) {
    for (var i = 0; i < list.length; i++) if (when >= list[i].start && when < list[i].end) return list[i];
    return null;
  }

  /* ── VƯỢNG / HÃM ────────────────────────────────────────────────────── */
  function dignityOf(planetId, signIndex) {
    var C = window.VEDIC_CONTENT;
    if (!C || !C.dignity || !C.dignity[planetId]) return null;
    var d = C.dignity[planetId];
    if (d.exalt === signIndex) return { key: 'exalt', label: 'vượng', note: 'ở cung vượng — truyền thống xem là nơi hành tinh này phát huy dễ nhất' };
    if (d.debil === signIndex) return { key: 'debil', label: 'hãm', note: 'ở cung hãm — không phải "xấu", mà là nơi nó phải làm việc vất vả hơn để nói được điều của mình' };
    if (d.mool.indexOf(signIndex) !== -1) return { key: 'mool', label: 'moolatrikona', note: 'ở vùng gốc (moolatrikona) — rất có sức' };
    if (d.own.indexOf(signIndex) !== -1) return { key: 'own', label: 'về nhà mình', note: 'ở cung do chính nó cai quản — thoải mái, đúng chất' };
    return null;
  }

  function calcAspects(planets) {
    var special = { 2: [4, 8], 4: [5, 9], 6: [3, 10], 7: [5, 9], 8: [5, 9] };
    var out = [];
    for (var i = 0; i < 9; i++) {
      var si = planets[i].signIndex; var houses = [7]; if (special[i]) houses = houses.concat(special[i]);
      for (var j = 0; j < 9; j++) {
        if (i === j) continue;
        var diff = ((planets[j].signIndex - si) % 12 + 12) % 12 + 1;
        if (houses.indexOf(diff) !== -1) out.push({ from: i, to: j, house: diff });
      }
    }
    return out;
  }

  // ---------------------------------------------------------------------
  // UI controller
  // ---------------------------------------------------------------------
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function stripDia(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function qs(root, sel) { return root.querySelector(sel); }
  function qsa(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

  function init(root) {
    var state = {
      step: 0, unknownTime: false, selectedLocation: null, showAdvancedLoc: false,
      nodeType: 'mean',
      formName: '', formDate: '', formTime: '',
      isComputing: false, computeStageIdx: 0,
      hasResults: false, activeView: 'chart', showDiagnostics: false, showLegend: false,
      selectedHouse: null, nakPlanetId: 'moon'
    };
    var chart = null, shareLink = null, qTimer = null, seqTimer = null;

    var el = {
      app: root,
      dots: [qs(root, '[data-dot="0"]'), qs(root, '[data-dot="1"]'), qs(root, '[data-dot="2"]')],
      lines: [qs(root, '[data-line="0"]'), qs(root, '[data-line="1"]')],
      computing: qs(root, '#vdComputing'), stageText: qs(root, '#vdStageText'),
      steps: [qs(root, '#vdStep0'), qs(root, '#vdStep1'), qs(root, '#vdStep2')],
      nav: qs(root, '#vdNav'), back: qs(root, '#vdBack'), next: qs(root, '#vdNext'), submit: qs(root, '#vdSubmit'),
      formError: qs(root, '#vdFormError'),
      name: qs(root, '#vdName'), date: qs(root, '#vdDate'), time: qs(root, '#vdTime'), unknownTime: qs(root, '#vdUnknownTime'),
      locQuery: qs(root, '#vdLocQuery'), suggestions: qs(root, '#vdSuggestions'),
      useCurrentLoc: qs(root, '#vdUseCurrentLoc'), toggleAdvanced: qs(root, '#vdToggleAdvanced'), locStatus: qs(root, '#vdLocStatus'),
      advancedLoc: qs(root, '#vdAdvancedLoc'), lat: qs(root, '#vdLat'), lon: qs(root, '#vdLon'), offset: qs(root, '#vdOffset'), useManual: qs(root, '#vdUseManual'),
      selectedLocBox: qs(root, '#vdSelectedLocation'), locSummary: qs(root, '#vdLocSummary'),
      nodeType: qs(root, '#vdNodeType'),
      localTimeLabel: qs(root, '#vdLocalTimeLabel'), utcTimeLabel: qs(root, '#vdUtcTimeLabel'), utcNote: qs(root, '#vdUtcNote'),
      results: qs(root, '#vdResults'), diagPills: qs(root, '#vdDiagPills'), diagToggle: qs(root, '#vdDiagToggle'),
      diagnostics: qs(root, '#vdDiagnostics'),
      unknownWarning: qs(root, '#vdUnknownWarning'),
      shareBtn: qs(root, '#vdShareBtn'), pdfBtn: qs(root, '#vdPdfBtn'), copyBtn: qs(root, '#vdCopyBtn'), shareMsg: qs(root, '#vdShareMsg'),
      tabs: qsa(root, '[data-vd-view]'), legendToggle: qs(root, '#vdLegendToggle'), legend: qs(root, '#vdLegend'),
      resultsBody: qs(root, '#vdResultsBody'),
      houseOverlay: qs(root, '#vdHouseOverlay'), housePanel: qs(root, '#vdHousePanel')
    };

    function reducedMotion() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('no-motion'); } catch (e) { return false; } }

    // ---- step dots ----
    function renderDots() {
      for (var i = 0; i < 3; i++) {
        var d = el.dots[i]; if (!d) continue;
        d.classList.toggle('vd-dot-done', state.step > i);
        d.classList.toggle('vd-dot-active', state.step === i);
      }
      for (var j = 0; j < 2; j++) { if (el.lines[j]) el.lines[j].classList.toggle('vd-line-done', state.step > j); }
    }

    // ---- step visibility ----
    function renderSteps() {
      el.computing.hidden = !state.isComputing;
      var showForm = !state.isComputing;
      el.steps.forEach(function (s, i) { if (s) s.hidden = !(showForm && state.step === i); });
      el.nav.hidden = state.isComputing;
      el.back.style.visibility = state.step === 0 ? 'hidden' : 'visible';
      el.next.hidden = state.step === 2;
      el.submit.hidden = state.step !== 2;
      renderDots();
    }

    function setError(msg) { el.formError.textContent = msg || ''; el.formError.hidden = !msg; }

    // ---- location search ----
    function renderSuggestions(list) {
      if (!list.length) { el.suggestions.hidden = true; el.suggestions.innerHTML = ''; return; }
      el.suggestions.hidden = false;
      el.suggestions.innerHTML = list.map(function (s) {
        return '<div class="vd-suggestion" data-idx="' + s.idx + '">' +
          '<div class="vd-sug-city">' + esc(s.loc.city) + '</div>' +
          '<div class="vd-sug-meta">' + esc(s.loc.admin ? s.loc.admin + ', ' : '') + esc(s.loc.country) + ' · ' + s.loc.lat.toFixed(2) + ',' + s.loc.lon.toFixed(2) + ' · ' + fmtOffset(resolveOffset(s.loc, state.formDate, state.formTime)) + '</div>' +
        '</div>';
      }).join('');
    }

    function renderSelectedLocation() {
      var loc = state.selectedLocation;
      el.selectedLocBox.hidden = !loc;
      if (loc) {
        el.locSummary.innerHTML = '<span class="vd-loc-city">' + esc(loc.city) + '</span><span class="vd-loc-sub"> — ' + esc(loc.admin || '—') + ', ' + esc(loc.country || '—') + '</span><div class="vd-loc-coords">Lat ' + loc.lat.toFixed(3) + ' · Lon ' + loc.lon.toFixed(3) + ' · ' + fmtOffset(resolveOffset(loc, state.formDate, state.formTime)) + (loc.tzid ? ' · ' + esc(loc.tzid) : '') + '</div>';
      }
    }

    el.locQuery.addEventListener('input', function (e) {
      var q = e.target.value;
      clearTimeout(qTimer);
      qTimer = setTimeout(function () {
        if (q.trim().length < 2) { renderSuggestions([]); return; }
        var nq = stripDia(q);
        var scored = LOCATIONS.map(function (loc, idx) {
          var hay = stripDia(loc.city + ' ' + loc.admin + ' ' + loc.country + ' ' + (loc.alias || ''));
          var pos = hay.indexOf(nq);
          return pos === -1 ? null : { idx: idx, loc: loc, score: pos };
        }).filter(Boolean).sort(function (a, b) { return a.score - b.score; }).slice(0, 7);
        renderSuggestions(scored);
      }, 250);
    });

    el.suggestions.addEventListener('click', function (e) {
      var item = e.target.closest('.vd-suggestion'); if (!item) return;
      var loc = LOCATIONS[Number(item.dataset.idx)];
      el.locQuery.value = loc.city;
      state.selectedLocation = loc;
      renderSuggestions([]);
      el.locStatus.textContent = '';
      renderSelectedLocation();
      renderUtcPreview();
    });

    el.useCurrentLoc.addEventListener('click', function () {
      if (!navigator.geolocation) { el.locStatus.textContent = 'Trình duyệt không hỗ trợ định vị.'; return; }
      el.locStatus.textContent = 'Đang xin quyền định vị…';
      navigator.geolocation.getCurrentPosition(function (pos) {
        /* Lấy TÊN múi giờ của trình duyệt (không phải offset hiện tại) để
           offset vẫn được tính lại theo đúng ngày sinh. */
        var tzid = null;
        try { tzid = Intl.DateTimeFormat().resolvedOptions().timeZone || null; } catch (e) {}
        var tz = -new Date().getTimezoneOffset() / 60;
        state.selectedLocation = { city: 'Vị trí hiện tại', admin: '', country: '', lat: +pos.coords.latitude.toFixed(4), lon: +pos.coords.longitude.toFixed(4), tz: tz, tzid: tzid };
        el.locStatus.textContent = '✓ Đã lấy vị trí (múi giờ ' + (tzid || 'theo trình duyệt') + ').';
        renderSelectedLocation();
        renderUtcPreview();
      }, function () { el.locStatus.textContent = 'Không thể lấy vị trí — vui lòng tìm kiếm thủ công.'; });
    });

    el.toggleAdvanced.addEventListener('click', function () { state.showAdvancedLoc = !state.showAdvancedLoc; el.advancedLoc.hidden = !state.showAdvancedLoc; });

    el.useManual.addEventListener('click', function () {
      var lat = parseFloat(el.lat.value), lon = parseFloat(el.lon.value), tz = parseFloat(el.offset.value);
      if (isNaN(lat) || isNaN(lon) || isNaN(tz)) { el.locStatus.textContent = 'Nhập đủ latitude, longitude và UTC offset.'; return; }
      /* Không gán tzid: người dùng đã khai offset, tôn trọng đúng số đó. */
      state.selectedLocation = { city: 'Toạ độ thủ công', admin: '', country: '', lat: lat, lon: lon, tz: tz };
      el.locStatus.textContent = '';
      renderSelectedLocation();
      renderUtcPreview();
    });

    // ---- step 0/2 inputs ----
    el.name.addEventListener('input', function (e) { state.formName = e.target.value; });
    el.date.addEventListener('input', function (e) { state.formDate = e.target.value; renderUtcPreview(); });
    el.time.addEventListener('input', function (e) { state.formTime = e.target.value; renderUtcPreview(); });
    el.unknownTime.addEventListener('change', function (e) {
      state.unknownTime = e.target.checked;
      el.time.disabled = state.unknownTime;
      el.time.style.opacity = state.unknownTime ? 0.4 : 1;
      renderUtcPreview();
    });
    el.nodeType.addEventListener('change', function (e) { state.nodeType = e.target.value; });

    function renderUtcPreview() {
      var loc = state.selectedLocation, dateStr = state.formDate;
      if (!dateStr || !loc) { el.localTimeLabel.textContent = '—'; el.utcTimeLabel.textContent = '—'; el.utcNote.textContent = 'Chọn ngày, giờ và nơi sinh để xem quy đổi.'; return; }
      var t = state.unknownTime ? '12:00' : (state.formTime || '00:00');
      var parts = t.split(':').map(Number), hh = parts[0], mm = parts[1];
      var tz = resolveOffset(loc, dateStr, t);
      var utcHraw = hh - tz + mm / 60, dayShift = Math.floor(utcHraw / 24), utcH = ((utcHraw % 24) + 24) % 24;
      var uh = Math.floor(utcH), um = Math.round((utcH - uh) * 60);
      el.localTimeLabel.textContent = t + ' (' + dateStr + ')';
      el.utcTimeLabel.textContent = (uh < 10 ? '0' : '') + uh + ':' + (um < 10 ? '0' : '') + um + ' UTC';
      /* Nói rõ offset đã dùng, và nói rõ khi nó KHÁC offset của nơi đó hôm nay
         — đây chính là chỗ hay sai nhất của mọi công cụ lá số. */
      var note = 'Múi giờ đã dùng: ' + fmtOffset(tz) + (loc.tzid ? ' (' + loc.tzid + ', theo đúng ngày sinh)' : ' (bạn tự khai)') + '.';
      if (loc.tzid) {
        var nowOff = tz;
        try { nowOff = zoneOffsetAtUTC(loc.tzid, new Date()); } catch (e) { nowOff = tz; }
        if (Math.abs(nowOff - tz) > 0.01) note += ' Khác ' + fmtOffset(nowOff) + ' của hôm nay — đã lấy giá trị lịch sử.';
      }
      if (dayShift !== 0) note += ' Ngày UTC lệch ' + (dayShift > 0 ? '+1' : '-1') + ' so với ngày địa phương.';
      el.utcNote.textContent = note;
    }

    // ---- wizard nav ----
    el.next.addEventListener('click', function () {
      if (state.step === 0) {
        if (!state.formDate) { setError('Vui lòng nhập ngày sinh.'); return; }
        if (!state.unknownTime && !state.formTime) { setError('Vui lòng nhập giờ sinh, hoặc chọn "Không rõ giờ sinh".'); return; }
      }
      if (state.step === 1 && !state.selectedLocation) { setError('Vui lòng chọn nơi sinh.'); return; }
      setError(''); state.step = Math.min(2, state.step + 1); renderSteps();
    });
    el.back.addEventListener('click', function () { setError(''); state.step = Math.max(0, state.step - 1); renderSteps(); });
    el.submit.addEventListener('click', function () {
      if (!state.selectedLocation) { setError('Vui lòng chọn nơi sinh.'); return; }
      setError(''); state.isComputing = true; state.computeStageIdx = 0; renderSteps();
      runComputeSequence();
    });

    function runComputeSequence() {
      var i = 0;
      function step() {
        if (i >= STAGES.length) { finalizeChart(); return; }
        el.stageText.textContent = STAGES[i];
        i++;
        seqTimer = setTimeout(step, reducedMotion() ? 20 : 380);
      }
      step();
    }

    function finalizeChart() {
      var f = {
        name: state.formName || '', date: state.formDate || '', time: state.formTime || '00:00',
        unknownTime: state.unknownTime, location: state.selectedLocation, nodeType: state.nodeType
      };
      if (!f.date || !f.location) return;
      try {
        chart = buildChart(f);
      } catch (err) {
        console.error('Vedic chart build error', err);
        state.isComputing = false; renderSteps();
        setError('Có lỗi khi tính bản đồ sao — vui lòng kiểm tra lại ngày/giờ/nơi sinh.');
        return;
      }
      state.isComputing = false; state.hasResults = true; state.activeView = 'chart'; state.selectedHouse = null;
      renderSteps();
      el.results.hidden = false;
      renderDiagnostics();
      el.unknownWarning.hidden = !state.unknownTime;
      renderResultsBody();
      buildShareLink(f);
      el.results.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }

    function buildShareLink(f) {
      try {
        var u = new URL(window.location.href); u.hash = '#vedic';
        var params = new URLSearchParams(u.search);
        ['vdbn', 'vdbd', 'vdbt', 'vdla', 'vdlo', 'vdtz', 'vdlc', 'vdnt', 'vddst', 'vdtzid'].forEach(function (k) { params.delete(k); });
        params.set('vdbn', f.name); params.set('vdbd', f.date); params.set('vdbt', f.time);
        params.set('vdla', f.location.lat); params.set('vdlo', f.location.lon);
        params.set('vdtz', resolveOffset(f.location, f.date, f.time));
        if (f.location.tzid) params.set('vdtzid', f.location.tzid);
        params.set('vdlc', f.location.city); params.set('vdnt', f.nodeType);
        u.search = params.toString();
        shareLink = u.toString();
      } catch (e) { shareLink = window.location.href; }
    }

    // ---- diagnostics ----
    function renderDiagnostics() {
      if (!chart) return;
      var m = chart.metadata, inp = chart.input;
      var uh = Math.floor(inp.utcHour), um = Math.round((inp.utcHour - uh) * 60);
      var utcStr = (uh < 10 ? '0' : '') + uh + ':' + (um < 10 ? '0' : '') + um;
      el.diagPills.innerHTML =
        '<span class="vd-pill">' + esc(m.engine) + '</span>' +
        '<span class="vd-pill">Ayanāṁśa ' + m.ayanamsaDegrees.toFixed(3) + '°</span>' +
        '<span class="vd-pill">UTC ' + utcStr + '</span>';
      var nodeLabel = m.nodeType === 'true' ? 'True Node (nút dao động, tính từ vector vị trí+vận tốc Mặt Trăng)' : 'Mean Node (nút trung bình, Meeus)';
      el.diagnostics.innerHTML =
        '<div>engine: ' + esc(m.engine) + '</div>' +
        '<div>zodiac: sidereal · ayanamsa: Lahiri (' + m.ayanamsaDegrees.toFixed(3) + '°) · houseSystem: Whole Sign · nodeType: ' + esc(nodeLabel) + '</div>' +
        '<div>julianDayUT: ' + m.julianDayUT.toFixed(5) + '</div>' +
        '<div>input local: ' + esc(inp.localDate + ' ' + inp.localTime) + ' · resolvedUtcOffset: ' + fmtOffset(inp.utcOffsetUsed) + (inp.tzid ? ' (' + esc(inp.tzid) + ', tra theo ngày sinh)' : ' (khai thủ công)') + (inp.utcOffsetToday != null && Math.abs(inp.utcOffsetToday - inp.utcOffsetUsed) > 0.01 ? ' · hôm nay nơi này là ' + fmtOffset(inp.utcOffsetToday) : '') + '</div>' +
        '<div>warnings: ' + (inp.warnings.length ? esc(inp.warnings.join('; ')) : 'không có') + '</div>';
    }
    el.diagToggle.addEventListener('click', function () { state.showDiagnostics = !state.showDiagnostics; el.diagnostics.hidden = !state.showDiagnostics; el.diagToggle.textContent = state.showDiagnostics ? 'Ẩn kỹ thuật' : 'Chi tiết kỹ thuật'; });
    el.legendToggle.addEventListener('click', function () { state.showLegend = !state.showLegend; el.legend.hidden = !state.showLegend; });

    el.shareBtn.addEventListener('click', function () {
      var link = shareLink || window.location.href;
      function done() { el.shareMsg.textContent = '✓ Đã sao chép liên kết chia sẻ!'; el.shareMsg.style.color = '#7fd68a'; }
      if (navigator.share) { navigator.share({ title: 'Bản đồ sao Vệ Đà', url: link }).then(done).catch(function () {}); }
      else if (navigator.clipboard) { navigator.clipboard.writeText(link).then(done).catch(function () { el.shareMsg.textContent = link; el.shareMsg.style.color = 'var(--amber2)'; }); }
      else { el.shareMsg.textContent = link; el.shareMsg.style.color = 'var(--amber2)'; }
    });
    /* ══ "MANG ĐI HỎI TIẾP" (2026-07-25, theo gợi ý của Ali) ═══════════
       Ali: "người bạn của chúng ta có thể dùng pdf, và tra thêm với các
       chuyên gia và AI sàng lọc thông tin cho chính mình."
       ⇒ Bản in phải TỰ ĐỨNG ĐƯỢC MỘT MÌNH. Một người thầy Jyotish hay một
       AI chỉ luận đúng khi biết CHÍNH XÁC ta đã dùng thông số nào: giờ UTC
       thật, toạ độ, ayanāṁśa, hệ nhà, loại node. Thiếu mấy thứ đó là mỗi
       người dựng ra một lá số khác nhau rồi tranh nhau xem ai đúng.
       Nên có 4 phần: (1) số liệu thô tới giây cung, (2) câu nên hỏi người
       thầy, (3) khối dán sẵn cho AI, (4) bản này CHƯA tính gì. */

    /* Kinh độ dạng 12°34′56″ — chuẩn mà giới chiêm tinh vẫn đọc */
    function dms(deg) {
      var d = Math.floor(deg), mf = (deg - d) * 60, m = Math.floor(mf), sec = Math.round((mf - m) * 60);
      if (sec === 60) { sec = 0; m += 1; }
      if (m === 60) { m = 0; d += 1; }
      return d + '°' + (m < 10 ? '0' : '') + m + '′' + (sec < 10 ? '0' : '') + sec + '″';
    }
    function utcStamp() {
      var inp = chart.input;
      var uh = Math.floor(inp.utcHour), um = Math.round((inp.utcHour - uh) * 60);
      var dp = inp.localDate.split('-').map(Number);
      var d = new Date(Date.UTC(dp[0], dp[1] - 1, dp[2] + (inp.dayShift || 0)));
      return d.getUTCFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + d.getUTCDate()).slice(-2) +
        ' ' + (uh < 10 ? '0' : '') + uh + ':' + (um < 10 ? '0' : '') + um + ' UTC';
    }

    /* Khối văn bản thuần — dùng cho cả nút "Chép dữ liệu" và phụ lục bản in.
       Cố ý viết dạng nhãn: giá trị, mỗi dòng một ý: dễ đọc cho người, dễ
       phân tích cho máy, và dán vào đâu cũng không vỡ định dạng. */
    function chartDataText() {
      var inp = chart.input, m = chart.metadata;
      var L = [];
      L.push('LÁ SỐ VỆ ĐÀ (JYOTIṢA) — DỮ LIỆU GỐC');
      L.push('');
      L.push('NGƯỜI: ' + (inp.name || '(không ghi tên)'));
      L.push('SINH (giờ địa phương): ' + inp.localDate + ' ' + inp.localTime + (state.unknownTime ? '  [KHÔNG RÕ GIỜ — dùng 12:00 quy ước]' : ''));
      L.push('SINH (giờ UTC):        ' + utcStamp());
      L.push('MÚI GIỜ ĐÃ DÙNG:       ' + fmtOffset(inp.utcOffsetUsed) + (inp.tzid ? '  (' + inp.tzid + ', tra theo đúng ngày sinh)' : '  (khai thủ công)'));
      L.push('NƠI SINH:              ' + [inp.location.city, inp.location.admin, inp.location.country].filter(Boolean).join(', '));
      L.push('TOẠ ĐỘ:                ' + inp.location.lat.toFixed(4) + ', ' + inp.location.lon.toFixed(4));
      L.push('');
      L.push('HỆ TÍNH');
      L.push('  vòng hoàng đạo: sidereal');
      L.push('  ayanāṁśa:       Lahiri = ' + m.ayanamsaDegrees.toFixed(4) + '° (' + dms(m.ayanamsaDegrees) + ')');
      L.push('  hệ nhà:         Whole Sign');
      L.push('  node:           ' + (m.nodeType === 'true' ? 'True Node (nút dao động)' : 'Mean Node (nút trung bình)'));
      L.push('  ephemeris:      ' + m.engine);
      L.push('  Julian Day UT:  ' + m.julianDayUT.toFixed(6));
      L.push('');
      if (chart.ascendant) {
        L.push('LAGNA (cung mọc): ' + SIGNS[chart.ascendant.signIndex] + ' ' + dms(chart.ascendant.longitude % 30) +
          '  · kinh độ sidereal ' + chart.ascendant.longitude.toFixed(4) + '°  · Nakshatra ' + chart.ascendant.nakshatra + ' pada ' + chart.ascendant.pada);
      } else {
        L.push('LAGNA: không tính (không rõ giờ sinh)');
      }
      L.push('');
      L.push('HÀNH TINH (kinh độ sidereal · ℞ = nghịch hành)');
      chart.planets.forEach(function (pl) {
        L.push('  ' + (pl.viet + '                ').slice(0, 12) +
          ' ' + (SIGNS[pl.signIndex] + '                        ').slice(0, 24) +
          ' ' + ('         ' + dms(pl.longitude % 30)).slice(-10) + /* căn phải cho thẳng cột */
          ' | λ=' + ('        ' + pl.longitude.toFixed(4)).slice(-8) + '°' +
          ' | nhà ' + (pl.house || '—') +
          ' | ' + pl.nakshatraName + ' pada ' + pl.pada +
          /* ký hiệu ℞ thay vì chữ "nghịch hành" để dòng không bị quấn khi in */
          (pl.retrograde ? ' | ℞' : ''));
      });
      L.push('');
      if (chart.houses) {
        L.push('CÁC NHÀ (Whole Sign — cung chứa Lagna là nhà 1)');
        chart.houses.forEach(function (hh) {
          L.push('  nhà ' + (hh.house < 10 ? ' ' : '') + hh.house + '  ' + (SIGNS[hh.signIndex] + '                        ').slice(0, 24) +
            (hh.planets.length ? hh.planets.map(function (x) { return x.viet; }).join(', ') : '—'));
        });
        L.push('');
      }
      if (chart.dasha) {
        var now = new Date(), maha = activeAt(chart.dasha.sequence, now);
        L.push('VIMŚOTTARĪ DAŚĀ (1 năm = 365,2425 ngày)');
        L.push('  còn lại lúc sinh: ' + chart.dasha.balanceYears.toFixed(3) + ' năm của ' + chart.dasha.sequence[0].viet);
        chart.dasha.sequence.forEach(function (d) {
          L.push('  ' + (d.viet + '           ').slice(0, 11) + fmtDate(d.start) + ' → ' + fmtDate(d.end) + '  (' + d.years.toFixed(2) + ' năm)' + (d === maha ? '   ← đang chạy' : ''));
        });
        if (maha) {
          var antars = calcAntardasha(maha), antar = activeAt(antars, now);
          L.push('  tiểu vận trong đại vận ' + maha.viet + ':');
          antars.forEach(function (a) {
            L.push('    ' + (a.viet + '           ').slice(0, 11) + fmtDate(a.start) + ' → ' + fmtDate(a.end) + (a === antar ? '   ← đang chạy' : ''));
          });
        }
        L.push('');
      }
      if (chart.d9 && chart.d9.ascendant) {
        L.push('NAVĀṀŚA (D9) — Lagna: ' + SIGNS[chart.d9.ascendant.signIndex]);
        chart.d9.planets.forEach(function (pl) {
          L.push('  ' + (pl.viet + '                ').slice(0, 12) + ' ' + (SIGNS[pl.signIndex] + '                        ').slice(0, 24) +
            (pl.house ? ' | nhà ' + pl.house : '') + (pl.vargottama ? ' | vargottama' : ''));
        });
        L.push('');
      }
      if (chart.d10 && chart.d10.ascendant) {
        L.push('DAŚĀṀŚA (D10) — Lagna: ' + SIGNS[chart.d10.ascendant.signIndex]);
        chart.d10.planets.forEach(function (pl) {
          L.push('  ' + (pl.viet + '                ').slice(0, 12) + ' ' + (SIGNS[pl.signIndex] + '                        ').slice(0, 24) +
            (pl.house ? ' | nhà ' + pl.house : '') + (pl.vargottama ? ' | vargottama' : ''));
        });
        L.push('');
      }
      if (inp.warnings && inp.warnings.length) {
        L.push('CẢNH BÁO CẦN BIẾT KHI LUẬN');
        inp.warnings.forEach(function (w) { L.push('  - ' + w); });
        L.push('');
      }
      L.push('BẢN NÀY CHƯA TÍNH');
      L.push('  - Śoḍaśavarga, Aṣṭakavarga, các bảng điểm sức mạnh (Shadbala)');
      L.push('  - Pratyantardaśā (vận cấp 3 trở xuống)');
      L.push('  - hiệu chỉnh giờ sinh (birth-time rectification)');
      L.push('  - hàng trăm yoga cổ điển khác ngoài 5 tổ hợp đã kiểm');
      return L.join('\n');
    }

    /* Khối dán sẵn cho AI: dữ liệu + một khung câu hỏi để AI luận trên
       ĐÚNG số liệu này thay vì tự dựng lại lá số theo hệ khác. */
    function aiPromptText() {
      return 'Tôi có một lá số Vệ Đà (Jyotiṣa) đã được tính sẵn bên dưới. Hãy luận giải\n' +
        'DỰA TRÊN ĐÚNG các con số này — đừng tự tính lại và đừng đổi sang hệ tropical\n' +
        'của chiêm tinh phương Tây. Nếu bạn thấy chỗ nào cần thêm dữ liệu mới luận\n' +
        'được, hãy nói rõ là thiếu gì thay vì suy đoán.\n' +
        '\n' +
        'Tôi muốn hiểu: (1) Lagna và chủ tinh Lagna nói gì về cách tôi vận hành;\n' +
        '(2) cung Trăng + Nakshatra nói gì về tâm trí và nhu cầu an toàn của tôi;\n' +
        '(3) giai đoạn Daśā đang chạy có khí gì, nên dồn sức vào đâu; (4) chỗ nào\n' +
        'trong lá số này các phái Jyotiṣa còn đọc khác nhau, và khác thế nào.\n' +
        '\n' +
        'Xin nói ở thể "có thể / truyền thống cho rằng", đừng phán chắc về sức khoẻ,\n' +
        'tuổi thọ, tiền bạc hay chuyện sinh tử.\n' +
        '\n' +
        '--- DỮ LIỆU ---\n' +
        chartDataText();
    }

    var EXPERT_QUESTIONS = [
      'Ayanāṁśa nào thầy dùng? Nếu khác Lahiri thì lá số của tôi lệch bao nhiêu, và có đổi cung nào không?',
      'Thầy dùng hệ nhà nào? Whole Sign, Śrīpati hay Placidus — và vì sao chọn hệ đó cho ca của tôi?',
      'Giờ sinh của tôi có cần hiệu chỉnh (rectification) không? Dấu hiệu nào trong đời tôi giúp thầy chốt lại giờ?',
      'Chủ tinh Lagna của tôi mạnh hay yếu khi xét thêm D9 (Navāṁśa) — và điều đó đổi cách đọc thế nào?',
      'Giai đoạn Daśā tôi đang ở có gì nên chuẩn bị, và tiểu vận nào trong đó là chỗ bản lề?',
      'Có tổ hợp (yoga) nào trong lá số này mà bản tự tính của tôi chưa bắt được không?'
    ];

    /* ══ BẢN IN / PDF (dựng lại 2026-07-25) ═══════════════════════════
       Bản trước chỉ gọi window.print(). Từ khi #vedic thành modal
       `position:fixed; overflow-y:auto`, Chrome vẽ lại phần tử fixed trên
       MỌI trang giấy → PDF ra 9 trang lặp đúng một khung bị cắt, phần đầu
       mất, "Luận giải" cắt giữa dòng, và cả trang web phía sau vẫn in theo
       (13.6MB). Đã kiểm chứng bằng Playwright + page.pdf().

       Cách làm giờ: dựng MỘT bản in riêng ở cấp <body> (#vdPrintRoot) —
       không fixed, không overflow, nền giấy sáng mực đậm, có header đầy đủ
       ngày/giờ/nơi sinh, và chứa ĐỦ CẢ 4 view (bản cũ chỉ in view đang bật).
       In xong thì xoá đi để không phình DOM. */
    function buildPrintRoot() {
      var inp = chart.input, m = chart.metadata;
      var old = document.getElementById('vdPrintRoot');
      if (old) old.parentNode.removeChild(old);
      var root = document.createElement('div');
      root.id = 'vdPrintRoot';
      root.setAttribute('aria-hidden', 'true');

      var when = inp.localDate + (state.unknownTime ? ' (không rõ giờ — dùng 12:00)' : ' · ' + inp.localTime);
      var where = [inp.location.city, inp.location.admin, inp.location.country].filter(Boolean).join(', ');
      var printedAt = new Date();

      var head = '<header class="vdp-head">' +
        '<div class="vdp-eyebrow">Jyotiṣa · Chiêm tinh Vệ Đà</div>' +
        '<h1>Bản đồ sao Vệ Đà</h1>' +
        (inp.name ? '<div class="vdp-name">' + esc(inp.name) + '</div>' : '') +
        '<table class="vdp-meta"><tbody>' +
        '<tr><th>Ngày &amp; giờ sinh</th><td>' + esc(when) + '</td></tr>' +
        '<tr><th>Nơi sinh</th><td>' + esc(where) + ' · ' + inp.location.lat.toFixed(3) + ', ' + inp.location.lon.toFixed(3) + '</td></tr>' +
        '<tr><th>Múi giờ đã dùng</th><td>' + fmtOffset(inp.utcOffsetUsed) + (inp.tzid ? ' (' + esc(inp.tzid) + ', tra theo đúng ngày sinh)' : ' (khai thủ công)') + '</td></tr>' +
        '<tr><th>Hệ tính</th><td>Sidereal · ayanāṁśa Lahiri ' + m.ayanamsaDegrees.toFixed(3) + '° · nhà Whole Sign · ' + (m.nodeType === 'true' ? 'True Node' : 'Mean Node') + '</td></tr>' +
        '<tr><th>Vị trí thiên thể</th><td>' + esc(m.engine) + '</td></tr>' +
        '</tbody></table>' +
        (inp.warnings && inp.warnings.length ? '<ul class="vdp-warn">' + inp.warnings.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>' : '') +
        '</header>';

      function sec(title, inner, breakBefore) {
        return '<section class="vdp-sec' + (breakBefore ? ' vdp-break' : '') + '"><h2>' + esc(title) + '</h2>' + inner + '</section>';
      }

      root.innerHTML = head +
        /* Bỏ dòng "Nhấn vào một ô…" — trên giấy thì không bấm được gì */
        sec('Bản đồ sao (Kundli)', chartHtml().replace('<p class="vd-hint">Nhấn vào một ô để xem chi tiết nhà.</p>', '')) +
        sec('Bảng vị trí hành tinh', planetsTableHtml()) +
        sec('Thẻ hành tinh', planetCardsHtml(), true) +
        sec('Vòng Nakshatra — Mặt Trăng', nakRingHtml('moon')) +
        sec('Navāṁśa (D9) — hôn nhân & nội lực', vargaBlockHtml(chart.d9, 9), true) +
        sec('Daśāṁśa (D10) — sự nghiệp', vargaBlockHtml(chart.d10, 10)) +
        sec('Góc hợp (Aspects)', aspectsHtml()) +
        sec('Vận hạn — Vimśottarī Daśā', dashaHtml(), true) +
        sec('Luận giải', readingHtml(), true) +
        /* ── Phụ lục: để mang bản in đi hỏi tiếp ───────────────────────── */
        sec('Mang bản này đi hỏi tiếp',
          '<p class="vdp-lead">Bản in này tự đứng được một mình. Ai muốn đi sâu hơn — một người thầy Jyotiṣa, hay một trợ lý AI — cũng chỉ cần đọc phần số liệu bên dưới là dựng lại được đúng lá số này, không phải đoán.</p>' +
          '<h3>Sáu câu nên hỏi khi gặp người có nghề</h3>' +
          '<ol class="vdp-qs">' + EXPERT_QUESTIONS.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ol>' +
          '<p class="vdp-note">Nhớ mang theo <strong>giờ sinh gốc và nơi sinh</strong> để họ tự dựng lại — và nói rõ bản này dùng ayanāṁśa Lahiri với hệ nhà Whole Sign, vì mỗi phái một hệ thì kết quả khác nhau.</p>' +
          '<h3>Nếu muốn hỏi một trợ lý AI</h3>' +
          '<p class="vdp-note">Chép nguyên khối dưới đây (kể cả phần dữ liệu ở trang sau) rồi dán vào. Khối này đã ghi rõ hệ tính, nên AI ít tự dựng lại lá số theo hệ khác — đó là chỗ hay sai nhất.</p>' +
          '<pre class="vdp-pre vdp-pre-prompt">' + esc(aiPromptText().split('--- DỮ LIỆU ---')[0] + '--- DỮ LIỆU --- (xem phần dưới)') + '</pre>' +
          '<p class="vdp-note vdp-caution">Một lời thật: AI có thể nói rất trôi chảy về chiêm tinh mà vẫn sai — nhất là khi nó tự tính lại vị trí hành tinh. Cứ hỏi nó "con số này bạn lấy ở đâu", và đối chiếu với đúng bảng số liệu bên dưới. Đó mới là sàng lọc.</p>',
          true) +
        sec('Số liệu gốc — để kiểm lại từng con số',
          '<pre class="vdp-pre">' + esc(chartDataText()) + '</pre>', true) +
        '<footer class="vdp-foot">' +
          '<p>In ngày ' + fmtDate(printedAt) + ' từ ' + esc(location.origin + location.pathname) + '</p>' +
          '<p>Vị trí thiên thể tính bằng Astronomy Engine (VSOP87/ELP2000) ngay trên trình duyệt — không có dữ liệu sinh nào được gửi lên máy chủ. Chiêm tinh là một hệ diễn giải biểu tượng, không thay thế tư vấn y tế, pháp lý, tài chính hay tâm lý chuyên môn.</p>' +
        '</footer>';
      document.body.appendChild(root);
      return root;
    }

    function doPrint() {
      if (!chart) return;
      buildPrintRoot();
      document.body.classList.add('vd-printing');
      function cleanup() {
        document.body.classList.remove('vd-printing');
        var r = document.getElementById('vdPrintRoot');
        if (r && r.parentNode) r.parentNode.removeChild(r);
        window.removeEventListener('afterprint', cleanup);
      }
      window.addEventListener('afterprint', cleanup);
      /* Safari/iOS đôi khi không bắn afterprint — chốt thêm một hẹn giờ. */
      setTimeout(function () { if (document.body.classList.contains('vd-printing')) cleanup(); }, 60000);
      /* Đợi một frame để trình duyệt kịp layout bản in trước khi mở hộp thoại */
      requestAnimationFrame(function () { requestAnimationFrame(function () { window.print(); }); });
    }
    el.pdfBtn.addEventListener('click', doPrint);

    /* ── Nút "Chép dữ liệu để hỏi tiếp" ────────────────────────────────
       Chép khối dán-sẵn-cho-AI (đã bao gồm toàn bộ số liệu gốc). Nếu trình
       duyệt không cho ghi clipboard (Safari cũ, ngữ cảnh không bảo mật) thì
       hiện một ô <textarea> đã bôi sẵn để người ta tự Cmd+C — thà thêm một
       bước còn hơn bấm xong không có gì xảy ra. */
    el.copyBtn && el.copyBtn.addEventListener('click', function () {
      if (!chart) return;
      var text = aiPromptText();
      function ok() {
        el.shareMsg.textContent = '✓ Đã chép — dán vào chỗ bạn muốn hỏi là được.';
        el.shareMsg.style.color = '#c3b6f5';
      }
      function fallback() {
        var box = qs(el.results, '.vd-copy-fallback');
        if (!box) {
          box = document.createElement('textarea');
          box.className = 'vd-copy-fallback';
          box.setAttribute('readonly', 'readonly');
          el.copyBtn.parentNode.appendChild(box);
        }
        box.value = text;
        box.focus(); box.select();
        el.shareMsg.textContent = 'Trình duyệt không cho chép tự động — bấm Cmd/Ctrl+C để chép khối bên dưới.';
        el.shareMsg.style.color = 'var(--amber2)';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok).catch(fallback);
      } else fallback();
    });

    el.tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.activeView = btn.dataset.vdView; state.selectedHouse = null;
        el.tabs.forEach(function (b) { b.classList.toggle('vd-tab-active', b === btn); });
        renderResultsBody();
      });
    });

    // ---- results rendering ----
    function card(inner) { return '<div class="vd-card vd-result-card">' + inner + '</div>'; }
    function h2(t) { return '<h3 class="vd-result-h">' + esc(t) + '</h3>'; }

    function chartHtml() {
      var ls = chart.ascendant ? chart.ascendant.signIndex : null;
      var hp = Array.from({ length: 12 }, function () { return []; });
      chart.planets.forEach(function (p) {
        hp[p.signIndex].push('<span class="vd-hp-planet" data-vd-planet="' + p.id + '">' + esc(p.viet.slice(0, 2)) + (p.retrograde ? '℞' : '') + '</span>');
      });
      if (ls == null) return '<p class="vd-muted">Không rõ giờ sinh nên chưa thể dựng Lagna/houses. Xem Thẻ hành tinh hoặc Bảng vị trí bên dưới.</p>';
      hp[ls].unshift('<span class="vd-hp-asc">Asc</span>');
      var cells = '', centerDone = false;
      for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
          var si = SI_LAYOUT[r][c];
          if (si === null) {
            if (!centerDone) { cells += '<div class="vd-kundli-center">KUNDLI</div>'; centerDone = true; }
            continue;
          }
          var isL = si === ls, houseNum = ((si - ls + 12) % 12) + 1;
          cells += '<div class="vd-house-cell' + (isL ? ' vd-house-lagna' : '') + '" data-vd-house="' + houseNum + '">' +
            '<div class="vd-house-tag">' + SIGNS_SHORT[si] + ' · H' + houseNum + '</div>' +
            '<div class="vd-house-body">' + hp[si].join(' ') + '</div></div>';
        }
      }
      return '<p class="vd-hint">Nhấn vào một ô để xem chi tiết nhà.</p><div class="vd-kundli">' + cells + '</div>';
    }

    function planetCardsHtml() {
      return '<div class="vd-planet-grid">' + chart.planets.map(function (p) {
        var retro = p.retrograde ? ' <span class="vd-retro" title="Nghịch hành (retrograde)">℞</span>' : '';
        var houseTxt = p.house ? ('Nhà ' + p.house) : 'Nhà: —';
        return '<div class="vd-planet-card" data-vd-planet="' + p.id + '">' +
          '<div class="vd-pc-top"><span class="vd-pc-glyph">' + p.glyph + '</span><span class="vd-pc-sk">' + esc(p.sk) + '</span></div>' +
          '<div class="vd-pc-name">' + esc(p.viet) + retro + '</div>' +
          '<div class="vd-pc-pos">' + p.degreeInSign + '° ' + esc(SIGNS[p.signIndex]) + '</div>' +
          '<div class="vd-pc-nak">' + houseTxt + ' · ' + esc(p.nakshatraName) + ' (pada ' + p.pada + ')</div>' +
        '</div>';
      }).join('') + '</div>';
    }

    function planetsTableHtml() {
      var rows = chart.planets.map(function (p) {
        return '<tr data-vd-planet="' + p.id + '"><td>' + p.glyph + ' ' + esc(p.viet) + '</td><td>' + esc(SIGNS[p.signIndex]) + '</td><td>' + p.degreeInSign + '°</td><td>' + (p.house || '—') + '</td><td>' + esc(p.nakshatraName) + ' <span class="vd-muted">(' + p.pada + ')</span></td><td class="vd-retro-cell">' + (p.retrograde ? '℞' : '—') + '</td></tr>';
      }).join('');
      return '<div class="vd-table-wrap"><table class="vd-table"><thead><tr><th>Hành tinh</th><th>Cung</th><th>Độ</th><th>Nhà</th><th>Nakshatra (pada)</th><th>℞</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    }

    function nakRingHtml(planetId) {
      var p = chart.planets.find(function (pl) { return pl.id === planetId; }) || chart.planets[1];
      var seg = 360 / 27, curIdx = p.nakshatraIndex, prog = ((p.longitude % seg) / seg) * 100;
      var stops = [];
      for (var i = 0; i < 27; i++) {
        var a0 = i * seg, a1 = (i + 1) * seg;
        var col = i === curIdx ? 'var(--amber)' : (i % 2 === 0 ? 'rgba(237,230,220,0.12)' : 'rgba(237,230,220,0.05)');
        stops.push(col + ' ' + a0 + 'deg ' + a1 + 'deg');
      }
      var ptrAngle = p.longitude - 90;
      var ring = '<div class="vd-nak-ring" style="background:conic-gradient(' + stops.join(',') + ');">' +
        '<div class="vd-nak-center"><div class="vd-nak-sub">' + esc(p.viet) + ' tại</div><div class="vd-nak-name">' + esc(p.nakshatraName) + '</div><div class="vd-nak-sub">pada ' + p.pada + ' · ' + Math.round(prog) + '% qua cung</div></div>' +
        '<div class="vd-nak-pointer" style="transform:rotate(' + ptrAngle + 'deg) translateY(-130px);"></div>' +
      '</div>';
      var lunarPanel = '';
      if (p.id === 'moon') {
        lunarPanel = '<div class="vd-lunar-panel"><div class="vd-lunar-label">Lunar Mansion</div><p>Chủ quản: <strong>' + esc(NAK_LORDS[p.nakshatraIndex % 9]) + '</strong>. Theo truyền thống Jyotiṣa, Nakshatra của Mặt Trăng thường được xem là gợi ý về tâm trí và bản năng — cần kết hợp thêm Dasha để luận đầy đủ hơn.</p></div>';
      }
      var selector = '<select id="vdNakSel" class="vd-select">' + chart.planets.map(function (pl) { return '<option value="' + pl.id + '"' + (pl.id === p.id ? ' selected' : '') + '>' + esc(pl.viet) + '</option>'; }).join('') + '</select>';
      return '<div class="vd-nak-wrap">' + ring + '<div>' + selector + '</div></div>' + lunarPanel;
    }

    /* ══ D9/D10 — hiển thị (2026-07-25) ═══════════════════════════════════
       Kundli dùng lại đúng SI_LAYOUT/CSS của D1 nhưng KHÔNG gắn data-vd-house
       (bấm vào ô sẽ mở panel nhà của D1 nếu gắn nhầm — cố tình bỏ, tránh
       nhầm). data-vd-planet vẫn giữ để hover vẫn highlight-chéo được sang
       các tab khác, không cần dây thêm gì. */
    function vargaKundliHtml(varga) {
      if (!varga || varga.ascendant == null) {
        return '<p class="vd-muted">Không rõ giờ sinh nên chưa dựng được Lagna của biểu đồ này — bảng vị trí bên dưới vẫn đọc được, chỉ thiếu góc nhìn theo nhà.</p>';
      }
      var ls = varga.ascendant.signIndex;
      var hp = Array.from({ length: 12 }, function () { return []; });
      varga.planets.forEach(function (p) {
        hp[p.signIndex].push('<span class="vd-hp-planet' + (p.vargottama ? ' vd-hp-vargottama' : '') + '" data-vd-planet="' + p.id + '"' +
          (p.vargottama ? ' title="Vargottama — cùng cung ở cả D1 và biểu đồ này, truyền thống xem là vững hơn"' : '') + '>' +
          esc(p.viet.slice(0, 2)) + (p.vargottama ? '✦' : '') + '</span>');
      });
      hp[ls].unshift('<span class="vd-hp-asc">Asc</span>');
      var cells = '', centerDone = false;
      for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
          var si = SI_LAYOUT[r][c];
          if (si === null) {
            if (!centerDone) { cells += '<div class="vd-kundli-center">D' + varga.kind + '</div>'; centerDone = true; }
            continue;
          }
          var isL = si === ls, houseNum = ((si - ls + 12) % 12) + 1;
          cells += '<div class="vd-house-cell' + (isL ? ' vd-house-lagna' : '') + '">' +
            '<div class="vd-house-tag">' + SIGNS_SHORT[si] + ' · H' + houseNum + '</div>' +
            '<div class="vd-house-body">' + hp[si].join(' ') + '</div></div>';
        }
      }
      return '<div class="vd-kundli">' + cells + '</div>';
    }

    function vargaTableHtml(varga) {
      if (!varga) return '';
      var rows = varga.planets.map(function (p) {
        return '<tr data-vd-planet="' + p.id + '"><td>' + p.glyph + ' ' + esc(p.viet) + '</td><td>' + esc(SIGNS[p.signIndex]) + '</td><td>' + (p.house || '—') + '</td><td>' + (p.vargottama ? '<span class="vd-good">✦ Vargottama</span>' : '—') + '</td></tr>';
      }).join('');
      return '<div class="vd-table-wrap"><table class="vd-table"><thead><tr><th>Hành tinh</th><th>Cung (D' + varga.kind + ')</th><th>Nhà</th><th>Ghi chú</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    }

    var VARGA_META = {
      9: {
        title: 'Navāṁśa (D9)', short: 'D9',
        intro: '<p>Navāṁśa chia mỗi cung 30° thành 9 phần 3°20′. Truyền thống Jyotiṣa dùng biểu đồ này để soi sâu hơn về <strong>hôn nhân, sự gắn bó lâu dài, và nội lực</strong> — phần "chất" bên dưới những gì D1 (bản đồ chính) đã cho thấy. Một hành tinh mạnh ở D1 nhưng yếu ở D9 thường được đọc là hứa nhiều nhưng khó giữ trọn; ngược lại mạnh ở cả hai thường được xem là bền hơn theo thời gian.</p>',
        lagnaLabel: 'Lagna Navāṁśa', karakaPlanets: ['venus', 'jupiter'],
        karakaIntro: 'Sao Kim và Sao Mộc thường được xem là hai chỉ dấu cổ điển cho chuyện bạn đời (tuỳ phái, tuỳ lá số mà nhấn cái nào hơn — bản này không tự giả định giới tính hay vai trò) — vị trí của chúng ở D9:'
      },
      10: {
        title: 'Daśāṁśa (D10)', short: 'D10',
        intro: '<p>Daśāṁśa chia mỗi cung 30° thành 10 phần 3°. Truyền thống dùng biểu đồ này để soi <strong>sự nghiệp, vị trí trước công chúng, và những gì bạn để lại qua công việc</strong> — lớp chi tiết hơn so với Nhà 10 (Karma) của D1.</p>',
        lagnaLabel: 'Lagna Daśāṁśa', karakaPlanets: ['sun', 'saturn', 'mercury'],
        karakaIntro: 'Mặt Trời (địa vị), Sao Thổ (kỷ luật, đường dài) và Sao Thủy (giao dịch, kỹ năng) thường được xem là ba chỉ dấu cho nghề nghiệp — vị trí của chúng ở D10:'
      }
    };

    function vargaReadingHtml(varga, kind) {
      var meta = VARGA_META[kind];
      var C = VC();
      var h = meta.intro;
      if (!varga || varga.ascendant == null) {
        h += '<p class="vd-muted">Không rõ giờ sinh nên chưa dựng được ' + esc(meta.lagnaLabel) + ' — phần vị trí hành tinh ở ' + meta.short + ' phía trên vẫn đọc được, chỉ thiếu góc nhìn theo nhà.</p>';
        return readingBox('vd-rb-varga vd-rb-varga-' + meta.short.toLowerCase(), '✦ ' + esc(meta.title), h);
      }
      var ls = varga.ascendant.signIndex;
      var signMeta = C ? C.signs[ls] : null;
      h += '<p><strong>' + esc(meta.lagnaLabel) + '</strong> rơi vào <strong>' + esc(SIGNS_VI[ls]) + '</strong>.' + (signMeta ? ' ' + signMeta.body : '') + '</p>';
      var lordId = signMeta ? signMeta.lord : null;
      if (lordId) {
        var lordP = varga.planets.filter(function (p) { return p.id === lordId; })[0];
        if (lordP) {
          var d = dignityOf(lordId, lordP.signIndex);
          h += '<p>Chủ tinh của ' + esc(meta.lagnaLabel) + ' — <strong>' + esc(lordP.viet) + '</strong> — đứng ở ' + esc(SIGNS_VI[lordP.signIndex]) +
            (lordP.house ? ', nhà ' + lordP.house + ' của ' + meta.short : '') +
            (d ? ' (' + d.label + ' — ' + d.note + ')' : '') +
            (lordP.vargottama ? ' — <strong>vargottama</strong>: cùng cung với vị trí ở D1, truyền thống xem là ổn định hơn theo thời gian.' : '.') + '</p>';
        }
      }
      var vargottamaList = varga.planets.filter(function (p) { return p.vargottama; }).map(function (p) { return p.viet; });
      if (vargottamaList.length) {
        h += '<p>Vargottama trong biểu đồ này: <strong>' + esc(vargottamaList.join(', ')) + '</strong> — cùng cung ở cả D1 lẫn ' + meta.short + ', thường được đọc là phần tính cách/chủ đề ổn định, ít đổi theo thời gian hơn các hành tinh khác.</p>';
      }
      var karakaLines = meta.karakaPlanets.map(function (pid) {
        var p = varga.planets.filter(function (x) { return x.id === pid; })[0];
        if (!p) return '';
        var d = dignityOf(pid, p.signIndex);
        return '<li><strong>' + esc(p.viet) + '</strong> — ' + esc(SIGNS_VI[p.signIndex]) + (p.house ? ', nhà ' + p.house : '') + (d ? ' (' + d.label + ')' : '') + (p.vargottama ? ' · vargottama' : '') + '</li>';
      }).join('');
      if (karakaLines) h += '<p>' + meta.karakaIntro + '</p><ul class="vd-r-list">' + karakaLines + '</ul>';
      h += '<p class="vd-r-why">Đây là ứng dụng cơ bản của ' + esc(meta.title) + ' — dừng ở Lagna, chủ tinh Lagna, vargottama và vài chỉ dấu chính. Truyền thống còn đọc thêm nhiều lớp khác (Ṣaḍvarga, vargottama trên toàn bộ 9 hành tinh, Argala…) — nếu muốn đi sâu hơn, nên hỏi thêm người có nghề hoặc mang bản in này đi hỏi.</p>';
      return readingBox('vd-rb-varga vd-rb-varga-' + meta.short.toLowerCase(), '✦ ' + esc(meta.title), h);
    }

    function vargaBlockHtml(varga, kind) {
      return vargaKundliHtml(varga) + vargaTableHtml(varga) + vargaReadingHtml(varga, kind);
    }

    function housePanelHtml(houseNum) {
      var house = chart.houses.find(function (h) { return h.house === houseNum; });
      if (!house) return '';
      var planetsList = house.planets.length ? house.planets.map(function (p) {
        return '<div class="vd-house-planet-row"><strong>' + p.glyph + ' ' + esc(p.viet) + '</strong> <span class="vd-muted">— ' + p.degreeInSign + '° ' + esc(SIGNS[p.signIndex]) + ' · ' + esc(p.nakshatraName) + '</span></div>';
      }).join('') : '<p class="vd-muted">Không có hành tinh nào trong nhà này.</p>';
      return '<div class="vd-house-panel-head"><h3>Nhà ' + houseNum + '</h3><button type="button" class="vd-close-panel" aria-label="Đóng">✕</button></div>' +
        '<p class="vd-house-panel-sign">' + esc(house.signName) + '</p>' +
        '<p class="vd-house-panel-theme">' + esc(HOUSE_THEMES[houseNum - 1]) + '</p>' + planetsList;
    }

    /* ══ LUẬN GIẢI (viết lại 2026-07-25) ═══════════════════════════════
       Bản trước chỉ có 3 hộp Lagna/Trăng/Trời, cả ba đọc từ SIGN_TRAITS —
       một bảng tĩnh 2 câu mỗi cung. Ali: "ít nhất cũng phải có 1 góc nhìn
       tổng quan nhất của 1 người, mỗi phần đều có, mức chia sẻ đủ dài."
       Nên giờ đi qua đủ các lớp mà dữ liệu đã có: Lagna → chủ tinh Lagna →
       cung Trăng + Nakshatra → Mặt Trời → sức từng hành tinh (vượng/hãm) →
       các nhà đang có người ở → tổ hợp đáng chú ý → và trục thời gian Daśā.
       Chữ nghĩa nằm ở vedic-content.js; nếu file đó thiếu thì tự lùi về
       bản ngắn (SIGN_TRAITS) chứ không làm sập công cụ. */
    function VC() { return window.VEDIC_CONTENT || null; }
    function planetById(id) {
      for (var i = 0; i < chart.planets.length; i++) if (chart.planets[i].id === id) return chart.planets[i];
      return null;
    }
    function signName(i) { return SIGNS[i]; }
    function ordHouse(n) { return 'nhà ' + n; }

    function readingBox(cls, title, body) {
      return '<div class="vd-reading-box ' + cls + '"><h4>' + title + '</h4>' + body + '</div>';
    }

    /* Một hành tinh "đọc" thành câu: cung + nhà + vượng/hãm + nghịch hành */
    function planetLine(p) {
      var C = VC();
      var bits = [];
      bits.push('<strong>' + esc(p.viet) + '</strong> ' + p.degreeInSign + '° ' + esc(SIGNS_VI[p.signIndex]));
      if (p.house) bits.push(ordHouse(p.house));
      var d = dignityOf(p.id, p.signIndex);
      if (d) bits.push('<em class="vd-dig vd-dig-' + d.key + '">' + d.label + '</em>');
      if (p.retrograde && p.id !== 'rahu' && p.id !== 'ketu') bits.push('<em>nghịch hành</em>');
      var line = bits.join(' · ');
      if (C && C.planets[p.id]) line += '<span class="vd-pl-karaka"> — ' + esc(C.planets[p.id].karaka) + '</span>';
      return line;
    }

    function readingHtml() {
      var C = VC();
      var moon = planetById('moon'), sun = planetById('sun');
      var h = '<div class="vd-reading-note">Đọc theo nếp Jyotiṣa: bắt đầu từ <strong>Lagna</strong> (cung mọc), rồi tới <strong>cung Trăng</strong> — Vệ Đà coi Mặt Trăng là trọng tâm, không phải Mặt Trời. Đây là một hệ biểu tượng để soi lại mình, không phải một bản án.</div>';

      /* ---- 1. Lagna + chủ tinh Lagna ---- */
      if (chart.ascendant) {
        var ls = chart.ascendant.signIndex;
        var sg = C ? C.signs[ls] : null;
        var body = '<p>Lagna ở <strong>' + chart.ascendant.degreeInSign + '° ' + esc(signName(ls)) + '</strong>' +
          (chart.ascendant.nakshatra ? ', Nakshatra <strong>' + esc(chart.ascendant.nakshatra) + '</strong> (pada ' + chart.ascendant.pada + ')' : '') + '.</p>';
        if (sg) {
          body += '<p class="vd-r-keys">' + esc(sg.element) + ' · ' + esc(sg.mode) + ' · ' + esc(sg.keys) + '</p>';
          body += '<p>' + sg.body + '</p>';
          /* Chủ tinh Lagna — câu hỏi đầu tiên của mọi buổi luận Jyotiṣa:
             "người cầm lá số này đang đứng ở đâu?" */
          var lordId = sg.lord, lp = planetById(lordId);
          if (lp) {
            var ld = dignityOf(lp.id, lp.signIndex);
            body += '<p><strong>Chủ tinh Lagna</strong> của bạn là ' + esc(lp.viet) + ' — nó đang ở <strong>' +
              esc(SIGNS_VI[lp.signIndex]) + '</strong>' + (lp.house ? ', <strong>' + ordHouse(lp.house) + '</strong>' : '') +
              (ld ? ' (' + ld.label + ')' : '') + '. ' +
              (lp.house && C ? 'Nghĩa là phần "tay lái" của cả lá số đặt vào chuyện <em>' + esc(C.houses[lp.house - 1].keys) + '</em> — nơi bạn tiêu nhiều sức nhất và cũng là nơi đời hay gọi bạn ra.' : '') +
              (ld ? ' Chủ tinh ' + ld.note + '.' : '') + '</p>';
          }
        } else {
          body += '<p>Có thể biểu hiện: ' + SIGN_TRAITS[ls][0] + '. ' + SIGN_TRAITS[ls][1] + '</p>';
        }
        h += readingBox('vd-rb-lagna', '🌅 Lagna — cách bạn bước vào phòng: ' + esc(signName(ls)), body);
      } else {
        h += readingBox('vd-rb-lagna', '🌅 Lagna — chưa tính được', '<p>Không rõ giờ sinh nên Lagna, các nhà và chủ tinh Lagna tạm để trống. Phần cung Trăng, Nakshatra và Daśā bên dưới vẫn đọc được, chỉ cần biết Mặt Trăng có thể lệch nếu bạn sinh gần lúc nó đổi cung.</p>');
      }

      /* ---- 2. Cung Trăng + Nakshatra (trọng tâm Vệ Đà) ---- */
      if (moon) {
        var msg = C ? C.signs[moon.signIndex] : null;
        var nk = C ? C.nakshatras[moon.nakshatraIndex] : null;
        var b2 = '<p>Mặt Trăng ở <strong>' + moon.degreeInSign + '° ' + esc(SIGNS_VI[moon.signIndex]) + '</strong>' +
          (moon.house ? ', ' + ordHouse(moon.house) : '') + ' — Nakshatra <strong>' + esc(moon.nakshatraName) +
          '</strong>, pada ' + moon.pada + ', chủ quản <strong>' + esc(NAK_LORDS[moon.nakshatraIndex % 9]) + '</strong>.</p>';
        if (msg) b2 += '<p>' + msg.body + '</p>';
        else b2 += '<p>Có thể biểu hiện: ' + SIGN_TRAITS[moon.signIndex][0] + '.</p>';
        if (nk) {
          b2 += '<p class="vd-r-nak">Nakshatra <strong>' + esc(moon.nakshatraName) + '</strong> — biểu tượng: ' +
            esc(nk.symbol) + ' · thần chủ: ' + esc(nk.deity) + '. ' + nk.body + '</p>';
        }
        var md = dignityOf('moon', moon.signIndex);
        if (md) b2 += '<p>Mặt Trăng ' + md.note + '.</p>';
        b2 += '<p class="vd-r-why">Vì sao phần này quan trọng: Nakshatra của Mặt Trăng cũng chính là điểm khởi của toàn bộ trục thời gian Daśā bên dưới — nói cách khác, chỗ Mặt Trăng đứng lúc bạn sinh quyết định thứ tự các giai đoạn của cả đời.</p>';
        h += readingBox('vd-rb-moon', '🌙 Cung Trăng — bạn dịu lại bằng gì: ' + esc(signName(moon.signIndex)), b2);
      }

      /* ---- 3. Mặt Trời ---- */
      if (sun) {
        var ssg = C ? C.signs[sun.signIndex] : null;
        var b3 = '<p>Mặt Trời ở <strong>' + sun.degreeInSign + '° ' + esc(SIGNS_VI[sun.signIndex]) + '</strong>' +
          (sun.house ? ', ' + ordHouse(sun.house) : '') + ' — Nakshatra ' + esc(sun.nakshatraName) + ' (pada ' + sun.pada + ').</p>';
        if (ssg) b3 += '<p>' + ssg.body + '</p>';
        else b3 += '<p>Có thể biểu hiện: ' + SIGN_TRAITS[sun.signIndex][0] + '.</p>';
        var sd = dignityOf('sun', sun.signIndex);
        if (sd) b3 += '<p>Mặt Trời ' + sd.note + '.</p>';
        if (C && sun.house) b3 += '<p>Trục sống của bạn đặt vào chuyện <em>' + esc(C.houses[sun.house - 1].keys) + '</em>. ' + C.planets.sun.body + '</p>';
        h += readingBox('vd-rb-sun', '☀️ Mặt Trời — cái bạn không chịu bẻ: ' + esc(signName(sun.signIndex)), b3);
      }

      /* ---- 4. Sức của từng hành tinh ---- */
      var strong = [], weak = [], retro = [];
      chart.planets.forEach(function (p) {
        var d = dignityOf(p.id, p.signIndex);
        if (d && (d.key === 'exalt' || d.key === 'own' || d.key === 'mool')) strong.push(p.viet + ' (' + d.label + ' ở ' + SIGNS_VI[p.signIndex] + ')');
        if (d && d.key === 'debil') weak.push(p.viet + ' (hãm ở ' + SIGNS_VI[p.signIndex] + ')');
        if (p.retrograde && p.id !== 'rahu' && p.id !== 'ketu') retro.push(p.viet);
      });
      var b4 = '<ul class="vd-r-list">' + chart.planets.map(function (p) { return '<li>' + planetLine(p) + '</li>'; }).join('') + '</ul>';
      var summary = [];
      if (strong.length) summary.push('Đang có sức: <strong>' + esc(strong.join(', ')) + '</strong>.');
      if (weak.length) summary.push('Phải làm việc vất vả hơn: <strong>' + esc(weak.join(', ')) + '</strong> — không phải điểm trừ, mà là chỗ cần kiên nhẫn với chính mình.');
      if (retro.length) summary.push('Nghịch hành: <strong>' + esc(retro.join(', ')) + '</strong> — truyền thống đọc là năng lượng ấy hướng vào trong, chín muộn hơn nhưng riêng hơn.');
      if (!strong.length && !weak.length) summary.push('Không có hành tinh nào ở cung vượng hay cung hãm — một lá số khá "phẳng" về mặt này, sức mạnh sẽ đọc từ nhà và từ Daśā nhiều hơn.');
      h += readingBox('vd-rb-power', '⚖️ Sức của chín hành tinh', b4 + '<p>' + summary.join(' ') + '</p>');

      /* ---- 5. Các nhà đang có người ở ---- */
      if (chart.houses && C) {
        var filled = chart.houses.filter(function (hh) { return hh.planets.length; });
        var empty = chart.houses.filter(function (hh) { return !hh.planets.length; });
        var b5 = '<p>Trong hệ Whole Sign, nhà nào có hành tinh đứng thì chuyện của nhà đó được "bật đèn" — nơi đời bạn có nhiều chuyện xảy ra nhất.</p><ul class="vd-r-list">';
        filled.forEach(function (hh) {
          var meta = C.houses[hh.house - 1];
          b5 += '<li><strong>Nhà ' + hh.house + ' · ' + esc(meta.vi) + '</strong> <span class="vd-muted">(' + esc(SIGNS_VI[hh.signIndex]) + ')</span> — ' +
            esc(hh.planets.map(function (x) { return x.viet; }).join(', ')) + '. ' + meta.body + '</li>';
        });
        b5 += '</ul>';
        if (empty.length) {
          b5 += '<p class="vd-r-why">Các nhà không có hành tinh nào đứng (' + empty.map(function (x) { return x.house; }).join(', ') +
            ') không hề "trống rỗng" — chuyện của chúng được đọc qua chủ tinh của cung tương ứng, và qua Daśā khi tới lượt.</p>';
        }
        h += readingBox('vd-rb-houses', '🏠 Những nhà đang được bật đèn', b5);
      }

      /* ---- 6. Tổ hợp đáng chú ý ---- */
      if (C && C.yogas) {
        var found = detectYogas();
        var b6 = found.length
          ? '<ul class="vd-r-list">' + found.map(function (y) { return '<li><strong>' + esc(y.name) + '</strong> — ' + y.body + '</li>'; }).join('') + '</ul>'
          : '<p class="vd-muted">Không thấy tổ hợp nào trong nhóm kinh điển mà bản này kiểm — điều đó hoàn toàn bình thường; phần lớn lá số đọc bằng nhà và Daśā chứ không bằng yoga.</p>';
        h += readingBox('vd-rb-yoga', '✦ Tổ hợp đáng chú ý', b6 + '<p class="vd-r-why">Bản này chỉ kiểm một nhóm nhỏ các tổ hợp tính được chắc chắn từ dữ liệu đang có. Jyotiṣa cổ điển có hàng trăm yoga; D9/D10 giờ đã có ở hai tab riêng phía trên (Lagna, chủ tinh, vargottama, vài chỉ dấu chính), nhưng phần dò yoga tự động ở đây chưa mở rộng sang đó.</p>');
      }

      h += '<p class="vd-reading-foot">Một lá số không nói bạn sẽ thành gì. Nó nói bạn được đưa cho những nguyên liệu nào. Phần còn lại là chuyện bạn nấu.</p>';
      return h;
    }

    /* Chỉ kiểm những tổ hợp tính được chắc chắn từ cung/nhà đang có. */
    function detectYogas() {
      var C = VC(); if (!C) return [];
      var out = [], by = {};
      chart.planets.forEach(function (p) { by[p.id] = p; });
      function same(a, b) { return by[a] && by[b] && by[a].signIndex === by[b].signIndex; }
      function pick(id) { for (var i = 0; i < C.yogas.length; i++) if (C.yogas[i].id === id) return C.yogas[i]; return null; }
      if (same('sun', 'mercury')) out.push(pick('budha-aditya'));
      if (same('moon', 'mars')) out.push(pick('chandra-mangala'));
      if (same('jupiter', 'mars')) out.push(pick('guru-mangala'));
      if (by.moon && by.jupiter) {
        var fromMoon = ((by.jupiter.signIndex - by.moon.signIndex) + 12) % 12 + 1;
        if ([1, 4, 7, 10].indexOf(fromMoon) !== -1) out.push(pick('gajakesari'));
        /* Kemadruma: hai cung kề Mặt Trăng đều không có hành tinh nào (bỏ
           chính Mặt Trăng, và theo thông lệ bỏ cả Rahu/Ketu ra khỏi phép đếm) */
        var prev = (by.moon.signIndex + 11) % 12, next = (by.moon.signIndex + 1) % 12;
        var neighbours = chart.planets.filter(function (p) {
          return p.id !== 'moon' && p.id !== 'rahu' && p.id !== 'ketu' && (p.signIndex === prev || p.signIndex === next);
        });
        if (!neighbours.length) out.push(pick('kemadruma'));
      }
      return out.filter(Boolean);
    }

    /* ══ DAŠĀ — trục thời gian ═══════════════════════════════════════════ */
    function dashaHtml() {
      if (!chart || !chart.dasha) return '';
      var C = VC();
      var now = new Date();
      var seq = chart.dasha.sequence;
      var maha = activeAt(seq, now);
      var html = '<p>Vimśottarī Daśā chia một đời thành các giai đoạn do từng hành tinh cai quản, cộng lại đúng <strong>120 năm</strong>. Điểm khởi lấy từ chỗ Mặt Trăng đứng lúc bạn sinh — nên đây là phần phụ thuộc vào giờ sinh nhiều nhất.</p>';
      html += '<p class="vd-r-why">Lúc bạn chào đời, đại vận đang chạy dở: còn lại <strong>' +
        chart.dasha.balanceYears.toFixed(2) + ' năm</strong> của ' + esc(seq[0].viet) + '.</p>';

      if (maha) {
        var antars = calcAntardasha(maha), antar = activeAt(antars, now);
        var mLore = C && C.dashaLords[maha.lord] ? C.dashaLords[maha.lord].body : '';
        html += '<div class="vd-dasha-now">' +
          '<div class="vd-dasha-now-label">Đang trong đại vận</div>' +
          '<div class="vd-dasha-now-lord">' + esc(maha.viet) + '</div>' +
          '<div class="vd-dasha-now-range">' + fmtDate(maha.start) + ' → ' + fmtDate(maha.end) + '</div>' +
          (mLore ? '<p>' + mLore + '</p>' : '') +
          (antar ? '<p class="vd-dasha-sub">Tiểu vận hiện tại: <strong>' + esc(antar.viet) + '</strong> (' + fmtDate(antar.start) + ' → ' + fmtDate(antar.end) + ')' +
            (C && C.dashaLords[antar.lord] ? ' — ' + C.dashaLords[antar.lord].body : '') + '</p>' : '') +
          '</div>';
        if (antars.length) {
          html += '<div class="vd-table-wrap"><table class="vd-table"><caption>Tiểu vận trong đại vận ' + esc(maha.viet) + '</caption><thead><tr><th>Tiểu vận</th><th>Từ</th><th>Đến</th></tr></thead><tbody>' +
            antars.map(function (a) {
              return '<tr' + (a === antar ? ' class="vd-row-now"' : '') + '><td>' + esc(a.viet) + '</td><td>' + fmtDate(a.start) + '</td><td>' + fmtDate(a.end) + '</td></tr>';
            }).join('') + '</tbody></table></div>';
        }
      }

      html += '<div class="vd-table-wrap"><table class="vd-table"><caption>Toàn bộ chuỗi đại vận</caption><thead><tr><th>Đại vận</th><th>Từ</th><th>Đến</th><th>Dài</th></tr></thead><tbody>' +
        seq.map(function (d) {
          return '<tr' + (d === maha ? ' class="vd-row-now"' : '') + '><td>' + esc(d.viet) + (d.partial ? ' <span class="vd-muted">(chạy dở lúc sinh)</span>' : '') +
            '</td><td>' + fmtDate(d.start) + '</td><td>' + fmtDate(d.end) + '</td><td>' + d.years.toFixed(1) + ' năm</td></tr>';
        }).join('') + '</tbody></table></div>';
      html += '<p class="vd-r-why">Quy ước: 1 năm = 365,2425 ngày. Một số phái dùng năm 360 ngày, khi đó các mốc xa sẽ lệch vài tháng. Daśā nói về <em>khí</em> của một giai đoạn, không hứa một kết quả cụ thể nào.</p>';
      return html;
    }

    function fmtDate(d) {
      if (!(d instanceof Date) || isNaN(d.getTime())) return '—';
      return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
    }

    function aspectsHtml() {
      var aspects = calcAspects(chart.planets);
      if (!aspects.length) return '<p class="vd-muted">Không có góc hợp đặc biệt.</p>';
      var benefics = ['moon', 'mercury', 'jupiter', 'venus'];
      var rows = aspects.map(function (a) {
        var pf = chart.planets[a.from], pt = chart.planets[a.to], good = benefics.indexOf(pf.id) !== -1;
        return '<tr><td>' + esc(pf.viet) + '</td><td>' + esc(pt.viet) + '</td><td>' + a.house + '</td><td class="' + (good ? 'vd-good' : 'vd-bad') + '">' + (good ? 'Cát' : 'Hung') + '</td></tr>';
      }).join('');
      return '<div class="vd-table-wrap"><table class="vd-table"><thead><tr><th>Từ</th><th>Đến</th><th>Nhà</th><th>Tính chất</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    }

    function renderResultsBody() {
      if (!chart) return;
      var v = state.activeView;
      var views = {
        chart: card(h2('Bản đồ sao (Kundli)') + chartHtml()),
        cards: card(h2('Thẻ hành tinh') + planetCardsHtml()),
        table: card(h2('Bảng vị trí hành tinh') + planetsTableHtml()),
        nak: card(h2('Vòng Nakshatra') + nakRingHtml(state.nakPlanetId)),
        d9: card(h2('Navāṁśa (D9) — hôn nhân & nội lực') + vargaBlockHtml(chart.d9, 9)),
        d10: card(h2('Daśāṁśa (D10) — sự nghiệp') + vargaBlockHtml(chart.d10, 10))
      };
      el.resultsBody.innerHTML = views[v] +
        card(h2('Góc hợp (Aspects)') + '<p class="vd-hint">Mọi hành tinh chiếu nhà 7; Sao Hỏa thêm 4 &amp; 8; Sao Mộc thêm 5 &amp; 9; Sao Thổ thêm 3 &amp; 10.</p>' + aspectsHtml()) +
        card(h2('Vận hạn — Vimśottarī Daśā') + dashaHtml()) +
        card(h2('Luận giải') + readingHtml());
      wireResultInteractions();
    }

    function wireResultInteractions() {
      qsa(el.resultsBody, '[data-vd-planet]').forEach(function (n) {
        n.addEventListener('mouseenter', function () { highlightPlanet(n.dataset.vdPlanet, true); });
        n.addEventListener('mouseleave', function () { highlightPlanet(n.dataset.vdPlanet, false); });
      });
      qsa(el.resultsBody, '[data-vd-house]').forEach(function (n) {
        n.addEventListener('click', function () { openHousePanel(Number(n.dataset.vdHouse)); });
      });
      var sel = qs(el.resultsBody, '#vdNakSel');
      if (sel) sel.addEventListener('change', function (e) { state.nakPlanetId = e.target.value; renderResultsBody(); });
    }

    function highlightPlanet(idx, on) {
      qsa(el.resultsBody, '[data-vd-planet="' + idx + '"]').forEach(function (n) {
        n.classList.toggle('vd-planet-hl', on);
      });
    }

    function openHousePanel(houseNum) {
      state.selectedHouse = houseNum;
      el.housePanel.innerHTML = housePanelHtml(houseNum);
      el.houseOverlay.hidden = false;
      var closeBtn = qs(el.housePanel, '.vd-close-panel');
      if (closeBtn) closeBtn.addEventListener('click', closeHousePanel);
    }
    function closeHousePanel() { state.selectedHouse = null; el.houseOverlay.hidden = true; }
    el.houseOverlay.addEventListener('click', function (e) { if (e.target === el.houseOverlay) closeHousePanel(); });

    // ---- restore from share link ----
    function restore() {
      var params = new URLSearchParams(window.location.search);
      if (!params.get('vdbd')) return;
      state.formName = params.get('vdbn') || ''; el.name.value = state.formName;
      state.formDate = params.get('vdbd') || ''; el.date.value = state.formDate;
      state.formTime = params.get('vdbt') || ''; el.time.value = state.formTime;
      var lat = parseFloat(params.get('vdla')), lon = parseFloat(params.get('vdlo')), tz = parseFloat(params.get('vdtz'));
      var nt = params.get('vdnt'); if (nt === 'true' || nt === 'mean') { state.nodeType = nt; el.nodeType.value = nt; }
      /* `vddst` là tham số của bản cũ (checkbox DST bấm tay, đã bỏ) — cố tình
         KHÔNG đọc nữa: offset giờ tự suy ra từ tzid nên cộng thêm 1 giờ sẽ sai.
         Link chia sẻ cũ vẫn mở được, chỉ là giờ được tính đúng hơn. */
      var tzid = params.get('vdtzid') || null;
      if (!isNaN(lat) && !isNaN(lon) && !isNaN(tz)) {
        state.selectedLocation = { city: params.get('vdlc') || 'Vị trí đã lưu', admin: '', country: '', lat: lat, lon: lon, tz: tz, tzid: tzid };
        renderSelectedLocation();
        state.step = 2; renderSteps(); renderUtcPreview();
        state.isComputing = true; renderSteps();
        runComputeSequence();
      }
    }

    el.time.disabled = state.unknownTime;
    renderSteps();
    restore();
  }

  function boot() {
    var root = document.getElementById('vdApp');
    if (!root) return;
    init(root);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
