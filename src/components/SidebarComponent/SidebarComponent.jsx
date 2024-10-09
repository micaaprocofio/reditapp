import React, { useState } from 'react';
import '/Users/mica/Desarrollo Web & Mobile/redditapp/src/components/index.css';


function SidebarComponent() {
  // Define a state to track the icon
  const [icon, setIcon] = useState('house-fill'); // Default Bootstrap house icon

  const toggleIcon = () => {
    setIcon((prevIcon) => (prevIcon === 'house-fill' ? 'house' : 'house-fill'));
  };

  return (
    <nav className="col-md-2 d-none d-md-block sidebar">
        {/* <h5 className="mt-3">Reciente</h5> */}
        <button className="home-btn btn w-100 d-flex align-items-center" onClick={toggleIcon} style={{fontSize: '14px' }}>
          <i className={`bi bi-${icon}`} style={{ marginRight: '8px', fontSize: '24px' }}></i> {/* Bootstrap icon */}
          Home
        </button>
    </nav>

  );
}

export default SidebarComponent;
