import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientSuspense } from "rakkasjs";
import { lazy } from "react";
import { CastAPoll } from "./CastAPoll";
const ChartJSWordCloud = lazy(() => import("./ChartJSWordCloud"));
interface PollsWordCloudProps {

}

export function PollsWordCloud({  }: PollsWordCloudProps) {
  const { pb } = usePocketbase();
  const query = useSuspenseQuery({
    queryKey: ["poll_values_count"],
    queryFn: () =>
      pbTryCatchWrapper(
        pb.from("rendercon_crowd_polls_count").getList(1, 100, {
          sort: "+value",
        }),
      ),
     refetchInterval: 10000,
    select(data) {
      return data?.data?.items.map((d) => ({
        key: d.value,

        value: d.count,
      }));
    },
  });
  const data = query?.data??[]
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ClientSuspense fallback={<PollsSuspenseFallback />}>
        <ChartJSWordCloud data_list={data} />
      </ClientSuspense>
      <CastAPoll />
    </div>
  );
}



export function PollsSuspenseFallback({}){
return (
  <div className="w-fullmin-h-[90vh]  h-full flex flex-col gap-1 items-center justify-center p-[5%] ">
    <div className="w-[40%] h-5 bg-base-300 skeleton" />
    <div className="w-[60%] h-7 bg-base-300 skeleton" />
    <div className="w-[70%] h-8 bg-base-300 skeleton" />
    <div className="w-[100%] h-10 bg-base-300 skeleton" />
    <div className="w-[100%] h-10 bg-base-300 skeleton" />
    <div className="w-[70%] h-8 bg-base-300 skeleton" />
    <div className="w-[60%] h-7 bg-base-300 skeleton" />
    <div className="w-[40%] h-5 bg-base-300 skeleton" />
  </div>
);
}
