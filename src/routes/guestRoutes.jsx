import Register from "../pages/Register";
import Login from "../pages/Login";

const guestRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default guestRoutes;
