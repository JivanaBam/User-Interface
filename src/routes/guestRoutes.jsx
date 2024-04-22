import Register from "../pages/Register";
import Login from "../pages/Login";
import MinimunLayout from "../layout/MinimunLayout";

// guest routes => api that doesnot need token eg: login, register
const guestRoutes = [
  {
    path: "/",
    element: <MinimunLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default guestRoutes;
