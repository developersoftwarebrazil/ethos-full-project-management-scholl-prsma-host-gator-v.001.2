import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

/**
 * ================================
 * 🔁 CLERK (DESATIVADO TEMPORARIAMENTE)
 * Quando voltar a usar Clerk:
 * 1) Descomente os imports abaixo
 * 2) Comente a lógica de auth local
 * ================================
 */
// import { currentUser } from "@clerk/nextjs/server";

/**
 * ================================
 * 🔐 ROLES VÁLIDOS
 * ================================
 */
const VALID_ROLES = ["admin", "teacher", "student", "parent"] as const;
type Role = (typeof VALID_ROLES)[number];

/**
 * ================================
 * 🏷️ TIPOS DO MENU
 * ================================
 */
type BadgeType = "contacts";

type MenuItem = {
  icon: string;
  label: string;
  href: string;
  visible: Role[];
  badge?: BadgeType;
};

type MenuSection = {
  title: string;
  visibleTo?: Role[];
  items: MenuItem[];
};

/**
 * ================================
 * 📋 ITENS DO MENU
 * ================================
 */
const menuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Professores",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Alunos",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Responsáveis",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/course.png",
        label: "Série",
        href: "/list/grades",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Discíplinas",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Turmas",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lições",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Testes / Provas",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Tarefas",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Resultados",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Presença",
        href: "/list/attendances",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Eventos",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "ADMIN",
    visibleTo: ["admin"],
    items: [
      {
        icon: "/message.png",
        label: "Mensagens de contato",
        href: "/admin/contacts",
        visible: ["admin"],
        badge: "contacts",
      },
    ],
  },
  {
    title: "OUTROS",
    items: [
      {
        icon: "/profile.png",
        label: "Perfil",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Ajustes",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Sair",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

/**
 * ================================
 * 🧭 MENU
 * ================================
 */
const Menu = async () => {
  let role: Role | null = null;

  /**
   * ================================
   * 🔐 AUTH LOCAL (COOKIE)
   * ================================
   */
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie);
      const parsedRole = parsed.role?.toLowerCase();

      if (parsedRole && VALID_ROLES.includes(parsedRole as Role)) {
        role = parsedRole as Role;
      }
    } catch (error) {
      console.error("Erro ao ler cookie de sessão:", error);
    }
  }

  /**
   * ================================
   * 🔁 CLERK (DESATIVADO)
   * Quando reativar:
   * const user = await currentUser();
   * role = user?.publicMetadata?.role as Role;
   * ================================
   */

  // 🚫 Sem role válido → não renderiza menu
  if (!role) return null;

  /**
   * ================================
   * 🔔 BADGES (ADMIN)
   * ================================
   */
  let unreadContacts = 0;

  if (role === "admin") {
    unreadContacts = await prisma.contact.count({
      where: { isRead: false },
    });
  }

  return (
    <div className="mt-4 text-sm">
      {menuItems
        .filter(
          (section) =>
            !section.visibleTo || section.visibleTo.includes(role)
        )
        .map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {section.title}
            </span>

            {section.items
              .filter((item) => item.visible.includes(role))
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>

                  {item.badge === "contacts" && unreadContacts > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadContacts}
                    </span>
                  )}
                </Link>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Menu;
