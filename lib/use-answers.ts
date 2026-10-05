"use client";

import { useEffect, useRef, useState } from "react";
import { emptyAnswers, normalizeAnswers, readAnswers, removeAnswers, writeAnswers, type Answers } from "./answers";

export function useAnswers() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const current = useRef(answers);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    // Synchronize browser storage after hydration, without writing default answers.
    let loaded;
    try { loaded = readAnswers(window.localStorage); }
    catch { loaded = { answers: emptyAnswers(), error: true }; }
    current.current = loaded.answers;
    /* eslint-disable react-hooks/set-state-in-effect */
    setAnswers(loaded.answers);
    setStatus(loaded.error ? "error" : "idle");
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function save(update: Answers | ((value: Answers) => Answers)) {
    if (!ready) return false;
    const next = normalizeAnswers(typeof update === "function" ? update(current.current) : update);
    current.current = next;
    setAnswers(next);
    let success = false;
    try { success = writeAnswers(window.localStorage, next); } catch { /* Browser storage unavailable. */ }
    setStatus(success ? "saved" : "error");
    return success;
  }

  function clear() {
    if (!ready) return;
    const next = emptyAnswers();
    current.current = next;
    setAnswers(next);
    let success = false;
    try { success = removeAnswers(window.localStorage); } catch { /* Browser storage unavailable. */ }
    setStatus(success ? "idle" : "error");
  }

  return { answers, ready, status, save, clear };
}
