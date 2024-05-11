import type { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  // console.log("user in admin route  ====== ", user,);
  if (user?.isAdmin) {
    return true;
  }
  return {
    redirect: "/auth",
  };
}
