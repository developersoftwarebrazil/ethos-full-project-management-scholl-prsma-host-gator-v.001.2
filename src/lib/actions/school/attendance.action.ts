"use server"; // ⚠️ depois falamos disso, por enquanto só debug

import prisma from "@/lib/prisma";
import { AttendanceSchema } from "@/lib/formValidationSchemas";
import { revalidatePath } from "next/cache";

type CurrentState = {
  success: boolean;
  error: boolean;
};



// CREATE ATTENDANCE (server action compatível com useFormState)
export const createAttendance = async (
  currentState: { success: boolean; error: boolean },
  data: AttendanceSchema
) => {
  try {
    const attendanceDate = data.date ? new Date(data.date) : new Date();

    const startOfDay = new Date(attendanceDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(attendanceDate);
    endOfDay.setHours(23, 59, 59, 999);

    // remove registros do mesmo dia + mesma aula (se desejar sobrescrever)
    await prisma.attendance.deleteMany({
      where: {
        lessonId: Number(data.lessonId),
        date: { gte: startOfDay, lte: endOfDay },
      },
    });

    // cria todos os registros de uma vez
    await prisma.attendance.createMany({
      data: data.records.map((rec) => ({
        studentId: rec.studentId,
        lessonId: Number(data.lessonId),
        status: rec.status,
        date: attendanceDate,
      })),
    });

    revalidatePath("/list/attendance");
    return { success: true, error: false };
  } catch (err) {
    console.error("❌ Erro ao criar presenças:", err);
    return { success: false, error: true };
  }
};

// UPDATE ATTENDANCE (atualiza um registro por id)
export const updateAttendance = async (
  currentState: { success: boolean; error: boolean },
  data: {
    id: number;
    status?: any;
    date?: Date | string;
    lessonId?: number;
    studentId?: string;
  }
) => {
  try {
    const updatePayload: any = {};

    if (data.status) updatePayload.status = data.status;
    if (data.date) updatePayload.date = new Date(String(data.date));
    if (data.lessonId) updatePayload.lessonId = Number(data.lessonId);
    if (data.studentId) updatePayload.studentId = data.studentId;

    await prisma.attendance.update({
      where: { id: Number(data.id) },
      data: updatePayload,
    });

    revalidatePath("/list/attendance");
    return { success: true, error: false };
  } catch (err) {
    console.error("❌ Erro ao atualizar presença:", err);
    return { success: false, error: true };
  }
};

export const getAttendanceByLessonAndDate = async (
  lessonId: number,
  date: string
) => {
  try {
    const start = new Date(date + "T00:00:00");
    const end = new Date(date + "T23:59:59");

    return await prisma.attendance.findMany({
      where: {
        lessonId,
        date: { gte: start, lte: end },
      },
      include: {
        student: true,
      },
    });
  } catch (err) {
    console.error("❌ Erro ao buscar presenças:", err);
    return [];
  }
};
// DELETE ATTENDANCE
export const deleteAttendance = async (
  currentState: { success: boolean; error: boolean },
  data: FormData
) => {
  try {
    const id = Number(data.get("id"));

    if (!id || isNaN(id)) {
      throw new Error("ID inválido para exclusão de presença");
    }

    await prisma.attendance.delete({
      where: { id },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("❌ Erro ao deletar presença:", error);
    return { success: false, error: true };
  }
};