import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>🖼️ Image Resizer</h2>
        
      <button style={styles.logoutBtn} onClick={onLogout}>
        Logout
      </button>
    </header>
  );
};

const styles = {
  header: {
    width: '98%',
    padding: '12px 20px',
    backgroundColor: '#24292e',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0
  },
  logoutBtn: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    width:'70px'
  }
};

export default Header;
