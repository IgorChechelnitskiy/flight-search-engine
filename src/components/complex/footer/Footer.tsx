import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import cs from './Footer.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cs.footer}>
      <div className={cs.container}>
        <div className={cs.topSection}>
          <div className={cs.brandColumn}>
            <div className={cs.logoGroup}>
              <span className={cs.logoLight}>Flights</span>
              <span className={cs.logoBold}>Booking</span>
            </div>
            <p className={cs.description}>
              Redefining travel through real-time data and premium experiences.
              Find your next destination with the power of Amadeus insights.
            </p>
          </div>
          <div className={cs.linkColumn}>
            <h4>Platform</h4>
            <ul>
              <li>
                <a href="#">Flight Search</a>
              </li>
              <li>
                <a href="#">Trending Hub</a>
              </li>
              <li>
                <a href="#">Travel Insights</a>
              </li>
              <li>
                <a href="#">Mobile App</a>
              </li>
            </ul>
          </div>
          <div className={cs.linkColumn}>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Partnerships</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className={cs.newsletterColumn}>
            <div className={cs.linkColumn}>
              <h4>Stay Inspired</h4>
            </div>
            <p className="text-slate-400 text-xs mb-4">
              Get the latest flight deals and travel tips directly to your
              inbox.
            </p>
            <div className={cs.glassInputWrapper}>
              <input type="email" placeholder="Enter your email" />
              <button className={cs.submitBtn}>Join</button>
            </div>
          </div>
        </div>
        <div className={cs.bottomBar}>
          <div>
            © {currentYear} Skybound Travel. All rights reserved. Powered by
            Amadeus.
          </div>
          <div className={cs.socials}>
            <a href="#">
              <Instagram size={18} />
            </a>
            <a href="#">
              <Twitter size={18} />
            </a>
            <a href="#">
              <Facebook size={18} />
            </a>
            <a href="#">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
