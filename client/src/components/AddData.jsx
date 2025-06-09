import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/config';

const AddData = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ title: '', description: '' });

  const updateData = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/add-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        alert('Failed to add data: ' + (error.msg || res.statusText));
        return;
      }

      alert('Data added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Error adding data: ' + error.message);
    }
  };

  return (
    <form onSubmit={sendData} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" id="title" name="title" value={data.title} onChange={updateData} className="form-control" required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" id="description" name="description" value={data.description} onChange={updateData} className="form-control" required />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default AddData;
