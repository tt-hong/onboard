import { Button } from "@/components/button";
import { CircleX, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { AchievementForm, AchievementFormSchemaType } from "./achievement-form";
import { DialogTrigger } from "@/components/dialog";
import { AlertDialog } from "@/components/alert-dialog";
import { IconButton } from "@/components/icon-button";
import { achievementsApi } from "@/store/achievements";
import { useToast } from "@/hooks/toast";

export interface AchievementCardProps {
  id: string;
  title: string;
  time: string;
  desc?: string;
}

export function AchievementCard({
  id,
  title,
  time,
  desc,
}: AchievementCardProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const toast = useToast();
  const [update, updateResult] = achievementsApi.useUpdateAchievementMutation();
  const [remove, removeResult] = achievementsApi.useDeleteAchievementMutation();

  const handleUpdateAchievement = async (data: AchievementFormSchemaType) => {
    try {
      await update({
        id,
        desc: data.description || "",
        time: data.date,
        title: data.title,
      });

      toast?.add("Update added successfully", {
        timeout: 5000,
        type: "success",
      });

      setIsEditing(false);
      setIsEditMode(false);
    } catch (e) {
      console.error(e);
      toast?.add("Failed to update achievement", {
        timeout: 5000,
        type: "danger",
      });
    }
  };

  const handleDeleteAchievement = async () => {
    try {
      await remove(id);

      toast?.add("Achievement deleted successfully", {
        timeout: 5000,
        type: "success",
      });

      setIsOpenConfirmDelete(false);
    } catch (e) {
      console.error(e);
      toast?.add("Failed to delete achievement", {
        timeout: 5000,
        type: "danger",
      });
    }
  };

  return (
    <div className="relative rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
      {!isEditMode && (
        <IconButton
          className="absolute top-2 right-2"
          onClick={() => setIsEditMode(true)}
        >
          {<Pencil size={16} />}
        </IconButton>
      )}
      {isEditing ? (
        <div className="p-6">
          <AchievementForm
            onSubmit={handleUpdateAchievement}
            onClose={
              !updateResult.isLoading ? () => setIsEditing(false) : undefined
            }
            edit={title}
            values={{ date: time, description: desc || null, title }}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-1.5 px-6 pt-6 pb-2">
            <p className="text-sm text-gray-500 mb-2">
              {" "}
              {new Date(time).toLocaleString()}
            </p>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {title}
            </h3>
          </div>
          <div className="px-6 pb-2">
            <p className="mb-2">{desc}</p>
            <div className="flex flex-wrap gap-1"></div>
          </div>
          {isEditMode && (
            <div className="items-center p-6 pt-0 flex justify-end space-x-2">
              <IconButton onClick={() => setIsEditMode(false)}>
                {<CircleX size={16} />}
              </IconButton>
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4 mr-2" /> Edit
              </Button>
              <DialogTrigger
                isOpen={isOpenConfirmDelete}
                onOpenChange={setIsOpenConfirmDelete}
              >
                <Button
                  isLoading={removeResult.isLoading}
                  variant="danger"
                  onClick={() => setIsOpenConfirmDelete(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                <AlertDialog
                  title="Delete Achievement"
                  actionLabel="Delete"
                  variant="danger"
                  onAction={handleDeleteAchievement}
                >
                  Are you sure you want to delete?
                </AlertDialog>
              </DialogTrigger>
            </div>
          )}
        </>
      )}
    </div>
  );
}
