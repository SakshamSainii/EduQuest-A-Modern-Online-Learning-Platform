import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './loginsignup.module.css';

const LoginSignup = ({ onClose, onLoginSuccess }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          id: Date.now().toString() // Add unique ID
        })
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        onLoginSuccess(userData);
      } else {
        alert('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users?username=${formData.username}`);
      const users = await response.json();

      const user = users.find(u => u.password === formData.password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        onLoginSuccess(user);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleToggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.container} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close login modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className={styles['forms-container']}>
          <div className={styles['signin-signup']}>
            <form 
              onSubmit={!isSignUpMode ? handleSignIn : handleSignUp} 
              className={`${styles['sign-in-form']} ${!isSignUpMode ? styles.active : ''}`}
            >
              <h2 className={styles.title}>Sign in</h2>
              <div className={styles['input-field']}>
                <FontAwesomeIcon icon={faUser} />
                <input 
                  type="text" 
                  name="username"
                  placeholder="Username" 
                  value={formData.username}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className={styles['input-field']}>
                <FontAwesomeIcon icon={faLock} />
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
            </form>
            
            <form 
              onSubmit={handleSignUp} 
              className={`${styles['sign-up-form']} ${isSignUpMode ? styles.active : ''}`}
            >
              <h2 className={styles.title}>Sign up</h2>
              <div className={styles['input-field']}>
                <FontAwesomeIcon icon={faUser} />
                <input 
                  type="text" 
                  name="username"
                  placeholder="Username" 
                  value={formData.username}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className={styles['input-field']}>
                <FontAwesomeIcon icon={faEnvelope} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className={styles['input-field']}>
                <FontAwesomeIcon icon={faLock} />
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <input type="submit" className={styles.btn} value="Sign up" />
            </form>
          </div>
        </div>

        <div className={styles['panels-container']}>
          <div className={`${styles.panel} ${styles['left-panel']}`}>
            <div className={styles.content}>
              <h3>New here?</h3>
              <p>Create an account to explore our courses</p>
              <button 
                type="button"
                className={`${styles.btn} ${styles.transparent}`} 
                onClick={handleToggleMode}
              >
                Sign up
              </button>
            </div>
          </div>

          <div className={`${styles.panel} ${styles['right-panel']}`}>
            <div className={styles.content}>
              <h3>One of us?</h3>
              <p>Already have an account? Sign in here</p>
              <button 
                type="button"
                className={`${styles.btn} ${styles.transparent}`} 
                onClick={handleToggleMode}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;