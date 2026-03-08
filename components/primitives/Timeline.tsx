import type { ReactNode } from "react";

interface TimelineProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

export function Timeline<T>({ items, renderItem }: TimelineProps<T>) {
  return (
    <div className="relative space-y-10 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border-default">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8">
          <div className="absolute left-[-5px] top-1.5 h-[10px] w-[10px] rounded-full bg-primary ring-2 ring-bg-base" />
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
