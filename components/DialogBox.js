import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import useClickOutside from "./ClickOutside";

export default function DialogBox({
  children,
  zIndex,
  alwaysOpen,
  height,
  width,
  closeModal,
  ...property
}) {
  const dialogRef = useRef(null);
  useClickOutside(dialogRef, () => closeModal());
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "visible");
  }, []);
  return (
    <div
      className={`fixed ${zIndex || "z_inf"} inset-0`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-center h-full items-end md:items-center text-center md:w-fit md:max-w-1/2 m-auto">
        <div
          className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          aria-hidden="true"
        ></div>

        <div
          ref={dialogRef}
          className={`inline-block ${width} border border-customGray-900 bg-black max-h-[500px] 
          md:max-h-max px-4 py-6 md:pb-9 md:p-9 flex-1 text-left 
          drop-shadow-xl transform transition-all md:rounded rounded-t-lg md:rounded-t 
          overflow-auto  md:overflow-hidden`}
        >
          <div className={`${property.className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

DialogBox.propTypes = {
  children: PropTypes.node,
  zIndex: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};
