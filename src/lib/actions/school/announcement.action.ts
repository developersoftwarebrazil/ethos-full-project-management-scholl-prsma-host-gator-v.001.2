
"use server"; // ⚠️ depois falamos disso, por enquanto só debug

import prisma from "@/lib/prisma";
import { AnnouncementSchema } from "@/lib/formValidationSchemas";
import { revalidatePath } from "next/cache";

type CurrentState = {
  success: boolean;
  error: boolean;
};

/* =========================================================
 * 📕 ATTENDANCE
 * ========================================================= */


// 🟩 Criar novo anúncio
export const createAnnouncement = async (data: AnnouncementSchema) => {
  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/announcements");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create announcement!");
  }
};
// 🟦 Atualizar anúncio
export const updateAnnouncement = async (data: AnnouncementSchema) => {
  try {
    await prisma.announcement.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/announcements");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update announcement!");
  }
};
// 🟥 Deletar anúncio
export const deleteAnnouncement = async (id: number) => {
  try {
    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath("/list/announcements");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete announcement!");
  }
};
