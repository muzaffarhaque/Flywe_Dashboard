
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Dashboard, ErrorPage, Home, Login, Roots} from './pages';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.scss'

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/dashboard",
            element: <Roots/>,
            errorElement:<ErrorPage/>,
            children:[
                {
                    path: "/dashboard",
                    element: <Dashboard/>
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
