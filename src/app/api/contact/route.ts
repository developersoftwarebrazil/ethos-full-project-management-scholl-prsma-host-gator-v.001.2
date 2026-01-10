import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import sgMail from "@sendgrid/mail";

const prisma = new PrismaClient();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    // 1️⃣ Salvar no banco
    const contact = await prisma.contact.create({
      data: { name, email, message },
    });

    // 2️⃣ Enviar e-mail
    await sgMail.send({
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      from: {
        email: process.env.FROM_EMAIL!,
        name: "Ethos CPAC",
      },
      subject: "📩 Novo contato pelo site",
      html: `
        <h2>Novo contato recebido</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return NextResponse.json(
      { error: "Erro ao enviar contato" },
      { status: 500 }
    );
  }
}
