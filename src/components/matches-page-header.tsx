import { MatchesPageTabs } from "./matches-tabs";

export function MatchesPageHeader() {
  return (
    <div className="flex justify-between gap-8 items-baseline w-full relative">
      <h1 className="font-bold text-3xl tracking-tight">Matches</h1>
      <MatchesPageTabs />
      <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
    </div>
  );
}
