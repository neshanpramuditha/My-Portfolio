import { useEffect, useRef } from "react";

const CHATBOT_SCRIPT_SRC = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
const CHATBOT_CONFIG_SRC = "https://files.bpcontent.cloud/2026/04/04/05/20260404051854-GHKUOCUX.js";

const appendScript = (src: string, attributes: Record<string, string | boolean> = {}) => {
  const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
  if (existing) return existing;

  const script = document.createElement("script");
  script.src = src;
  script.async = false;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === true) {
      script.setAttribute(key, "");
    } else if (value) {
      script.setAttribute(key, String(value));
    }
  });

  document.body.appendChild(script);
  return script;
};

const ChatBot = () => {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const injectScript = appendScript(CHATBOT_SCRIPT_SRC);

    const loadConfig = () => {
      appendScript(CHATBOT_CONFIG_SRC, { defer: true });
    };

    if (injectScript) {
      const scriptEl = injectScript as HTMLScriptElement & { readyState?: string; complete?: boolean };
      if (scriptEl.complete || scriptEl.readyState === "complete") {
        loadConfig();
      } else {
        injectScript.addEventListener("load", loadConfig);
      }
    }
  }, []);

  return null;
};

export default ChatBot;
