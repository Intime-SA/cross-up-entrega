import { Action, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import timerReducer from "./features/timerSlice";
import { thunk, ThunkAction } from "redux-thunk";

// Store, reducers y middleware para thunk
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Añadir thunk
});

// Tipos de redux / ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Tipos de Trunk Redux / ts
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
