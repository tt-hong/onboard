import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AchievementItem } from "@/types";
import {
  deleteAchievement,
  getAchievement,
  getAchievements,
  saveNewAchievement,
  updateAchievement,
} from "@/apis/achievements";
import { randomId } from "@/utils/rand";
import { getHumidity, getTemperature } from "@/apis/environment";

interface AchievementState {
  search?: string;
  sortDate?: "asc" | "desc";
}

const initialState: AchievementState = {
  search: "",
};

export const achievementsFiltersSlice = createSlice({
  name: "achievements-filters",
  initialState,
  reducers: {
    updateFilter: (
      state,
      action: PayloadAction<{
        search?: string;
        sortDate?: "asc" | "desc";
      }>
    ) => {
      state.search = action.payload.search;
      state.sortDate = action.payload.sortDate;
    },
  },
});

export const achievementsApi = createApi({
  reducerPath: "achievementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["achievements", "achievement"],
  endpoints: (builder) => ({
    addAchievement: builder.mutation<
      AchievementItem,
      Pick<AchievementItem, "title" | "desc" | "time">
    >({
      queryFn: async (newAchievement) => {
        const id = randomId();

        const finalAchievement = {
          ...newAchievement,
          id,
        } as AchievementItem;

        const [humidity, temperature] = await Promise.allSettled([
          getHumidity(finalAchievement.time),
          getTemperature(finalAchievement.time),
        ]);

        finalAchievement.hum =
          humidity.status === "fulfilled" ? humidity.value : undefined;
        finalAchievement.temp =
          temperature.status === "fulfilled" ? temperature.value : undefined;

        await saveNewAchievement(finalAchievement);

        return { data: finalAchievement };
      },
      invalidatesTags: ["achievements"],
    }),

    getAchievements: builder.query<
      AchievementItem[],
      {
        search?: string;
        sortDate?: "asc" | "desc";
      }
    >({
      queryFn: async ({ search, sortDate }) => {
        return {
          data: await getAchievements({
            search,
            sortDate,
          }),
        };
      },
      providesTags: (_result, _error, { search, sortDate }) => [
        { type: "achievements", search, sortDate },
      ],
    }),

    getAchievement: builder.query<AchievementItem | undefined, string>({
      queryFn: async (id) => {
        return { data: await getAchievement(id) };
      },
      providesTags: (_result, _error, id) => [{ type: "achievement", id }],
    }),

    updateAchievement: builder.mutation<AchievementItem, AchievementItem>({
      queryFn: async (updatedAchievement) => {
        await updateAchievement(updatedAchievement);
        return { data: updatedAchievement };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "achievement", id },
        { type: "achievements" },
      ],
    }),

    deleteAchievement: builder.mutation<string, string>({
      queryFn: async (achievementId) => {
        await deleteAchievement(achievementId);

        return { data: achievementId };
      },
      invalidatesTags: (_result, _error, achievementId) => [
        { type: "achievement", id: achievementId },
        { type: "achievements" },
      ],
    }),
  }),
});
