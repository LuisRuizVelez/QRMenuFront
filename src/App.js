import React from 'react';
import {ToastContainer} from "react-toastify";
import AppRouter from "./router/AppRouter";

function App() {
  return <>
      <div id="modal-root"></div>

      <ToastContainer/>


      <AppRouter/>


  </>
}

export default App;
