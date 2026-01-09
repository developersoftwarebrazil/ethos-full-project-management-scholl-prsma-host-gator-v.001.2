import styles from "./landing.module.scss";

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <span className={styles.aboutBadge}>Sobre a plataforma</span>

        <h2 className={styles.aboutTitle}>
          O que é o <span>ETHOS</span>?
        </h2>

        <p className={styles.aboutText}>
          O <strong>ETHOS School Management</strong> é uma plataforma educacional
          desenvolvida para <span>centralizar, organizar e modernizar</span> a
          gestão de instituições de ensino, unindo tecnologia, pedagogia e
          acessibilidade em um único ambiente.
        </p>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutCard}>
            <h3>Gestão Inteligente</h3>
            <p>
              Controle acadêmico, administrativo e pedagógico em uma única
              plataforma, com dados organizados e seguros.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <h3>Comunicação Clara</h3>
            <p>
              Facilite a comunicação entre alunos, professores e coordenação
              com fluxos simples e eficientes.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <h3>Ensino Acessível</h3>
            <p>
              Projetado para EAD, o ETHOS garante acesso aos conteúdos de
              qualquer lugar, com flexibilidade e qualidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
