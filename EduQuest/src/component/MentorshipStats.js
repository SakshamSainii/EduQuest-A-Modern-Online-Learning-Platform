import React from 'react';
import './MentorshipStats.css';
import  { useEffect } from 'react';
import { Sparkles, Rocket, Zap } from 'lucide-react';

const MentorshipStats = () => {
    useEffect(() => {
        const items = document.querySelectorAll('.stat-item');
        
        const handleMouseMove = (e) => {
          const item = e.currentTarget;
          const rect = item.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / item.offsetWidth) * 100;
          const y = ((e.clientY - rect.top) / item.offsetHeight) * 100;
          
          item.style.setProperty('--mouse-x', `${x}%`);
          item.style.setProperty('--mouse-y', `${y}%`);
        };
        
        items.forEach(item => {
          item.addEventListener('mousemove', handleMouseMove);
        });
        
        return () => {
          items.forEach(item => {
            item.removeEventListener('mousemove', handleMouseMove);
          });
        };
      }, []);
  return (
    <div className="mentorship-container">
      <div className='glow-effect'></div>
      <div class="light-bar light-white weight-1 inside"></div>
      <div class="light-effect"></div>
      <div className="content-wrapper">
        <div className="header-section">
          <p className="subtitle">Forget Traditional Classrooms</p>
          <div className="title-container">
            <h1 className="title">Start Your Journey </h1>
            <h2 className="title-secondary">with World-Class Courses</h2>
          </div>
        </div>

        <div className="stats-showcase">
          <div className="stats-column left">
            <div className="stat-item">
              <div className="stat-icon">
                <Sparkles size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">70<span>%</span></div>
                <div className="stat-info">
                  <div className="stat-label">Cheaper</div>
                  <p className="stat-description">Compared to any 6 month course</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-column center">
            <div className="stat-item featured">
              <div className="stat-icon">
                <Rocket size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">100<span>x</span></div>
                <div className="stat-info">
                  <div className="stat-label">Results</div>
                  <p className="stat-description">As compared to any online courses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-column right">
            <div className="stat-item">
              <div className="stat-icon">
                <Zap size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">50<span>%</span></div>
                <div className="stat-info">
                  <div className="stat-label">Faster</div>
                  <p className="stat-description">Get results within 6 months instead of years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipStats;