/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../services/settingsService";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSettings()
      .then((data) => {
        if (active) {
          setSettings(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Failed to load settings in context:", error);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (settings) {
      // 1. Update document title
      if (settings.seoTitle) {
        document.title = settings.seoTitle;
      } else if (settings.businessName) {
        document.title = `${settings.businessName} | ${settings.tagline || "Luxury Fragrances"}`;
      }

      // 2. Update description meta tag
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', settings.seoDescription || settings.footerDescription || "Premium Fragrances Store");

      // 3. Update keywords meta tag
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement('meta');
        metaKey.name = "keywords";
        document.head.appendChild(metaKey);
      }
      metaKey.setAttribute('content', settings.seoKeywords || "perfumes, attar, luxury fragrances");

      // 4. Update favicon icon dynamically
      if (settings.favicon) {
        let faviconLink = document.querySelector("link[rel*='icon']");
        if (!faviconLink) {
          faviconLink = document.createElement('link');
          faviconLink.rel = 'shortcut icon';
          document.head.appendChild(faviconLink);
        }
        faviconLink.href = settings.favicon;
      }
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
