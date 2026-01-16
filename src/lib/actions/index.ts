/**
 * ================================
 * 🔐 ACTIONS – ENTRY POINT
 * ================================
 * NÃO importar actions direto dos módulos
 * Sempre passar por este index
 */

import { create } from "domain";

// ================================
// 🆕 NOVO (MODULE-BASED)
// ================================
export * from "@/lib/actions";

export { createTeacher } from "./users/teacher.actions";
export { updateTeacher } from "./users/teacher.actions";
export { deleteTeacher } from "./users/teacher.actions";

export { createStudent } from "./users/student.action";
export { updateStudent } from "./users/student.action";
export { deleteStudent } from "./users/student.action";

export { createParent } from "./users/parent.action";
export { updateParent } from "./users/parent.action";
export { deleteParent } from "./users/parent.action";

// ================================
// 🧓 LEGADO (TEMPORÁRIO)
// ================================
// ⚠️ Remover aos poucos conforme migrar
// export * from "../actions"; // use somente se ainda houver ações antigas
