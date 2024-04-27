import React from 'react';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { Login } from './Login';
import { SignUp } from './SignUp';
import App from './App';

export default function Auth() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const removeCookies = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("adminID")
    window.location.reload(false)
  }

  return (
    <>
      {cookies.access_token ? (
        <>
          <App />
          <div className="text-center">
            <Button variant="danger" onClick={removeCookies}>
              Close the Diary 🌟
            </Button>
          </div>
        </>
      ) : (
        <>
          <SignUp />
          <Login />
        </>
      )}
    </>
  );
}
