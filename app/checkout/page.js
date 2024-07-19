import Checkout from "@/app/_components/Checkout";

export default function Page() {
  const amount = 250; //TEST

  return (
    <div className="py-12 w-full bg-accent-400 flex flex-col items-center justify-center">
      <h3 className="text-4xl text-primary-950 text-center">
        We request you to pay ${amount}
      </h3>

      <Checkout amount={amount} />
    </div>
  );
}
