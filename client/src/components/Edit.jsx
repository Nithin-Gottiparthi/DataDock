import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/config';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editData, setEditData] = useState({ title: '', description: '' });

  // Fetch data to populate form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/view/${id}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setEditData({ title: data.title, description: data.description });
      } catch (error) {
        console.error(error);
        alert('Failed to load data for editing');
      }
    };

    fetchData();
  }, [id]);

  const updateData = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert('Failed to edit data: ' + (error.msg || res.statusText));
        return;
      }

      alert('Data edited successfully');
      navigate('/');
    } catch (error) {
      console.error('Error editing data:', error);
      alert('Error editing data: ' + error.message);
    }
  };

  return (
    <form onSubmit={sendData} className='container mt-5'>
      <div className="mb-3">
        <label htmlFor="editTitle" className="form-label">Title</label>
        <input type="text" className="form-control" id="editTitle" name='title' value={editData.title} onChange={updateData} required />
      </div>
      <div className="mb-3">
        <label htmlFor="editDescription" className="form-label">Description</label>
        <input type="text" className="form-control" id="editDescription" name='description' value={editData.description} onChange={updateData} required />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Edit;
