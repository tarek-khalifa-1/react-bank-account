// Redux Toolkit ==> modern way

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    convertingCurrency(state) {
      state.isLoading = true;
    },
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      ((state.loan = 0), (state.loanPurpose = ""));
    },
  },
});

// Can use thunk old way on redux toolkit
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  return async function (dispatch) {
    dispatch({ type: "account/convertingCurrency" });
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
      );

      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();
      const converted = data.rates["USD"];
      dispatch({
        type: "account/deposit",
        payload: converted,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
