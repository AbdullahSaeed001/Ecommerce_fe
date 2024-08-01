import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.put(`http://localhost:5000/api/products/${id}`);
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setCategory(data.category);
      setFiles(data.images ? [data.images[0]] : null);
    };

    fetchProduct();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.put(`http://localhost:5000/api/products/${id}`, formData, config);
      console.log(data)
      setMessage('Product updated successfully');
      history.push('/');
    } catch (error) {
      console.error(error);
      setMessage('Error updating product');
    }
  };

  return ( 
    <div>
      
      {message && <p className='message'>{message}</p>}
      <form onSubmit={handleEdit}>
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
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditPage;
