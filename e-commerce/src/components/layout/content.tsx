import type { ReactNode } from "react";
import clsx from "clsx";

type DashboardContentProps = {
  children: ReactNode;
  className?: string;
  disablePadding?: boolean;
};

export function DashboardContent({
  children,
  className = "",
  disablePadding = false,
}: DashboardContentProps) {
  return (
    <div
      className={clsx(
        "flex flex-col flex-1 h-full max-h-full",
        {
          "px-0": disablePadding,
          "px-2 [@media(min-width:640px)_and_(max-width:1200px)]:px-20 lg:px-40":
            !disablePadding,
        },
        className
      )}
    >
      {children}
    </div>
  );
}