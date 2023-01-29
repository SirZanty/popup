import "./App.css";
import { useState, useEffect, useRef } from "react";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import { Skeleton } from "primereact/skeleton";
import axios from "axios";

const App = () => {
  const [showModal, setModalStatus] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGroupedProduct, setSelectedGroupedProduct] = useState(null);
  const [groupedProducts, setGroupedProducts] = useState(null);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  let loadLazyTimeout = useRef(null);

  const onLazyLoad = (event) => {
    console.log("entra a lazy")
    if(JSON.stringify(lastEvent)===JSON.stringify(event)){
      return;
    }
    setLazyLoading(true);
    setLastEvent(event);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    loadLazyTimeout = setTimeout(()=>{
      console.log("entra al axios");
      axios
      .get("http://127.0.0.1:5000/get-all-products-shopify")
      .then(function (response) {
        setGroupedProducts(response.data);
        setLazyLoading(false)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },100);   
    
  };

  const onLoadEffect = () => {
    setTimeout(() => {
      setModalStatus(true);
    }, 5000);
  };
  useEffect(onLoadEffect, []);

  const closeModal = () => {
    axios
      .post(
        "https://hgw.sirzanty.com/api/Shopify/CallRequest1",
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
    axios
      .post(
        "http://127.0.0.1:5000/create-request",
        {
          name: name,
          phone: phone,
          product: "",
          date: new Date(),
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

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex align-items-center country-item">
        <div>{option.label}</div>
      </div>
    );
  };

  const onGroupedProductChange = (e) => {
    setSelectedGroupedProduct(e.value);
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
            //onFocus={getAllShopifyProductsLazy}
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
            value={selectedGroupedProduct}
            options={groupedProducts}
            onChange={onGroupedProductChange}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionGroupTemplate={groupedItemTemplate}
            filter
            filterBy="label"
            virtualScrollerOptions={{
              lazy: true,
              onLazyLoad: onLazyLoad,
              itemSize: 38,
              showLoader: true,
              loading: lazyLoading,
              delay: 2500,
              loadingTemplate: (options) => {
                return (
                  <div
                    className="flex align-items-center p-2"
                    style={{ height: "38px" }}
                  >
                    <Skeleton
                      width={options.even ? "60%" : "50%"}
                      height="1rem"
                    />
                  </div>
                );
              },
            }}
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
