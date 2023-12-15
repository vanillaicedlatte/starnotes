const { calc, swe_calc_ut, utc_to_jd, houses, constants, set_ephe_path } = require('sweph');
set_ephe_path("/Users/jamiespann/repos/starnotes/server/ephe");

// Get current date and time
const now = new Date();
const year = now.getUTCFullYear();
const month = now.getUTCMonth() + 1; // JavaScript months are 0-11
const day = now.getUTCDate();
const hour = now.getUTCHours();
const minute = now.getUTCMinutes();
const second = now.getUTCSeconds();

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

let planetPositions = [];
let planetSpeeds = [];

function calculatePlanetPositions(jd_et, planets, planetNumbers, flags, signs) {
    let planetPositions = [];

    for (let i = 0; i < planets.length; i++) {
        const planetData = calc(jd_et, planetNumbers[i], flags);
        if(planetData.flag !== flags) { console.log(planetData.error); } // if the flags are not the same then something went wrong

        const longitude = planetData.data[0];
        const speed = planetData.data[3]; // Daily motion in longitude

        const position = longitude;
        const signIndex = Math.floor(position / 30);
        const sign = signs[signIndex];
        const degree = position - signIndex * 30;

        const placement = {
            name: planets[i],
            sign: sign,
            degree: degree,
            speed: speed
        };

        planetPositions.push(placement); // Store placement in array
    }

    return planetPositions;
}

module.exports = calculatePlanetPositions;