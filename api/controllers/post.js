import { db } from "../db.js";

export const getAllData = (req, res) => {
  const q = req.query.id
    ? "SELECT * FROM user WHERE id=?"
    : "SELECT * FROM data";

  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getData = (req, res) => {
  const q =
    "SELECT `DeviceId`,`Device_Type`,`Timestamp`,`location` FROM user u JOIN data d ON u.id=d.uid WHERE d.DeviceId = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
