import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { FormEvent, useCallback, useState } from "react";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from "react-icons/fi";
import { SupportButton } from "../../components/SupportButton";
import styles from "./styles.module.scss";
import firebase from "../../services/firebaseConnection";

interface BoardProps {
  user: {
    id: string;
    nome: string;
  };
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState("");

  const handleAddTask = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (input === "") {
        alert("Preencha alguma tarefa!");
        return;
      }
      await firebase
        .firestore()
        .collection("tarefas")
        .add({
          created: new Date(),
          tarefa: input,
          userId: user.id,
          nome: user.nome,
        })
        .then((doc) => {
          console.log("Cadastrado com sucesso!");
        })
        .catch((err) => {
          console.log("ERRO ao cadastrar: ", err);
        });
    },
    [input, user.id, user.nome]
  );

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Digite sua tarefa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>
        <h1>Você tem 2 tarefas!</h1>

        <section>
          <article className={styles.taskList}>
            <p>Teste</p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#ffb800" />
                  <time>17 de julho 2022</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#fff" />
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <FiTrash size={20} color="#ff3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>
      </main>
      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto.</h3>
        <div>
          <FiClock size={28} color="#fff" />
          <time>Última doação foi a 3 dias</time>
        </div>
      </div>
      <SupportButton />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
  };

  return {
    props: { user },
  };
};
