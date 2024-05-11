import {
  ClientSuspense,
  type HeadProps,
  useHead,
  type LayoutProps,
  type PreloadContext,
} from "rakkasjs";
import ErrorBoundaryComponent from "@/components/wrappers/ErrorBoundaryComponent";
import "./index.css";
import { TailwindIndicator } from "@/components/others/tailwind-indicator";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { useViewer } from "@/lib/pb/hooks/use-viewer";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Cookie from "browser-cookies"

function MainLayout({ children }: LayoutProps) {
  const qc = useQueryClient();
  const { pb } = usePocketbase();
  const { data } = useViewer();
  function logOut() {
    pb.authStore.clear();
    Cookie.erase("pb_auth");
    qc.invalidateQueries({ queryKey: ["viewer"] });

  }
  console.log({ data });
  return (
    <ErrorBoundaryComponent>
      <div className="flex h-full w-full  flex-col items-center justify-center bg-base-200 ">
        {data && (
          <div className="min-w-fit fixed right-[5%] top-[5%] group flex gap-5 justify-center items-center">
            <div className="w-full flex gap-2 mr-1">
              {data?.username}
              {data?.isAdmin ? (
                <div className="text-success h-4 w-4 rounded-xl">active</div>
              ) : (
                <div className="text-warning h-4 w-4 rounded-xl">not</div>
              )}
            </div>
            <LogOut className="hover:text-error s-ze-4" onClick={logOut} />
         
          </div>
        )}
        {children}
        <TailwindIndicator />
        <ClientSuspense fallback={<div className="h-8 " />}>
          <Toaster richColors className="" />
        </ClientSuspense>
      </div>
    </ErrorBoundaryComponent>
  );
}
MainLayout.preload = (ctx: PreloadContext) => {
  // const theme = getSSRFriendlyTheme(ctx.requestContext);
  const documentHead: HeadProps = {
    title: "RenderconKE crowd polling",

    description:
      "Fun and exciting online poll to gaige the wsidom of the crowd ",
    htmlAttributes: { "data-theme": "black" },
    // Open Graph shorthands
    "og:title": "RenderconKE crowd polling", // <meta property="og:title" content="...">
    "og:description":
      "Fun and exciting online poll to gaige the wsidom of the crowd ", // <meta property="og:description" content="...">
    "og:url": import.meta.url, // <meta property="og:url" content="...">
    "og:image": "/og-image.png", // <meta property="og:image" content="...">

    // Twitter shorthands
    "twitter:title": "RenderconKE crowd polling", // <meta name="twitter:title" content="...">
    "twitter:description":
      "Fun and exciting online poll to gaige the wsidom of the crowd ", // <meta name="twitter:description" content="...">
    "twitter:image": "/og-image.png", // <meta name="twitter:image" content="...">
    "twitter:card": "summary_large_image", // <meta name="twitter:card" content="...">

    elements: [
      {
        tagName: "link",
        rel: "icon",
        type: "image/svg+xml",
        href: "/site.svg",
      },
    ],
    // htmlAttributes:{ "data-theme":"dark" }
  };
  return {
    head: documentHead,
  };
};

export default MainLayout;
