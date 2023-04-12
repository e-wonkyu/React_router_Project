import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

//CSS
import './index.css'

//Components
import {ErrorHandler} from "./components/ErrorHandler/ErrorHandler.jsx";
import {ThrowError} from "./components/ErrorHandler/ErrorTestComponents.jsx";
import {IndexRayout} from "./components/RayoutComponents.jsx";


const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<IndexRayout title={'메인'}/>,
            errorElement:<ErrorHandler/>
        },
        {
            path:'/errortest',
            element:<ThrowError/>,
            errorElement:<ErrorHandler/>
        }
    ]
);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
