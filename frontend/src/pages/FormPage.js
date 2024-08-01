import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const FormPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('userId', userId);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/products/create', formData, config);
      console.log(data)
      setMessage('Product created successfully');
      setLoading(false);
      history.push('/');
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while creating the product');
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FormPage;
