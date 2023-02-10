import "./App.css";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

const App = () => {
  const [showModal, setModalStatus] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Products, setProducts] = useState(null);
  let exeAxiosFullProducts: MutableRefObject<boolean> = useRef(false);
  let dateCache = useRef("");
  let productsCache = useRef(null);
  //const url = "http://127.0.0.1:5000/";
  const url = "https://shobryl-api.sirzanty.com/";

  const onLoadEffect = () => {
    productsCache.current = JSON.parse(localStorage.getItem("items"));
    if (productsCache.current) {
      setModalStatus(true);
      return;
    }
    setTimeout(() => {
      setModalStatus(true);
    }, 15000);
  };

  useEffect(onLoadEffect, []);

  useEffect(() => {
    if (exeAxiosFullProducts.current) {
      return;
    }

    dateCache.current = localStorage.getItem("date");
    if (dateCache.current) {
      if (Date.now() - parseInt(dateCache.current) > 172800000) {
        localStorage.clear();
      }
    }

    productsCache.current = JSON.parse(localStorage.getItem("items"));
    if (productsCache.current) {
      setProducts(productsCache.current);
      console.log("loaded products from cached");
      return;
    }

    const load = async () => {
      exeAxiosFullProducts.current = true;
      console.log("loading full products");
      await axios
        .get(url + "get-all-products-shopify")
        .then(function (response) {
          setProducts(response.data);
          localStorage.setItem("items", JSON.stringify(response.data));
          localStorage.setItem("date", Date.now().toString());
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    load();
  }, []);

  const closeModal = async () => {
    await axios
      .post(
        "https://hgw.sirzanty.com/api/Shopify/CallRequest",
        {
          name: name,
          phone: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios.get("https://api.ipify.org?format=js")
    .then((r) => {
      console.log(r.data);
      axios
      .post(
        url + "create-request",
        {
          name: name,
          phone: phone,
          product: selectedProduct ? selectedProduct.name : "No selected",
          date: new Date().toUTCString(),
          ip: r.data
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    });
    setModalStatus(false);
  };

  const wsContact = () => {
    window.open("https://wa.link/38yfpj", "_blank");
  };

  const getFormErrorMessage = (name: string) => {
    return name.trim() === "" ? (
      <small className="p-error">Required</small>
    ) : (
      <div></div>
    );
  };

  const productOptionTemplate = (option) => {
    return (
      <div className="items-container">
        <img alt={option.name} src={option.img} id="dsitems" />
        <div className="items-container-des">
          <p>{option.name}</p>
          <h5>{option.price}</h5>
        </div>
      </div>
    );
  };

  const onProductChange = (e) => {
    setSelectedProduct(e.value);
  };

  if (!showModal) {
    return (
      <div>
        <img
          id="wsiconcl"
          src="https://raw.githubusercontent.com/SirZanty/audio/main/ws.png"
          onClick={() => {
            wsContact();
          }}
        />
      </div>
    );
  }

  return (
    <div id="main-popup">
      <div id="header">
        <img
          id="logo"
          src="https://raw.githubusercontent.com/SirZanty/audio/main/tasksupply.png"
        />
        {/*<img
          id="hat"
          src="https://raw.githubusercontent.com/SirZanty/audio/main/hat.png"
  />*/}
        <img
          id="exit"
          src="https://icon-icons.com/downloadimage.php?id=221144&root=3522/PNG/32/&file=logout_exit_icon_221144.png"
          onClick={() => {
            setModalStatus(false);
          }}
        ></img>
      </div>
      <div id="main">
        <div id="formContaiener">
          <InputText
            tooltip="Full Name"
            placeholder="Full Name"
            id="name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {getFormErrorMessage(name)}
          <InputMask
            id="phone"
            name="phone"
            tooltip="Phone"
            placeholder="Enter your phone"
            mask="(999)999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></InputMask>
          {getFormErrorMessage(phone)}
          <br></br>
          <Dropdown
            tooltip="Products"
            value={selectedProduct}
            options={Products}
            onChange={onProductChange}
            itemTemplate={productOptionTemplate}
            optionLabel="name"
            filter
            filterBy="name"
            placeholder="Select Product"
          />
          <Button
            id="button"
            onClick={closeModal}
            label="Get 15% Off"
            disabled={name === "" || phone === ""}
          />
        </div>
      </div>
      <img
        id="wsiconop"
        src="https://raw.githubusercontent.com/SirZanty/audio/main/ws.png"
        onClick={() => {
          wsContact();
        }}
      />
    </div>
  );
};
export default App;
