import styles from "./landing.module.scss";

export default function Highlights() {
  return (
    <section className={styles.highlights}>
      <div className={styles.grid}>
        <Card title="Administração" color="yellow">
          Controle total de turmas, séries, professores e alunos.
        </Card>

        <Card title="Professores" color="purple">
          Lançamento de notas, presença e acompanhamento pedagógico.
        </Card>

        <Card title="Responsáveis">
          Acesso a comunicados, desempenho e calendário escolar.
        </Card>
      </div>
    </section>
  );
}

function Card({
  title,
  children,
  color,
}: {
  title: string;
  children: React.ReactNode;
  color?: "yellow" | "purple";
}) {
  return (
    <div
      className={`${styles.card} ${
        color === "yellow"
          ? styles.yellow
          : color === "purple"
          ? styles.purple
          : ""
      }`}
    >
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
