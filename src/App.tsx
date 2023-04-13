import { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout";
import LoginLayout from "./layouts/LoginLayout";
import { privateRouter, publicRouter } from "./router";
import Index from "./pages/Index";
import Balance from "./pages/Balance";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Create a client
const queryClient = new QueryClient()

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  return (
    <>
      <BrowserRouter>
        <div className="flex bg-gray-100 h-screen">
          <Sidebar />
          <div className="flex-1 ml-80">
            <Navbar />
            <div className="pt-5 mb-24 text-gray-900">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/balance" element={<Balance />} />
                <Route path="/login" element={<Login test="hjhj" />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
