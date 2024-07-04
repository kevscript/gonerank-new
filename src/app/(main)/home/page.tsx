import { BreadCrumbs } from "@/components/breadcrumbs/bread-crumbs";

export default function HomePage() {
  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <div className="mb-12">
        <BreadCrumbs />
      </div>
      <div className="flex justify-between gap-8 items-baseline w-full relative pb-4">
        <h1 className="font-bold text-3xl tracking-tight">Hello</h1>
        <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
      </div>
    </div>
  );
}
