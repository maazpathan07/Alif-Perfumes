import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";

const DEFAULT_DOMAIN = "https://alif-perfumes-b88e8.web.app";

function setMetaTag(attribute, key, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setJsonLd(jsonLdData) {
  let script = document.querySelector('#jsonld-schema');
  if (!jsonLdData) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement("script");
    script.setAttribute("id", "jsonld-schema");
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLdData);
}

function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  robots = "index, follow",
  jsonLd = null,
}) {
  const { settings } = useSettings();

  const siteName = settings?.businessName || "ALIF PERFUMES";
  const defaultTitle = `${siteName} | Premium Arabic Fragrances & Attars`;
  const defaultDescription =
    settings?.footerDescription ||
    settings?.seoDescription ||
    "Discover luxury Arabic perfumes, authentic attars, bakhoor and Islamic lifestyle products. Experience elegance, confidence and long-lasting fragrances.";
  const defaultKeywords =
    settings?.seoKeywords ||
    "arabic perfumes, attar, luxury fragrances, bakhoor, oudh, alif perfumes, surat, india";
  const defaultImage = settings?.heroImage || `${DEFAULT_DOMAIN}/favicon.svg`;

  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const currentPath = window.location.pathname;
  const finalCanonical = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${DEFAULT_DOMAIN}${canonical}`
    : `${DEFAULT_DOMAIN}${currentPath}`;
  const finalOgImage = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${DEFAULT_DOMAIN}${ogImage}`
    : defaultImage;

  useEffect(() => {
    // 1. Document Title
    document.title = finalTitle;

    // 2. Meta Tags
    setMetaTag("name", "description", finalDescription);
    setMetaTag("name", "keywords", finalKeywords);
    setMetaTag("name", "robots", robots);

    // 3. Canonical Link
    setCanonical(finalCanonical);

    // 4. Open Graph
    setMetaTag("property", "og:title", title || siteName);
    setMetaTag("property", "og:description", finalDescription);
    setMetaTag("property", "og:image", finalOgImage);
    setMetaTag("property", "og:url", finalCanonical);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", siteName);

    // 5. Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title || siteName);
    setMetaTag("name", "twitter:description", finalDescription);
    setMetaTag("name", "twitter:image", finalOgImage);

    // 6. JSON-LD Structured Data
    setJsonLd(jsonLd);

    return () => {
      // Clean up script on unmount
      const script = document.querySelector('#jsonld-schema');
      if (script) script.remove();
    };
  }, [
    finalTitle,
    finalDescription,
    finalKeywords,
    robots,
    finalCanonical,
    finalOgImage,
    ogType,
    title,
    siteName,
    jsonLd,
  ]);

  return null;
}

export default SEO;
