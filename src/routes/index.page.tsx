import { Link, type PageProps } from "rakkasjs";
import {
  PollsSuspenseFallback,
  PollsWordCloud,
} from "./_components/polls/Polls";
import { Suspense } from "react";
import { CastAPoll } from "./_components/polls/CastAPoll";

export default function HomePage({}: PageProps) {
  return (
    <main className="flex h-fit w-full flex-col  items-center min-h-screen">
      {import.meta.env.DEV && (
        <div className="">
          <Link href="/admin">Admin</Link>
        </div>
      )}

      <Suspense fallback={<PollsSuspenseFallback />}>
        <PollsWordCloud />
      </Suspense>
      <CastAPoll/>
    </main>
  );
}
