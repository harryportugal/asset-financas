"""
remove_bg_and_grayscale.py
Removes background from logo images and converts them to dark gray PNG with transparency.
Uses rembg (AI-based) for background removal.
"""

import os
import sys
from pathlib import Path
from PIL import Image
import io

INPUT_DIR  = Path(r"C:\Users\portu\OneDrive\Documentos\asset finanças\public\logos carrossel")
OUTPUT_DIR = Path(r"C:\Users\portu\OneDrive\Documentos\asset finanças\public\logos-carrossel")

OUTPUT_DIR.mkdir(exist_ok=True)

SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

def process_image(src_path: Path, dst_path: Path):
    try:
        from rembg import remove
        print(f"  [rembg] Processing: {src_path.name}")
        with open(src_path, "rb") as f:
            input_data = f.read()
        output_data = remove(input_data)
        img = Image.open(io.BytesIO(output_data)).convert("RGBA")
    except Exception as e:
        print(f"  [rembg FAILED] {src_path.name}: {e}")
        print(f"  Falling back to simple white-background removal...")
        img = remove_white_bg(src_path)

    # Convert logo to dark gray (#4b5563) while preserving alpha
    img_gray = make_gray(img, gray_rgb=(75, 85, 99))  # Tailwind gray-600

    img_gray.save(dst_path, "PNG")
    print(f"  Saved: {dst_path.name}")


def remove_white_bg(src_path: Path, threshold: int = 230) -> Image.Image:
    """Fallback: removes near-white or near-solid-color backgrounds."""
    img = Image.open(src_path).convert("RGBA")
    data = img.load()
    width, height = img.size

    # Sample corners to detect background color
    corners = [
        data[0, 0], data[width-1, 0],
        data[0, height-1], data[width-1, height-1]
    ]
    # Use top-left corner as background reference
    bg_r, bg_g, bg_b, *_ = corners[0]

    for y in range(height):
        for x in range(width):
            r, g, b, a = data[x, y]
            # If pixel is close to background color, make transparent
            diff = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
            if diff < 60:
                data[x, y] = (r, g, b, 0)

    return img


def make_gray(img: Image.Image, gray_rgb=(75, 85, 99)) -> Image.Image:
    """Recolor all non-transparent pixels to a single gray color."""
    img = img.convert("RGBA")
    data = img.load()
    width, height = img.size
    gr, gg, gb = gray_rgb

    for y in range(height):
        for x in range(width):
            r, g, b, a = data[x, y]
            if a > 10:  # Only affect visible pixels
                # Preserve relative luminance for subtle variation
                lum = (0.299*r + 0.587*g + 0.114*b) / 255.0
                # Map luminance: dark logo parts stay darker
                factor = 0.5 + lum * 0.5
                nr = int(gr * factor)
                ng = int(gg * factor)
                nb = int(gb * factor)
                data[x, y] = (nr, ng, nb, a)

    return img


def main():
    images = [p for p in INPUT_DIR.iterdir() if p.suffix.lower() in SUPPORTED]
    print(f"Found {len(images)} images in: {INPUT_DIR}")
    print(f"Output directory: {OUTPUT_DIR}\n")

    for src in sorted(images):
        # Create clean output filename
        clean_name = src.stem.replace(" ", "-").replace("(", "").replace(")", "").replace(" ", "-")
        dst = OUTPUT_DIR / f"{clean_name}.png"
        print(f"Processing: {src.name}")
        process_image(src, dst)
        print()

    print(f"\nDone! {len(images)} images processed.")
    print(f"Output: {OUTPUT_DIR}")

    # Print JS array for partner-logos.tsx
    print("\n--- Copy this into partner-logos.tsx ---\n")
    print("const partnerItems = [")
    for src in sorted(images):
        clean_name = src.stem.replace(" ", "-").replace("(", "").replace(")", "").replace(" ", "-")
        print(f'  {{ name: "{clean_name}", src: "/logos-carrossel/{clean_name}.png" }},')
    print("];")


if __name__ == "__main__":
    main()
