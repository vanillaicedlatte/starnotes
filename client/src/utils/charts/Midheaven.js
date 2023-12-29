const sweph = require('sweph');

module.exports.calculateMidheaven = function(jd_ut, geolat, geolon) {
  let cusps = new Array(13);
  let ascmc = new Array(10);
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const result = sweph.houses(jd_ut, geolat, geolon, 'Z', cusps, ascmc);
  console.log(result, ascmc);
  if(result.error) { 
    throw new Error(result.error); 
  }

  const midheaven = result.data.points[1];
  const midSignIndex = Math.floor(midheaven / 30);
  const midSign = zodiacSigns[midSignIndex];
  const midDegree = (Math.floor(midheaven - midSignIndex * 30)).toString().padStart(2, '0');

  return {
    sign: midSign,
    degree: midDegree
  };
}