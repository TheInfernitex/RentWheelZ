
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>RentWheelZ : A Car Rental Website!</h1>
      <p>
        <Link href="/login">Login</Link> or <Link href="/signup">Signup</Link>
      </p>
    </div>
  );
}
