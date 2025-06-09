import React, { useState } from 'react';
import SunburstChart from './components/SunburstChart';
import { sampleData } from './data/sampleData';

function App() {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    console.log('Node clicked:', node);
    // Additional logic for drill-down can be added here
  };

  return (
    <div className="container">
      <h1>Sunburst Chart</h1>
      
      <div className="filter-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by keyword..."
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />
      </div>
      
      <div className="chart-container">
        <SunburstChart 
          data={sampleData} 
          filterKeyword={filterKeyword}
          onNodeClick={handleNodeClick}
        />
      </div>
      
      {selectedNode && (
        <div className="selected-info">
          <h3>Selected Node:</h3>
          <p>Name: {selectedNode.name}</p>
          <p>Value: {selectedNode.value}</p>
        </div>
      )}
    </div>
  );
}

export default App;