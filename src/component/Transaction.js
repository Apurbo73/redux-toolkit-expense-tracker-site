import React from "react";
import editImage from "../images/edit.svg";
import deleteImage from "../images/delete.svg";
const Transaction = () => {
  return (
    <div>
      <li className="transaction income">
        <p>Earned this month</p>
        <div className="right">
          <p>৳ 100</p>
          <button className="link">
            <img className="icon" src={editImage} alt="edit" />
          </button>
          <button className="link">
            <img className="icon" src={deleteImage} alt="delete" />
          </button>
        </div>
      </li>
    </div>
  );
};

export default Transaction;
