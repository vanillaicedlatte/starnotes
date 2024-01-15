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

	return { jd_et, jd_ut };
};
