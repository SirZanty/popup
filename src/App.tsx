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
    }, 10000);
  };
  useEffect(onLoadEffect, []);

  const closeModal = () => {
    axios.post('https://hgw.sirzanty.com/api/Shopify/CallRequest', {
      name: name,
      phone: phone
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

  const wsContact = () => {
    window.open("https://wa.link/38yfpj", "_blank");
  };

  const getFormErrorMessage = (name: string) => {
    return name.trim() === "" ? <small className="p-error">Required</small> : <div></div>;
  };

  if (!showModal) {
    return (
      <div>
        <img id="wsiconcl" src="https://raw.githubusercontent.com/SirZanty/audio/main/ws.png" onClick={() => { wsContact() }} />
      </div>
    )
  }

  return (
    <div id="main-popup">
      <div id="header">
        <img id="logo" src="https://raw.githubusercontent.com/SirZanty/audio/main/tasksupply.png" />
        <img id="hat" src="https://raw.githubusercontent.com/SirZanty/audio/main/hat.png" />
        <img id="exit" src="https://icon-icons.com/downloadimage.php?id=221144&root=3522/PNG/32/&file=logout_exit_icon_221144.png" onClick={() => { setModalStatus(false) }}></img>
      </div>
      <div id="main">
        <div id="formContaiener">
          <InputText placeholder="Full Name" id="name" name="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          {getFormErrorMessage(name)}
          <InputMask id="phone" name="phone" placeholder="Enter your phone" mask="(999)999-9999" value={phone} onChange={(e) => setPhone(e.target.value)}></InputMask>
          {getFormErrorMessage(phone)}
          <Button id="button" onClick={closeModal} label="Get 15% Off" disabled={name === "" || phone === ""} />
        </div>
      </div>
      <img id="wsiconop" src="https://raw.githubusercontent.com/SirZanty/audio/main/ws.png" onClick={() => { wsContact() }} />
    </div >
  );
}
export default App;
