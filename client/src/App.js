import React, { StrictMode } from "react";
import "./App.css";
import ExploreSection from "./components/ExploreSection";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import NotesGrid from "./components/notes/NotesGrid";
import NewNoteButton from "./components/notes/NewNoteButton";
import Sidebar from "./components/Sidebar";
import ClerkButtons from "./components/ClerkButtons";
import {
	Outlet,
	RouterProvider,
	Link,
	Router,
	Route,
	RootRoute,
	useNavigate,
} from "@tanstack/react-router";
import AllNotes from "./pages/AllNotes";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY =
	"pk_test_b3Blbi1tb25hcmNoLTYzLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const rootRoute = new RootRoute({
	component: () => (
		<div className='main'>
			<div className='top-nav flex justify-between items-center p-6 bg-base-300'>
				<Logo />
				<Menu />
				<div className='btn-group flex gap-4'>
					<NewNoteButton />
					<button className='btn btn-ghost'>My Notes</button>
				</div>
				<ClerkButtons />
			</div>
			<div className='content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3'>
				<Sidebar className='col-span-1' />
				<div className='main-content sm:col-span-1 md:col-span-2 lg:col-span-3 p-3'>
					<Outlet />
				</div>
			</div>
		</div>
	),
});

const allNotesRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/all-notes",
	component: AllNotes,
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => (
		<>
			<div className='notes'>
				<NotesGrid maxNotes={3} />
				<Link to='/all-notes' className='btn btn-secondary'>
					View All Notes
				</Link>
			</div>
			<div className='explore-section'>
				<ExploreSection />
			</div>
		</>
	),
});

const routeTree = rootRoute.addChildren([indexRoute, allNotesRoute]);

const router = new Router({ routeTree });

function App() {
	return (
		<StrictMode>
			<RouterProvider router={router}>
				<NavigationWrapper />
			</RouterProvider>
		</StrictMode>
	);
}

function NavigationWrapper() {
	const navigate = useNavigate();

	return (
		<ClerkProvider
			navigate={navigate}
			publicAPIKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}
		>
			{/* Rest of your components */}
		</ClerkProvider>
	);
}

export default App;
