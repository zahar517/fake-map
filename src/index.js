import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import App from "./components/App";
import createStore from "./store";

const store = createStore();

injectGlobal`
  html {
    font-size: 18px;
    line-height: 1.42;
  }
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: content-box;
  }
  .popup_box {
    position: relative;
    background: #fff;
    border: 1px solid #003c88;
    border-radius: 5px;
    padding: 0.5rem;
  }
  .popup_box:after, .popup_box:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  
  .popup_box:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: #fff;
    border-width: 10px;
    margin-left: -10px;
  }
  .popup_box:before {
    border-color: rgba(153, 153, 153, 0);
    border-top-color: #003c88;
    border-width: 11px;
    margin-left: -11px;
  }
`;

const div = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  div
);
