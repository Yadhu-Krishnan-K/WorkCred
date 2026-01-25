"use client";

export default function EnrollButton({ category }: { category: string }) {
  const handleEnroll = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Enroll
    </button>
  );
}
