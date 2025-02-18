import { useAppSelector } from "@/store";
import { achievementsApi } from "@/store/achievements";
import { AchievementCard } from "./achievement-card";
import { AchievementSkeleton } from "./achievement-skeleton";
import { useDebounce } from "use-debounce";

export function AchievementList() {
  const filters = useAppSelector((state) => {
    return state.achievementsFilters;
  });

  const [debounceSearch] = useDebounce(filters.search, 500);

  const {
    data: achievements,
    isLoading,
    isFetching,
  } = achievementsApi.useGetAchievementsQuery(
    {
      search: debounceSearch,
      sortDate: filters.sortDate,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const isLoadingAll = isLoading || isFetching;

  return (
    <div className="mt-4">
      {isLoadingAll && (
        <div className="grid gap-4">
          {[...Array(5)].map((_, index) => (
            <AchievementSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoadingAll && achievements && (
        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              id={achievement.id}
              title={achievement.title}
              time={achievement.time}
              desc={achievement.desc}
            />
          ))}
        </div>
      )}

      {!isLoadingAll && achievements && achievements.length === 0 && (
        <div className="text-gray-500 text-center mt-6">
          {filters.search ? "No results found" : "No achievements yet"}
        </div>
      )}
    </div>
  );
}
