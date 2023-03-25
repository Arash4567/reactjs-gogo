import Login from '../pages/Login'
import Index from '../pages/Index'
import ErrorPage from "../pages/ErrorPage";
import { createBrowserRouter, RouteObject } from 'react-router-dom'

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
    path: "/admin",
    element: <Login test='sa' />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/salary",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
]

export const publicRouter = createBrowserRouter(publicRoutes);
export const privateRouter = createBrowserRouter(privateRoutes);