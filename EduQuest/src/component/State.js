// State.js
import React, { useState } from 'react';
import styles from './state.module.css';
import { 
    ArrowLeftCircle, 
    ArrowRightCircle,
     QuoteIcon
} from 'lucide-react';

const State = () => {
  const testimonials = [
    {
      text: 'EduQuest exceeded all my expectations! The Full-Stack Web Development course not only gave me the skills I needed but also helped me build an impressive portfolio. I landed my first job as a Junior Developer just two months after completing the course!',
      name: 'Alice Johnson',
      title: 'Junior Developer at TechCorp',
      img: 'https://th.bing.com/th/id/OIP.mArVXmuQrTm5Kux89-8sMAHaF7?w=2500&h=2000&rs=1&pid=ImgDetMain',
    },
    {
      text: 'The Data Science program at EduQuest transformed my career. The courses are thorough, the instructors are experts in their fields, and the community support was invaluable. I now feel confident analyzing complex datasets in my role as a Data Analyst.',
      name: 'Rahul Verma',
      title: 'Data Analyst at FinTech Solutions',
      img: 'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain',
    },
    {
      text: 'EduQuest’s AI and Machine Learning course equipped me with cutting-edge tools and practical knowledge. Thanks to the course, I now apply advanced AI techniques in my work confidently. Highly recommended!',
      name: 'Emily Carter',
      title: 'Machine Learning Engineer at InnovateAI',
      img: 'https://th.bing.com/th/id/R.6bd4d657a89e57a3e3ecb37ae8673e1e?rik=yr7r2onOMZXurQ&riu=http%3a%2f%2fthispix.com%2fwp-content%2fuploads%2f2015%2f06%2fportrait-profile-004.jpg&ehk=v9p6C0krgG%2bov%2bPUDcIfam8TG9wdzl9HYhiTpqTbP%2fs%3d&risl=&pid=ImgRaw&r=0',
    },
    {
      text: 'The Cybersecurity bootcamp on EduQuest is a game-changer. It offered hands-on experience and practical insights that directly boosted my career. I now feel ready to tackle complex security challenges at work.',
      name: 'John Doe',
      title: 'Cybersecurity Specialist at SafeNet',
      img: 'https://th.bing.com/th/id/OIP.pLM9hUOqvYxrfLMDdPAwKQHaHa?rs=1&pid=ImgDetMain',
    },
    {
      text: 'EduQuest’s courses are an investment worth making. I took the Digital Marketing program, and the knowledge I gained has dramatically improved my strategies. My client engagement and sales metrics have skyrocketed!',
      name: 'Sophia Lee',
      title: 'Digital Marketing Specialist at BrandBuzz',
      img: 'https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg',
    },
  ];
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const marqueeParts = Array(3).fill("Hear from Our Learning Community • ");

  return (
    <div className={styles.container}>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeContent}>
          {marqueeParts.map((text, index) => (
            <span key={index} className={styles.marqueeText}>{text}</span>
          ))}
        </div>
      </div>

      <div className={styles.testimonialContainer}>
        <div className={styles.messageIcon}>
          <QuoteIcon size={24} />
        </div>
        <div className={styles.quote}>{currentTestimonial.text}</div>
      </div>

      <div className={styles.profile}>
        <img
          src={currentTestimonial.img}
          alt={currentTestimonial.name}
          className={styles.profileImg}
        />
        <div className={styles.profileInfo}>
          <div className={styles.name}>{currentTestimonial.name}</div>
          <div className={styles.title}>{currentTestimonial.title}</div>
        </div>
      </div>

      <div className={styles.navigation}>
        <button className={styles.button} onClick={handlePrevious}>
          <ArrowLeftCircle size={50} />
        </button>
        <button className={styles.button} onClick={handleNext}>
          <ArrowRightCircle size={50} />
        </button>
      </div>
    </div>
  );
};

export default State;