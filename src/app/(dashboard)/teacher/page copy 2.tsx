/**
 * ================================
 * 🔁 CLERK (DESATIVADO TEMPORARIAMENTE)
 * Quando voltar a usar Clerk:
 * 1) Descomente o import abaixo
 * 2) Use auth() no lugar da lógica de cookies
 * ================================
 */
// import { auth } from "@clerk/nextjs/server";

import Announcements from "@/components/Announcements"; 
//import BigCalendarContainer from "@/components/BigCalendarContainer";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const BigCalendarContainer = dynamic(
  () => import("@/components/BigCalendarContainer"),
  { ssr: false }
);

const TeacherPage = () => {
  /**
   * ================================
   * 🔐 AUTH LOCAL (SEM CLERK)
   * ================================
   */
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  let userId: string | null = null;

  if (session) {
    try {
      const parsed = JSON.parse(session.value);
      userId = parsed.id ?? null;
    } catch {
      userId = null;
    }
  }

  // Se não estiver autenticado, não renderiza
  if (!userId) return null;

  /**
   * ================================
   * 🔁 CLERK (REFERÊNCIA FUTURA)
   * ================================
   */
  // const { userId } = auth();

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Agenda</h1>

          <BigCalendarContainer type="teacherId" id={userId} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
