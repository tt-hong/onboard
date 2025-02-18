import { AchievementFilters } from "./components/achievement-filters";
import { AchievementList } from "./components/achievement-list";

export const AchievementsPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl relative">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-1">
        My Achievements
      </h1>
      <AchievementFilters />
      <AchievementList />
    </div>
  );
};
