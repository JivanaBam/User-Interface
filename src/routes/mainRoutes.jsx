import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import About from "../pages/About";

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
    ],
  },
];

export default mainRoutes;
