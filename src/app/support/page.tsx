"use client";

const CheckoutButton = () => {
  const handleCheckout = async () => {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: "T-shirt",
        unitAmount: 2000,
        currency: "usd",
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <button
      className="rounded p-6 bg-amber-950 text-white"
      onClick={handleCheckout}
    >
      Buy T-shirt
    </button>
  );
};

export default function SupportPage() {
  return (
    <div>
      <h1>Support us!</h1>
      <p>If you have any questions or need assistance, please contact us.</p>
      <CheckoutButton />
    </div>
  );
}
