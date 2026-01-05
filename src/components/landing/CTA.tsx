import Link from "next/link";
import styles from "./landing.module.scss";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <h2>Pronto para transformar sua escola?</h2>

      <Link href="/auth/login" className={styles.primary}>
        Entrar no sistema
      </Link>
    </section>
  );
}
