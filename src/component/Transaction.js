import React from "react";
import editImage from "../images/edit.svg";
import deleteImage from "../images/delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction
} from "../features/transaction/transactionSlice";
const Transaction = ({ transaction }) => {
  const { name, type, amount, id } = transaction;
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() +
    1}/${current.getFullYear()}`;
  const dispatch = useDispatch();
  //handling edit option:
  const handleEdit = () => {
    dispatch(editActive(transaction));
  };
  // handle Delete option:
  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };
  return (
    <div>
      <li className={`transaction ${type}`}>
        <p>
          {name}
        </p>
        <p>
          {type}
        </p>
        <p>
          {date}
        </p>
        <div className="right">
          <p>
            ৳ {amount}
          </p>
          <button onClick={handleEdit} className="link">
            <img className="icon" src={editImage} alt="edit" />
          </button>
          <button className="link">
            <img
              onClick={handleDelete}
              className="icon"
              src={deleteImage}
              alt="delete"
            />
          </button>
        </div>
      </li>
    </div>
  );
};

export default Transaction;
