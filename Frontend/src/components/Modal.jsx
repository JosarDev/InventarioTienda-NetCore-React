// src/components/Modal.jsx

export default function Modal({ children, onClose }) {
  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  animation: "fadeIn 0.3s ease",
};

const modal = {
  background: "#1e293b",
  padding: "2rem",
  borderRadius: "16px",
  maxWidth: "500px",
  width: "90%",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative",
  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
  border: "1px solid #334155",
};

const closeBtn = {
  position: "absolute",
  top: "12px",
  right: "16px",
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  color: "#94a3b8",
  cursor: "pointer",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "background 0.2s",
};

closeBtn[":hover"] = {
  background: "#334155",
};