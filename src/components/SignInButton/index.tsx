import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#dc2626"/>
      Vagner Nascimento
      <FiX color="#121214" className={styles.closeIcon}/>
    </button>

  ) : (
    <button
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#121214"/>
      Sing in with GitHub
    </button>

  );
}