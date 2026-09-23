# ANH LI — THE DANDELION GARDEN · LOCKED DECISIONS

Nguồn brief: `uploads/ANHLI_Claude_Wireframe_Package_v3/` (v3 là bản cai trị — đè lên mọi bản trước).
Giai đoạn hiện tại: **WIREFRAME ĐÃ GIAO** → chờ duyệt → mockup round.
File wireframe: `Dandelion Garden — Wireframe System v3.dc.html` (13 card, id: WF-01…WF-10, FLOW, STATES, OPEN).
File mockup Round 1 cũ (`Dandelion Garden — Round 1 World Frames.dc.html`): ĐÓNG BĂNG — sai direction (fantasy spectacle), chỉ giữ làm tham chiếu.

---

## LOCKS — chốt 11.09.2026, không được drift

### L1 · Một bộ vocabulary duy nhất
`GARDEN · MUSIC · SHOWS · VISUAL · STORY`
Bỏ hẳn hệ SOUND/SHOW/VISUAL/STORY. Nav và hotspot trong world dùng **đúng** các tên này — user không phải dịch hai hệ.

- GARDEN = home / return / overview
- MUSIC = Cái Sạp / listening
- SHOWS = event, show direction, case study
- VISUAL = KV, visual development, creative process
- STORY = About + career journey + memory + inspiration + personal layer

### L2 · STORY gộp hết, không có zone 3D riêng cho JOURNEY
Journey là một chapter **bên trong** Story, không phải nav item. Story chứa: About, career path, mốc đời/nghề, philosophy, personal archive, family traces, cổng optional vào Inner World / Jyotiṣa.

### L3 · Host = 2D illustrated trong world 3D (hybrid, là art-direction choice — không phải compromise)
World 3D đầy đủ + Anh Li là hình line-art 2D tích hợp có chủ ý. **Không** rig character 3D ở V1.
Character: adult male, kính, hơi mủm mỉm, casual creative, trưởng thành. KHÔNG chibi / kawaii / anime-boy / sticker dán lên.
Tích hợp: contact shadow · scale theo scene · đặt cạnh prop 3D thật · lighting/grading theo ngữ cảnh · đổi pose nhỏ · sprite-sheet nếu cần.
Camera bắt buộc theo đó: cinematic anchor, camera travel nhẹ, parallax, dolly nhẹ, **orbit hạn chế** — không bao giờ để lộ mép sprite từ góc cực.

### L4 · Mức độ hiện diện của host theo state
MUSIC = rõ nhất (vùng cá nhân nhất) · STORY = hiện diện cảm xúc · GARDEN = vai chủ nhà · VISUAL = nhẹ, như working figure · **SHOWS = hạn chế hoặc không có** (để công việc tự nói).
World vẫn là main character.

### L5 · /works adaptive, không khoá số lượng
3 Featured Works ở lớp trước · More / Archive phía sau. Hai cấp case study:
- **Full case**: Brief → Creative Frame → Space → Moment → My Role
- **Short case**: tóm tắt + role + key visuals + outcome
Không ép mọi project cùng cấu trúc chỉ để component đồng nhất.

### L6 · Nhạc xuyên state, nhưng chỉ khi user chủ động Play
Không autoplay. Play trong MUSIC → track tiếp tục khi sang GARDEN/VISUAL/STORY. Player thu nhỏ thành **global mini-control**, luôn có pause / mute / back to Music.

### L7 · Family V1 = traces only
Được dùng nhẹ: khung ảnh gia đình, tranh con vẽ, vài đồ vật nhỏ, 3 chi tiết gợi ba con gái, 1 dấu vết gợi vợ, silhouette xa / ánh đèn nhà.
CHƯA model, CHƯA sprite hoá, CHƯA thành navigation/story feature. V2 mới cân nhắc cameo.

### L8 · Đây là work-life showroom, không phải exploration game
Vòng tương tác lõi: **SEE → CHOOSE → APPROACH → VIEW → RETURN**. Mọi thứ phải gần như hiển nhiên.

> Make the experience memorable through composition, atmosphere and clarity — not through complexity.
> The sophistication should be in the world design, transitions and detail — not in making the visitor figure out how to navigate.

Ưu tiên khi thiết kế: clarity trước discovery · emotional authorship trước complexity · vào được work nhanh · một vocabulary · UI tối thiểu · đường về hiển nhiên · độ sâu khám phá nông · project count adaptive · host phụ so với world · mobile không phụ thuộc free camera.

### L9 · Story chảy khắp trải nghiệm, không chỉ nằm trong STORY
GARDEN dựng con người + home-world · SHOWS chứng minh năng lực · MUSIC cho giọng riêng và thẩm mỹ · VISUAL cho cách nghĩ · STORY nối người + nghề + gia đình + cảm hứng + tương lai.

### L10 · Ba Hạt & world clock
Ba Hạt = optional ritual (một hạt bay ngang khung, chạm thì mở, không chạm thì bay mất). **Không gate, không badge, không nhắc lại.**
World clock = lớp sống, không phải kiến trúc. Đêm làm Jyotiṣa dễ thấy hơn; `/sky` vẫn vào được mọi lúc.

### L11 · Route thật luôn tồn tại
`/flat` (đọc nhanh, không WebGL, in được, index được — cùng identity, không phải trang dự phòng xấu) · `/sap` · `/sky` · `/works/[slug]`.
`/flat` và world đọc **cùng một nguồn nội dung** — sửa một chỗ, hai bên đổi theo.
Không state nào được phép không mở được MAP.

### L12 · Sáu thứ tuyệt đối không đổi qua mọi state
Vị trí nhà · vị trí sạp · vị trí góc làm việc · đường chân trời & đồi xa · nhà kính · hình dáng sân trống.
Đây là bằng chứng duy nhất chứng minh các state là một nơi. Cần khác thì đổi ánh sáng, đổi góc camera, đổi vật mọc thêm.

### L13 · Hệ chữ & màu
Playfair Display (display/cinematic) · Be Vietnam Pro (UI) · JetBrains Mono (utility/data) · handwriting chỉ làm accent cá nhân.
Palette: earthy, warm, calm, minimal — deep forest, moss, sand, terracotta, sky, cloud.

---

## VIỆC TIẾP THEO
Wireframe đã áp L1–L13 một phần (viết trước khi có 7 câu trả lời). Trước khi sang mockup cần một pass cập nhật wireframe theo L1 (đổi nhãn hotspot SOUND→MUSIC, SHOW→SHOWS), L2 (bỏ JOURNEY khỏi nav, còn 5 mục GARDEN·MUSIC·SHOWS·VISUAL·STORY), L4 (bỏ host sprite khỏi WF-03 Shows), L5 (selector 6 ô → 3 Featured + Archive), L6 (thêm global mini-player vào mọi state).
Sau đó: mockup round 10 màn theo v3 §14.

---

## CÁCH LÀM VIỆC VỚI ANH LẬP
Gọi anh là **anh**, tự gọi **em**. Trả lời ngắn, thẳng, copy-ready. Chẩn đoán phải kèm cách sửa ngay trong cùng một câu. Chỉ đổi đúng biến số được yêu cầu — không "cải thiện" thứ chưa ai hỏi. Không kết thúc bằng câu hỏi chung chung kiểu "anh có muốn em làm thêm không".
