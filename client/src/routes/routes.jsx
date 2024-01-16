import React from "react";
import { Route, RootRoute, Router } from "@tanstack/react-router";
import MainContent from "../components/MainContent";
import AllNotes from "../pages/AllNotes";
import NotesGrid from "../components/notes/NotesGrid";
import ExploreSection from "../components/ExploreSection";
import { Link } from "@tanstack/react-router";

const rootRoute = new RootRoute({
	component: MainContent,
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

export default router;
