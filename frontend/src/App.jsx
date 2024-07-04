import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Layout/Navigation";
import Header from "./components/Layout/Header";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
