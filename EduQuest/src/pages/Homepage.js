import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from "../component/Aboutus";
import Course from "../component/Course";
import Courses from "../component/Courses";
import Footer from "../component/Footer";
import Header from "../component/Header";
import MentorshipStats from "../component/MentorshipStats"
import OurPartners from "../component/Ourpartner";
import State from "../component/State";
import styles from './homepage.module.css';


const Homepage = () => {
  // Reusable animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <Header />
      </header>
      
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <MentorshipStats />
      </motion.div>
      
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Course />
      </motion.div>
      
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <AboutUs />
      </motion.div>
      
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Courses />
      </motion.div>
      
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <State />
      </motion.div>
      
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <OurPartners />
      </motion.div>
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        
      </motion.div>
      <motion.div 
        className={styles.main}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default Homepage;