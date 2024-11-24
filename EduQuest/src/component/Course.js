import React, { useState, useEffect } from "react";
import styles from "./course.module.css";
import { X, CheckCircle } from 'lucide-react';

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, courseTitle }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.successModalOverlay}>
      <div className={styles.successModalContent}>
        <button onClick={onClose} className={styles.successModalClose}>
          <X size={24} />
        </button>
        <div className={styles.successModalBody}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h2 className={styles.successTitle}>Welcome!</h2>
          <p className={styles.successMessage}>
            You have successfully enrolled in <span className={styles.courseName}>{courseTitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Enrollment Modal Component
const EnrollmentModal = ({ course, onClose, isOpen }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !course) return null;

  const handleSubscribe = () => {
    // Handle subscription/enrollment logic here
    console.log('Enrolling in course:', course.title);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <div className={styles.enrollmentModalOverlay}>
        <div className={styles.enrollmentModalContent}>
          <div className={styles.enrollmentModalHeader}>
            <h2>Course Details</h2>
            <button onClick={onClose} className={styles.modalClose}>
              <X size={24} />
            </button>
          </div>
          
          <div className={styles.enrollmentDetails}>
            <img
              src={course.image}
              alt={course.title}
              className={styles.enrollmentImage}
            />
            
            <h3 className={styles.enrollmentTitle}>{course.title}</h3>
            
            <div className={styles.courseHighlights}>
              <div className={styles.highlightItem}>
                <CheckCircle size={20} className={styles.highlightIcon} />
                <span>{course.lessons} comprehensive lessons</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle size={20} className={styles.highlightIcon} />
                <span>{course.duration} of content</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle size={20} className={styles.highlightIcon} />
                <span>{course.level} level</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle size={20} className={styles.highlightIcon} />
                <span>Certificate upon completion</span>
              </div>
            </div>

            <div className={styles.enrollmentPrice}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.priceAmount}>${course.price}</span>
            </div>

            <button 
              className={styles.subscribeButton}
              onClick={handleSubscribe}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        courseTitle={course.title}
      />
    </>
  );
};

// Course Modal Component
const CourseModal = ({ category, onClose, isOpen }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories');
        const data = await response.json();
        const categoryData = data.find(cat => cat.title.toLowerCase() === category.toLowerCase());
        setCourses(categoryData?.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCourses();
    }
  }, [category, isOpen]);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.courseModalOverlay}>
        <div className={styles.courseModalContent}>
          <div className={styles.courseModalHeader}>
            <h2>{category} Courses</h2>
            <button onClick={onClose} className={styles.courseModalClose}>
              <X size={24} />
            </button>
          </div>
          
          {loading ? (
            <div className={styles.loading}>Loading courses...</div>
          ) : (
            <div className={styles.courseGrid}>
              {courses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.courseImageContainer}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className={styles.courseImage}
                    />
                    <span className={styles.courseDuration}>{course.duration}</span>
                  </div>
                  <div className={styles.courseInfo}>
                    <div className={styles.courseHeader}>
                      <span className={styles.courseLevel}>{course.level}</span>
                      <div className={styles.courseRating}>
                        {course.rating} ⭐ ({course.totalRatings})
                      </div>
                    </div>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <div className={styles.courseStats}>
                      <span>{course.lessons} lessons</span>
                      <span>{course.students} students</span>
                    </div>
                    <div className={styles.courseFooter}>
                      <span className={styles.coursePrice}>${course.price}</span>
                      <button 
                        className={styles.enrollButton}
                        onClick={() => handleEnrollClick(course)}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EnrollmentModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
};

// Main Course Component
const Course = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    {
      id: 1,
      title: "Programming",
      description:
        "Learn to code and build real-world applications with courses designed for beginners and professionals alike.",
      badge: "7 Courses",
      color: "170, 75%, 41%",
      imgSrc: "/images/category-1.svg",
      imgAlt: "Programming Courses Illustration",
    },
    {
      id: 2,
      title: "Designing",
      description:
        "Explore creative designing courses that cover graphic design, UX/UI, and more. Develop practical skills.",
      badge: "4 Courses",
      color: "351, 83%, 61%",
      imgSrc: "/images/category-2.svg",
      imgAlt: "Designing Courses Illustration",
    },
    {
      id: 3,
      title: "Business",
      description:
        "Enhance your business knowledge with courses on leadership, strategy, and management. ",
      badge: "8 Courses",
      color: "229, 75%, 58%",
      imgSrc: "/images/category-3.svg",
      imgAlt: "Business Courses Illustration",
    },
    {
      id: 4,
      title: "Marketing",
      description:
        "Gain expertise in digital marketing, branding, and social media strategies. These are ideal for marketers.",
      badge: "8 Courses",
      color: "42, 94%, 55%",
      imgSrc: "/images/category-4.svg",
      imgAlt: "Marketing Courses Illustration",
    },
  ];
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.title);
  };

  return (
    <section className={styles.section} aria-label="category">
      <div className={styles.container}>
        <p className={styles.sectionSubtitle}>Categories</p>
        <h2 className={styles.sectionTitle}>
          Online <span className={styles.span}>Classes</span> For Remote Learning.
        </h2>
        <p className={styles.sectionText}>Best Courses for Learning Daily</p>
        <ul className={styles.gridList}>
          {categories.map((category) => (
            <li key={category.id}>
              <div
                className={styles.categoryCard}
                style={{
                  "--color": category.color,
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <div className={styles.cardIcon}>
                  <img
                    src={category.imgSrc}
                    width="40"
                    height="40"
                    loading="lazy"
                    alt={category.imgAlt}
                    className={styles.img}
                  />
                </div>
                <h3 className={styles.h3}>
                  <a href="#" className={styles.cardTitle}>
                    {category.title}
                  </a>
                </h3>
                <p className={styles.cardText}>{category.description}</p>
                <span className={styles.cardBadge}>{category.badge}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <CourseModal
        category={selectedCategory}
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </section>
  );
};

export default Course;