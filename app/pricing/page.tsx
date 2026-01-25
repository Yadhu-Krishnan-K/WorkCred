import CheckoutButton from "@/components/stripe/CheckoutButton";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold">WorkCred Pro</h1>
        <p className="mt-2 text-gray-600">
          Demo payment using Stripe test mode
        </p>
        <p className="mt-4 text-xl font-semibold">$20</p>

        <div className="mt-6">
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}
