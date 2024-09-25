import React, { useState } from 'react';
import NewsTab from './news';  // Import NewsTab component
import MusicTab from './music'; // Import MusicTab component

const App = () => {
  const [activeTab, setActiveTab] = useState('news');  // Default tab is "news"

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'news' ? 'active' : ''}`} 
          onClick={() => handleTabClick('news')}
        >
          News
        </div>
        <div 
          className={`tab ${activeTab === 'music' ? 'active' : ''}`} 
          onClick={() => handleTabClick('music')}
        >
          Music
        </div>
      </div>

      {/* Render the appropriate component based on the active tab */}
      {activeTab === 'news' && <NewsTab />}
      {activeTab === 'music' && <MusicTab />}
    </div>
  );
};

export default App;
