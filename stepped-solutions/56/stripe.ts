// conect to stripe. you can import this library wherever you need stripe

import Stripe from "stripe";

const stripeConfig = new Stripe(process.env.STRIPE_SECRET || "", {
  apiVersion: "2020-08-27",
});

export default stripeConfig;
