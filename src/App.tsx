import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Balance from "./pages/Balance";
import Index from "./pages/Index";
import Login from "./pages/Login";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  return (
    <>
      <BrowserRouter>
        {isLogin ? (
          <div className="flex bg-gray-100 h-screen">
            <Sidebar />
            <div className="flex-1 ml-80">
              <Navbar />
              <div className="pt-5 mb-24 text-gray-900">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/balance" element={<Balance />} />
                  <Route path="/login" element={<Login test="test" />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login test="test" />} />
          </Routes>
        )
        }
      </BrowserRouter>
    </>
  )
}

export default App
