import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_BASE } from '../utils/config';

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        throw new Error('Failed to delete data');
      }

      alert('Data deleted successfully');
      if (window.location.pathname === '/') window.location.reload();
      else navigate('/');
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error deleting data: ' + error.message);
    }
  };

  return (
    <button className='btn btn-danger' onClick={handleDelete}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
