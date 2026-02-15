const sendSuccess = (res, data, meta) => {
  const payload = { success: true, data };
  if (meta) payload.meta = meta;
  return res.json(payload);
};

const sendError = (res, status, code, message, details) => {
  const payload = {
    success: false,
    error: { code, message },
    message,
  };
  if (details) payload.error.details = details;
  return res.status(status).json(payload);
};

module.exports = { sendSuccess, sendError };
