import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../src/features/transaction/transactionSlice";
export const store = configureStore({
  reducer: {
    transactions: transactionsReducer
  }
});
