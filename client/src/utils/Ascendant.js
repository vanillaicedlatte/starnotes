const sweph = require('sweph');
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

module.exports.calculateAscendant = function(jd_ut, geolat, geolon) {
  let cusps = new Array(13);
  let ascmc = new Array(10);
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const result = sweph.houses(jd_ut, geolat, geolon, 'Z', cusps, ascmc);
  console.log(result, ascmc);
  if(result.error) { 
    throw new Error(result.error); 
  }

  const ascendant = result.data.points[0];
  const ascSignIndex = Math.floor(ascendant / 30);
  const ascSign = zodiacSigns[ascSignIndex];
  const ascDegree = (Math.floor(ascendant - ascSignIndex * 30)).toString().padStart(2, '0');

  console.log(ascSign, ascDegree);

  return {
    sign: ascSign,
    degree: ascDegree
  };
}