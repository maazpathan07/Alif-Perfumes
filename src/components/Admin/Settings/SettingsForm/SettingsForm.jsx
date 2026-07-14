import {
  useEffect,
  useState,
} from "react";

import {
  getSettings,
  saveSettings,
  defaultSettings,
} from "../../../../services/settingsService";

import styles from "./SettingsForm.module.css";

import toast from "react-hot-toast";

function SettingsForm() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {

      const data =
        await getSettings();

      setFormData(data);

    } catch (error) {

      console.error(error);

    }
  }

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      await saveSettings(
        formData
      );

      toast.success(
        "Settings saved successfully!"
      );

    } catch (error) {

      console.error(error);

      toast.error (
        "Failed to save settings."
      );  

    } finally {

      setLoading(false);

    }

  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
            {/* ==========================
          General Information
      ========================== */}

      <section className={styles.section}>

        <h2>General Information</h2>

        <div className={styles.grid}>

          <div>

            <label>
              Business Name
            </label>

            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Alif Perfumes"
            />

          </div>

          <div>

            <label>
              Tagline
            </label>

            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Luxury Arabic Fragrances"
            />

          </div>

        </div>

        <label>
          Footer Description
        </label>

        <textarea
          rows="4"
          name="footerDescription"
          value={
            formData.footerDescription
          }
          onChange={handleChange}
          placeholder="Short description about your business..."
        />

      </section>

      {/* ==========================
          Contact Information
      ========================== */}

      <section className={styles.section}>

        <h2>
          Contact Information
        </h2>

        <div className={styles.grid}>

          <div>

            <label>
              WhatsApp Number
            </label>

            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="919876543210"
            />

          </div>

          <div>

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="919876543210"
            />

          </div>

          <div>

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@example.com"
            />

          </div>

          <div>

            <label>
              Website
            </label>

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />

          </div>

        </div>

        <label>
          Business Address
        </label>

        <textarea
          rows="3"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full Business Address"
        />

        <div className={styles.grid}>

          <div>

            <label>
              Business Hours
            </label>

            <input
              type="text"
              name="businessHours"
              value={formData.businessHours}
              onChange={handleChange}
              placeholder="Mon - Sat | 10 AM - 9 PM"
            />

          </div>

          <div>

            <label>
              Google Maps URL
            </label>

            <input
              type="url"
              name="googleMaps"
              value={formData.googleMaps}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
            />

          </div>

        </div>

      </section>
            {/* ==========================
          Branding
      ========================== */}

      <section className={styles.section}>

        <h2>Branding</h2>

        <div className={styles.grid}>

          <div>

            <label>
              Logo URL
            </label>

            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />

          </div>

          <div>

            <label>
              Favicon URL
            </label>

            <input
              type="url"
              name="favicon"
              value={formData.favicon}
              onChange={handleChange}
              placeholder="https://example.com/favicon.ico"
            />

          </div>

        </div>

        <label>
          Hero Banner URL
        </label>

        <input
          type="url"
          name="heroBanner"
          value={formData.heroBanner}
          onChange={handleChange}
          placeholder="https://example.com/banner.jpg"
        />

      </section>

      {/* ==========================
          Social Media
      ========================== */}

      <section className={styles.section}>

        <h2>Social Media</h2>

        <div className={styles.grid}>

          <div>

            <label>
              Instagram
            </label>

            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />

          </div>

          <div>

            <label>
              Facebook
            </label>

            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />

          </div>

          <div>

            <label>
              YouTube
            </label>

            <input
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
            />

          </div>

          <div>

            <label>
              X (Twitter)
            </label>

            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://x.com/..."
            />

          </div>

          <div>

            <label>
              LinkedIn
            </label>

            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
            />

          </div>

        </div>

      </section>
            {/* ==========================
          Save
      ========================== */}

      <div className={styles.actions}>

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading
            ? "Saving Settings..."
            : "Save Settings"}
        </button>

      </div>

    </form>
  );
}

export default SettingsForm;