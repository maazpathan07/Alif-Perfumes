import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Testimonials from "../components/Testimonials/Testimonials";
import WhatsAppCTA from "../components/WhatsAppCTA/WhatsAppCTA";
import SEO from "../components/SEO/SEO";
import useSettings from "../hooks/useSettings";

function Home() {
  const { settings } = useSettings();
  const businessName = settings?.businessName || "ALIF PERFUMES";

  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": businessName,
      "url": "https://alif-perfumes-b88e8.web.app",
      "logo": "https://alif-perfumes-b88e8.web.app/favicon.svg",
      "description": "Premium Arabic perfumes, attars, bakhoor and Islamic lifestyle products.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": settings?.whatsapp ? `+${settings.whatsapp}` : "+91 78743 78413",
        "contactType": "customer service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": businessName,
      "url": "https://alif-perfumes-b88e8.web.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://alif-perfumes-b88e8.web.app/products?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <>
      <SEO
        title="Luxury Arabic Perfumes & Attars"
        description="Discover luxury Arabic perfumes, authentic attars, bakhoor and Islamic lifestyle products. Experience elegance, confidence and long-lasting fragrances."
        canonical="/"
        jsonLd={homeJsonLd}
      />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <WhatsAppCTA />
    </>
  );
}

export default Home;