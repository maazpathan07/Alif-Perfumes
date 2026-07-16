import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import {
  Eye,
  EyeOff,
  Building,
  Home,
  BookOpen,
  Search,
  Lock,
} from "lucide-react";
import { saveSettings, defaultSettings } from "../../../../services/settingsService";
import { useSettings } from "../../../../context/SettingsContext";
import { auth } from "../../../../services/firebase";
import styles from "./SettingsForm.module.css";
import toast from "react-hot-toast";

function SettingsForm() {
  const { settings, setSettings } = useSettings();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => settings ?? defaultSettings);

  // Security Form State
  const [secLoading, setSecLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveSettings(formData);
      setSettings(formData);
      toast.success("Store configurations updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save configuration updates.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setSecLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toast.success("Security password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        toast.error("Incorrect current password.");
      } else {
        toast.error("Failed to update password. Try again.");
      }
    } finally {
      setSecLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <h1>Settings</h1>
        <p>Manage your store configurations, layouts, and security details.</p>
      </div>

      {/* ─── Navigation Tabs ─── */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "general" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("general")}
        >
          <Building size={16} />
          Store & Contacts
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "hero" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("hero")}
        >
          <Home size={16} />
          Homepage Copy
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "inner" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("inner")}
        >
          <BookOpen size={16} />
          Inner Pages
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "seo" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("seo")}
        >
          <Search size={16} />
          WhatsApp & SEO
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "security" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("security")}
        >
          <Lock size={16} />
          Security (Password)
        </button>
      </div>

      <div className={styles.form}>
        {/* ─── Tab Content: General Settings ─── */}
        {activeTab === "general" && (
          <form onSubmit={handleSaveSettings}>
            <div className={styles.card}>
              <h3>General Store Details</h3>
              <div className={styles.grid}>
                <div>
                  <label>Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName || ""}
                    onChange={handleChange}
                    placeholder="Alif Perfumes"
                  />
                </div>
                <div>
                  <label>Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline || ""}
                    onChange={handleChange}
                    placeholder="Luxury Arabic Fragrances"
                  />
                </div>
              </div>
              <div>
                <label>Footer Description</label>
                <textarea
                  rows="3"
                  name="footerDescription"
                  value={formData.footerDescription || ""}
                  onChange={handleChange}
                  placeholder="Short brand story for the footer..."
                />
              </div>
            </div>

            <div className={styles.card}>
              <h3>Contact Information</h3>
              <div className={styles.grid}>
                <div>
                  <label>WhatsApp Number</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp || ""}
                    onChange={handleChange}
                    placeholder="917874378413"
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="917874378413"
                  />
                </div>
                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="info@alifperfumes.com"
                  />
                </div>
                <div>
                  <label>Business Hours</label>
                  <input
                    type="text"
                    name="businessHours"
                    value={formData.businessHours || ""}
                    onChange={handleChange}
                    placeholder="Mon - Sat | 10 AM - 9 PM"
                  />
                </div>
              </div>
              <div className={styles.grid}>
                <div>
                  <label>Business Address</label>
                  <textarea
                    rows="2"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Surat, Gujarat"
                  />
                </div>
                <div>
                  <label>Google Maps Link / URL</label>
                  <textarea
                    rows="2"
                    name="googleMaps"
                    value={formData.googleMaps || ""}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Branding Assets & Social Links</h3>
              <div className={styles.grid}>
                <div>
                  <label>Store Logo Image URL</label>
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <label>Favicon Icon URL</label>
                  <input
                    type="text"
                    name="favicon"
                    value={formData.favicon || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
              <div className={styles.grid}>
                <div>
                  <label>Instagram URL</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram || ""}
                    onChange={handleChange}
                    placeholder="Instagram Link"
                  />
                </div>
                <div>
                  <label>Facebook URL</label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook || ""}
                    onChange={handleChange}
                    placeholder="Facebook Link"
                  />
                </div>
                <div>
                  <label>YouTube URL</label>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube || ""}
                    onChange={handleChange}
                    placeholder="YouTube Link"
                  />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Saving General..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}

        {/* ─── Tab Content: Homepage Design Copy ─── */}
        {activeTab === "hero" && (
          <form onSubmit={handleSaveSettings}>
            <div className={styles.card}>
              <h3>Hero Carousel & Banner</h3>
              <div className={styles.grid}>
                <div>
                  <label>Hero Section Title (use \n for line breaks)</label>
                  <textarea
                    rows="2"
                    name="heroTitle"
                    value={formData.heroTitle || ""}
                    onChange={handleChange}
                    placeholder="Luxury Arabic\nPerfumes"
                  />
                </div>
                <div>
                  <label>Hero Image URL</label>
                  <input
                    type="text"
                    name="heroImage"
                    value={formData.heroImage || ""}
                    onChange={handleChange}
                    placeholder="Image URL link"
                  />
                </div>
              </div>
              <div>
                <label>Hero Description</label>
                <textarea
                  rows="3"
                  name="heroDescription"
                  value={formData.heroDescription || ""}
                  onChange={handleChange}
                  placeholder="Hero paragraph text..."
                />
              </div>
            </div>

            <div className={styles.card}>
              <h3>Stats Display Counters</h3>
              <div className={styles.grid}>
                <div>
                  <label>Stat 1 Value</label>
                  <input
                    type="text"
                    name="heroStat1Number"
                    value={formData.heroStat1Number || ""}
                    onChange={handleChange}
                  />
                  <label style={{ marginTop: 12 }}>Stat 1 Label</label>
                  <input
                    type="text"
                    name="heroStat1Label"
                    value={formData.heroStat1Label || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Stat 2 Value</label>
                  <input
                    type="text"
                    name="heroStat2Number"
                    value={formData.heroStat2Number || ""}
                    onChange={handleChange}
                  />
                  <label style={{ marginTop: 12 }}>Stat 2 Label</label>
                  <input
                    type="text"
                    name="heroStat2Label"
                    value={formData.heroStat2Label || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Stat 3 Value</label>
                  <input
                    type="text"
                    name="heroStat3Number"
                    value={formData.heroStat3Number || ""}
                    onChange={handleChange}
                  />
                  <label style={{ marginTop: 12 }}>Stat 3 Label</label>
                  <input
                    type="text"
                    name="heroStat3Label"
                    value={formData.heroStat3Label || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Why Choose Us Section Header</h3>
              <div className={styles.grid}>
                <div>
                  <label>Main Section Title</label>
                  <input
                    type="text"
                    name="wcuTitle"
                    value={formData.wcuTitle || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Main Section Subtitle</label>
                  <input
                    type="text"
                    name="wcuSubtitle"
                    value={formData.wcuSubtitle || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Why Choose Us Feature Cards</h3>
              <div className={styles.grid}>
                <div>
                  <h4 style={{ marginBottom: 12, color: "var(--primary)" }}>Feature Card 1</h4>
                  <label>Title</label>
                  <input
                    type="text"
                    name="wcuCard1Title"
                    value={formData.wcuCard1Title || ""}
                    onChange={handleChange}
                  />
                  <label style={{ marginTop: 12 }}>Description</label>
                  <textarea
                    rows="2"
                    name="wcuCard1Desc"
                    value={formData.wcuCard1Desc || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h4 style={{ marginBottom: 12, color: "var(--primary)" }}>Feature Card 2</h4>
                  <label>Title</label>
                  <input
                    type="text"
                    name="wcuCard2Title"
                    value={formData.wcuCard2Title || ""}
                    onChange={handleChange}
                  />
                  <label style={{ marginTop: 12 }}>Description</label>
                  <textarea
                    rows="2"
                    name="wcuCard2Desc"
                    value={formData.wcuCard2Desc || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h4 style={{ marginBottom: 12, color: "var(--primary)" }}>Feature Card 3</h4>
                  <label>Title</label>
                  <input
                    type="text"
                    name="wcuCard3Title"
                    value={formData.wcuCard3Title || ""}
                    onChange={handleChange}
                  />
                  <label style={{ marginTop: 12 }}>Description</label>
                  <textarea
                    rows="2"
                    name="wcuCard3Desc"
                    value={formData.wcuCard3Desc || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h4 style={{ marginBottom: 12, color: "var(--primary)" }}>Feature Card 4</h4>
                  <label>Title</label>
                  <input
                    type="text"
                    name="wcuCard4Title"
                    value={formData.wcuCard4Title || ""}
                    onChange={handleChange}
                  />
                  <label style={{ marginTop: 12 }}>Description</label>
                  <textarea
                    rows="2"
                    name="wcuCard4Desc"
                    value={formData.wcuCard4Desc || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Saving Layout..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}

        {/* ─── Tab Content: Inner Pages Copy ─── */}
        {activeTab === "inner" && (
          <form onSubmit={handleSaveSettings}>
            <div className={styles.card}>
              <h3>About Page - Our Story</h3>
              <div>
                <label>Story Page Title</label>
                <input
                  type="text"
                  name="aboutStoryTitle"
                  value={formData.aboutStoryTitle || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Story Content Paragraphs</label>
                <textarea
                  rows="6"
                  name="aboutStoryText"
                  value={formData.aboutStoryText || ""}
                  onChange={handleChange}
                  placeholder="Write the story details of your store..."
                />
              </div>
            </div>

            <div className={styles.card}>
              <h3>About Page - Core Values</h3>
              <div className={styles.grid}>
                <div>
                  <label>Mission Statement</label>
                  <textarea
                    rows="4"
                    name="aboutMission"
                    value={formData.aboutMission || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Vision Statement</label>
                  <textarea
                    rows="4"
                    name="aboutVision"
                    value={formData.aboutVision || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Saving Copy..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}

        {/* ─── Tab Content: WhatsApp Order & SEO Metadata ─── */}
        {activeTab === "seo" && (
          <form onSubmit={handleSaveSettings}>
            <div className={styles.card}>
              <h3>WhatsApp Message Template</h3>
              <p className={styles.helpText}>
                Customize the message sent to WhatsApp when a customer clicks "Buy on WhatsApp".
                Use placeholders: <strong>{"{productName}"}</strong>, <strong>{"{productPrice}"}</strong>, <strong>{"{productRating}"}</strong>.
              </p>
              <textarea
                rows="8"
                name="whatsappMessageTemplate"
                value={formData.whatsappMessageTemplate || ""}
                onChange={handleChange}
              />
            </div>

            <div className={styles.card}>
              <h3>Search Engine Optimization (SEO)</h3>
              <p className={styles.helpText}>
                Optimize how your store page is indexed on search crawlers like Google.
              </p>
              <div className={styles.grid}>
                <div>
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle || ""}
                    onChange={handleChange}
                    placeholder="Google search title..."
                  />
                </div>
                <div>
                  <label>Meta Keywords</label>
                  <input
                    type="text"
                    name="seoKeywords"
                    value={formData.seoKeywords || ""}
                    onChange={handleChange}
                    placeholder="perfumes, attar, scents"
                  />
                </div>
              </div>
              <div>
                <label>Meta Description</label>
                <textarea
                  rows="3"
                  name="seoDescription"
                  value={formData.seoDescription || ""}
                  onChange={handleChange}
                  placeholder="Short summary under Google search results..."
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Saving SEO & WhatsApp..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}

        {/* ─── Tab Content: Change Password (Security) ─── */}
        {activeTab === "security" && (
          <form onSubmit={handlePasswordChange}>
            <div className={styles.card}>
              <h3>Security Settings (Change Password)</h3>
              <p className={styles.helpText}>
                Regularly updating your password prevents unauthorized access to your store inventory and logs.
              </p>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Current Password</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showCurrent ? "text" : "password"}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      style={{
                        position: "absolute",
                        right: 12,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-light)",
                      }}
                      onClick={() => setShowCurrent(!showCurrent)}
                    >
                      {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>New Password</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showNew ? "text" : "password"}
                      placeholder="Min 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      style={{
                        position: "absolute",
                        right: 12,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-light)",
                      }}
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Confirm Password</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      style={{
                        position: "absolute",
                        right: 12,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-light)",
                      }}
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.button} disabled={secLoading}>
                {secLoading ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SettingsForm;