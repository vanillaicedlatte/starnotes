const sweph = require("sweph");
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

module.exports.calculateDate = function (
	year,
	month,
	day,
	hour,
	minute,
	second
) {
	console.log(
		"calculateDate arguments:",
		year,
		month,
		day,
		hour,
		minute,
		second
	);
	const now = new Date();
	year = year || now.getUTCFullYear();
	month = month || now.getUTCMonth() + 1;
	day = day || now.getUTCDate();
	hour = hour || now.getUTCHours();
	minute = minute || now.getUTCMinutes();
	second = second || now.getUTCSeconds();

	// Convert from CST to UTC
	// CST is UTC-6
	hour += 6;
	if (hour >= 24) {
		hour -= 24;
		day += 1;
		// Add more logic here to handle month/year overflow
	}

	console.log("Input date in UTC:", year, month, day, hour, minute, second);

	const date = sweph.utc_to_jd(
		year,
		month,
		day,
		hour,
		minute,
		second,
		sweph.constants.SE_GREG_CAL
	);
	if (date.flag !== sweph.constants.OK) {
		throw new Error(date.error);
	}

	const [jd_et, jd_ut] = date.data; // et for planets, ut for houses

	// Calculate Delta T
	const delta_t = sweph.deltat(jd_ut);
	console.log("Delta T:", delta_t);

	console.log("Converted date in JD:", jd_et, jd_ut);

	return { jd_et, jd_ut, delta_t };
};
