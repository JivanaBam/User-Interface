import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import ProductDetail from "../pages/ProductDetails";
import EditProduct from "../pages/EditProduct";
import Cart from "../pages/Cart";
import AuthGuard from "../guard/AuthGuard";

const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
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
      {
        path: "product-edit/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default mainRoutes;
