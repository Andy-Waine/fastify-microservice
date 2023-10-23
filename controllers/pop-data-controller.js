// const data = require('../pop-data');

const getAllData = (req, res) => {
  res.send(data)
}

const getSingleEntry = (req, res) => {
  const { city, state } = req.params;
  const item = data.find(item => item.city === city && item.state === state);
  res.send(item);
}

const putSingleEntry = (req, res) => {
  const { city, state } = req.params;
  const { population } = req.body;
  const item = data.find(item => item.city === city && item.state === state);
  if (item) {
    item.population = population;
    res.send({ population });
  } else {
    res.status(404).send('Entry not found');
    // TODO: Update this to instead call postSingleEntry
  }
}

const postSingleEntry = (req, res) => {
  const { city, state } = req.params;
  const { population } = req.body;
  const item = data.find(item => item.city === city && item.state === state);
  if (item) {
    res.status(409).send('Entry already exists, please use PUT to update');
  } else {
    data.push({ city, state, population });
    res.status(201).send({ population });
  }
}

module.exports = {
  getAllData,
  getSingleEntry,
  putSingleEntry,
  postSingleEntry
}