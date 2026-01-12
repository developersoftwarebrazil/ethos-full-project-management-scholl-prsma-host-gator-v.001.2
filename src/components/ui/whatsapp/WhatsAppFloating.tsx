"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import styles from "./WhatsappFloating.module.scss";

const WHATSAPP_NUMBER = "5519992871931";
const MESSAGE = "Olá! Gostaria de mais informações sobre a Ethos Escola.";

function isBusinessHours() {
  const hour = new Date().getHours();
  return hour >= 8 && hour <= 18;
}

export default function WhatsAppFloating() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(isBusinessHours());

    const onScroll = () => {
      setVisible(window.scrollY > 180);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** 🧲 Magnet Effect */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    buttonRef.current.style.transform = `translate(${x * 0.15}px, ${
      y * 0.15
    }px) scale(1.05)`;
  };

  const resetPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0,0) scale(1)";
    }
  };

  if (!visible) return null;

  return (
    <a
      ref={buttonRef}
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        MESSAGE
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.whatsapp} ${styles.pulse}`}
      aria-label="Falar no WhatsApp"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
    >
      {/* Ícone WhatsApp */}
      <MessageCircle size={28} />

      {/* Ícone Telefone (overlay) */}
      <span className={styles.phoneIcon}>
        <Phone size={14} />
      </span>

      {/* Tooltip */}
      <span className={styles.tooltip}>
        {online ? "Atendimento online" : "Fale conosco"}
      </span>

      {/* Status */}
      {online && <span className={styles.status} />}
    </a>
  );
}
