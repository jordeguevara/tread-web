import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  console.log("Received request to create Stripe checkout session");
  const { productName, unitAmount, currency } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: productName,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
