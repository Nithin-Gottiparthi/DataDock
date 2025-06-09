import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from './DeleteButton';
import { API_BASE } from '../utils/config';

const View = () => {
  const { id } = useParams();
  const [getData, setGetData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/view/${id}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setGetData(data);
      } catch (error) {
        console.error(error);
        alert('Error fetching data');
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='container mt-5'>
      <div className="card" style={{ width: "24rem" }}>
        <div className="card-body">
          <div className='mb-2 d-flex justify-content-between'>
            <h5 className="card-title">{getData.title}</h5>
            <div className="add_btn" style={{ textAlign: "right" }} >
              <Link to={`/edit/${getData._id}`}>
                <button className="btn btn-primary mx-2"><EditIcon /></button>
              </Link>
              <DeleteButton id={id} />
            </div>
          </div>
          <p className="card-text">{getData.description}</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default View;
