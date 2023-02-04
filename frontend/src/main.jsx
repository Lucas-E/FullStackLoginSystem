import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: '/register',
		element: <Register/>
	}
]);

const Main = () => {
	return (
		<React.Fragment>
			<RouterProvider router={router} />
		</React.Fragment>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
