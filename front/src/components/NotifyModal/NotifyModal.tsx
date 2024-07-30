import React from "react";
import ReactModal from "react-modal";
import "./style.css";

interface WarningModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
  sign: string;
}

export const NotifyModal: React.FC<WarningModalProps> = ({ isOpen, onRequestClose, message, sign }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
    >
      <h2>Notification</h2>
      <p>{message}</p>
      <p>{sign}</p>
      <button className="modal-close-button" onClick={onRequestClose}>
        확인
      </button>
    </ReactModal>
  );
};
