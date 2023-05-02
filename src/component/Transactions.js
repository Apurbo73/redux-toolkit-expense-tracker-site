import React, { useEffect } from "react";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { fetchTransactions } from "../features/transaction/transactionSlice";

const Transactions = () => {
  const { transactions, isLoading, isError, error } = useSelector(
    state => state.transactions
  );
  //dispatching get all transactions:
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  //decide what to render:
  let content = null;
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = (
      <div>
        <h1>
          {error}
        </h1>
      </div>
    );
  }

  if (!isLoading && !isError && transactions.length === 0) {
    content = (
      <div>
        <h3 style={{ backgroundColor: "#4338ca", color: "white", padding: 7 }}>
          No Transaction Found !!
        </h3>
      </div>
    );
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map(transaction =>
      <Transaction key={transaction.id} transaction={transaction} />
    );
  }

  return (
    <div>
      <div className="flex	">
        <p className="second_heading">Your Transactions: </p>
      </div>
      <div className="conatiner_of_list_of_transactions">
        <ul>
          {content}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
