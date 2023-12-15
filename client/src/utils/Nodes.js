const sweph = require('sweph');
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

function calculateNorthNode(jd_et) {
  const flags = sweph.constants.SEFLG_SWIEPH | sweph.constants.SEFLG_SPEED;
  const result = sweph.calc_ut(jd_et, sweph.constants.SE_MEAN_NODE, flags);
  const position = result.data[0];
  const signIndex = Math.floor(position / 30);
  const sign = zodiacSigns[signIndex];
  const degree = Math.round(position - signIndex * 30);
  return {
    name: 'North Node',
    sign: sign,
    degree: degree
  };
}

function calculateSouthNode(jd_et) {
  const northNode = calculateNorthNode(jd_et);
  let position = northNode.degree + 180;
  if (position > 360) {
    position -= 360;
  }
  const signIndex = Math.floor(position / 30);
  const sign = zodiacSigns[signIndex];
  const degree = Math.round(position - signIndex * 30);
  return {
    name: 'South Node',
    sign: sign,
    degree: degree
  };
}

module.exports = {
  calculateNorthNode,
  calculateSouthNode
};