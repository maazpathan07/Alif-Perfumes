import {
  useEffect,
  useState,
} from "react";

import { getSettings } from "../services/settingsService";

function useSettings() {
  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {

      const data =
        await getSettings();

      setSettings(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  return {
    settings,
    loading,
  };
}

export default useSettings;