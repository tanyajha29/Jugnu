const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Route not found" },
    message: "Route not found",
  });
};

module.exports = notFound;
