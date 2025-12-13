exports.getAll = async (req, res) => {
  res.json([
    { id: 1, name: 'Plumbing' },
    { id: 2, name: 'Electrician' }
  ]);
};

exports.getWorkersByService = async (req, res) => {
  res.json({
    service_id: req.params.id,
    workers: []
  });
};
