import { useEffect, useState, useCallback } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { EventConfig } from "../types";

const LOCAL_KEY = "jga_config";
const DEFAULT_CONFIG: EventConfig = {
  participants: ["Spieler 1", "Spieler 2", "Spieler 3", "Spieler 4"],
  groomIndex: 0,
};

function readLocal(): EventConfig {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw) as EventConfig;
  } catch {
    // ignore malformed local state
  }
  return DEFAULT_CONFIG;
}

export function useEventConfig() {
  const [config, setConfigState] = useState<EventConfig>(readLocal);
  const [loaded, setLoaded] = useState(!db);

  useEffect(() => {
    if (!db) return;
    const ref = doc(db, "config", "main");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setConfigState(snap.data() as EventConfig);
      }
      setLoaded(true);
    });
    return unsub;
  }, []);

  const setConfig = useCallback(async (next: EventConfig) => {
    setConfigState(next);
    if (db) {
      await setDoc(doc(db, "config", "main"), next);
    } else {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    }
  }, []);

  return { config, setConfig, loaded };
}
