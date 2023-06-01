const stripe = require("stripe")(process.env.STRIPE_SK);

const stripeController = async (req, res) => {
  console.log(req.body);
  const { purchase, shipping_fee, total_amount } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });
  console.log(paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
