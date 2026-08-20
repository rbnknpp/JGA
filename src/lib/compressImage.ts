const MAX_DIMENSION = 900;
// Firestore caps a document at 1 MiB; base64 adds ~33% overhead, so keep
// comfortably under that once wrapped in the rest of the progress doc.
const MAX_DATA_URL_BYTES = 700_000;

async function loadImage(file: File): Promise<HTMLImageElement> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Bild konnte nicht geladen werden"));
      img.src = objectUrl;
    });
    return img;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function drawToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas wird nicht unterstützt");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export async function compressImageToDataUrl(file: File): Promise<string> {
  const img = await loadImage(file);
  const canvas = drawToCanvas(img);

  let quality = 0.7;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > MAX_DATA_URL_BYTES && quality > 0.2) {
    quality -= 0.15;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  return dataUrl;
}
