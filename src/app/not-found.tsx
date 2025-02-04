import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <h2 className="text-xl font-semibold">:( 404 - Page Not Found</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
