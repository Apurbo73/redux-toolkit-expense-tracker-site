import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTranactions
} from "./transactionApi";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {}
};

//creating async thunnks:

//async thunk for fetching transactions:
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transactions = await getTranactions();
    return transactions;
  }
);
//async thunk for adding transactions:
export const createTransaction = createAsyncThunk(
  "/transaction/createTransaction",
  async data => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

//async thunk for editing transactions:
export const updateTransaction = createAsyncThunk(
  "/transaction/updateTransaction",
  async ({ data, id }) => {
    const transaction = await editTransaction(data, id);
    return transaction;
  }
);
//async thunk for deleting transactions:
export const removeTransaction = createAsyncThunk(
  "/transaction/removeTransaction",
  async id => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);
//creating slices:
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: state => {
      state.editing = {};
    }
  },
  extraReducers: builder => {
    builder
      // promise from reducer returns 3 states.
      //1. Pending 2. Fulfilled and 3. Rejected

      //handling fetch transaction reducer states:
      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error.message;
      })
      //handling add transaction reducer states:
      .addCase(createTransaction.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      //handling edit transaction reducer states:
      .addCase(updateTransaction.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.transactions.findIndex(
          t => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      //handling delete transaction reducer states:
      .addCase(removeTransaction.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          t => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
