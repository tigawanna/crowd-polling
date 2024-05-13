import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState } from "react";

interface CastAPollProps {}

export function CastAPoll({}: CastAPollProps) {
  const { pb } = usePocketbase();

  const [input, setInput] = useState({
    item: "",
  });

  const vote_mutation = useMutation({
    mutationFn: () => {
      if (!input.item)
        return new Promise<any>((resolve) =>
          resolve({
            data: null,
            error: new Error("Please enter input can't be empty"),
          }),
        );
      if (input?.item?.length < 4)
        return new Promise<any>((resolve) =>
          resolve({
            data: null,
            error: new Error(
              "Please enter input can't be less than 4 characters",
            ),
          }),
        );
      return pbTryCatchWrapper(
        pb.from("rendercon_crowd_polls").create({ value: input.item }),
      );
    },
    meta: {
      invalidates: ["poll_values_count", "rendercon_crowd_polls"],
    },
    onSuccess: (data) => {
      setInput({ item: "" });
      if (data.data) {
        sonnerToast({
          title: "Success",
          options: {
            position: "bottom-right",
            description: "Your vote has been cast",
          },
        });
      }
      if (data.error) {
        sonnerToast({
          type: "error",
          options: {
            description: `${data.error.message}`,
          },
        });
      }
    },
  });
  return (
    <div className="w-full flex gap-2 items-center justify-center px-[5%] py-[2%]">
      <PbTheTextInput
        required
        minLength={3}
        field_key={"item"}
        field_name={"Item"}
        label_classname="hidden"
        onChange={(e) =>
          setInput((prev) => ({ ...prev, item: e.target.value }))
        }
        val={input.item}
        disabled={vote_mutation.isPending}
      />
      <SpinnerButton
        className="min-w-10 md:min-w-fit h-full"
        variant={"outline"}
        onClick={() => vote_mutation.mutate()}
        mutation={vote_mutation}
      >
        <Send />
      </SpinnerButton>
    </div>
  );
}
