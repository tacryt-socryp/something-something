const cv = require("card-validator");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: 'POST only' });
  }
  const checks = [
    cv.number(req.body.cardNumber),
    cv.expirationMonth(req.body.expMonth),
    cv.expirationYear(req.body.expYear),
    cv.cvv(req.body.cvv),
    cv.postalCode(req.body.zip),
  ]
  if (checks.some(check => !check?.isValid)) {
    res.status(400).json({error: 'At least one field was invalid'});
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
  res.status(200).json({message: "Success!" });
}
