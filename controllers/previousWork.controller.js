const PreviousWork = require('../models/PreviousWork');

// ======================
// Add Work
// ======================
exports.addWork = async (req, res) => {
  try {
    const workerId = req.user.id;

    const work = await PreviousWork.create({
      worker: workerId,
      image: req.file?.path || "",
      description: req.body.description
    });

    res.status(201).json(work);

  } catch (err) {
    console.error('ADD WORK ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================
// Get Worker Gallery
// ======================
exports.getWorkerWorks = async (req, res) => {
  try {
    const { workerId } = req.params;

    const works = await PreviousWork.find({ worker: workerId })
      .sort({ createdAt: -1 });

    res.json(works);

  } catch (err) {
    console.error('GET WORKS ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================
// Delete Work
// ======================
exports.deleteWork = async (req, res) => {
  try {
    const { id } = req.params;

    const work = await PreviousWork.findByIdAndDelete(id);

    if (!work) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Deleted successfully' });

  } catch (err) {
    console.error('DELETE WORK ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};