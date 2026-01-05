import styles from "./landing.module.scss";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.sectionTitle}>O que é o ETHOS?</h2>
      <p className={styles.sectionText}>
        O ETHOS School Management é uma plataforma desenvolvida para simplificar
        a gestão escolar, melhorar a comunicação e aumentar a eficiência
        pedagógica e administrativa.
      </p>
    </section>
  );
}
