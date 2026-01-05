import styles from "./landing.module.scss";

export default function FAQ() {
  return (
    <section className={styles.faq}>
      <h2 className={styles.sectionTitle}>Perguntas frequentes</h2>

      <div className={styles.faqItem}>
        <strong>O sistema é seguro?</strong>
        <p>Sim. Utilizamos controle de acesso e boas práticas de segurança.</p>
      </div>

      <div className={styles.faqItem}>
        <strong>Funciona em celular?</strong>
        <p>Sim, o sistema é totalmente responsivo.</p>
      </div>
    </section>
  );
}
