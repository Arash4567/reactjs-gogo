import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Login from '../pages/Login'
import Index from '../pages/Index'
import Register from '../pages/Register'
import ErrorPage from "../pages/ErrorPage";
import Balance from '../pages/Balance';

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Login test="sd" />,
    index: true,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login test="test" />,
    index: true,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    index: true,
    errorElement: <ErrorPage />,
  }
]


const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    action: () => {
      return true;
    },
  },
  {
    path: "/balance",
    element: <Balance />,
    errorElement: <ErrorPage />,
  }
]

export const publicRouter = createBrowserRouter(publicRoutes);
export const privateRouter = createBrowserRouter(privateRoutes);