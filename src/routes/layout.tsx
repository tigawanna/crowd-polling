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
import { getSSRFriendlyTheme } from "@/lib/rakkas/theme";

function MainLayout({ children }: LayoutProps) {

  return (
    <ErrorBoundaryComponent>
      <div className="flex h-full w-full  flex-col items-center justify-center bg-base-200 ">
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
  const theme = getSSRFriendlyTheme(ctx.requestContext);
  const documentHead: HeadProps = {
    title: "RenderconKE crowd polling",

    description:
      "Fun and exciting online poll to gaige the wsidom of the crowd ",
    htmlAttributes: { "data-theme": theme },
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
