import { AchievementItem } from "@/types";
import { wait } from "@/utils/wait";

function getRawAchievements() {
  return JSON.parse(
    localStorage.getItem("achievements") || "[]"
  ) as AchievementItem[];
}

function saveRawAchievements(achievements: AchievementItem[]) {
  localStorage.setItem("achievements", JSON.stringify(achievements));
}

export const getAchievements = async ({
  search,
  sortDate,
}: {
  search?: string;
  sortDate?: "asc" | "desc";
}): Promise<AchievementItem[]> => {
  await wait(3000);

  let achievements = getRawAchievements();

  achievements = achievements.reverse();

  if (search) {
    achievements = achievements.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortDate) {
    achievements = achievements.sort((a, b) =>
      sortDate === "asc"
        ? a.time.localeCompare(b.time)
        : b.time.localeCompare(a.time)
    );
  }

  return achievements;
};

export const getAchievement = async (
  id: string
): Promise<AchievementItem | undefined> => {
  await wait(3000);

  const achievements = getRawAchievements();

  return achievements.find((a) => a.id === id);
};

export const saveNewAchievement = async (achievement: AchievementItem) => {
  await wait(3000);

  const achievements = getRawAchievements();

  achievements.push(achievement);

  saveRawAchievements(achievements);
};

export const deleteAchievement = async (id: string) => {
  await wait(3000);

  const achievements = getRawAchievements();

  const newAchievements = achievements.filter(
    (achievement) => achievement.id !== id
  );

  saveRawAchievements(newAchievements);
};

export const updateAchievement = async (achievement: AchievementItem) => {
  await wait(3000);

  const achievements = getRawAchievements();

  const newAchievements = achievements.map((a) =>
    a.id === achievement.id ? achievement : a
  );

  saveRawAchievements(newAchievements);
};
