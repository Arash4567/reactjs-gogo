import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Balance from "./pages/Balance";
import ErrorPage from "./pages/ErrorPage";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const location = useLocation();

  const [isLogin, setIsLogin] = useState<boolean>(true)
  return (
    <>
      {isLogin ? (
        <div className="flex bg-gray-100 h-screen">
          <Sidebar />
          <div className="flex-1 ml-80">
            <Navbar />
            <div className="pt-5 mb-24 text-gray-900">
              <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Index />} />
                  <Route path="/balance" element={<Balance />} />
                  <Route path="/login" element={<Login test="test" />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login test="test" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </>
  )
}

export default App
