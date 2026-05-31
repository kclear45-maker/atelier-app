export function notFoundHandler(_req, res, _next) {
  res.status(404).json({ error: "Not Found" });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode ?? err.status ?? 500;
  const message =
    status >= 500 ? "Internal Server Error" : err.message ?? "Error";
  if (status >= 500) console.error(err);
  res.status(status).json({ error: message });
}
