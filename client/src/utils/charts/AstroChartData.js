const zodiacDegrees = {
    'Aries': 0,
    'Taurus': 30,
    'Gemini': 60,
    'Cancer': 90,
    'Leo': 120,
    'Virgo': 150,
    'Libra': 180,
    'Scorpio': 210,
    'Sagittarius': 240,
    'Capricorn': 270,
    'Aquarius': 300,
    'Pisces': 330
  };
  
  function transformData(rawData) {
    let ascendantDegree = 0;
    const astroData = {
      planets: {},
      cusps: []
    };
  
    for (const bodyData of rawData) {
      const { name, sign, degree } = bodyData;
      if (name.toLowerCase() === 'ascendant') {
        ascendantDegree = zodiacDegrees[sign] + Number(degree);
      } else {
        astroData.planets[name] = [zodiacDegrees[sign] + Number(degree)];
      }
    }
  
    astroData.cusps = Array(12).fill(0).map((_, i) => (ascendantDegree + i * 30) % 360);
  
    return astroData;
  }
  
  module.exports = transformData;