"use client";

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
    >
      Upgrade to Pro (Demo)
    </button>
  );
}
