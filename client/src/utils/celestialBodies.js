const sweph = require('sweph');
sweph.set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

module.exports.calculatePlacement = function(body, name, jd_et) {
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  try {
    const flags = sweph.constants.SEFLG_SWIEPH | sweph.constants.SEFLG_SPEED;
    let xx = new Array(6);
    let serr = '';

    // Check that jd_et and body are defined and correct
    if (typeof jd_et === 'undefined') {
      throw new Error('jd_et is undefined');
    }

    if (typeof body === 'undefined') {
        throw new Error('body is undefined');
      }

    const result = sweph.calc(jd_et, body, flags);
    if(result.flag !== flags) { 
      throw new Error(result.error); 
    }

    const position = result.data[0]; // Use the calculated longitude
    console.log(`Position for ${name}:`, position); // Log the position
    const signIndex = Math.floor(position / 30);
    const sign = zodiacSigns[signIndex];
    const degree = (Math.floor(position - signIndex * 30)).toString().padStart(2, '0');

    const placement = {
      name: name,
      sign: sign,
      degree: degree
    };

    return placement;
  } catch (error) {
    console.error(error);
  }
}