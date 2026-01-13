"use client";

import { useState } from "react";

type Props = {
  contact: {
    id: number | string;
    isRead: boolean;
    reply?: string | null;
  };
};

export function ActionButtons({ contact }: Props) {
  const contactId = Number(contact.id); // 🔥 garante number

  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState(contact.reply ?? "");
  const [loading, setLoading] = useState(false);

  /* ===============================
   * MARCAR COMO LIDA / NOVA
   * =============================== */
  const toggleRead = async () => {
    await fetch("/api/admin/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: contactId,
        isRead: !contact.isRead,
      }),
    });

    location.reload();
  };

  /* ===============================
   * EXCLUIR
   * =============================== */
  const remove = async () => {
    if (!confirm("Deseja excluir esta mensagem?")) return;

    await fetch("/api/admin/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: contactId }),
    });

    location.reload();
  };

  /* ===============================
   * RESPONDER
   * =============================== */
  const sendReply = async () => {
    if (!reply.trim()) {
      alert("Digite uma resposta antes de enviar.");
      return;
    }

    setLoading(true);

    await fetch("/api/admin/contact/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: contactId,
        reply,
      }),
    });

    setLoading(false);
    location.reload();
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* AÇÕES PRINCIPAIS */}
      <div className="flex gap-4 text-sm">
        <button
          onClick={toggleRead}
          className="text-blue-600 hover:underline"
        >
          {contact.isRead ? "Marcar como nova" : "Marcar como lida"}
        </button>

        <button
          onClick={() => setShowReply((v) => !v)}
          className="text-green-600 hover:underline"
        >
          Responder
        </button>

        <button
          onClick={remove}
          className="text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>

      {/* FORMULÁRIO DE RESPOSTA */}
      {showReply && (
        <div className="flex flex-col gap-2 mt-2">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            placeholder="Digite a resposta..."
            className="border rounded-md p-2 text-sm"
          />

          <div className="flex gap-3">
            <button
              onClick={sendReply}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar resposta"}
            </button>

            <button
              onClick={() => setShowReply(false)}
              className="text-gray-500 text-sm hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
