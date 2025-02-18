import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Dialog, DialogTrigger } from "@/components/dialog";

import { AchievementForm, AchievementFormSchemaType } from "./achievement-form";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  achievementsApi,
  achievementsFiltersSlice,
} from "@/store/achievements";
import { useToast } from "@/hooks/toast";

export const AchievementFilters = () => {
  const toast = useToast();

  const [isOpenAchievementForm, setIsOpenAchievementForm] = useState(false);

  const filters = useAppSelector((state) => {
    return state.achievementsFilters;
  });

  const dispatch = useAppDispatch();

  const [add, addResult] = achievementsApi.useAddAchievementMutation();

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      achievementsFiltersSlice.actions.updateFilter({
        search: e.target.value,
        sortDate: filters.sortDate,
      })
    );
  };

  const handleSortDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      achievementsFiltersSlice.actions.updateFilter({
        sortDate: e.target.value as "asc" | "desc",
        search: filters.search,
      })
    );
  };

  const handleAddAchievement = async (data: AchievementFormSchemaType) => {
    await add({
      desc: data.description || "",
      time: data.date,
      title: data.title,
    });

    setIsOpenAchievementForm(false);

    toast?.add("Achievement added successfully", {
      timeout: 5000,
      type: "success",
    });
  };

  return (
    <div className="mb-4 flex space-x-2">
      <Input
        placeholder="Search achievements..."
        className="max-w-sm"
        onChange={handleSearch}
        disabled={addResult.isLoading}
      />
      <Select
        value={filters.sortDate}
        onChange={handleSortDate}
        disabled={addResult.isLoading}
      >
        <option>Sort by</option>
        <option value="asc">Date (oldest first)</option>
        <option value="desc">Date (newest first)</option>
      </Select>
      <DialogTrigger isOpen={isOpenAchievementForm}>
        <Button
          onClick={() => setIsOpenAchievementForm(true)}
          disabled={addResult.isLoading}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Achievement
        </Button>
        <Dialog>
          <AchievementForm
            onClose={() => {
              if (!addResult.isLoading) {
                setIsOpenAchievementForm(false);
              }
            }}
            onSubmit={handleAddAchievement}
          />
        </Dialog>
      </DialogTrigger>
    </div>
  );
};
