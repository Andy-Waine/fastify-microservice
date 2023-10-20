const data = require('../pop-data');

const getAllData = (req, res) => {
  res.send(data)
}

const getSingleEntry = (req, res) => {
  const { city, state } = req.params;
  const item = data.find(item => item.city === city && item.state === state);
  res.send(item);
}

module.exports = {
  getAllData,
  getSingleEntry,
}