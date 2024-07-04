"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

type Crumb = {
  label: string | React.ReactNode;
  href: string;
};

type BreadCrumbsProps = {
  crumbs?: Array<Crumb>;
};

export function BreadCrumbs({ crumbs }: BreadCrumbsProps) {
  const searchParams = useSearchParams();

  if (!crumbs || crumbs.length === 0) {
    return (
      <div className="flex gap-3 items-center">
        <Link href={`/home?${searchParams}`}>
          <Home className="size-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center">
      <Link href={`/home?${searchParams}`}>
        <Home className="size-5" />
      </Link>
      <ChevronRight className="size-4" />
      {crumbs.map((crumb, i) => {
        return (
          <Fragment key={`${i}-${crumb.label}`}>
            <Link
              href={`${crumb.href}?${searchParams}`}
              className="hover:underline underline-offset-4 text-sm"
            >
              {crumb.label}
            </Link>
            {i < crumbs.length - 1 && <ChevronRight className="size-4" />}
          </Fragment>
        );
      })}
    </div>
  );
}
