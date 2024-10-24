import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store"; // Importamos AppDispatch para los thunks
import { TimerState } from "@/domain/definitions";

// Inicializamos desde interfaz
const initialState: TimerState = {
  timeLeft: 0,
  isRunning: false,
};

// creamos state redux
const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
      state.isRunning = true;
    },
    tick: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.isRunning = false; // Detenemos el temporizador si llega a 0
      }
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.timeLeft = 0;
      state.isRunning = false;
    },
  },
});

export const { startTimer, tick, stopTimer, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;

// estado global para manejar el contador aun cuando cierre popUp
export const startGlobalTimer =
  (initialTime: number) => (dispatch: AppDispatch) => {
    dispatch(startTimer(initialTime));
    const timer = setInterval(() => {
      dispatch(tick());
    }, 1000);

    // Limpiar el intervalo cuando se detenga el temporizador
    return () => clearInterval(timer);
  };
