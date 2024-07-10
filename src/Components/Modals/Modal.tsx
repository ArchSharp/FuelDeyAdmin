// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  const modalClasses = `w-[80vw] md:w-[600px] text-center rounded-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md z-[5] ${
    isOpen ? "block" : "hidden"
  }`;

  const overlayClasses = `fixed top-0 left-0 w-full h-full bg-black opacity-50 ${
    isOpen ? "block" : "hidden"
  }`;

  return (
    <>
      <div className={modalClasses}>
        <p className="">{content}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
      <div className={overlayClasses}></div>
    </>
  );
};

export default Modal;
