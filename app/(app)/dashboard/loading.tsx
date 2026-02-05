export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-9 w-48 bg-muted animate-pulse rounded" />
        <div className="h-5 w-32 bg-muted animate-pulse rounded mt-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-card rounded-lg border"
          >
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <div className="h-8 w-16 bg-muted animate-pulse rounded mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
