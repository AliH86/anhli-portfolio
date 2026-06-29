// ============================================================
// music-data.js — NGUỒN DỮ LIỆU NHẠC CHÍNH của trang Anh Li.
// ------------------------------------------------------------
// MUỐN THÊM / SỬA ALBUM, CHỈ SỬA FILE NÀY — không đụng index.html.
// • Khớp album theo "id": id trùng → ghi đè (cover, name, sub, desc, tracks);
//   id mới → thêm album mới vào sạp.
// • Mỗi track: { id, name, dur }  (id = mã Suno; dur = "m:ss").
// • cover: đường dẫn ảnh trong repo, vd "uploads/ten-album.jpg".
// Sửa xong → chạy script push (vd finish-push.command) là lên live ngay,
// KHÔNG cần đổi số version ở đâu cả (index.html tự cache-bust mỗi lần tải).
// (index.html vẫn giữ một bản dữ liệu dự phòng phòng khi file này lỗi tải.)
// ============================================================
window.PORTFOLIO_MUSIC = {
  version: "2026-06-29-1",
  source: "Playlists curated by Anh Li",
  albums: [
    {
      id: "c6672b33-6803-4fa3-8c9d-900d15dfaf2d",
      playlistUrl: "https://suno.com/playlist/c6672b33-6803-4fa3-8c9d-900d15dfaf2d",
      name: "01KhoảngLặng",
      sub: "Lo-fi Hip-hop · Vietnamese R&B · Cinematic Soul",
      cover: "uploads/khoang-lang.svg",
      desc: "01KhoảngLặng là góc nhỏ để ngồi lại giữa những ngày ồn ào. Từ mưa, piano cũ, boom-bap chậm, R&B khàn đến rap tự sự, playlist đi qua nhiều sắc thái cô đơn và học cách buông nhẹ. Đây là những bài hát để nghe khi cần một khoảng lặng riêng.",
      count: 8,
      tracks: [
        {id:"cd33b9bf-5cc1-409e-833f-865b13fdb10b", name:"01KhoảngLặng....", dur:"3:23"},
        {id:"468409c6-0ef0-42fc-bf0b-c9d44fff4ba1", name:"Ta có thể khóc không?", dur:"3:44"},
        {id:"9ecaada6-8cba-49c7-b420-8a09ab5c3101", name:"Cry The Rain", dur:"3:23"},
        {id:"dabc255b-9048-42cf-952e-efa5755d8311", name:"dday doesn't 5...", dur:"3:39"},
        {id:"906cdce3-1030-47ed-9036-a0b7a398adb6", name:"Bạn tình Cô đơn!", dur:"4:43"},
        {id:"95047cbf-54f0-4e1a-8116-612b0e40ae27", name:"Anh Glitch Một Mình...", dur:"3:27"},
        {id:"54f44e62-baf9-493f-b712-95e7c7c7abae", name:"Nhảy vào Mưa....", dur:"4:20"},
        {id:"7bc4edd1-5bf5-4426-b929-98834bea6c1e", name:"Duyên, Hợp, Tan", dur:"3:14"}
      ]
    },
    {
      id: "560a4089-5871-4536-8375-785f7a2f8dca",
      name: "Những Kẻ DRILL Loves",
      sub: "Dark R&B · Drill · D'Li & SEN[SE] da Band",
      cover: "uploads/nhung-ke-drill-loves.jpg",
      desc: "Những kẻ yêu bằng bản năng, giữ vết thương như kỷ niệm, biến cảm xúc thành âm thanh — tình yêu với đủ gương mặt: đẹp đẽ, hỗn loạn, ngông cuồng, quyến rũ và buồn bã.",
      count: 12,
      tracks: [
        {id:"97ab34d8-8a6d-4b66-acf2-cdce31987e25", name:"Phai Nhat Phai...", dur:"3:08"},
        {id:"adbe7826-8f50-42e3-ae14-9cd0c6a251a7", name:"Quên Đi Nhớ Chi?!", dur:"3:41"},
        {id:"14a7e8d3-6cc8-4b9d-acca-ee463d8122f9", name:"Những kẻ Drill Loves", dur:"2:36"},
        {id:"21c513f1-619f-44b1-9738-6ad030e5b29b", name:"Ex-Cursed Me", dur:"3:47"},
        {id:"8e11c0e5-4c85-40ef-8ec2-8087e3dcb3d9", name:"Track này không thể Delete!", dur:"3:45"},
        {id:"31cbee82-0d6d-4ab9-960e-94c29920e3df", name:"Như Chưa Từng Thương", dur:"3:52"},
        {id:"2b64256d-1c14-4fdc-90c3-8e14d6b03f6d", name:"Tan hết vào gió…", dur:"3:28"},
        {id:"159a30ea-b21a-434b-936b-958734b800fe", name:"Đừng vây mà, bae~", dur:"3:49"},
        {id:"7b162469-4032-439a-b3c6-2e12d20b10af", name:"Tình ảo's", dur:"2:42"},
        {id:"96ad72a0-2c6f-4894-b8d6-ea538d0b9a85", name:"Baby à, nhắm trúng tim em rồi đấy...", dur:"2:42"},
        {id:"229d579c-7ace-43cf-b0b0-a59d9c9332ec", name:"Đố elm Si ah!", dur:"2:51"},
        {id:"419a558c-8f8a-4401-81be-826eec0ff7e8", name:"Đom đóm; Ánh sao và Mắt em", dur:"3:32"}
      ]
    },
    {
      id: "2818d6f0-318d-4aad-94ac-027ccc756ec4",
      playlistUrl: "https://suno.com/playlist/2818d6f0-318d-4aad-94ac-027ccc756ec4",
      name: "Unplugged Vol.1",
      sub: "Acoustic · Indie Folk · Hát mộc",
      cover: "uploads/Unplugged-vol1.jpg",
      desc: "Hát mộc chữa lòng lành liền một mạch— qua nhiều lát cắt đời thường, bằng những cảm xúc rất riêng....",
      count: 10,
      tracks: [
        {id:"3b949f7a-601e-4206-a610-e55ed9a03c24", name:"9PM", dur:"2:18"},
        {id:"8b81a6e1-d7c2-41d9-84d2-7f27609cc099", name:"Bí Kíp Luyện Deadlines", dur:"3:16"},
        {id:"f06e6c2a-b56c-4784-aebb-b2a68cd84ed3", name:"Nào, cho mượn bờ vai này", dur:"3:14"},
        {id:"f2dfd824-606d-4f9c-ac6c-364ff94b405d", name:"An(h) Yên, Quên Phiền", dur:"4:36"},
        {id:"aa8e1283-e121-416f-a054-c573ce0291f2", name:"Có Sao Đâu (It's Alright)", dur:"3:33"},
        {id:"6e96c3d7-41fc-4841-800b-b4764b862c3c", name:"Tôi yêu....", dur:"2:51"},
        {id:"75c08a9c-2c7c-4024-9a6e-2ad25bf1fce3", name:"Con đường ta đi", dur:"3:46"},
        {id:"5c3f3c0d-d9f1-4e7e-b864-982832e07295", name:"Chạm vào ánh nắng.", dur:"4:38"},
        {id:"89f1c8f1-57a3-4395-8b1b-d8c755eb5909", name:"Hiên nhà của 50...", dur:"3:54"},
        {id:"8e79698b-0423-46b9-8bbc-f000197d4def", name:"Đêm nay thì không...", dur:"3:28"}
      ]
    },
    {
      id: "15c4b5fa-3d24-4a7c-b1bf-6ca2420d81c7",
      playlistUrl: "https://suno.com/playlist/15c4b5fa-3d24-4a7c-b1bf-6ca2420d81c7",
      name: "Unplugged Vol.2",
      sub: "Acoustic · Bossa Nova · Indie Folk",
      cover: "uploads/Unplugged-vol2.jpg",
      desc: "Tiếp mạch hát mộc — lần này đong đưa hơn một chút, có bossa, có gió. Những bài hát như chiếc võng trước hiên nhà: chậm rãi, êm, và rất đời.",
      count: 9,
      tracks: [
        {id:"ceec7c53-c045-4455-9b79-6d72cc29a56e", name:"Đừng lỡ nhịp!", dur:"3:08"},
        {id:"76655d83-8252-4fda-97ae-9db85cc9de37", name:"Nẹh Têh...", dur:"2:44"},
        {id:"976a442f-08d6-4dee-92ed-f84e60045b6d", name:"Đi nhớ trở về", dur:"3:17"},
        {id:"47a44699-a285-45d9-8c6e-c25bab5e0898", name:"Mơ Ngọt", dur:"3:35"},
        {id:"0fff744e-1553-4b9f-977d-4b19ee5e9817", name:"Buồn Mây Bán Gió...", dur:"3:17"},
        {id:"5c9b9dee-eddd-4d29-b068-c0481e37f60b", name:"Trước hiên nhà...", dur:"5:44"},
        {id:"ebe6bc52-0ac4-4930-aaeb-97e6588b79a4", name:"Đời tự lo", dur:"4:01"},
        {id:"86500156-b834-4f87-b194-a6cd80efb068", name:"Ai bằng mình đâu?", dur:"5:14"},
        {id:"e5fcd0cc-9be3-47b5-86ff-56f7bc2afbed", name:"Cho tất cả Chúng Ta", dur:"4:00"}
      ]
    },
    {
      id: "b1021057-56bd-49e8-a1fb-5af4d69c2c0e",
      playlistUrl: "https://suno.com/playlist/b1021057-56bd-49e8-a1fb-5af4d69c2c0e",
      name: "Mỹ Vị Nhân Sinh",
      sub: "Alt-Indie Folk · Anh Li",
      cover: "uploads/My-vi-nhan-sinh.jpg",
      desc: "Một lát cắt về cuộc đời muôn vị. Có cay để nhớ, có đắng để thấm, có ngọt để thương, có nhạt để bình yên. Với Anh Li, mỗi hương vị đi qua đời người đều là một cách thế gian kể chuyện...",
      count: 7,
      tracks: [
        {id:"142b3ba1-12a5-4fdc-96d5-ce5984f90e12", name:"Ngọt Lạc", dur:"2:39"},
        {id:"98dac03b-7ba7-4889-80aa-d5d5e9e9a05d", name:"Đúng Đắng", dur:"2:14"},
        {id:"152d5bf6-119e-4c39-b712-68f3b7ebc1e8", name:"Chua Cay Tự Tình"},
        {id:"fb44f4ac-3615-4766-b323-99215101017b", name:"Thương Mầm Muối Mặn"},
        {id:"1d4cb85c-8889-4499-8c29-b8a45ed7d690", name:"Hồi (T)hương"},
        {id:"301f5020-6c93-4a82-9236-dcbd7498f2d3", name:"Chát Buồn Buồn Chát - Ft D'Li"},
        {id:"4fbb1f41-8966-4d15-8cde-e43135debf0b", name:"Thế Gian Thêm Vị"}
      ]
    },
    {
      id: "35ce4803-2ec5-405a-abdb-4a4a2cbf64a1",
      playlistUrl: "https://suno.com/playlist/35ce4803-2ec5-405a-abdb-4a4a2cbf64a1",
      name: "Cả Biển Trời Trong Mắt",
      sub: "Ballad Collection · Anh Li · Healing Pop",
      cover: "uploads/ca-bien-troi-trong-mat.jpg",
      desc: "Ballad Collection dịu sâu từ Cái Sạp Nhạc của Li — nơi những câu chuyện tình, ký ức, chia xa và chữa lành được kể bằng giai điệu chậm, gần, và nhiều khoảng thở...",
      count: 9,
      tracks: [
        {id:"06bf905f-1765-4369-a706-4197d6f76801", name:"[Lỗi 404] Chợt Nhớ Lúc Quên Em.", dur:"3:43"},
        {id:"10d67ecd-8ef6-4dc6-98bf-35e502e25af0", name:"Xin đừng nói câu gì...", dur:"3:22"},
        {id:"2aa5616a-016e-4867-ac87-b0d0ad861e2f", name:"Lạc Lối...", dur:"4:49"},
        {id:"91b5c27d-c383-4a6d-8b34-75464148322d", name:"Mùa giáng sinh đi qua..", dur:"3:40"},
        {id:"fbc726bb-7ca1-433a-baf2-4208f60928ad", name:"Nhớ em...nhiều", dur:"4:52"},
        {id:"97edf55c-f92c-4e49-b100-5e1ba5da11b5", name:"Cả biển trời trong", dur:"4:52"},
        {id:"448b3ec7-c670-4f51-85dd-ae4cebf6a42c", name:"Điều Anh Thấy...", dur:"3:55"},
        {id:"295c3f26-330d-47d6-ab2e-7440f0b4dcb2", name:"Nhớ hay Quên!", dur:"4:33"},
        {id:"906cdce3-1030-47ed-9036-a0b7a398adb6", name:"Bạn tình Cô đơn!", dur:"4:43"}
      ]
    },
    {
      id: "1c504bd2-2249-4fca-931a-f1c992581a25",
      playlistUrl: "https://suno.com/playlist/1c504bd2-2249-4fca-931a-f1c992581a25",
      name: "MiTek · Way of Stars",
      sub: "EDM · Stadium · Show",
      cover: "uploads/WoS-MiTek.jpg",
      desc: "Nhạc dựng cho đêm gala “Way of Stars” — từ anthem khai màn tới khoảnh khắc sáng đèn cuối show, cả khán phòng cùng hát.",
      count: 5,
      tracks: [
        {id:"a03438fa-df97-4d68-917d-82b2f9c9086e", name:"[Way of STARS] -We are The Stars Tonight-D'Li", dur:"4:46"},
        {id:"6f0dfec6-8e3b-47cc-8d5f-bbddf941d67f", name:"Way of STAR — Master"},
        {id:"59b37b9a-9fe7-4c1a-9cc3-acce0a8a6377", name:"Gọi Tên Những Vì Sao"},
        {id:"5f686228-97f3-4c13-bd26-daac9b75b1cd", name:"Mitek-nista...", dur:"3:18"},
        {id:"e1ee21d5-f187-407c-b751-198c2a28c074", name:"Lovers Gonna Love (Electro House Edit)", dur:"3:37"}
      ]
    },
    {
      id: "df0c36ec-4afd-4760-9aa3-3b05350a1b87",
      playlistUrl: "https://suno.com/playlist/df0c36ec-4afd-4760-9aa3-3b05350a1b87",
      name: "Tôi ❤ Việt Nam",
      sub: "Patriotic · Pop · Epic",
      cover: "uploads/toi-yeu-vn.jpg",
      desc: "Yêu nước là không phải nói... Những khúc ca viết cho dải đất hình chữ S — hào sảng, tự cường và đầy thương mến.",
      count: 8,
      tracks: [
        {id:"f8628247-b5d2-4839-b501-8308976c1615", name:"HẸN ƯỚC BẮC NAM - Cover", dur:"5:03"},
        {id:"9bd3da93-4f91-4053-a88e-8d09109d29d5", name:"Viết Tiếp Ước Mơ", dur:"4:42"},
        {id:"4d8aa486-6064-41b7-a890-84c01cc2cc8e", name:"Vững Hậu Phương Vươn Tiền Tuyến...", dur:"4:57"},
        {id:"93aab150-3285-4534-b71c-97c8d408371a", name:"Tiếng Vọng Non Sông", dur:"4:11"},
        {id:"f6adf1b5-3075-46fe-8b85-fb6b7177b182", name:"Đất Trời Nước Nam", dur:"4:41"},
        {id:"99752465-a1c0-4e7e-a3ac-563dd22bba1b", name:"Một Việt Nam!", dur:"4:32"},
        {id:"4c3815e9-5c08-48d4-88b0-cfbcd1356c0b", name:"Một Việt Nam Vươn Cao", dur:"4:58"},
        {id:"1e75456e-d27d-4e85-9afc-9c5d67cd50f0", name:"Khúc ca Việt tự hào", dur:"4:26"}
      ]
    },
    {
      id: "8f2c17b4-cb70-46e1-9f2e-464ccadaf1ab",
      playlistUrl: "https://suno.com/playlist/8f2c17b4-cb70-46e1-9f2e-464ccadaf1ab",
      name: "Đi Khắp Một Dãy Non Sông",
      sub: "Vietnam Travel · Folk Pop · Anh Li",
      cover: "uploads/di-khap-mot-day-non-song.jpg",
      desc: "Một hành trình âm nhạc đi qua những miền non sông Việt Nam — gom phong cảnh, ký ức và tình quê thành một dải thanh âm.",
      count: 0,
      tracks: []
    },
    {
      id: "549189a6-43bd-4112-b3cc-f6a05105b082",
      playlistUrl: "https://suno.com/playlist/549189a6-43bd-4112-b3cc-f6a05105b082",
      name: "Tình Vuu-verse",
      sub: "City Pop · Dream Pop · Bossa Nova · Jazz Moods",
      cover: "uploads/tinh-vuu-verse.jpg",
      desc: "Một thế giới âm nhạc cho những tâm hồn mềm và những đêm chưa muốn ngủ. Tình Vuu-verse gói lại tình yêu, nỗi nhớ và chút mộng mị trong một không gian vừa cổ điển, vừa rất thành thị...",
      count: 8,
      tracks: [
        {id:"c321302b-bd2d-473b-a72c-cc5a2b3ff445", name:"Điệu Valse say vòng xoay...", dur:"4:30"},
        {id:"1a222b30-6000-4546-941b-61570bf0b7f2", name:"Đâu Ai chờ Ai", dur:"2:54"},
        {id:"1b94288e-54c5-4f8a-ab77-b99426cb54a4", name:"Hơi Đ-Đ-Đau", dur:"2:52"},
        {id:"de26016d-ddb2-475b-8ac0-78ca23adfb15", name:"Xin lỗi, tôi yêu nhầm", dur:"2:33"},
        {id:"eb1d4984-bef7-4e36-9ce2-0d87686a4e59", name:"Em Mơ", dur:"3:38"},
        {id:"3cde4f67-64c8-40ed-930d-41dc431f24ee", name:"Tình Vu Verse", dur:"2:42"},
        {id:"5b3596a6-f12a-4234-85ef-5fa4732c9073", name:"Tình Cũng Như Không", dur:"4:34"},
        {id:"ef551951-2f3e-42b0-8c1c-35cd5a8b485e", name:"Tắt Đèn", dur:"3:17"}
      ]
    }
  ]
};
