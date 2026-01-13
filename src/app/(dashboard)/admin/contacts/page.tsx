import prisma from "@/lib/prisma";
import ContactActionButtons from "@/components/ui/tables/ContactActionButtons";

export default async function AdminContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        📬 Mensagens da Landing Page
      </h1>

      <div className="rounded-xl border bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
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
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className={`border-t ${
                  !contact.isRead ? "bg-yellow-50/60" : ""
                }`}
              >
                <td className="p-4 font-medium">{contact.name}</td>
                <td className="p-4">{contact.email}</td>

                <td className="p-4 max-w-sm truncate">
                  {contact.message}
                </td>

                <td className="p-4">
                  {new Date(contact.createdAt).toLocaleDateString("pt-BR")}
                </td>

                <td className="p-4 space-y-1">
                  <span
                    className={`block text-xs font-semibold ${
                      contact.isRead
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {contact.isRead ? "Lida" : "Nova"}
                  </span>

                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      contact.repliedAt
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {contact.repliedAt ? "Respondido" : "Pendente"}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <ContactActionButtons contact={contact} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contacts.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            Nenhuma mensagem recebida.
          </p>
        )}
      </div>
    </div>
  );
}
  