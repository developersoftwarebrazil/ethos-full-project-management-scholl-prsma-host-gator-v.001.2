"use server";

import { deleteTeacher } from "@/lib/actions/users/teacher.actions";

export type DeleteState = { success: boolean; error: boolean };

export const deleteTeacherWrapper = async (
  state: DeleteState,
  formData: FormData,
): Promise<DeleteState> => {
  return deleteTeacher(state as any, formData);
};

export const deleteActionMap = {
  teacher: deleteTeacherWrapper,
};
