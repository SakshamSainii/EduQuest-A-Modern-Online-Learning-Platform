import React from "react";
import { TicketCheckIcon, Rocket, Zap } from 'lucide-react';
import styles from "./aboutus.module.css";

const AboutUs = () => {
  return (
    <section className={styles.about} id="about" aria-label="About Us Section">
        
      <div className={styles.container}>
        {/* About Banner with Decorative Elements */}
        <figure className={styles.aboutBanner}>
          <div
            className={styles.imgHolder}
            style={{ "--width": 520, "--height": 570 }}
          >
            <img
              src="/images/about-banner.jpg"
              width="520"
              height="370"
              loading="lazy"
              alt="Interactive learning environment"
              className={styles.imgCover}
            />
          </div>

          <img
            src="/images/about-shape-1.svg"
            width="360"
            height="420"
            loading="lazy"
            alt=""
            className={`${styles.shape} ${styles.aboutShape1}`}
          />

          <img
            src="/images/about-shape-2.svg"
            width="371"
            height="220"
            loading="lazy"
            alt=""
            className={`${styles.shape} ${styles.aboutShape2}`}
          />

          <img
            src="/images/about-shape-3.png"
            width="722"
            height="528"
            loading="lazy"
            alt=""
            className={`${styles.shape} ${styles.aboutShape3}`}
          />
        </figure>

        {/* About Content */}
        <div className={styles.aboutContent}>
          {/* Subtitle */}
          <p className={styles.sectionSubtitle}>Empowering Your Learning</p>

          {/* Title */}
          <h2 className={styles.sectionTitle}>
            Revolutionizing Education with{" "}
            <span className={styles.span}>Online Courses</span>
          </h2>

          {/* Text */}
          <p className={styles.sectionText}>
            Join thousands of learners worldwide who trust us to build their
            skills. With curated courses, interactive learning, and flexible
            schedules, we make education accessible to everyone, everywhere.
          </p>

          {/* List */}
          <ul className={styles.aboutList}>
            <li className={styles.aboutItem}>
              <TicketCheckIcon size={18} />
              <span className={styles.span}>Certified Expert Instructors</span>
            </li>
            <li className={styles.aboutItem}>
              <TicketCheckIcon size={18} />
              <span className={styles.span}>Flexible Learning</span>
            </li>
            <li className={styles.aboutItem}>
              <TicketCheckIcon size={18} />
              <span className={styles.span}>Lifetime Access</span>
            </li>
            <li className={styles.aboutItem}>
              <TicketCheckIcon size={18} />
              <span className={styles.span}>Hands-On Projects</span>
            </li>
          </ul>

          {/* Decorative Shape */}
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
