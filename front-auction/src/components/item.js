import React, { useContext, useEffect, useRef, useState } from 'react';
import MainContext from '../context/MainContext';
import { post } from '../plugins/http';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import "../css/main.css"


const SingleItem = () => {
  const { item, setItem, items, currentItem, currentUser, userLoggedIn } = useContext(MainContext);
  const [bids, setBids] = useState([{}]);

  useEffect(() => {
    getItem();
  }, [currentItem, bids]);

  const getItem = async () => {
    setItem(items[currentItem]);
  };

  const bidRef = useRef();

  const handleClick = async () => {
    console.log('clicked', bidRef.current.value);

    if (bidRef.current.value <= item.price) {
      alert('Bid must be higher');
    } else {
      const data = { itemId: item._id, bidder: currentUser, price: bidRef.current.value };
      const res = await post('updateBid', data);
      setBids((prev) => ({ ...prev, bidder: currentUser, price: bidRef.current.value }));
    }
  };

  const Completionist = () => <p className='big-letters'>auction ended</p>;

  return userLoggedIn ? (
    <section>
      <div>
        <img src={item.image} alt="owner item img" />
      </div>
      <div>
        <div className='item-data'>
          <p>TITLE: {item.title}</p>
          <p>CURRENT PRICE: €{item.price}</p>
          <p> TIME LEFT: <span>
              <Countdown date={item.time}>
                <Completionist />
              </Countdown>
            </span>
          </p>
          <p>HIGHEST BIDDER: {item.bidder ? item.bidder : ''}</p>
        <div className='item-btn'>
          <input ref={bidRef} type="number" placeholder="bid.." />
          <button onClick={handleClick}>BID</button>
        </div>
        </div>
      </div>
    </section>
  ) : (
    <>
      <h2 class>Loggin in order to see Auction</h2>
      <Link to={'/'}>LOGIN</Link>
    </>
  );
};

export default SingleItem;

