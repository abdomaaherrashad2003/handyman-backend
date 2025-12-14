const Service = require('../models/Service');
const User = require('../models/User'); // للوركرز

/**
 * Get all services
 */
exports.getAll = async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json(services);
  } catch (err) {
    console.error('GET SERVICES ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get workers by service ID
 */
exports.getWorkersByService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const workers = await User.find({
      role: 'worker',
      service: serviceId
    }).select('name job_title location rating');

    res.json({
      service_id: serviceId,
      workers
    });
  } catch (err) {
    console.error('GET WORKERS BY SERVICE ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
