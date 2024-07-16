import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//React Redux
import { Provider } from "react-redux";
import store from "./redux/store.js";

import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import Users from "./components/Users/Users.jsx";
import Books from "./components/Books/Books.jsx";
import Transactions from "./components/Transactions/Transactions.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/books" element={<Books />} />
      <Route path="/transactions" element={<Transactions />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
