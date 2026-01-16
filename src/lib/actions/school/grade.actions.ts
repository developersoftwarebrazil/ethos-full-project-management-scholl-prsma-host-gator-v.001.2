"use server";

import { GradeSchema } from "@/lib/formValidationSchemas";
import { hashPassword } from "@/lib/passwords";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* =========================================================
 * 📕 Grade
 * ========================================================= */

export const createGrade = async (data: GradeSchema) => {
  try {
    await prisma.grade.create({
      data: {
        // converte para número
        level: Number(data.level),
        description: data.description,
      },
    });

    revalidatePath("/list/grades");
    return { success: true, error: false };
  } catch (error) {
    console.error("❌ Erro ao criar série:", error);
    return { success: false, error: true };
  }
};

// 🟦 Atualizar Série / Nível
export const updateGrade = async (data: GradeSchema) => {
  try {
    if (!data.id) {
      throw new Error("ID é obrigatório para atualização.");
    }

    await prisma.grade.update({
      where: { id: data.id },
      data: {
        // também garante que seja número
        level: Number(data.level),
        description: data.description,
      },
    });

    revalidatePath("/list/grades");
    return { success: true, error: false };
  } catch (error) {
    console.error("❌ Erro ao atualizar série:", error);
    return { success: false, error: true };
  }
};

export const deleteGrade = async (
  currentState: { success: boolean; error: boolean },
  formData: FormData
) => {
  try {
    const id = Number(formData.get("id"));

    if (!id || isNaN(id)) {
      throw new Error("ID inválido para exclusão");
    }

    await prisma.grade.delete({
      where: { id },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Erro ao deletar grade:", err);
    return { success: false, error: true };
  }
};