import React from 'react';
import styles from './buynow.module.css';
import { X, Timer, Library, Users, Star } from 'lucide-react';

const BuyNow = ({ course, onClose }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? styles.starFilled : styles.starEmpty}`}
      />
    ));
  };

  return (
    <div className={styles.buyNowOverlay}>
      <div className={styles.buyNowModal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X className={styles.icon} />
        </button>

        <div className={styles.courseHeader}>
          <img src={course.image} alt={course.title} className={styles.courseImage} />
          <h2 className={styles.courseTitle}>{course.title}</h2>
        </div>

        <div className={styles.courseDetails}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <Timer className={styles.icon} />
              <span>{course.duration}</span>
            </div>
            <div className={styles.detailItem}>
              <Library className={styles.icon} />
              <span>{course.lessons} Lessons</span>
            </div>
            <div className={styles.detailItem}>
              <Users className={styles.icon} />
              <span>{course.students} Students</span>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.ratingWrapper}>
                {renderStars(course.rating)}
                <span>({course.totalRatings} Reviews)</span>
              </div>
            </div>
          </div>

          <div className={styles.courseDescription}>
            <h3>Course Description</h3>
            <p>This comprehensive course will take you through all aspects of {course.title}. 
            Perfect for {course.level} level students who want to master this subject.</p>
            
            <h3>What you'll learn</h3>
            <ul>
              <li>Complete understanding of {course.title}</li>
              <li>Practical projects and hands-on experience</li>
              <li>Industry-standard best practices</li>
              <li>Certificate upon completion</li>
            </ul>

            <h3>Requirements</h3>
            <ul>
              <li>Basic understanding of the subject</li>
              <li>Dedication to learn and practice</li>
              <li>Computer with internet connection</li>
            </ul>
          </div>

          <div className={styles.pricingSection}>
            <div className={styles.priceBox}>
              <span className={styles.price}>${course.price.toFixed(2)}</span>
              <span className={styles.guarantee}>30-Day Money-Back Guarantee</span>
            </div>
            <button className={styles.subscribeButton}>
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;