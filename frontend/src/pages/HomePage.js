import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/get');
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleIncrement = (id) => {
    setProducts(products.map(product => 
      product._id === id ? { ...product, countInStock: product.countInStock + 1 } : product
    ));
  };

  const handleDecrement = (id) => {
    setProducts(products.map(product => 
      product._id === id && product.countInStock > 0 ? { ...product, countInStock: product.countInStock - 1 } : product
    ));
  };

  return (
    <div className="home-page">
      <style>
        {`
          .home-page {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
          }

          .home-page h1 {
            text-align: center;
            color: #34495e;
            margin-bottom: 20px;
          }

          .home-page ul {
            list-style: none;
            padding: 0;
          }

          .home-page li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          }

          .home-page h2 {
            font-size: 20px;
            margin: 0 0 10px 0;
          }

          .home-page p {
            font-size: 16px;
            margin: 5px 0;
            color: #34495e;
          }

          .home-page img {
            width: 200px;
            height: auto;
            border-radius: 4px;
            margin-right: 20px;
          }

          .home-page .product-details {
            flex-grow: 1;
          }

          .home-page .actions {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .home-page a {
            text-decoration: none;
            color: #3498db;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .home-page a:hover {
            text-decoration: underline;
          }

          .home-page button {
            color: white;
            background-color: #e74c3c;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease, transform 0.1s ease;
          }

          .home-page button:hover {
            background-color: #c0392b;
            transform: translateY(-2px);
          }

          .stock-controls {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .stock-controls button {
            background-color: #3498db;
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
          }

          .stock-controls button:disabled {
            background-color: #bdc3c7;
          }
        `}
      </style>
      
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <img src={product.images[0]} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <div className="stock-controls">
                <button onClick={() => handleDecrement(product._id)} disabled={product.countInStock <= 0}>-</button>
                <span>{product.countInStock}</span>
                <button onClick={() => handleIncrement(product._id)}>+</button>
              </div>
            </div>
            <div className="actions">
              <Link to={`/product/${product._id}/edit`} style={{ marginBottom: '10px' }}>Edit</Link>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
