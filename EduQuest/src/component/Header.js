import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import {
    Home, 
    User,
    Book, 
    PenTool, 
    Mail, 
    Search,
    ShoppingBasket,
    LogOut,
    Settings,
    Save,
    X,
    AlertCircle,
    CheckCircle,
    Camera,
    UserCircle,
    Key,
    Lock,
    ChevronDown,
    Edit,ArrowRightFromLineIcon
} from 'lucide-react';
import LoginSignup from './Loginsignup';
import styles from './header.module.css';

// Profile Modal Component
const ProfileModal = ({ user, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.id]);

  if (loading) return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={`${styles.message} ${styles.error}`}>
          <AlertCircle size={18} />
          {error}
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={18} />
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>
          <UserCircle size={24} />
          Profile Details
        </h2>
        <div className={styles.profileDetails}>
          <div className={styles.profileImageContainer}>
            <img 
              src={`https://ui-avatars.com/api/?name=${userData?.username}&background=random`} 
              alt="Profile" 
              className={styles.profileImage}
            />
            
          </div>
          <div className={styles.userInfo}>
            <p>
              <User size={18} />
              <strong>Username:</strong> {userData?.username}
            </p>
            <p>
              <Mail size={18} />
              <strong>Email:</strong> {userData?.email}
            </p>
            <p>
              <Book size={18} />
              <strong>Member Since:</strong> {new Date(Number(userData?.id)).toLocaleDateString()}
            </p>
          </div>
        </div>
        
  <button onClick={onClose} className={styles.closeIconButton}>
    <X size={18} />
  </button>
  {/* Rest of your modal content */}


      </div>
    </div>
  );
};

// Settings Modal Component
const SettingsModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          username: data.username,
          email: data.email
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verify current password
      const response = await fetch(`http://localhost:3000/users/${user.id}`);
      if (!response.ok) throw new Error('Failed to verify user');
      const userData = await response.json();

      if (userData.password !== formData.password) {
        throw new Error('Current password is incorrect');
      }

      // Update user data
      const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.newPassword || formData.password
        }),
      });

      if (!updateResponse.ok) throw new Error('Failed to update profile');

      const updatedUser = await updateResponse.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('Profile updated successfully!');
      
      // Clear sensitive form fields
      setFormData(prev => ({
        ...prev,
        password: '',
        newPassword: ''
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.username) return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>
          <Settings size={24} />
          Settings
        </h2>
        
        {message && (
          <div className={`${styles.message} ${styles.success}`}>
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        {error && (
          <div className={`${styles.message} ${styles.error}`}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.settingsForm}>
          <div className={styles.formGroup}>
            <label>
              <User size={18} />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>
              <Lock size={18} />
              Current Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter current password"
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>
              <Key size={18} />
              New Password (optional)
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              disabled={loading}
            />
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={loading}
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className={styles.cancelButton}
              disabled={loading}
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Header Component
const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileMenuOpen(false);
    window.location.href = '/';
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
    setIsProfileMenuOpen(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faGraduationCap} className={styles.logoIcon} />
          <span>EduQuest</span>
        </div>

        <nav>
          <ul className={styles.nav}>
            <li>
              <a href="#" className={styles.navLink}>
                <Home size={18} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <User size={18} />
                <span>About</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <Book size={18} />
                <span>Courses</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <PenTool size={18} />
                <span>Blog</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <Mail size={18} />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <button
              onClick={handleSearchToggle}
              className={`${styles.button} ${styles.outline}`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {isSearchOpen && (
              <form
                onSubmit={handleSearchSubmit}
                className={styles.searchDropdown}
              >
                <input
                  type="text"
                  placeholder="Search courses, blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchSubmitButton}>
                  <Search size={16} />
                </button>
              </form>
            )}
          </div>

          <button 
            className={`${styles.button} ${styles.outline}`}
            aria-label="Shopping cart"
          >
            <ShoppingBasket size={20} />
          </button>

          {user ? (
            <div className={styles.profileContainer}>
              <button 
                className={styles.profileButton}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-label="Profile menu"
              >
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} 
                  alt="Profile" 
                  className={styles.profileCircle}
                />
                <ChevronDown size={16} className={styles.chevron} />
              </button>
              
              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <button 
                    className={styles.menuItem}
                    onClick={handleProfileClick}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button 
                    className={styles.menuItem}
                    onClick={handleSettingsClick}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  <button 
                    className={styles.menuItem}
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className={`${styles.button} ${styles.primary}`} 
              onClick={() => setIsLoginModalOpen(true)}
            >
              Try for free
              <ArrowRightFromLineIcon size={18} />
            </button>
            
          )}
        </div>
      </header>

      {isLoginModalOpen && (
        <LoginSignup 
          onClose={() => setIsLoginModalOpen(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isProfileModalOpen && user && (
        <ProfileModal 
          user={user}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {isSettingsModalOpen && user && (
        <SettingsModal
          user={user}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;