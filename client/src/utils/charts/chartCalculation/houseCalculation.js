const sweph = require("sweph");

const HOUSE_SYSTEM = "W";

function calculateHouse(
	longitude, // Ecliptic longitude of the celestial body
	jd_ut,
	geolat,
	geolon,
	armc,
	eps,
	serr
) {
	if (typeof longitude !== "number") {
		throw new Error("Longitude must be a number");
	}
	const housePos = sweph.house_pos(
		armc,
		geolat,
		eps,
		HOUSE_SYSTEM, // Pass HOUSE_SYSTEM as the fourth argument
		[longitude, 0], // Use ecliptic longitude and assume ecliptic latitude is 0
		serr
	);
	return Math.floor(housePos.data);
}

module.exports = {
	calculateHouse,
};
