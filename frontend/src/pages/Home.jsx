import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logout Successful');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  const fetchProducts = async () => {
    try {
      const url = 'login-auth-mern-server.vercel.app';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }


      });

      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {Array.isArray(products) && products.map((item, index) => (
          <ul key={index}>
            <li>{item.name} : {item.price}</li>
          </ul>
        ))}
      </div>

      <ToastContainer />
    </div>
  )
}

export default Home
