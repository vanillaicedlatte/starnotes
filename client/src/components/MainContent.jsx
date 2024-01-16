import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import NewNoteButton from "./notes/NewNoteButton";
import Sidebar from "./Sidebar";
import SignInButton from "./SignIn";
import SignOutButton from "./SignOut";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Outlet } from "@tanstack/react-router";

const MainContent = () => {
	return (
		<div className='main'>
			<SignedOut>
				Please log in.
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<div className='top-nav flex justify-between items-center p-6 bg-base-300'>
					<Logo />
					<Menu />
					<div className='btn-group flex gap-4'>
						<NewNoteButton />
						<button className='btn btn-ghost'>My Notes</button>
						<SignOutButton />
					</div>
				</div>
				<div className='content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3'>
					<Sidebar className='col-span-1' />
					<div className='main-content sm:col-span-1 md:col-span-2 lg:col-span-3 p-3'>
						<Outlet />
					</div>
				</div>
			</SignedIn>
		</div>
	);
};

export default MainContent;
