"""Build lightweight, deterministic web assets from the 78 Oracle masters."""

from pathlib import Path
import re
import sys

from PIL import Image


SOURCE = Path.home() / "Downloads" / "AnhLi_Dandelion Oracle"
TARGET = Path(__file__).resolve().parents[1] / "images" / "oracle" / "cards"
ID_PATTERN = re.compile(r"^seed-(\d+)-.+-v01\.png$")


def main() -> None:
    masters = list(SOURCE.rglob("seed-*-v01.png"))
    by_id: dict[int, Path] = {}
    for path in masters:
        match = ID_PATTERN.match(path.name)
        if not match:
            continue
        card_id = int(match.group(1))
        if card_id in by_id:
            raise SystemExit(f"Duplicate Oracle id {card_id}: {path}")
        by_id[card_id] = path

    expected = set(range(78))
    if set(by_id) != expected:
        missing = sorted(expected - set(by_id))
        extra = sorted(set(by_id) - expected)
        raise SystemExit(f"Invalid Oracle masters; missing={missing}, extra={extra}")

    TARGET.mkdir(parents=True, exist_ok=True)
    for card_id, source in sorted(by_id.items()):
        with Image.open(source) as image:
            if image.size != (1122, 1402):
                raise SystemExit(f"Unexpected dimensions for {source}: {image.size}")
            web = image.resize((720, 900), Image.Resampling.LANCZOS)
            web.save(
                TARGET / f"seed-{card_id:02d}.webp",
                "WEBP",
                quality=82,
                method=6,
                optimize=True,
            )

    total = sum(path.stat().st_size for path in TARGET.glob("seed-*.webp"))
    print(f"Built 78 Oracle cards in {TARGET} ({total / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    main()
