from PIL import Image, ImageDraw

def make_icon(size, path):
    img = Image.new("RGB", (size, size), "#0a0a0a")
    d = ImageDraw.Draw(img)
    # amber-to-rose diagonal-ish gradient background
    for y in range(size):
        t = y / size
        r = int(245 + (244 - 245) * t)
        g = int(158 + (63 - 158) * t)
        b = int(11 + (94 - 11) * t)
        d.line([(0, y), (size, y)], fill=(r, g, b))
    # rounded card
    pad = int(size * 0.08)
    d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(size * 0.22), fill="#0a0a0a")
    # simple glass shape (martini/cocktail-ish glass) in amber
    cx = size / 2
    top = size * 0.30
    bottom = size * 0.62
    half_w = size * 0.22
    d.polygon(
        [(cx - half_w, top), (cx + half_w, top), (cx + size * 0.03, bottom), (cx - size * 0.03, bottom)],
        fill="#f59e0b",
    )
    d.rectangle([cx - size * 0.03, bottom, cx + size * 0.03, bottom + size * 0.12], fill="#f59e0b")
    d.rectangle([cx - size * 0.12, bottom + size * 0.12, cx + size * 0.12, bottom + size * 0.16], fill="#f59e0b")
    # bubble accents
    d.ellipse([cx - half_w - size * 0.02, top - size * 0.02, cx - half_w + size * 0.06, top + size * 0.06], fill="#fde68a")
    img.save(path)

make_icon(192, "public/icon-192.png")
make_icon(512, "public/icon-512.png")
print("done")
