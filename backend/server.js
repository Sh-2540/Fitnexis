const express = require("express");

const crypto = require("crypto");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.post("/webhook", (req, res) => {

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const shasum = crypto.createHmac("sha256", secret);

  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest("hex");

  const signature = req.headers["x-razorpay-signature"];

  if (digest === signature) {

    console.log("Webhook verified");

    console.log(req.body);

    // save/update order here

  } else {

    console.log("Invalid webhook");
  }

  res.status(200).json({
    status: "ok"
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});