const ServiceCategory = require('../models/ServiceCategory');

// ===============================
// Create Category
// ===============================
exports.createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    const exists = await ServiceCategory.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const category = await ServiceCategory.create({
      name,
      icon
    });

    res.status(201).json(category);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};