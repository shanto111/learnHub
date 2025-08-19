import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIP_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export default stripe;
