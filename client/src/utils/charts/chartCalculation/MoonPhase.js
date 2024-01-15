const sweph = require("sweph");
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

module.exports.calculateMoonPhase = function (jd_et) {
	let attr = new Array(20);
	let serr = "";
	let flags = sweph.FLG_SWIEPH | sweph.FLG_SPEED; // Define flags here
	let result = sweph.pheno_ut(
		jd_et,
		sweph.constants.SE_MOON,
		flags,
		attr,
		serr
	);
	console.log(`Result: ${result}`); // Log the result to the console
	if (result < 0) {
		console.error(`Error: ${serr}`);
	} else {
		const phase = attr[1]; // phase is a fraction from 0.0 to 1.0
		console.log(`Phase: ${phase}`); // Log the phase to the console
		let phaseDescription;
		if (phase < 0.03) {
			phaseDescription = "New Moon";
		} else if (phase < 0.25) {
			phaseDescription = "Waxing Crescent";
		} else if (phase < 0.5) {
			phaseDescription = "First Quarter";
		} else if (phase < 0.75) {
			phaseDescription = "Waxing Gibbous";
		} else if (phase < 0.97) {
			phaseDescription = "Full Moon";
		} else if (phase > 0.75) {
			phaseDescription = "Waning Gibbous";
		} else if (phase > 0.5) {
			phaseDescription = "Last Quarter";
		} else {
			phaseDescription = "Waning Crescent";
		}
		return phaseDescription;
	}
};
