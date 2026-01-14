import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <h2>{title}</h2>
          <button onClick={onClose} style={closeBtnStyle}>
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "500px",
  width: "90%",
  maxHeight: "80vh",
  overflowY: "auto",
};

const closeBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
};

export default Modal;
