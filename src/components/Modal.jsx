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
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>{title}</h2>
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
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "800px", // Increased width
  width: "90%",
  maxHeight: "85vh",
  overflowY: "auto",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const closeBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "28px",
  cursor: "pointer",
  lineHeight: "1",
};

export default Modal;