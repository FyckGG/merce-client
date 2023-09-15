import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import { Navigate } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import GuestLayout from "./components/layouts/GuestLayout";

const router = createBrowserRouter([
    {path: '/', element: <DefaultLayout/>, children: [
        {path: '/', element:<Navigate to='/users'/>},
        {path: '/users', element: <Users/>},
        {path: '/dashboard', element: <Dashboard/>},
    ]},
    {path: '/', element: <GuestLayout/>, children: [
        {path: '/login', element: <Login/>},
    {path: '/signup', element: <Signup/>},
    ]},
    // {path: '/login', element: <Login/>},
    // {path: '/registration', element: <Signup/>},
    // {path: '/users', element: <Users/>},
     {path: '*', element: <NotFound/>}
]);

export default router;