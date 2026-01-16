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
export { createTeacher } from "./teacher.actions";
export { updateTeacher } from "./teacher.actions";
export { deleteTeacher } from "./teacher.actions";

// ================================
// 🧓 LEGADO (TEMPORÁRIO)
// ================================
// ⚠️ Remover aos poucos conforme migrar
// export * from "../actions"; // use somente se ainda houver ações antigas
