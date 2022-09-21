import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import App from "./App";
import helpers from "./helpers";

const { setStore, getStore } = helpers;

// Some init options
setStore("isGridView", true);
setStore("filteredByCreate", false);

const gridView = getStore("isGridView");
const filteredByCreate = getStore("filteredByCreate");
const data = getStore("notes");

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App store={{notes: data, isGridView: gridView, filteredByCreate: filteredByCreate}} />
  </StrictMode>
);
