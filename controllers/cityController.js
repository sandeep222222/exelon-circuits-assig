const City = require('../models/city');

// Add a new city
exports.addCity = async (req, res) => {
  try {
    const { name, population, country, latitude, longitude } = req.body;
    const city = new City({ name, population, country, latitude, longitude });
    await city.save();
    res.status(201).json({ message: 'City added successfully', city });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing city
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, population, country, latitude, longitude } = req.body;
    const city = await City.findByIdAndUpdate(id, { name, population, country, latitude, longitude }, { new: true });
    res.status(200).json({ message: 'City updated successfully', city });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a city
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get cities with pagination, filtering, sorting, searching, and projection
exports.getCities = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter, sort, search, projection } = req.query;
    const query = search ? { name: new RegExp(search, 'i') } : {};
    const cities = await City.find(query, projection)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort(sort ? JSON.parse(sort) : {});
    res.status(200).json(cities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
