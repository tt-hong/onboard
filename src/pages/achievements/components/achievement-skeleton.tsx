export function AchievementSkeleton() {
  return (
    <div className="animate-pulse bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-6 w-full bg-gray-300 rounded mt-2"></div>
      <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
    </div>
  );
}
