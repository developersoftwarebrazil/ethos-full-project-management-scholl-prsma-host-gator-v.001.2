import Image from "next/image";
import Link from "next/link";
import styles from "./landing.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/logo-ETHOS.png"
            alt="ETHOS CPAC"
            width={36}
            height={36}
          />
          <span>ETHOS CPAC</span>
        </div>

        <Link href="/auth/login" className={styles.login}>
          Entrar
        </Link>
      </header>

      <div className={styles.heroContent} >
        <h1 className={styles.title + " uppercase"} >Ethos Cursos Integrados CPAC</h1>

        <p className={styles.subtitle}>
          Acreditamos que o conhecimento transforma vidas. Somos uma escola que
          ministra cursos a distância em Psicanálise e afins (EAD), projetados
          para oferecer ensino de qualidade, flexível e acessível para pessoas
          em qualquer lugar do mundo.
        </p>

        <p  className={styles.subtitle}>
          A Ethos CPAC contempla em seu escopo a base teórica de matriz
          Freudiana com propósito único autorizar o alunato ao exercício da
          Psicanálise e Análises Clínicas. São 12 (meses) módulos envolvendo:
          Teoria, Discussão de Caso, Tripé Analítico (teoria, análise pessoal e
          supervisão) e Estágio probatório!
        </p>
        <div className={styles.actions}>
          <Link href="/auth/login" className={styles.primary}>
            Acessar sistema
          </Link>
          <a href="#about" className={styles.secondary}>
            Conhecer recursos
          </a>
        </div>
      </div>
    </section>
  );
}
