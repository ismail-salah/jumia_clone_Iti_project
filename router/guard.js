import React from 'react';
import { Navigate} from 'react-router-dom';
    const PrivateRoute = ({ children }) => {
        const token = localStorage.getItem('UserToken');
        const auth = token ? true : false;
        return auth ? <Navigate to="/" /> : children;
      };
      
  export default PrivateRoute