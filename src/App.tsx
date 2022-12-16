import './App.css'
import { useState, useEffect } from "react";
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';

const App = () => {
  const [showModal, setModalStatus] = useState(false);

  const onLoadEffect = () => {
    setTimeout(() => {
      setModalStatus(true);
    }, 1000);
  };
  useEffect(onLoadEffect, []);

  const closeModal = (nameI,phoneI) => {
    if (nameI.trim() == "" || phoneI.trim() == "") {
      alert("Please fill the information :)");
      return;
    }
    axios.post('https://hgw.sirzanty.com/api/Shopify/CallRequest', {
      name: nameI,
      phone: phoneI
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
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: ""
    },
    validate: (data) => {
      let errors:any = {};

      if (data.name==="") {
        errors.name = 'Name is required.';
      }

      if (data.phone==="") {
        errors.phone = 'Phone is required.';
      }

      return errors;
    },
    onSubmit: (data) => {
      closeModal(data.name,data.phone);
      formik.resetForm();
    }
  });

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };


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
        <form onSubmit={formik.handleSubmit}>
          <InputText placeholder="Full Name" id="name" name="name" value={formik.values.name}
          onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
          {getFormErrorMessage('name')}
          <InputMask id="phone" name="phone" placeholder="Enter your phone" mask="(999)999-9999" value={formik.values.name}
          onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('phone') })}></InputMask>
          {getFormErrorMessage("phone")}
          <Button id="button" type="submit" label="Call me! -15%" />
        </form>
      </div>
    </div >
  );
}
export default App;
