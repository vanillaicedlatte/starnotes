import React, { StrictMode } from "react";
import "./App.css";
import { RouterProvider, Outlet } from "@tanstack/react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import router from "./routes/routes";

function App() {
	return (
		<StrictMode>
			<ClerkProvider publishableKey='pk_test_b3Blbi1tb25hcmNoLTYzLmNsZXJrLmFjY291bnRzLmRldiQ'>
				<RouterProvider router={router}>
					<Outlet />
				</RouterProvider>
			</ClerkProvider>
		</StrictMode>
	);
}

export default App;
