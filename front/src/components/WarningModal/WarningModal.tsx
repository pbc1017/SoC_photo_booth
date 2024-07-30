import React from "react";
import ReactModal from "react-modal";
import "./style.css";

interface WarningModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

export const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onRequestClose, message }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
    >
      <h2>Warning</h2>
      <p>{message}</p>
      <button className="modal-close-button" onClick={onRequestClose}>
        확인
      </button>
    </ReactModal>
  );
};
