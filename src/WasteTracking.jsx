import React, { useState } from 'react';
import './WasteTracking.css';
import { FaRecycle } from "react-icons/fa"; // Import the CSS file for styling

function WasteTracking() {
  const [wasteLog, setWasteLog] = useState([]);
  const [newWaste, setNewWaste] = useState({ type: '', quantity: 0, date: '' });

  const handleAddWaste = () => {
    setWasteLog([...wasteLog, newWaste]);
    setNewWaste({ type: '', quantity: 0, date: '' });
  };

  return (
    <div className="waste-tracking-container">
      <h1 style={{fontWeight:"900"}}>Waste Tracking System  <span style={{color:"green"}}><FaRecycle/></span></h1>
      <div className="entry-container">
        <input
          type="text"
          placeholder="Waste type (e.g., plastic, paper, glass)"
          value={newWaste.type}
          onChange={(e) => setNewWaste({ ...newWaste, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity in kg(e.g., 10)"
          value={newWaste.quantity}
          onChange={(e) => setNewWaste({ ...newWaste, quantity: e.target.value })}
        />
        <input
          type="date"
          value={newWaste.date}
          onChange={(e) => setNewWaste({ ...newWaste, date: e.target.value })}
        />
        <button onClick={handleAddWaste} className='buttons'>Add Waste</button>
      </div>
      <ul className="waste-log">
        {wasteLog.map((entry, index) => (
          <li key={index}>
            <strong>Waste Type:</strong> {entry.type}, <strong>Quantity:</strong> {entry.quantity} units, <strong>Date:</strong> {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WasteTracking;