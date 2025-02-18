import { CircleX } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/text-field";
import { Button } from "@/components/button";
import { getFormErrorMessage } from "@/utils/form";
import { IconButton } from "@/components/icon-button";

const Schema = z.object({
  date: z.string().refine((val) => new Date(val) < new Date(), {
    message: "Date achieved is invalid",
  }),
  description: z.string().nullable(),
  title: z.string().min(1, { message: "Title is required" }),
});

export type AchievementFormSchemaType = z.infer<typeof Schema>;

export interface AchievementFormProps {
  edit?: string;
  onClose?: () => void;
  values?: AchievementFormSchemaType;
  onSubmit?: (data: AchievementFormSchemaType) => Promise<void>;
}

export function AchievementForm({
  onClose,
  edit,
  values,
  onSubmit,
}: AchievementFormProps) {
  const methods = useForm<AchievementFormSchemaType>({
    resolver: zodResolver(Schema),
    mode: "onBlur",
    defaultValues: {
      ...values,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  function handleSubmitFinal(data: AchievementFormSchemaType) {
    if (onSubmit) {
      return onSubmit(data);
    }
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          {edit ? `Edit achievement: ${edit}` : `Create a new achievement`}
        </h1>
        <IconButton onClick={onClose} disabled={isSubmitting}>
          <CircleX />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(handleSubmitFinal)} className="mt-4">
        <div className="flex flex-col gap-4">
          <TextField
            label="Date achieved *"
            inputProps={{
              ...register("date"),
              type: "datetime-local",
              placeholder: "Date achieved",
              disabled: isSubmitting,
            }}
            error={getFormErrorMessage(errors, "date")}
          />

          <TextField
            label="Achievement title *"
            inputProps={{
              ...register("title"),
              placeholder: "Your new achievement...",
              disabled: isSubmitting,
            }}
            error={getFormErrorMessage(errors, "title")}
          />

          <TextField
            label="Achievement description"
            inputProps={{
              ...register("description"),
              placeholder: "A brief description of your achievement...",
              disabled: isSubmitting,
              isMultiline: true,
              rows: 5,
            }}
            error={getFormErrorMessage(errors, "description")}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {edit ? "Save changes" : "Create achievement"}
          </Button>
        </div>
      </form>
    </div>
  );
}
