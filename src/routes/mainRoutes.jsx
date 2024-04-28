import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import ProductDetail from "../pages/ProductDetails";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "product",
        element: <ProductList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetail />,
      },
    ],
  },
];

export default mainRoutes;
