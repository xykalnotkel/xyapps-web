export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={`sk ${className}`} style={style} />;
}

export function HomeSkeleton() {
  return (
    <div className="wrap stack-24" aria-hidden>
      <Skeleton className="sk-search" />
      <div className="chip-row">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="sk-chip" />
        ))}
      </div>
      <div className="rail">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="sk-feature" />
        ))}
      </div>
      <div className="stack-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="row-sk">
            <Skeleton className="sk-icon" />
            <div className="grow stack-8">
              <Skeleton className="sk-line w-60" />
              <Skeleton className="sk-line w-40" />
            </div>
            <Skeleton className="sk-btn" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="stack-10" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="row-sk">
          <Skeleton className="sk-icon" />
          <div className="grow stack-8">
            <Skeleton className="sk-line w-55" />
            <Skeleton className="sk-line w-35" />
          </div>
          <Skeleton className="sk-btn" />
        </div>
      ))}
    </div>
  );
}
