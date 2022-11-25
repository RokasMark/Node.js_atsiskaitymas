
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import MainContext from './context/MainContext';

import Nav from './components/Nav';
import Auth from './pages/AuthPage';
import Auction from './pages/AuctionPage';
import AddItem from './pages/AddItemPage';
import SingleItem from './pages/SingleItemPage';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:5001');

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [timeNow, setTimeNow] = useState(new Date().getTime());
  const [currentItem, setCurrentItem] = useState(null);

  const states = {
    socket,
    currentUser,
    setCurrentUser,
    userLoggedIn,
    setUserLoggedIn,
    items,
    setItems,
    item,
    setItem,
    timeNow,
    currentItem,
    setCurrentItem,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(new Date().getTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('register', (data) => {});
  }, []);

  return (
    <div className="App">
      <MainContext.Provider value={states}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/singleItem/:id" element={<SingleItem />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
