import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import "../css/main.css"

const Nav = () => {
  const { userLoggedIn, setUserLoggedIn } = useContext(MainContext);
  
  const logout = () => {
    localStorage.removeItem('token');
    console.log('logout');
    setUserLoggedIn(false);
  };

  return (
    <div className= "NavBar ">
      {!userLoggedIn ? (<div className='auction-title'>AUCTION ON</div>) : (
        <>
          <Link className='nav-control' to={'/auction'}>AUCTION</Link>
          <Link className='nav-control'to={'/addItem'}>ADD ITEM</Link>
          <Link className='nav-control'onClick={logout} to={'/'}>
            LOG OUT
          </Link>
        </>
      )}
    </div>
  );
};

export default Nav;
