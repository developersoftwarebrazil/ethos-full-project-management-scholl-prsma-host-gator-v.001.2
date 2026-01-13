import prisma from "@/lib/prisma";
import { ActionButtons } from "../contacts/ActionButtons";

export default async function AdminContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      {/* TÍTULO */}
      <div>
        <h1 className="text-2xl font-bold">📬 Mensagens da Landing Page</h1>
        <p className="text-sm text-slate-500">
          Contatos recebidos através do formulário do site
        </p>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-600">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Email</th>
              <th className="p-4">Mensagem</th>
              <th className="p-4">Data</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr
                key={c.id}
                className={`border-t transition ${
                  !c.isRead
                    ? "bg-yellow-50 hover:bg-yellow-100"
                    : "hover:bg-slate-50"
                }`}
              >
                {/* NOME */}
                <td className="p-4 font-medium text-slate-800">
                  {c.name}
                </td>

                {/* EMAIL */}
                <td className="p-4 text-slate-600">{c.email}</td>

                {/* MENSAGEM */}
                <td className="p-4 max-w-sm truncate text-slate-600">
                  {c.message}
                </td>

                {/* DATA */}
                <td className="p-4 text-slate-500">
                  {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                </td>

                {/* STATUS */}
                <td className="p-4 space-y-2">
                  {/* Leitura */}
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      c.isRead
                        ? "bg-slate-100 text-slate-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.isRead ? "👁 Lida" : "📩 Nova"}
                  </span>

                  {/* Resposta */}
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      c.repliedAt
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.repliedAt ? "✅ Respondido" : "⏳ Pendente"}
                  </span>
                </td>

                {/* AÇÕES */}
                <td className="p-4 text-right">
                  <ActionButtons contact={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ESTADO VAZIO */}
        {contacts.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            Nenhuma mensagem recebida.
          </div>
        )}
      </div>
    </div>
  );
}
