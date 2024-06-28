import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Catalog.css'; 

const Catalog = () => {

  return (
    <NavLink to="/type/" className="catalog-toggle">
        Catalog
      </NavLink>
  );
};

export default Catalog;
