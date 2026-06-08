#!/bin/bash
cd "$(dirname "$0")"

echo ""
echo "📝 Đang lưu thay đổi..."
git add .

echo "💾 Đang commit..."
git commit -m "Fix mobile layout; Pinterest gallery; Momo QR; contact fix" 2>&1 | grep -v "^warning"

echo ""
echo "📤 Đang push lên GitHub..."
git push origin main 2>&1 | grep -v "^remote: Resolving\|^remote: Compressing\|^remote: Counting"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ XONG! Portfolio đã được cập nhật tại:"
echo "   👉 https://AliH86.github.io/anhli-portfolio"
echo "   (đợi ~30 giây rồi reload trang)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
read -p "Nhấn Enter để đóng..."
