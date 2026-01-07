import styles from "./landing.module.scss";

export default function FAQ() {
  return (
    <section className={styles.faq}>
      <h2 className={styles.sectionTitle}>Perguntas frequentes</h2>

      <div className={styles.faqList}>
        <details>
          <summary>O sistema é seguro?</summary>
          <p>
            Sim. Utilizamos controle de acesso, criptografia e boas práticas de
            segurança.
          </p>
        </details>

        <details>
          <summary>Funciona no celular?</summary>
          <p>
            Sim. O sistema é totalmente responsivo e funciona em qualquer
            dispositivo.
          </p>
        </details>

        <details>
          <summary>Recebo certificado?</summary>
          <p>
            Sim. Após concluir o curso, você recebe certificado de conclusão.
          </p>
        </details>

        <details>
          <summary>Psicanálise é reconhecida?</summary>
          <p>
            A Psicanálise é uma prática amparada por leis de cursos livres no
            Brasil.
          </p>
        </details>
      </div>
    </section>
  );
}
