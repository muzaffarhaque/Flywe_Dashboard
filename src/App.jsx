
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Category, Dashboard, ErrorPage, Home, Login, Profile, Roots} from './pages';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.scss'
import NotFound from "./components/NotFound";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token_Flyweis');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};


function App() {
    const router = createBrowserRouter([
     
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/profile",
            element: <ProtectedRoute children={<Profile/>}/>
        },
        {
            path:'/*',
            element:<ErrorPage/>
        },
        {
            path: "/",
            element: <Roots/>,
            errorElement:<NotFound/>,
            children:[
                {
                    path: "/",
                    element: <ProtectedRoute children={<Dashboard/>}/>
                },
                {
                    path: "/dashboard",
                    element: <ProtectedRoute children={<Dashboard/>}/>
                },
                {
                    path: "/category",
                    element: <ProtectedRoute children={<Category/>}/>
                },
               
            ]
        },
        
    ]);
    return (
    <> 
     <RouterProvider router={router}/>
     <ToastContainer /> 
    </>)
}

export default App
