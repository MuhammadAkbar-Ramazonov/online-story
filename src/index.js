import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "react-use-cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<AuthProvider>
			<UserProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</UserProvider>
		</AuthProvider>
	</Router>,
);
