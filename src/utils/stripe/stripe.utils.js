import {
    loadStripe
} from "@stripe/stripe-js";

export const stripePromis = loadStripe(
    process.env.REACT_APP_STRIPE_PUB_KEY
)