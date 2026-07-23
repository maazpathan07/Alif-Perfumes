import Contact from "../components/Contact/Contact";
import SEO from "../components/SEO/SEO";

function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://alif-perfumes-b88e8.web.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": "https://alif-perfumes-b88e8.web.app/contact"
      }
    ]
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with ALIF PERFUMES via WhatsApp, phone, or email. We are here to assist you with fragrance recommendations, custom orders, and store information."
        canonical="/contact"
        jsonLd={breadcrumbJsonLd}
      />
      <Contact />
    </>
  );
}

export default ContactPage;