export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  try {
    req.body = data ? JSON.parse(data) : {};
  } catch {
    req.body = {};
  }

  res.setHeader("Content-Type", "application/json");
}