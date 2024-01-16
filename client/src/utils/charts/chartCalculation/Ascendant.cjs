const sweph = require("sweph");
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

module.exports.calculateAscendant = function (jd_ut, geolat, geolon) {
	console.log(
		`Calculating ascendant for jd_ut=${jd_ut}, geolat=${geolat}, geolon=${geolon}`
	);

	let cusps = new Array(13);
	let ascmc = new Array(10);
	const zodiacSigns = [
		"Aries",
		"Taurus",
		"Gemini",
		"Cancer",
		"Leo",
		"Virgo",
		"Libra",
		"Scorpio",
		"Sagittarius",
		"Capricorn",
		"Aquarius",
		"Pisces",
	];

	const result = sweph.houses(jd_ut, geolat, geolon, "W", cusps, ascmc);
	console.log("Result from sweph.houses:", result);
	console.log("Ascmc:", ascmc);

	if (result.error) {
		throw new Error(result.error);
	}

	const ascendant = result.data.points[0];
	console.log("Ascendant:", ascendant);

	const ascSignIndex = Math.floor(ascendant / 30);
	console.log("Ascendant sign index:", ascSignIndex);

	const ascSign = zodiacSigns[ascSignIndex];
	const ascDegree = Math.floor(ascendant - ascSignIndex * 30)
		.toString()
		.padStart(2, "0");

	console.log("Final ascendant sign and degree:", ascSign, ascDegree);

	return {
		sign: ascSign,
		degree: ascDegree,
	};
};
