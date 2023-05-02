import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateTransaction
} from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { transactions, isloading, isError } = useSelector(
    state => state.transactions
  );
  //Reset form handling after any action:
  const resetForm = () => {
    setAmount("");
    setName("");
    setType("");
  };
  //handling add transaction:
  const handleCreate = e => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount)
      })
    );
    resetForm();
  };
  //handling edit:
  const editing = useSelector(state => state.transactions.editing);
  //listen for edit mode active:
  useEffect(
    () => {
      const { id, name, type, amount } = editing || {};
      if (id) {
        setEditMode(true);
        setName(name);
        setType(type);
        setAmount(amount);
      } else {
        setEditMode(false);

        resetForm();
      }
    },
    [editing]
  );
  //handling cancel edit Mode:
  const cancelEditMode = () => {
    setEditMode(false);
    resetForm();
  };
  //handle update transaction:
  const handleUpdate = e => {
    e.preventDefault();
    dispatch(
      updateTransaction({
        id: editing.id,
        data: {
          name: name,
          type: type,
          amount: amount
        }
      })
    );
    setEditMode(false);
    resetForm();
  };

  return (
    <div>
      <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={editMode ? handleUpdate : handleCreate}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter Title"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group radio">
            <label>Type</label>
            <div className="radio_group">
              <input
                type="radio"
                value="income"
                name="type"
                required
                checked={type === "income"}
                onChange={e => setType("income")}
              />
              <label>Income</label>
            </div>
            <div className="radio_group">
              <input
                type="radio"
                value="expense"
                name="type"
                placeholder="Expense"
                checked={type === "expense"}
                onChange={e => setType("expense")}
              />
              <label htmlFor="transaction_type">Expense</label>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter Amount"
              name="amount"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <button disabled={isloading} type="submit" className="btn">
            {editMode ? "Update Transaction" : "Add Transaction"}
          </button>
          {!isloading &&
            isError &&
            <button style={{ color: "white", backgroundColor: "red" }}>
              Something Went Wrong !!
            </button>}

          {/* {isloading &&
            !isError &&
            <button style={{color:'white', backgroundColor:'red'}} >Added !!</button>} */}
        </form>
        {editMode &&
          <button
            onClick={cancelEditMode}
            type="submit"
            className="btn cancel_edit"
          >
            Cancel Edit
          </button>}
      </div>
    </div>
  );
};

export default Form;
