import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";

interface PollValuesCountProps {}

type IncrementMutationButton = {
  action: "+";
  value: string;
};
type DecrementMutationButton = {
  action: "-";
  id: string;
};
type PollMutationButton = IncrementMutationButton | DecrementMutationButton;

export function PollValuesCount({}: PollValuesCountProps) {
  const { pb } = usePocketbase();

  const mutate = useMutation({
    mutationFn: (vars: PollMutationButton) => {
      if (vars.action === "+") {
        return pbTryCatchWrapper(
          pb.from("rendercon_crowd_polls").create({ value: vars.value }),
        );
      }
      if (vars.action === "-") {
        return pbTryCatchWrapper(
          pb.from("rendercon_crowd_polls").delete(vars.id),
        );
      }
      return new Promise((resolve, reject) => {
        reject("What are you doing?");
      });
    },
    meta: {
      invalidates: ["poll_values_count", "rendercon_crowd_polls"],
    },
  });
  const query = useSuspenseQuery({
    queryKey: ["poll_values_count"],
    queryFn: () =>
      pbTryCatchWrapper(
        pb.from("rendercon_crowd_polls_count").getList(1, 100, {
          sort: "+value",
        }),
      ),
  });
  const data = query.data.data?.items;

  if (data?.length === 0 || !data)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-center text-2xl text-secondary">No data</p>
      </div>
    );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <ul className="w-full max-h-[80vh] flex flex-wrap gap-3  justify-center overflow-auto">
        {data?.map((d) => {
          return (
            <li
              key={d.id}
              className="w-fit border-4 cursor-pointer border-secondary hover:transition-colors hover:bg-secondary/50 p-1 rounded-lg gap-3 flex justify-center items-center"
            >
              <Minus
                className="size-4 hover:text-primary"
                onClick={() => mutate.mutate({ action: "-", id: d.id })}
              />
              {d.value} {d.count}
              <Plus
                className="size-4 hover:text-primary"
                onClick={() => mutate.mutate({ action: "+", value: d.value })}
              />
              {/* {mutate.isPending ? (
                <Loader className="animate-spin size 4" />
              ) : null} */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
