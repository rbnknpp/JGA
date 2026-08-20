import { useEffect, useState, useCallback } from "react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { compressImageToDataUrl } from "../lib/compressImage";
import type { Progress, ProgressMap } from "../types";

const LOCAL_KEY = "jga_progress";

function readLocal(): ProgressMap {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw) as ProgressMap;
  } catch {
    // ignore malformed local state
  }
  return {};
}

function writeLocal(map: ProgressMap) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(map));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(readLocal);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, "progress"), (snap) => {
      const next: ProgressMap = {};
      snap.forEach((d) => {
        next[d.id] = d.data() as Progress;
      });
      setProgress(next);
    });
    return unsub;
  }, []);

  const writeTaskProgress = useCallback(async (taskId: string, entry: Progress) => {
    if (db) {
      // Firestore rejects explicit `undefined` field values, so drop them
      // rather than writing e.g. photoUrl: undefined for a note-only submission.
      const clean = Object.fromEntries(
        Object.entries(entry).filter(([, value]) => value !== undefined),
      ) as Progress;
      await setDoc(doc(db, "progress", taskId), clean, { merge: true });
    } else {
      setProgress((prev) => {
        const next = { ...prev, [taskId]: { ...prev[taskId], ...entry } };
        writeLocal(next);
        return next;
      });
    }
  }, []);

  const uploadPhoto = useCallback(async (file: File): Promise<string> => {
    return compressImageToDataUrl(file);
  }, []);

  const submitTask = useCallback(
    async (taskId: string, submittedBy: string, opts: { photoUrl?: string; note?: string }) => {
      await writeTaskProgress(taskId, {
        status: "pending",
        submittedBy,
        photoUrl: opts.photoUrl,
        note: opts.note,
        updatedAt: Date.now(),
      });
    },
    [writeTaskProgress],
  );

  const approveTask = useCallback(
    async (taskId: string, approvedBy: string) => {
      await writeTaskProgress(taskId, {
        status: "approved",
        approvedBy,
        updatedAt: Date.now(),
      } as Progress);
    },
    [writeTaskProgress],
  );

  const rejectTask = useCallback(
    async (taskId: string, approvedBy: string) => {
      await writeTaskProgress(taskId, {
        status: "rejected",
        approvedBy,
        updatedAt: Date.now(),
      } as Progress);
    },
    [writeTaskProgress],
  );

  return { progress, submitTask, approveTask, rejectTask, uploadPhoto };
}
