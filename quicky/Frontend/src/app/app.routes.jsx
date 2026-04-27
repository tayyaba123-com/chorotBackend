import { createBrowserRouter } from "react-router"
import Register from '../features/auth/pages/Register'
import Login from "../features/auth/pages/Login"
import CreateProduct from "../features/products/pages/CreateProduct"
import ViewProducts from "../features/products/pages/ViewProducts"
import Protected from "../features/auth/components/Protected"
import Home from "../features/products/pages/Home"
import ViewProductDetails from "../features/products/pages/ViewProductDetails"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/product/:id",
        element: <ViewProductDetails />
    },
    {
        path: "/seller",
        children: [
            {
                path: "/seller/create-product",
                element: <Protected><CreateProduct /></Protected>
            },
            {
                path: "/seller/view-products",
                element: <Protected><ViewProducts /></Protected>
            }
        ]
    },

])


