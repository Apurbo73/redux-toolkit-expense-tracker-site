import React from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  // setting month name of transactions:
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const d = new Date();
  const year = `${d.getFullYear()}`;
  let monthName = month[d.getMonth()];
  // setting month name of transactions ends here:
  const { transactions } = useSelector(state => state.transactions);
  // console.log(transactions);
  //calculate Income/expenses:
  let income = 0;
  const calculateIncome = transactions => {
    transactions.forEach(transaction => {
      const { type, amount } = transaction;
      if (type === "income") {
        income += amount;
      } else {
        income -= amount;
      }
    });
    // let status = null;
    // if (income < 0) {
    //   status =
    // }
    // if (income < 0) {
    //   status = <p style={{ color: "green" }}>Expense is more than Savings..</p>;
    // }
    return income;
  };
  return (
    <div>
      <div className="top_card">
        <p>
          Your Current Balance {monthName} {year}
        </p>
        <h3>
          <span>৳</span>
          {transactions.length > 0
            ? <span>
                {calculateIncome(transactions)}
              </span>
            : 0}
        </h3>
        {income < 0
          ? <div
              className=""
              style={{ color: "white", backgroundColor: "red",margin:10 }}
            >
              Expense is more than Savings..
            </div>
          : <div
              className=""
              style={{ color: "black", backgroundColor: "yellow",margin:10  }}
            >
              Savings are raising..
            </div>}
      </div>
    </div>
  );
};

export default Balance;
