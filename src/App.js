import * as React from 'react';
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp'
import Alerts from "./components/Alert"
import { useState } from 'react';
import Profile from './components/Profile';
import Drawer from './components/Drawer';

function App() {
  document.body.style.backgroundColor = 'white';
  const [alert, setAlert] = useState(null);
  const showAlert = (typ, message) => {
    setAlert({
      msg: message,
      type: typ,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Nav />
          < Alerts alert={alert} />
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/sign" element={<SignUp showAlert={showAlert} />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
