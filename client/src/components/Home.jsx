import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from './DeleteButton';
import { API_BASE } from '../utils/config';

const Home = () => {
  const [getData, setGetData] = useState([]);

  const getGetData = async () => {
    try {
      const res = await fetch(`${API_BASE}/view`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setGetData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data: ' + error.message);
    }
  };

  useEffect(() => {
    getGetData();
  }, []);

  return (
    <div className='mt-5'>
      <div className='container mb-5' style={{ overflow: "auto" }}>
        <div className='add_btn mt-2' style={{ textAlign: "right" }}>
          <Link to="/add-data">
            <button className='btn btn-primary'>
              Add Data
            </button>
          </Link>
        </div>

        <table className="table mt-2">
          <thead>
            <tr className='table-dark'>
              <th scope="col">id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {getData.map((element, id) => (
              <tr key={element._id}>
                <th scope="row">{id + 1}</th>
                <td>{element.title}</td>
                <td>{element.description}</td>
                <td className='d-flex justify-content-between'>
                  <Link to={`/view/${element._id}`}>
                    <button className='btn btn-success'>
                      <RemoveRedEyeIcon />
                    </button>
                  </Link>
                  <Link to={`/edit/${element._id}`}>
                    <button className='btn btn-primary'>
                      <EditIcon />
                    </button>
                  </Link>
                  <DeleteButton id={element._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Home;
