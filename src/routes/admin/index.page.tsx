import type { PageProps } from "rakkasjs";
import { Suspense } from "react";
import { PollValuesCount } from "./_components/PollValuesCount";
import { PollsSuspenseFallback } from "../_components/polls/Polls";
export default function AdminPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen  flex flex-col items-center justify-center">
      {/* <div className="fixed top-[5%] left-[5%]">
        <AddBulkPollValues />
      </div> */}

      <Suspense fallback={<PollsSuspenseFallback/>}>
        <PollValuesCount />
      </Suspense>
    </div>
  );
}
