import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";
import "./footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Company Info */}
          <div className="footer__section">
            <div className="footer__brand-logo">
              <span className="footer__brand-logo-text--bold">T</span>
              <span className="footer__brand-logo-text--normal">
                - Properties
              </span>
            </div>
            <p className="footer__brand-description">
              Your trusted partner in finding the perfect property. With 16+
              years of experience and over 2000 properties ready for you.
            </p>
            <div className="footer__social">
              <Link to="#" className="footer__social-link">
                <FaFacebookF />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="footer__social-link">
                <FaTwitter />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="footer__social-link">
                <FaInstagram />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="footer__social-link">
                <FaLinkedinIn />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__section-title">Quick Links</h3>
            <div className="footer__links">
              <Link to="/about" className="footer__links-item">
                About Us
              </Link>
              <Link to="/properties" className="footer__links-item">
                Properties
              </Link>
              <Link to="/agents" className="footer__links-item">
                Our Agents
              </Link>
              <Link to="/blog" className="footer__links-item">
                Real Estate Blog
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="footer__section">
            <h3 className="footer__section-title">Services</h3>
            <div className="footer__links">
              <Link to="/buy" className="footer__links-item">
                Buy Property
              </Link>
              <Link to="/rent" className="footer__links-item">
                Rent Property
              </Link>
              <Link to="/sell" className="footer__links-item">
                Sell Property
              </Link>
              <Link to="/consulting" className="footer__links-item">
                Property Consulting
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h3 className="footer__section-title">Contact Us</h3>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <FaMapMarkerAlt />
                <span>123 Real Estate Ave, City, Country</span>
              </div>
              <div className="footer__contact-item">
                <FaPhone />
                <span>+1 234 567 890</span>
              </div>
              <div className="footer__contact-item">
                <MdMail />
                <span>contact@t-properties.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-container">
            <p className="footer__bottom-copyright">
              © {new Date().getFullYear()} T-Properties. All rights reserved.
            </p>
            <div className="footer__bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
