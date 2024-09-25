import React, { useEffect, useState } from 'react';
import sourcesData from './newsSources.json'; // Your local JSON file
import './App.css'; // Import your CSS file

const NewsApp = () => {
  const [selectedSource, setSelectedSource] = useState(sourcesData.sources[0]); // Default to first source

  const handleSourceChange = (e) => {
    const sourceId = e.target.value;
    const source = sourcesData.sources.find(s => s.id === sourceId);
    setSelectedSource(source);
  };

  return (
    <div className="news-container">
       <div className="developer-info">Developed by Ajeet Agarwal</div> {/* New section */}
      <h1>News Sources</h1>
      <select onChange={handleSourceChange} value={selectedSource.id} className="source-select">
        {sourcesData.sources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>
      
      <div className="webview-area">
        <iframe 
          src={selectedSource.url} 
          title={selectedSource.name} 
          className="webview" 
          frameBorder="2"
        />
      </div>
    </div>
  );
};

export default NewsApp;
