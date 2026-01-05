import styles from "./landing.module.scss";

export default function Benefits() {
  return (
    <section className={styles.benefits}>
      <h2 className={styles.sectionTitle}>Por que usar o ETHOS?</h2>

      <ul className={styles.benefitList}>
        <li>✔ Interface moderna e intuitiva</li>
        <li>✔ Centralização de informações</li>
        <li>✔ Segurança e controle de acesso</li>
        <li>✔ Comunicação eficiente</li>
      </ul>
    </section>
  );
}
