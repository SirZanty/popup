import './App.css'
import ReactModal from "react-modal";
import { useState } from "react";
const App = () => {
  const [showModal, setModalStatus] = useState(true);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(15, 13, 13, 0.1)',

    },
    overlay: {
      backgroundColor: 'rgba(13, 13, 13, 0.1)',
    },
  };

  const closeModal = () => {
    setModalStatus(false);
  }

  return (
    <div>
      <ReactModal
        isOpen={showModal}
        contentLabel="The best CPAP and supplies"
        style={customStyles}
      >
        <p>Name/Phone</p>
        <button onClick={() => closeModal()}>CALL ME!</button>
      </ReactModal>
    </div>
  );
}
export default App;
