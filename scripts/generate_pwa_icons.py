from PIL import Image, ImageDraw, ImageFont
import os

def create_pwa_icon(size, output_path, is_maskable=False):
    # Create image with dark slate background
    bg_color = (9, 14, 26, 255) # #090e1a
    img = Image.new("RGBA", (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    margin = size * 0.12 if is_maskable else size * 0.08
    corner_radius = size * 0.22 if not is_maskable else 0

    # Draw rounded rectangle container
    rect_box = [margin, margin, size - margin, size - margin]
    
    # Gradient/Accent outer ring
    draw.rounded_rectangle(rect_box, radius=corner_radius, fill=(15, 23, 42, 255), outline=(99, 102, 241, 220), width=max(2, int(size * 0.02)))
    
    # Inner hexagon/geometry representing AI & Automation
    cx, cy = size // 2, size // 2
    r = size * 0.26
    
    # Draw geometric circuit lines
    draw.ellipse([cx - r * 0.9, cy - r * 0.9, cx + r * 0.9, cy + r * 0.9], outline=(129, 140, 248, 140), width=max(1, int(size * 0.015)))

    # Central Monogram "AC"
    # Try default font or basic shapes
    try:
        font = ImageFont.truetype("arial.ttf", int(size * 0.28))
    except:
        font = ImageFont.load_default()
        
    text = "AC"
    # Get text size
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    draw.text((cx - tw / 2, cy - th / 2 - size * 0.02), text, font=font, fill=(255, 255, 255, 255))
    
    # Small tech dots
    dot_r = max(2, int(size * 0.025))
    draw.ellipse([cx - r - dot_r, cy - dot_r, cx - r + dot_r, cy + dot_r], fill=(52, 211, 153, 255)) # emerald
    draw.ellipse([cx + r - dot_r, cy - dot_r, cx + r + dot_r, cy + dot_r], fill=(129, 140, 248, 255)) # indigo
    draw.ellipse([cx - dot_r, cy - r - dot_r, cx + dot_r, cy - r + dot_r], fill=(245, 158, 11, 255)) # amber
    draw.ellipse([cx - dot_r, cy + r - dot_r, cx + dot_r, cy + r + dot_r], fill=(168, 85, 247, 255)) # purple

    img.save(output_path, "PNG")
    print(f"Generated {output_path} ({size}x{size})")

if __name__ == "__main__":
    os.makedirs("public/icons", exist_ok=True)
    create_pwa_icon(192, "public/icons/icon-192x192.png", is_maskable=False)
    create_pwa_icon(512, "public/icons/icon-512x512.png", is_maskable=False)
    create_pwa_icon(512, "public/icons/maskable-icon-512x512.png", is_maskable=True)
    create_pwa_icon(180, "public/apple-touch-icon.png", is_maskable=False)
