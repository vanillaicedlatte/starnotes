const { calc, utc_to_jd, houses, constants, set_ephe_path } = require('sweph');

set_ephe_path("./ephe"); // folder containing your ephemeris files;

// Set birth date and time
const year = 1993;
const month = 4;
const day = 14;
const hour = 8 + 5; // Convert CST to UTC
const minute = 28;
const second = 0;

const date = utc_to_jd(year, month, day, hour, minute, second, constants.SE_GREG_CAL);
if(date.flag !== constants.OK) { throw new Error(date.error); }

const [ jd_et, jd_ut ] = date.data; // et for planets, ut for houses
const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED; // use the ephemeris files and enable speeds

const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
const planetNumbers = [constants.SE_SUN, constants.SE_MOON, constants.SE_MERCURY, constants.SE_VENUS, constants.SE_MARS, constants.SE_JUPITER, constants.SE_SATURN];

const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

// Set geographical coordinates for Chicago, IL, USA
const geolat = 41.8781;
const geolon = -87.6298;

// Calculate Ascendant and house cusps
const houseData = houses(jd_ut, geolat, geolon, 'W');
if(houseData.flag !== constants.OK) { console.log(houseData.error); } // if the flags are not the same then something went wrong

const ascendant = houseData.data.points[0];
const ascSignIndex = Math.floor(ascendant / 30);
const ascSign = signs[ascSignIndex];
const ascDegree = ascendant - ascSignIndex * 30;

console.log(`Ascendant is in ${ascSign} at ${ascDegree.toFixed(2)} degrees.`);

let planetPositions = [];
let planetSpeeds = [];

for (let i = 0; i < planets.length; i++) {
    const planetData = calc(jd_et, planetNumbers[i], flags);
    if(planetData.flag !== flags) { console.log(planetData.error); } // if the flags are not the same then something went wrong

    const longitude = planetData.data[0];
    const speed = planetData.data[3]; // Daily motion in longitude
    planetPositions.push(longitude); // Store longitude in array
    planetSpeeds.push(speed); // Store speed in array

    // Rest of your code...
}

const aspects = [
    { name: 'Conjunction', angle: 0 },
    { name: 'Sextile', angle: 60 },
    { name: 'Square', angle: 90 },
    { name: 'Trine', angle: 120 },
    { name: 'Opposition', angle: 180 },
];

for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const angle = Math.abs(planetPositions[i] - planetPositions[j]) % 180;
      const aspect = aspects.find(a => Math.abs(a.angle - angle) < 5);
      if (aspect) {
        const isApplying = planetSpeeds[i] > planetSpeeds[j] ? planetPositions[i] < planetPositions[j] : planetPositions[j] < planetPositions[i];
        const aspectType = isApplying ? 'Applying' : 'Separating';
        console.log(`${planets[i]} has a ${aspectType} ${aspect.name} aspect to ${planets[j]}`);
      }
    }
}

