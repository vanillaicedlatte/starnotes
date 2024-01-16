import React, { useState } from "react";

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleMenuClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<div className='hamburger-menu' onClick={handleMenuClick}>
				<div className='line'></div>
				<div className='line'></div>
				<div className='line'></div>
			</div>
			{isOpen && (
				<div className='menu'>
					<a href='#'>My Account</a>
				</div>
			)}
		</div>
	);
};

export default Menu;
