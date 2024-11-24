"use client"

import React from 'react';
import styles from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { 
  BookOpen, 
  Globe, 
  GraduationCap, 
  Mail, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.brandSection}>
          <div className={styles.logo}>
        <FontAwesomeIcon 
          icon={faGraduationCap} 
          className={styles.logoIcon} 
        />
        <span>EduQuest</span>
      </div>
            <p className={styles.brandDescription}>
              Empowering learners worldwide with cutting-edge online education and transformative learning experiences.
            </p>
          </div>

          <div className={styles.footerColumns}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                <BookOpen size={20} /> Courses
              </h4>
              <ul className={styles.linkList}>
                <li>Web Development</li>
                <li>Data Science</li>
                <li>Digital Marketing</li>
                <li>UX/UI Design</li>
                <li>Machine Learning</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                <Globe size={20} /> Quick Links
              </h4>
              <ul className={styles.linkList}>
                <li>Become an Instructor</li>
                <li>Enterprise Solutions</li>
                <li>Scholarship Program</li>
                <li>Community Forum</li>
                <li>Learning Paths</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                <Mail size={20} /> Support
              </h4>
              <ul className={styles.linkList}>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.newsletterSection}>
          <h3 className={styles.newsletterTitle}>Stay Updated</h3>
          <p className={styles.newsletterSubtitle}>
            Subscribe to our newsletter for the latest courses and learning opportunities
          </p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={styles.emailInput} 
            />
            <button type="submit" className={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialIcon}><Facebook /></a>
          <a href="#" className={styles.socialIcon}><Linkedin /></a>
          <a href="#" className={styles.socialIcon}><Twitter /></a>
          <a href="#" className={styles.socialIcon}><Instagram /></a>
          <a href="#" className={styles.socialIcon}><Youtube /></a>
        </div>
        <div className={styles.copyright}>
          © 2024 EduLearn Platform. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;