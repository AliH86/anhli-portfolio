# CODEX PRODUCTION MASTER PROMPT
## ANH LI — THE DANDELION GARDEN

**Project:** `portfolio-garden-v2`  
**Working directory:** `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/portfolio-garden-v2`

**Primary attached handoff:**  
`Dandelion Garden - Locked Handoff (standalone).html`

---

## 0. MỤC TIÊU

Tiếp tục từ checkpoint hiện tại của project.

Không restart redesign.  
Không mở lại IA.  
Không rewrite shell hiện có.  
Không đổi route model, navigation vocabulary, player architecture hoặc world geography đã khóa.

Mục tiêu từ đây là chuyển hệ thống hiện tại từ:

**UI + technical blockout**

thành:

**production-quality scenic 3D portfolio world**

với chất lượng visual đủ cao để một screenshot tĩnh ở từng state có thể đứng độc lập như một hero visual hoàn chỉnh.

---

## 1. SOURCE OF TRUTH

File:

`Dandelion Garden - Locked Handoff (standalone).html`

là **SOURCE OF TRUTH** cho:

- UX/UI composition
- spatial hierarchy
- L12 world landmarks
- camera anchors
- host scale / placement
- day/night logic
- mobile behavior
- content layout
- interaction intent
- acceptance criteria

### Cách hiểu file handoff

File handoff là:

**prototype / annotated composition guide**

Nó KHÔNG phải:

**final environment artwork**

Các khối, gradient, primitive, hill shape, rectangle và placeholder trong handoff chỉ mô tả:

- vị trí
- tỷ lệ
- framing
- camera intent
- UI clearance
- spatial relationship

Không được lấy primitive look đó làm final visual language.

---

## 2. THỨ TỰ ƯU TIÊN GIỮA CÁC NGUỒN

Nếu có mâu thuẫn:

1. `Dandelion Garden - Locked Handoff (standalone).html`
2. implementation contract / current session handoff trong repo
3. approved project decisions / decision log
4. existing blockout geometry
5. temporary placeholder art

**Blockout luôn có priority thấp nhất về art direction.**

Blockout chỉ là technical scaffold.

---

## 3. PHẦN ĐÃ LOCKED — KHÔNG TỰ REDESIGN

Giữ nguyên:

- `GARDEN`
- `MUSIC`
- `SHOWS`
- `VISUAL`
- `STORY`

Giữ nguyên:

- IA hiện tại
- route model hiện tại
- persistent music player architecture
- 6 L12 landmarks
- 7 camera anchors
- composition intent của từng state
- host presence hierarchy
- day/night split
- mobile navigation behavior
- no-WebGL fallback
- reduced-motion behavior
- deep-link behavior
- accessibility architecture
- current content/data model, trừ những phần cần cleanup NDA

Không:

- thêm zone mới
- thêm gameplay
- thêm egg game
- thêm free-roaming game controls
- đổi vocabulary
- đưa JOURNEY thành zone riêng
- thêm host vào SHOWS
- tự di chuyển L12 landmarks để dễ code

Nếu geometry hiện tại conflict với composition lock:

**báo blocker**

không tự dời landmark.

---

## 4. CÁC QUYẾT ĐỊNH LOCKED CUỐI

### Water

Giữ water trong V1.

Nhưng water chỉ là:

- secondary landscape element
- depth cue
- reflection layer
- breathing space khác với meadow

Không được biến thành:

- lake centerpiece
- destination mới
- landmark thứ 7
- shader demo
- fantasy water feature

Production được resolve shape theo terrain miễn không phá composition contract.

### Host A1

Host A1 giữ ở mép open yard.

Vai trò:

**arrival / chủ nhà đón khách**

Không kéo host sát cửa nhà.

Tỷ lệ:

- A1 khoảng 17% frame
- A2 khoảng 13%
- MUSIC khoảng 25%
- STORY khoảng 15%
- VISUAL khoảng 12%
- SHOWS: không host

### A1 headline

Headline A1 dùng:

`#23261F`

trên nền sáng.

Không ép chữ trắng chỉ để tạo cinematic look.

Chiều sâu phải đến từ world phía sau.

---

## 5. AVAILABLE PRODUCTION TOOLCHAIN

Bạn ĐƯỢC PHÉP và ĐƯỢC KỲ VỌNG sử dụng đúng tool cho đúng loại việc.

Toolchain khả dụng:

- Blender
- Three.js
- Adobe / Creative Cloud
- Adobe Firefly
- Canva
- SVG workflow
- raster / vector workflow
- GLB pipeline
- sprite / atlas pipeline
- texture generation / cleanup tools phù hợp

Không bắt buộc mọi thứ phải được dựng trực tiếp trong JavaScript.

### Blender ưu tiên cho

- terrain
- elevation
- house
- stall
- greenhouse
- show structure
- custom props
- path
- fence
- bench
- water-edge geometry
- architecture detail
- vegetation hero assets
- landscape geometry
- UV
- baked AO
- baked normal
- lightmap nếu phù hợp
- LOD source
- optimized GLB
- hero-world geometry cần chiều sâu thật

### Three.js ưu tiên cho

- runtime scene
- camera
- world-state transitions
- interaction
- parallax
- runtime lighting
- fog
- particles
- restrained shader work
- water shader khi phù hợp
- day/night switching
- audio-reactive details
- sprite placement
- occlusion
- responsive world behavior
- LOD switching
- performance control
- loading / disposal / lifecycle

### Adobe / Firefly ưu tiên cho

- texture source
- foliage sheet
- decal
- surface variation
- atmospheric plate
- sky/cloud source khi cần
- material reference
- texture cleanup
- sprite cleanup
- compositing
- image asset preparation
- art-direction reference nếu production cần

### Canva

Chỉ dùng nếu phù hợp cho:

- editorial graphic
- simple 2D support asset
- flat graphic
- lightweight content presentation
- temporary presentation reference

Không dùng Canva thay thế production 3D world.

---

## 6. 2D HOST SYSTEM

Host là:

**2D illustrated character inside a 3D scenic world**

Không dựng full 3D host rig trong V1.

Host cần cảm giác:

- adult male
- mature
- warm
- casual creative
- glasses
- slightly soft/chubby build
- calm
- human
- not chibi
- not kawaii
- not game mascot
- not anime-boy

Production có thể dùng Adobe / Firefly / illustration workflow để tạo hoặc cleanup source frames.

Codex chịu trách nhiệm runtime:

- sprite atlas
- frame sequencing
- idle loop
- blink
- breathing
- micro gesture
- context-specific loop
- state trigger
- responsive scale
- contact shadow
- lighting tint
- occlusion
- depth integration
- reduced-motion fallback

Animation phải subtle.

Không biến host thành game avatar.

---

## 7. PRODUCTION PRINCIPLE

Không cố dựng mọi asset bằng Three.js primitive chỉ vì nhanh.

Nếu asset cần:

- silhouette tốt
- texture
- material
- believable volume
- surface detail
- spatial weight

thì ưu tiên dựng trong Blender rồi export GLB.

Nếu asset là:

- decal
- foliage sheet
- atmospheric plate
- illustration
- sprite
- texture

thì dùng Adobe / Firefly / image workflow phù hợp.

Nếu asset procedural mà không ảnh hưởng quality:

có thể dùng Three.js.

### Mục tiêu

**FINAL QUALITY > số lượng code**

---

## 8. QUALITY BAR — FINAL WORLD

Final world phải đọc như một:

**true scenic 3D environment**

Không phải:

**flat plane + props**

Không chấp nhận:

- generic low-poly aesthetic
- house dạng box primitive final
- greenhouse primitive final
- stall primitive final
- Roblox-like look
- toy-world look
- generic Three.js demo
- asset-pack collage thiếu thống nhất
- chỉ dùng fog/bloom để che geometry yếu
- cây copy-paste lặp vô hồn
- background phẳng không có atmospheric depth

Bắt buộc có:

- foreground
- midground
- background
- terrain elevation
- horizon layering
- atmospheric perspective
- contact shadows
- natural occlusion
- depth-aware vegetation
- parallax
- cinematic camera composition
- believable material
- lighting tạo volume
- restrained reflections
- scale variation
- vegetation density variation
- visual breathing space

Một screenshot tĩnh phải đủ đẹp ngay cả khi:

- không hover
- không animate
- không particle
- không camera travel

Animation không được dùng để cứu một static scene yếu.

---

## 9. COMPOSITION PRIORITY

Mỗi state phải ưu tiên theo thứ tự:

1. composition
2. visual depth
3. lighting
4. material
5. vegetation
6. host grounding
7. motion
8. optimization

Không đảo thứ tự này.

Đặc biệt:

**Motion chỉ làm sau khi static composition đã được duyệt.**

---

## 10. MANDATORY PRODUCTION GATE

### PHASE 1 — GARDEN ART DIRECTION PROOF

Chỉ production `GARDEN` trước.

Không rollout:

- MUSIC
- SHOWS
- VISUAL
- STORY

trước khi Garden được explicit visual approval.

Garden proof phải gần-final ở:

- terrain
- elevation
- house
- stall
- greenhouse
- vegetation
- water
- path
- hero props
- materials
- lighting
- atmosphere
- horizon
- depth
- host integration
- camera
- composition
- UI clearance

### Trước khi xin duyệt Garden

Phải cung cấp:

1. desktop screenshot
2. mobile screenshot
3. asset list dùng Blender
4. asset list procedural / Three.js
5. texture / sprite source dùng Adobe / Firefly
6. sơ bộ performance budget
7. known limitation
8. blocker nếu có

### STOP GATE

Sau khi Garden proof đã sẵn sàng:

**DỪNG**

Chờ visual approval.

Không tiếp tục full world rollout.

---

## 11. BLOCKER FORMAT

Nếu thiếu direction hoặc asset, không tự bịa substitute.

Dùng đúng format:

```text
ASSET BLOCKER:
- ...

DESIGN BLOCKER:
- ...

TECH BLOCKER:
- ...
```

Nếu có thể tiếp tục phần khác mà không tạo technical debt hoặc visual drift, có thể làm.

Nếu không:

dừng ở checkpoint sạch.

---

## 12. AFTER GARDEN APPROVAL

Chỉ sau khi Garden được approve mới rollout:

1. MUSIC
2. SHOWS
3. VISUAL
4. STORY
5. host sprite loops
6. camera travel
7. environmental motion
8. audio-linked motion
9. final LOD
10. responsive polish
11. accessibility
12. no-WebGL
13. reduced motion
14. final QA

---

## 13. SESSION / USAGE MANAGEMENT

Production phase sẽ nặng.

Không cố nhồi quá nhiều scope vào một session.

### Khi usage còn khoảng 5%

hoặc không còn đủ budget an toàn để hoàn thành task hiện tại:

**DỪNG mở task mới.**

Lúc đó bắt buộc:

- hoàn tất phần đang làm về trạng thái ổn định
- không để scene/code half-broken
- chạy smoke test cần thiết
- ghi rõ phần đã xong
- ghi rõ file đã thay đổi
- ghi known issue
- ghi blocker
- ghi decision mới
- ghi next exact step
- update `SESSION-HANDOFF.md`
- wrap-up cho session sau

Ưu tiên:

**wrap-up sạch > cố làm thêm**

Không dùng 5% cuối để mở một production task mới.

### Chủ động chia session

Ví dụ:

- Session A — terrain + camera
- Session B — architecture assets
- Session C — vegetation + material
- Session D — lighting + atmosphere
- Session E — host integration
- Session F — Garden QA + optimization

Một session nên có:

**một production goal rõ ràng**

---

## 14. FOLDER DISCIPLINE

Production bắt đầu nặng.

Không được để asset rải lung tung.

Trước khi production asset tăng mạnh, chuẩn hóa folder.

Đề xuất:

```text
/assets
  /3d
    /source-blender
    /glb
    /lod

  /textures
    /source
    /optimized
    /decals
    /foliage

  /sprites
    /host
      /source
      /atlases
      /approved

  /environment
    /garden
    /music
    /shows
    /visual
    /story

  /references
    /claude-handoff
    /art-direction

  /renders
    /garden-proof
    /qa

  /audio

  /archive

/docs
  /handoff
  /production
  /qa
  /decisions
```

Nếu repo hiện có structure tương đương tốt hơn:

**adapt thay vì tạo duplicate tree**

Nhưng phải bảo đảm:

- source rõ
- runtime rõ
- approved rõ
- archive rõ
- QA evidence rõ

Không để asset mới ở:

- root
- random public folder
- tmp
- cạnh source code chỉ vì tiện
- Desktop-style naming

---

## 15. SOURCE / RUNTIME SPLIT

Không destructive workflow.

Ví dụ:

```text
garden-house.blend
```

là source.

```text
garden-house.glb
```

là runtime export.

Không overwrite source để tiết kiệm file.

Tương tự:

- PSD / source texture
- optimized web texture
- sprite source
- sprite atlas
- master Blender
- optimized GLB

phải tách rõ.

---

## 16. ASSET MANIFEST

Tạo hoặc duy trì:

`docs/production/ASSET-MANIFEST.md`

Mỗi asset quan trọng nên có:

- asset name
- category
- source file
- runtime file
- tool used
- state usage
- status
- polycount nếu có
- texture resolution
- LOD
- optimization status
- license/source nếu asset ngoài
- notes

Status gợi ý:

- `draft`
- `proof`
- `approved`
- `optimized`
- `integrated`

---

## 17. DECISION LOG

Duy trì:

`docs/decisions/DECISION-LOG.md`

Chỉ ghi những quyết định có khả năng bị session sau hiểu sai.

Ít nhất phải giữ các decision:

- Claude handoff = prototype/composition source, không phải final art
- blockout = technical scaffold
- water giữ nhưng secondary
- host A1 ở mép yard
- Shows không host
- no generic low-poly final
- Blender preferred for hero geometry
- Garden approval bắt buộc trước rollout
- no autoplay
- family V1 = traces only
- no 3D host rig
- no egg game
- no publish without approval

---

## 18. VERSIONING / NAMING

Không tạo naming kiểu:

- final
- final2
- final-final
- latest2
- use-this-one
- test-new-new

Ưu tiên stable naming + git history.

Đối với binary file khó diff như `.blend`, có thể lưu milestone có chủ đích.

Ví dụ:

```text
garden-world_MASTER.blend
garden-world_APPROVED-01.blend
```

Chỉ tạo milestone khi có lý do.

Không tạo version spam.

---

## 19. PROOF BEFORE POLISH

Mọi hạng mục production nên đi theo:

```text
BLOCK
→ PROOF
→ APPROVAL
→ OPTIMIZE
→ INTEGRATE
→ QA
```

Không:

```text
BLOCK
→ ANIMATE
→ SHADER
→ OPTIMIZE
→ phát hiện composition sai
```

---

## 20. PERFORMANCE BUDGET

Performance phải được theo dõi từ sớm.

Nhưng:

**performance optimization không được tự động làm giảm art direction quality**

Theo dõi:

- draw calls
- triangle count
- texture memory
- GLB size
- DPR cap
- shader cost
- vegetation count
- mobile load
- LOD behavior
- fallback behavior

Nếu một visual choice vượt budget:

**báo trước**

Không tự low-poly hóa hero asset mà không báo.

---

## 21. DEFINITION OF DONE CHO MỖI PRODUCTION TASK

Một task asset không được mark `done` chỉ vì “model xong”.

Ví dụ task `Garden House` chỉ được coi là hoàn tất khi:

- source file lưu đúng folder
- runtime export tồn tại
- texture path sạch
- optimized web asset tồn tại
- naming sạch
- integrated vào scene
- camera check pass
- screenshot evidence có
- asset manifest cập nhật
- no console error
- no obvious visual regression

Task khác áp dụng logic tương tự.

---

## 22. QA EVIDENCE

Mỗi state final cần có screenshot QA.

Kiểm tra:

- composition
- landmark placement
- horizon
- camera crop
- host scale
- UI clearance
- foreground density
- lighting
- material
- mobile crop
- day/night correctness
- navigation
- audio persistence
- reduced motion
- no-WebGL
- keyboard/focus
- deep link
- network failure behavior
- GPU/performance

Không gọi một state là final nếu chỉ “chạy được”.

---

## 23. MOBILE

Mobile không phải desktop crop mù quáng.

Theo handoff locked:

- giữ camera intent
- dùng mobile-specific FOV/crop khi cần
- không free camera
- hotspot chuyển sang touch-friendly UI khi specified
- touch target >= 44px
- static/no-WebGL fallback giữ cùng hierarchy
- host không được che UI hoặc hotspot
- visual depth vẫn phải đọc được ở mobile

---

## 24. NDA / PUBLIC OUTPUT

Trước publish phải xử lý sạch:

- hidden legacy DOM
- source-readable NDA content
- inline legacy data
- repeated large HTML nếu có
- temporary confidential placeholders
- real client material chưa được phép public

Không dùng blur ảnh confidential làm giải pháp.

Nếu chưa được phép public:

dùng approved placeholder.

---

## 25. GIT / REPO SAFETY

Repo đã có history và có thể có pre-existing uncommitted/untracked files.

Không:

```text
git add -A
```

một cách máy móc.

Không:

- overwrite unrelated files
- merge/pull/rebase tự động nếu chưa được yêu cầu
- push
- deploy
- publish

Trước thay đổi lớn:

- kiểm tra current git status
- ghi rõ files dự kiến chỉnh
- giữ rollback path
- không phá pre-existing work

---

## 26. SESSION HANDOFF FORMAT

Cuối mỗi session production, update:

`SESSION-HANDOFF.md`

Format tối thiểu:

```text
# SESSION HANDOFF

## Goal của session
...

## Completed
...

## Changed files
...

## New assets
...

## QA performed
...

## Known issues
...

## Blockers
...

## Decisions made
...

## Usage / stop reason
...

## Exact next step
1. ...
2. ...
3. ...

## Do not touch
...
```

Session sau phải đọc file này trước khi tiếp tục.

---

## 27. IMMEDIATE NEXT ACTION

Bây giờ:

1. đọc `Dandelion Garden - Locked Handoff (standalone).html`
2. đọc implementation contract hiện tại
3. đọc current `SESSION-HANDOFF.md`
4. kiểm tra repo status
5. xác nhận phần nào đang locked
6. đề xuất production task split cho Garden proof
7. chuẩn hóa folder nếu cần
8. tạo/update Asset Manifest
9. tạo/update Decision Log
10. bắt đầu **Garden Art Direction Proof**
11. không rollout state khác trước visual approval

Trước khi bắt đầu build nặng, trả về ngắn gọn:

```text
CURRENT STATE:
...

LOCKED:
...

GARDEN PROOF PLAN:
...

FILES / FOLDERS TO TOUCH:
...

ASSET PLAN:
Blender:
...
Three.js:
...
Adobe / Firefly:
...

RISKS / BLOCKERS:
...

SESSION SCOPE:
...
```

Sau đó mới production.

---

## 28. FINAL RULE

**Architecture đã khóa.**

Từ đây sophistication phải đến từ:

- world design
- spatial depth
- composition
- material
- lighting
- atmosphere
- transitions
- detail

Không đến từ:

- navigation complexity
- thêm feature
- thêm zone
- thêm gameplay
- primitive gimmick

Nếu phải chọn giữa:

**nhiều thứ nhưng trung bình**

và

**ít hơn nhưng scenic, coherent và đẹp**

hãy chọn phương án thứ hai.

---

## DO NOT PUBLISH

Không push / deploy / publish khi chưa có explicit approval.
