import React, { useEffect, useRef } from 'react';
import styles from './ourpartner.module.css';

const OurPartners = () => {
  const headingRef = useRef(null);
  const ourRef = useRef(null);
  const partnersRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ourRef.current.classList.add(styles.slideInOur);
          partnersRef.current.classList.add(styles.slideInPartners);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <div className={styles.headingWrapper} ref={headingRef}>
          <h2 className={styles.heading}>
            <span ref={ourRef}>OUR</span>
            <span ref={partnersRef}>PARTNERS</span>
          </h2>
        </div>
        <div className={styles.imageWrapper}>
          <img 
            src="./company.png"
            alt="Our Partners" 
            className={styles.partnerImage}
          />
        </div>
      </div>
    </section>
  );
};

export default OurPartners;