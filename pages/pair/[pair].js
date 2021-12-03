import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();



  return (
    <div className="flex flex-col items-center justify-center sm:h-screen py-10 bg-purple-600">
      <div>Pair #{router.query.pair}</div>
    </div>
  );
}