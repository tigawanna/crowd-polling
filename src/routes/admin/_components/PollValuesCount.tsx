import { Button } from "@/components/shadcn/ui/button";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSearchParams } from "@/lib/rakkas/hooks/use-search-params";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { navigate, useLocation } from "rakkasjs";

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
  const { current } = useLocation();
  const page = useSearchParams({
    default_value: "1",
    key: "page",
  });
  function changePage(direction: "+" | "-", currentPage: number) {
    if (currentPage < 1) return;
    const url = new URL(current);
    if (direction === "+") {
      url.searchParams.set("page", String(currentPage + 1));
      navigate(url);
    }

    url.searchParams.set("page", String(currentPage - 1));
    navigate(url);
  }
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
    queryKey: ["poll_values_count","list-view",page],
    queryFn: () =>
      pbTryCatchWrapper(
        pb.from("rendercon_crowd_polls_count").getList(+page, 30, {
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
              className="w-fit text-lg border cursor-pointer border-secondary hover:transition-colors hover:bg-secondary/10 p-1 rounded-lg gap-3 flex justify-center items-center"
            >
              <Minus
                className="size-4 hover:text-primary"
                onClick={() => mutate.mutate({ action: "-", id: d.id })}
              />
              <span>
                {d.value} {d.count}
              </span>

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
      <div className="w-full flex justify-between p-2">
        <Button
          variant={"outline"}
          onClick={() => changePage("-", +page)}
          disabled={query.isPending || +page <= 1}
          type="button"
        >
          <ChevronLeft />
          Prev
        </Button>
        {query.data?.data?.totalPages && (
          <Button
            variant={"outline"}
            disabled={query.isPending || +page > query?.data?.data?.totalPages}
            onClick={() => changePage("+", +page)}
            type="button"
          >
            Next
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
