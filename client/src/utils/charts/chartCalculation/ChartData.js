const sweph = require("sweph");
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

const { calculateDate } = require("./DateCalculation");
const { calculatePlacement } = require("./celestialBodies");
const { calculateAscendant } = require("./Ascendant");
const { calculateMidheaven } = require("./Midheaven");
const transformData = require("../chartOfTheMoment/AstroChartData");

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
	const geolat = 31.0897378;
	const geolon = -86.1652522;
	console.log(celestialBodies);
	const celestialBodiesData = celestialBodies.map((body, index) => {
		console.log("body:", body);
		const name = celestialBodyNames[index];
		return calculatePlacement(body, name, jd_et);
	});

	const { sign: ascSign, degree: ascDegree } = calculateAscendant(
		jd_ut,
		geolat,
		geolon
	);
	celestialBodiesData.unshift({
		name: "Ascendant",
		sign: ascSign,
		degree: ascDegree,
	});

	const { sign: midSign, degree: midDegree } = calculateMidheaven(
		jd_ut,
		geolat,
		geolon
	);
	celestialBodiesData.push({
		name: "Midheaven",
		sign: midSign,
		degree: midDegree,
	});

	const { calculateNorthNode, calculateSouthNode } = require("./Nodes");

	const northNode = calculateNorthNode(jd_et);
	celestialBodiesData.push({
		name: "North Node",
		sign: northNode.sign,
		degree: northNode.degree,
	});

	const southNode = calculateSouthNode(jd_et);
	celestialBodiesData.push({
		name: "South Node",
		sign: southNode.sign,
		degree: southNode.degree,
	});

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
