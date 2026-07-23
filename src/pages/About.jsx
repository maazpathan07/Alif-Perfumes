import About from "../components/About/About";
import SEO from "../components/SEO/SEO";

function AboutPage() {
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
        "name": "About Us",
        "item": "https://alif-perfumes-b88e8.web.app/about"
      }
    ]
  };

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about ALIF PERFUMES, our commitment to offering premium Arabic fragrances, authentic attars, bakhoor and Islamic lifestyle products."
        canonical="/about"
        jsonLd={breadcrumbJsonLd}
      />
      <About />
    </>
  );
}

export default AboutPage;