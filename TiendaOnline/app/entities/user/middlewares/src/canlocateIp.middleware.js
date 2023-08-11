/**
 * Check if the user that makes the request can delete the resource specified in the request
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */

const expressIp = require('express-ip');
const geoip = require('geoip-lite');

async function canlocateIp(req, res, next) {
  // Utiliza el middleware express-ip para obtener la dirección IP del cliente
  const clientIp = req.ip;

  // Utiliza GeoIP para obtener la información de geolocalización
  const geo = geoip.lookup(clientIp);

  // Puedes agregar la información de geolocalización al objeto `req` si lo necesitas
  req.clientLocation = geo;


  console.log(geo);

  next();
}

module.exports = canlocateIp;
