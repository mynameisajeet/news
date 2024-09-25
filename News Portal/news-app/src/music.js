import musicImage from './images/music.jpeg'; // Adjust the path based on your structure
import React, { useEffect, useState } from 'react';
import sourcesData from './musicSources.json'; // Your local JSON file
import './App.css'; // Import your CSS file

const NewsApp = () => {
  const [selectedSource, setSelectedSource] = useState(sourcesData.sources[0]); // Default to first source

  const handleSourceChange = (e) => {
    const sourceId = e.target.value;
    const source = sourcesData.sources.find(s => s.id === sourceId);
    setSelectedSource(source);
    // Open the selected source in a new tab/window
    window.open(source.url, '_blank', 'width=800,height=600,toolbar=no,scrollbars=yes,resizable=yes');
  };

  return (
    <div className="news-container">
      <div className="developer-info">Developed by Ajeet Agarwal</div> {/* New section */}
      <h1>Select Music Channel</h1>
      <select onChange={handleSourceChange} value={selectedSource.id} className="source-select">
        {sourcesData.sources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>
      {/* Display the music image below the dropdown */}
      <div className="music-image-container">
        <img src={musicImage} alt="Music" className="music-image" />
      </div>
    </div>
  );
};

export default NewsApp;
