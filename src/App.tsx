import { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout";
import LoginLayout from "./layouts/LoginLayout";
import { privateRouter, publicRouter } from "./router";
import Index from "./pages/Index";
import Balance from "./pages/Balance";

// Create a client
const queryClient = new QueryClient()

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {
          isLogin ?
            <DashboardLayout>
              <RouterProvider router={privateRouter} />
            </DashboardLayout>
            : <LoginLayout>
              <RouterProvider router={publicRouter} />
            </LoginLayout>
        }
      </QueryClientProvider>
    </>
  )
}

export default App
