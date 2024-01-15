const sweph = require("sweph");
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

const { calculateDate } = require("./DateCalculation");
const { calculatePlacement } = require("./celestialBodies");
const { calculateAscendant } = require("./Ascendant");
const { calculateMidheaven } = require("./Midheaven");
const transformData = require("../chartOfTheMoment/AstroChartData");
const { calculateHouse } = require("./houseCalculation");

const celestialBodies = [
	sweph.constants.SE_SUN,
	sweph.constants.SE_MOON,
	sweph.constants.SE_MERCURY,
	sweph.constants.SE_VENUS,
	sweph.constants.SE_MARS,
	sweph.constants.SE_JUPITER,
	sweph.constants.SE_SATURN,
	sweph.constants.SE_URANUS,
	sweph.constants.SE_NEPTUNE,
	sweph.constants.SE_PLUTO,
];
const celestialBodyNames = [
	"Sun",
	"Moon",
	"Mercury",
	"Venus",
	"Mars",
	"Jupiter",
	"Saturn",
	"Uranus",
	"Neptune",
	"Pluto",
];

const geolat = 31.0897378;
const geolon = -86.1652522;

module.exports.calculatePlanetData = function (
	year,
	month,
	day,
	hour,
	minute,
	second
) {
	const { jd_et, jd_ut } = calculateDate(
		year,
		month,
		day,
		hour,
		minute,
		second
	);
	const armc = sweph.degnorm(
		sweph.sidtime0(jd_ut, 23.4392911, 0) * 15 + geolon
	);
	const eps = 23.4392911; // Mean obliquity of the ecliptic
	const serr = new Array(256).fill(0); // Error message buffer

	let celestialBodiesData = celestialBodies.map((body, index) => {
		console.log("body:", body);
		const name = celestialBodyNames[index];
		const placement = calculatePlacement(body, name, jd_et);

		console.log(`Placement for ${name}:`, placement);

		if (typeof placement.longitude !== "number") {
			throw new Error(
				`Longitude for ${name} is not a number: ${placement.longitude}`
			);
		}

		// Calculate house position
		const housePos = calculateHouse(
			placement.longitude,
			jd_ut,
			geolat,
			geolon,
			armc,
			eps,
			serr
		);
		console.log(
			`${name}: ${placement.sign} ${placement.degree}, House ${housePos}`
		);
		// Add house position to the returned data
		return {
			...placement,
			house: housePos, // Use the returned house position
		};
	});

	// Calculate Ascendant, Midheaven, North Node, and South Node
	const { sign: ascSign, degree: ascDegree } = calculateAscendant(
		jd_ut,
		geolat,
		geolon
	);
	const {
		sign: midSign,
		degree: midDegree,
		house: midheavenHouse,
	} = calculateMidheaven(jd_ut, geolat, geolon);
	const { calculateNorthNode, calculateSouthNode } = require("./Nodes");
	const northNode = calculateNorthNode(jd_et);
	const southNode = calculateSouthNode(jd_et);

	// Add Ascendant, Midheaven, North Node, and South Node to celestialBodiesData
	celestialBodiesData.unshift({
		name: "Ascendant",
		sign: ascSign,
		degree: ascDegree,
		house: 1,
	});
	celestialBodiesData.push(
		{
			name: "Midheaven",
			sign: midSign,
			degree: midDegree,
			house: midheavenHouse,
		},
		{
			name: "North Node",
			sign: northNode.sign,
			degree: northNode.degree,
			house: calculateHouse(
				northNode.degree,
				jd_ut,
				geolat,
				geolon,
				armc,
				eps,
				serr
			),
		},
		{
			name: "South Node",
			sign: southNode.sign,
			degree: southNode.degree,
			house: calculateHouse(
				(southNode.degree + 180) % 360,
				jd_ut,
				geolat,
				geolon,
				armc,
				eps,
				serr
			),
		}
	);

	const astroData = transformData(celestialBodiesData);

	return celestialBodiesData;
};

module.exports.calculateAstroData = function (
	year,
	month,
	day,
	hour,
	minute,
	second
) {
	let celestialBodiesData = module.exports.calculatePlanetData(
		year,
		month,
		day,
		hour,
		minute,
		second
	);

	// Exclude North Node, South Node, and Midheaven
	celestialBodiesData = celestialBodiesData.filter(
		(body) =>
			body.name !== "North Node" &&
			body.name !== "South Node" &&
			body.name !== "Midheaven"
	);

	const astroData = transformData(celestialBodiesData);

	return astroData;
};
