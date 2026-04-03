import React from 'react';

const InstructorCard = () => {
  const styles = {
    container: {
      backgroundColor: '#121214',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      width: '100%',
  
      fontFamily: '"Lexend Exa", sans-serif',
      color: '#FFFFFF',
    },
    imageWrapper: {
      position: 'relative',
      width: '100px',
      height: '100px',
    },
    profileImg: {
      width: '100%',
      height: '100%',
      borderRadius: '16px',
      objectFit: 'cover',
    },
    googleBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: 'white',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    label: {
      fontSize: '14px',
      color: '#666666',
      textTransform: 'capitalize',
      marginBottom: '4px',
    },
    name: {
      fontSize: '24px',
      fontWeight: '700',
      margin: '0',
      letterSpacing: '-0.5px',
    },
    title: {
      fontSize: '16px',
      color: '#BBBBBB',
      margin: '4px 0 12px 0',
    },
    stats: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: '400',
      gap: '8px',
    },
    star: {
      color: '#E2F36E', // Lime/Yellow color from image
      fontSize: '18px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Profile Image Section */}
      <div style={styles.imageWrapper}>
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvbWFufGVufDB8fDB8fHww" // Replace with Sarah's actual image URL
          alt="Sarah Hassan" 
          style={styles.profileImg}
        />
        <div style={styles.googleBadge}>
          <img 
            src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg" 
            alt="Google" 
            style={{ width: '18px' }}
          />
        </div>
      </div>

      {/* Text Content Section */}
      <div style={styles.content}>
        <span style={styles.label}>Instructor</span>
        <h2 style={styles.name}>Sarah Hassan</h2>
        <p style={styles.title}>Fashion Business Consultant</p>
        
        <div style={styles.stats}>
          <span style={styles.star}>★</span>
          <span>4.9 • 15 courses</span>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;