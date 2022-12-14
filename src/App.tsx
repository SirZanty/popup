import './App.css'
import { useState, useEffect } from "react";
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

const App = () => {
  const [showModal, setModalStatus] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const onLoadEffect = () => {
    setTimeout(() => {
      setModalStatus(true);
    }, 1000);
  };
  useEffect(onLoadEffect, []);

  const closeModal = () => {
    if (name.trim() == "" || phone.trim() == "") {
      alert("Please fill the information :)");
      return;
    }
    axios.post('https://hgw.sirzanty.com/api/Shopify/CallRequest', {
      name: { name }.name,
      phone: { phone }.phone
    },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    setModalStatus(false);
  }

  if (!showModal) {
    return <div></div>
  }
  return (
    <div id="main-popup">
      <div id="header">
        <img src="https://raw.githubusercontent.com/SirZanty/audio/main/tasksupply.png" />
        <img id="exit" src="https://icon-icons.com/downloadimage.php?id=221144&root=3522/PNG/32/&file=logout_exit_icon_221144.png" onClick={() => { setModalStatus(false) }}></img>
      </div>
      <div id="main">
        <InputText placeholder="Full Name" id="name" name="name" onChange={(e) => setName(e.target.value)} />
        <InputMask mask="(999)999-9999" id="phone" placeholder="Enter your phone" onChange={(e) => setPhone(e.target.value)}></InputMask>
        <Button onClick={() => closeModal()} id="button" label="Call me! -15%" />
      </div>
    </div>
  );
}
export default App;
