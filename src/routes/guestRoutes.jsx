import Register from "../pages/Register";
import Login from "../pages/Login";
import MinimunLayout from "../layout/MinimunLayout";
import GuestGuard from "../guard/GuestGuard";

// guest routes => api that doesnot need token eg: login, register
const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimunLayout />
      </GuestGuard>
    ),
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
