const express = require('express');
const router = express.Router();
const { calc, utc_to_jd, constants, set_ephe_path } = require('sweph');
set_ephe_path("./ephe");

router.get('/', (req, res) => {
  // Julian day number for 1 Jan 2000 12:00 UT
  let jd_ut = 2451545.0;

  let result = sweph.swe_calc_ut(
    jd_ut,
    sweph.SE_SUN, // body index for Sun
    sweph.SEFLG_SPEED // flag for speed
  );

  if (result.error) {
    res.status(500).send(result.error);
  } else {
    res.send(result);
  }
});

module.exports = router;