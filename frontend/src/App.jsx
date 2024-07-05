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
      <main className="h-full flex">
        <Navigation />
        <div className="mx-4 mt-6 flex-1 rounded-xl shadow-lg border-t-2 border-t-gray-200">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
