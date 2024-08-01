import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';
import Header from './components/Header';
import Footer from './components/Footer';
import FormPage from './pages/FormPage';

const App = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login';

  return (
    <>
      {showHeaderFooter && <Header />}
      <Switch>
        <Route path="/create" component={FormPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/product/:id/edit" component={EditPage} />
        <Route path="/" component={HomePage} exact />
      </Switch>
      {showHeaderFooter && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
