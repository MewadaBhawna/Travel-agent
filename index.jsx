import OpenAI from "openai";
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import Input from "./src/Input";
import Output from "./src/Output";
import Home from "./src/Home";

const Index = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
const appRouter = createHashRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/input",
        element: <Input />,
      },
      {
        path: "/output",
        element: <Output />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
