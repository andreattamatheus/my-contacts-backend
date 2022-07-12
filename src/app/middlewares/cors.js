module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
};
