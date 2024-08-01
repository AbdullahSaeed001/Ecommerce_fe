import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Product</Link></li>
        </ul>
      </nav>
      <a href="/login" class="logout">Logout</a>
    </header>
  );
};

export default Header;
