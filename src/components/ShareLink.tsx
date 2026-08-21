import { useEffect, useState } from "react";
import QRCode from "qrcode";

const appUrl = `${window.location.origin}${import.meta.env.BASE_URL}`;

export function ShareLink() {
  const [open, setOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open || qrDataUrl) return;
    QRCode.toDataURL(appUrl, { width: 240, margin: 1 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [open, qrDataUrl]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable - the visible link text is the fallback
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-amber-400 underline"
      >
        🔗 Einladungslink zeigen
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl border border-neutral-700 bg-neutral-900 p-5 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-bold text-neutral-100">App-Link teilen</h2>
            <p className="mt-1 text-xs text-neutral-400">
              Scannen und "Zum Home-Bildschirm hinzufügen".
            </p>
            <div className="mt-4 flex justify-center">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR-Code zur App" className="rounded-lg" />
              ) : (
                <div className="h-[240px] w-[240px] animate-pulse rounded-lg bg-neutral-800" />
              )}
            </div>
            <p className="mt-4 break-all text-xs text-neutral-500">{appUrl}</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border border-neutral-700 py-2 text-sm text-neutral-300"
              >
                Schließen
              </button>
              <button
                type="button"
                onClick={copyLink}
                className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-neutral-900"
              >
                {copied ? "Kopiert! ✅" : "Link kopieren"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
