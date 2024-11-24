import React, { useState, useEffect } from 'react';
import styles from './courses.module.css';
import { Library, Timer, Star, ArrowRight, Users, ShoppingCart, CreditCard, X, CheckCircle } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;
  
  return (
    <div className={styles.successModalOverlay}>
      <div className={styles.successModalContent}>
        <button onClick={onClose} className={styles.successModalClose}>
          <X size={24} />
        </button>
        <div className={styles.successModalBody}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h2 className={styles.successTitle}>Thank you for your purchase!</h2>
          <p className={styles.successMessage}>
            You have successfully purchased:
            {items.map(item => (
              <span key={item.id} className={styles.courseName}>{item.title}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

const BuyNowModal = ({ courses, totalAmount, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!courses || courses.length === 0) return null;

  const handlePurchase = () => {
    // Handle purchase logic here
    console.log('Processing purchase for courses:', courses);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Complete Your Purchase</h2>
            <button onClick={onClose} className={styles.closeButton}>
              <X className={styles.icon} />
            </button>
          </div>
          
          <div className={styles.courseInfo}>
            <div className={styles.purchaseSummary}>
              <h3>Order Summary</h3>
              {courses.map(course => (
                <div key={course.id} className={styles.purchaseItem}>
                  <img src={course.image} alt={course.title} />
                  <div>
                    <h4>{course.title}</h4>
                    <p>Quantity: {course.quantity || 1}</p>
                    <p className={styles.price}>${((course.price || 0) * (course.quantity || 1)).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className={styles.totalAmount}>
                <h4>Total Amount:</h4>
                <p className={styles.price}>${totalAmount}</p>
              </div>
            </div>
          </div>

          <div className={styles.paymentForm}>
            <input
              type="text"
              placeholder="Card Number"
              className={styles.input}
            />
            <div className={styles.cardDetails}>
              <input
                type="text"
                placeholder="MM/YY"
                className={styles.input}
              />
              <input
                type="text"
                placeholder="CVC"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.purchaseButton} onClick={handlePurchase}>
              <CreditCard className={styles.icon} />
              Purchase Now
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        items={courses}
      />
    </>
  );
};

const CourseCard = ({ course, onAddToCart, onBuyNow }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`${styles.icon} ${index < Math.floor(rating) ? styles.starFilled : styles.starEmpty}`}
      />
    ));
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    onAddToCart(course);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className={styles.courseCard}>
      <figure className={styles.cardBanner}>
        <img src={course.image} alt={course.title} className={styles.imgCover} />
      </figure>

      <div className={styles.absBadge}>
        <Timer className={styles.icon} />
        <span>{course.duration}</span>
      </div>

      <div className={styles.cardContent}>
        <span className={styles.badge}>{course.level}</span>

        <h3 className={styles.h3}>
          <a href="#" className={styles.cardTitle}>{course.title}</a>
        </h3>

        <div className={styles.wrapper}>
          <div className={styles.ratingWrapper}>
            {renderStars(course.rating)}
          </div>
          <p className={styles.ratingText}>({course.rating}/{course.totalRatings} Rating)</p>
        </div>

        <div className={styles.price}>${course.price.toFixed(2)}</div>

        <ul className={styles.cardMetaList}>
          <li className={styles.cardMetaItem}>
            <Library className={styles.icon} />
            <span>{course.lessons} Lessons</span>
          </li>
          <li className={styles.cardMetaItem}>
            <Users className={styles.icon} />
            <span>{course.students} Students</span>
          </li>
        </ul>

        <div className={styles.courseActions}>
          <button 
            className={`${styles.cartButton} ${isAddedToCart ? styles.added : ''}`}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            <ShoppingCart className={styles.icon} />
            {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button 
            className={styles.buyButton}
            onClick={() => onBuyNow(course)}
          >
            <CreditCard className={styles.icon} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddToCart = (course) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === course.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...course, quantity: 1 }];
    });
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleUpdateQuantity = (courseId, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === courseId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleRemoveFromCart = (courseId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
  };

  const handleBuyNow = (course) => {
    setSelectedCourse(course);
    setShowBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setShowBuyModal(false);
    setSelectedCourse(null);
  };

  const handleCloseCheckoutModal = () => {
    setShowCheckoutModal(false);
    setShowCart(false);
    setCartItems([]); // Clear cart after successful checkout
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutModal(true);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCart = () => (
    <div className={`${styles.cartTab} ${showCart ? styles.open : ''}`}>
      <div className={styles.cartHeader}>
        <h1>Shopping Cart ({getTotalItems()} items)</h1>
        <button onClick={() => setShowCart(false)} className={styles.closeCart}>
          <X className={styles.icon} />
        </button>
      </div>
      <div className={styles.cartItems}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>Your cart is empty</div>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.title} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h3>{item.title}</h3>
                <div className={styles.price}>${item.price.toFixed(2)}</div>
              </div>
              <div className={styles.cartItemQuantity}>
                <button onClick={() => handleUpdateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
              </div>
              <button 
                onClick={() => handleRemoveFromCart(item.id)} 
                className={styles.removeItem}
              >
                <X className={styles.icon} />
              </button>
            </div>
          ))
        )}
      </div>
      <div className={styles.cartFooter}>
        <div className={styles.cartTotal}>Total: ${getTotalPrice()}</div>
        <button 
          className={styles.checkoutButton} 
          disabled={cartItems.length === 0}
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.sectionSubtitle}>Popular Courses</p>
            <h2 className={styles.sectionTitle}>Pick A Course To Get Started</h2>
            
          </div>
          <button 
            className={styles.cartIcon} 
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart className={styles.icon} />
            {cartItems.length > 0 && (
              <span className={styles.cartBadge}>{getTotalItems()}</span>
            )}
          </button>
        </div>
        
        <div className={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.coursesGrid}>
                {category.courses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className={styles.btn}>
          <span>Browse more courses</span>
          <ArrowRight className={styles.icon} />
        </button>
      </div>

      {renderCart()}
      
      {showAddedToCart && (
        <div className={styles.addedToCartPopup}>
          Item added to cart!
        </div>
      )}

      {showBuyModal && (
        <BuyNowModal
          courses={[selectedCourse]}
          totalAmount={selectedCourse.price.toFixed(2)}
          onClose={handleCloseBuyModal}
        />
      )}

      {showCheckoutModal && (
        <BuyNowModal
          courses={cartItems}
          totalAmount={getTotalPrice()}
          onClose={handleCloseCheckoutModal}
        />
      )}
    </section>
  );
};

export default Courses;