const express = require('express');
const cors = require('cors');
const got = require('got');
require('dotenv').config();

const app = express();
app.use(cors());
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.post('/api/payments', async (req, res) => {
  const { user_amount, user_email, user_phoneNumber, user_name} = req.body;

  try{
    const response = await got.post('https://api.flutterwave.com/v3/payments', {
    headers: {
      Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    },
    json: {
            tx_ref: "hooli-tx-1920bbtytty",
            amount: user_amount,
            currency: "NGN",
            redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
            meta: {},
            customer: {
                email: user_email,
                phonenumber: user_phoneNumber,
                name: user_name
            },
            customizations: {
                title: "Pied Piper Payments",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
            }
        }
    }).json();
  } catch (err) {
    console.log(err.code);
    console.log(err.response.body);
  }

  if (response.status === 'success') {
    res.json({ link: response.data.link });
  } else {
    res.status(400).json({ error: response.message });
  }
});

app.get('/api/payment-callback', async (req, res) => {
  if (req.query.status === 'successful') {
    const transactionDetails = await Transaction.find({ ref: req.query.tx_ref });
    const response = await flw.Transaction.verify({ id: req.query.transaction_id });
    if (
      response.data.status === 'successful' &&
      response.data.amount === transactionDetails.amount &&
      response.data.currency === 'NGN'
    ) {
      // Success! Confirm the customer's payment
      res.redirect('/success'); // redirect to success page
    } else {
      // Inform the customer their payment was unsuccessful
      res.redirect('/failure'); // redirect to failure page
    }
  } else {
    // Payment was not successful
    res.redirect('/failure'); // redirect to failure page
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
