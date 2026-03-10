import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Variables from "./pages/Variables";
import VariableDetails from "./pages/VariableDetails";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "variables",
        element: <Variables />,
      },
      {
        path: "variables/:id",
        element: <VariableDetails />,
      },
      { path: "*", element: <p>Page not found</p> },
    ],
  },
]);

export default router;
