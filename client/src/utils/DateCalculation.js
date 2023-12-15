const sweph = require('sweph');
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

module.exports.calculateDate = function() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();
  const hour = now.getUTCHours();
  const minute = now.getUTCMinutes();
  const second = now.getUTCSeconds();

  const date = sweph.utc_to_jd(year, month, day, hour, minute, second, sweph.constants.SE_GREG_CAL);
  if(date.flag !== sweph.constants.OK) { throw new Error(date.error); }

  const [ jd_et, jd_ut ] = date.data; // et for planets, ut for houses

  return { jd_et, jd_ut };
}