import React from "react";
import { Link } from "@tanstack/react-router";

const Logo = () => {
	return (
		<div>
			<Link to='/'>
				<h1>StarNotes</h1>
			</Link>
		</div>
	);
};

export default Logo;
