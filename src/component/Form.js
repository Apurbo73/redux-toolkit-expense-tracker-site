import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const handleCreate = e => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount
      })
    );
  };
  return (
    <div>
      <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={handleCreate}>
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
                Value="income"
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
          <button type="submit" className="btn">
            Add Transaction
          </button>
        </form>
        <button type="submit" className="btn cancel_edit">
          Cancel Edit
        </button>
      </div>
    </div>
  );
};

export default Form;
