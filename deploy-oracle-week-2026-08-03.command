#!/bin/bash
cd "$(dirname "$0")"
LOG="deploy-log-2026-08-03-oracle-week.txt"
exec > >(tee "$LOG") 2>&1

echo "=== Deploy 3/8/2026 — Garden Oracle: pack chiêm tinh W32 (5–12/8) + W33 (13–20/8) ==="
echo "Thời điểm: $(date)"
echo

echo "-- Dọn lock file cũ (nếu có) --"
rm -f .git/index.lock .git/HEAD.lock

echo
echo "-- Trạng thái trước khi commit --"
git status --short
git log --oneline -1

echo
echo "-- Chỉ add đúng 5 file của phiên này (không đụng phần egg/chicken đang dở) --"
git add garden-oracle-weekly-data.js \
        scripts/test-oracle-synthesis.mjs \
        ORACLE-WEEKLY-AUDIT.md \
        ORACLE-WEEKLY-AUDIT-2026-W32.md \
        deploy-oracle-week-2026-08-03.command

echo
echo "-- Commit --"
git commit -m "feat(oracle): thêm pack chiêm tinh W32 (5-12/8) và W33 (13-20/8)

Pack W31 chỉ phủ tới 4/8/2026, từ 5/8 engine rơi về baseline nên lớp thời
tiết chiêm tinh biến mất. Phiên này bù hai pack liền nhau:

- W32 (5-12/8): Hạ huyền 6/8, Sao Kim vào Thiên Bình + Mặt Trời tam hợp
  Sao Thổ 7/8, Sao Thuỷ vào Sư Tử 10/8, Sao Kim đối đỉnh Hải Vương và Sao
  Hoả vào Cự Giải 11/8, khép lại bằng nhật thực toàn phần trùng kỳ Trăng
  non ở Sư Tử đêm 12/8.
- W33 (13-20/8): chu kỳ Trăng mới lớn dần qua Xử Nữ - Thiên Bình - Bọ Cạp,
  Sao Thuỷ hội hợp Sao Mộc 15/8, Sao Hoả góc vuông Hải Vương 17/8, Thượng
  huyền 20/8.

Dữ kiện tính lại bằng Swiss Ephemeris (pyswisseph, geocentric tropical):
vị trí 00:00 UT mỗi ngày, thời điểm chính xác các góc chính, ingress cung,
pha Trăng. Giờ trong nhãn đã quy về UTC+7. Ghi rõ trong khối tuần rằng dải
toàn phần của nhật thực 12/8 không quan sát được từ Việt Nam.

lastApprovedKey chuyển sang 2026-W33-approved.

scripts/test-oracle-synthesis.mjs: bỏ chốt cứng lastApprovedKey='2026-W30-
approved' (đã lỗi thời từ khi thêm W31, làm test fail), thay bằng kiểm tra
động; bổ sung 6 ngày tháng 8 vào bộ hồi quy.

Audit 4.868.864 trường hợp/pack: 0 cờ kỹ thuật, 24/24 ô động từ-dạng,
32/32 policy hành động, khoảng chữ 83-153 cho cả hai pack.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01NiznWwEu98yMdyDYMSETRL"

echo
echo "-- Pull origin/main trước --"
git pull --no-rebase --no-edit origin main

echo
echo "-- Push lên GitHub --"
git push origin main

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ XONG! Đợi ~30-60s cho GitHub Pages build rồi mở Vườn Oracle:"
echo "   👉 https://AliH86.github.io/anhli-portfolio/"
echo "   Kiểm: rút một lượt hôm nay -> phải thấy dòng chiêm tinh + khối"
echo "   'Bối cảnh chung · 5–12/8 — Dọn chỗ trước một khởi đầu'."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
read -p "Nhấn Enter để đóng..."
