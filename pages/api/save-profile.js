
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const data = req.body;
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const file = path.join(dataDir, 'profiles.json');
    let existing = [];
    if (fs.existsSync(file)) existing = JSON.parse(fs.readFileSync(file));
    existing.push(data);
    fs.writeFileSync(file, JSON.stringify(existing, null, 2));
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
