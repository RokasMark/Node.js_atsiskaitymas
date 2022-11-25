import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { get } from '../plugins/http';
import Countdown from 'react-countdown';
import "../css/main.css"


const Auction = () => {
  const { items, setItems, setCurrentItem, userLoggedIn } = useContext(MainContext);
  const nav = useNavigate();

  useEffect(() => {
    getItems();
  }, [setItems]);

  const getItems = async () => {
    const res = await get('auction');
    console.log('res ===', res);
    setItems(res.data);

  };

  const handleClick = (i) => {
    console.log('i ===', i);
    setCurrentItem(i);
    nav('/singleItem/' + i);

  };

  const Completionist = () => <p>auction ended</p>;

  return userLoggedIn ? (
    <div className='auction-main'>
      {items.map((x, i) => {
        return (
          <div className='auction-card' key={i} onClick={() => handleClick(i)}>
            <img src={x.image} alt="" />
            <p>Title : {x.title}</p>
            <p>Price: €{x.price}</p>
            <p>Auction ends in:<span>
                <Countdown date={x.time}>
                  <Completionist />
                </Countdown>
              </span>
            </p>
          </div>
        );
      })}
    </div>
  ) : (
    <>
      <h1>You must log in to see the auction</h1>
      <Link to={'/'}>LOGIN</Link>
    </>
  );
};

export default Auction