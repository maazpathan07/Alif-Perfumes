import { useState } from "react";
import {
  MessageCircle,
  PhoneCall,
  Mail,
  MapPin,
  Clock3,
  Globe,
} from "lucide-react";

import Section from "../UI/Section";
import Button from "../Button/Button";

import { Reveal, Hover } from "../../animations";

import useSettings from "../../hooks/useSettings";
import { createOrder } from "../../services/orderService";

import styles from "./Contact.module.css";

function Contact() {
  const { settings } = useSettings();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    // Log contact enquiry to Firestore in background
    try {
      createOrder({
        productId: "contact_enquiry",
        productName: `Message from ${name || "Guest"} (Phone: ${phone || "N/A"})`,
        price: 0,
        image: ""
      });
    } catch (error) {
      console.error("Failed to save contact log to database:", error);
    }

    const number =
      settings?.whatsapp || "";

    const business =
      settings?.businessName ||
      "Business";

    const text = `🛍️ Assalamu Alaikum,

I would like to contact ${business}.

━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name || "-"}

📱 Phone: ${phone || "-"}

📝 Message:

${message || "-"}

━━━━━━━━━━━━━━━━━━━━

JazakAllahu Khair 🤍`;

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  return (
    <>
      <Section>

        <Reveal>

          <div className={styles.hero}>

            <span className={styles.tag}>
              📞 Contact{" "}
              {settings?.businessName}
            </span>

            <h1>
              We're Here To Help
            </h1>

            <p>
              {
                settings?.tagline
              }
            </p>

          </div>

        </Reveal>

      </Section>

      <Section>

        <div className={styles.wrapper}>

          {/* Left */}

          <div className={styles.info}>

            <Reveal direction="left">

              <Hover>

                <div className={styles.card}>

                  <MessageCircle
                    size={26}
                  />

                  <h3>
                    WhatsApp
                  </h3>

                  <p>
                    {
                      settings?.whatsapp
                    }
                  </p>

                </div>

              </Hover>

            </Reveal>

            <Reveal
              direction="left"
              delay={0.1}
            >

              <Hover>

                <div className={styles.card}>

                  <PhoneCall
                    size={26}
                  />

                  <h3>
                    Phone
                  </h3>

                  <p>
                    {settings?.phone}
                  </p>

                </div>

              </Hover>

            </Reveal>

            <Reveal
              direction="left"
              delay={0.2}
            >

              <Hover>

                <div className={styles.card}>

                  <Mail
                    size={26}
                  />

                  <h3>Email</h3>

                  <p>
                    {settings?.email}
                  </p>

                </div>

              </Hover>

            </Reveal>

          </div>

          {/* Right */}

          <Reveal direction="right">

            <div className={styles.form}>

              <h2>
                Send Message
              </h2>

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
              />

              <Button
                onClick={
                  handleWhatsApp
                }
              >
                <MessageCircle
                  size={18}
                />

                &nbsp;

                Send on WhatsApp

              </Button>

              <div
                className={
                  styles.extraInfo
                }
              >

                <div
                  className={
                    styles.infoItem
                  }
                >

                  <MapPin
                    size={22}
                  />

                  <div>

                    <h3>
                      Address
                    </h3>

                    <p>
                      {
                        settings?.address
                      }
                    </p>

                  </div>

                </div>

                <div
                  className={
                    styles.infoItem
                  }
                >

                  <Clock3
                    size={22}
                  />

                  <div>

                    <h3>
                      Business Hours
                    </h3>

                    <p>
                      {
                        settings?.businessHours
                      }
                    </p>

                  </div>

                </div>

                <div
                  className={
                    styles.infoItem
                  }
                >

                  <Globe
                    size={22}
                  />

                  <div>

                    <h3>
                      Website
                    </h3>

                    <a
                      href={
                        settings?.website
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {
                        settings?.website
                      }
                    </a>

                  </div>

                </div>

              </div>

              {settings?.googleMaps && (

                <iframe
                  title="Google Map"
                  src={
                    settings.googleMaps
                  }
                  width="100%"
                  height="320"
                  style={{
                    border: 0,
                    borderRadius: 16,
                    marginTop: 25,
                  }}
                  loading="lazy"
                  allowFullScreen
                />

              )}

            </div>

          </Reveal>

        </div>

      </Section>
    </>
  );
}

export default Contact;