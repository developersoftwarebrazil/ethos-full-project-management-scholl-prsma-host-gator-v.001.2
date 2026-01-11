import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={`${styles.title} uppercase`}>
          ETHOS CPAC
          <span>Formação em Cursos EAD</span>
        </h1>

        <div className={styles.heroGrid}>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>
              Formação sólida em nossos cursos, com ensino EAD acessível,
              flexível e comprometido com a prática clínica.
            </p>

            <p className={styles.description}>
              A <span>Ethos CPAC</span> oferece formação baseada na teoria
              psicanalítica de matriz Freudiana, com foco na autorização do
              aluno para o exercício da Psicanálise e Análises Clínicas.
            </p>

            <p className={styles.description}>
              São <span>12 meses</span> de formação com módulos que envolvem
              teoria, discussão de casos, o <span>Tripé Analítico</span>
              (teoria, análise pessoal e supervisão) e estágio probatório.
            </p>

            <div className={styles.actions}>
              <Link href="/login" className={styles.primary}>
                Entrar na plataforma
              </Link>
              <a href="#about" className={styles.secondary}>
                Saiba mais sobre o curso
              </a>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImage}>
              <div className={styles.heroCaption}>
                <strong>Dr. Wagner Ferreira de Toledo</strong>
                <span>Diretor Acadêmico e Fundador · ETHOS CPAC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
