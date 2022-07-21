import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export function SignInButton() {
  const session = true;

  return session ? (
    <button type="button" className={styles.signInButton} onClick={() => {}}>
      <img
        src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-9.jpg"
        alt=""
      />
      Olá Alexandre
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => {}}>
      <FaGithub color="#FFB800" />
      Entrar com github
    </button>
  );
}
