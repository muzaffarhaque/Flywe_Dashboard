
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Dashboard, Home, Login} from './pages';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.scss'

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/dashboard",
            element: <Dashboard/>
        }
    ]);
    return (
    <> 
     <RouterProvider router={router}/>
     <ToastContainer /> 
    </>)
}

export default App
