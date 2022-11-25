import React, { useContext, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { post } from '../plugins/http';
import "../css/main.css"


const Auth = () => {
  const nav = useNavigate();
  const { setUserLoggedIn, setCurrentUser } = useContext(MainContext);

  const usernameRef = useRef();
  const pass1 = useRef();
  const pass2 = useRef();
  const loginUsername = useRef();
  const loginPass = useRef();

  const register = async () => {
    const user = {
      username: usernameRef.current.value,
      pass1: pass1.current.value,
      pass2: pass2.current.value,
    };

    const res = await post('register', user);
    console.log('res ===', res);
    if (res.error === false) {
      setUserLoggedIn(true);
      setCurrentUser(user.username);

      nav('/auction');
    } else if (res.error) {
      alert(res.message);
    }
  };

  const login = async () => {
    const user = {
      username: loginUsername.current.value,
      password: loginPass.current.value,
    };
    const res = await post('login', user);
    console.log('res ===', res);
    if (res.error === false) {
      setUserLoggedIn(true);
      setCurrentUser(user.username);

      Navigate('/auction');
    } else if (res.error) {
      alert(res.message);
    }
  };

  return (
    <div className='auth-main'>

      <div className='registration'>
        <h2>REGISTER</h2>
        <input ref={usernameRef} type="text" placeholder="Username" />
        <input ref={pass1} type="text" placeholder="Password" />
        <input ref={pass2} type="text" placeholder="Repeat Password" />
        <button onClick={register}>REGISTER</button>
      </div>

      <div className='registration'>
        <h2>LOGIN</h2>
        <input ref={loginUsername} type="text" placeholder="Username" />
        <input ref={loginPass} type="text" placeholder="Password" />
        <button onClick={login}>LOGIN</button>
      </div>

    </div>
  );
};


export default Auth;
