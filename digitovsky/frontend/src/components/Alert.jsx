import React, { useEffect, useState } from "react";
import styles from "../../style/Alert.module.css";

export const Alert = ({ message, setMessage }) => {
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    let timer1, timer2;

    if (message) {
      setOpenAlert(true);

      // Timer para fechar o alerta automaticamente
      timer1 = setTimeout(() => {
        setOpenAlert(false);
      }, 5000);

      // Timer para limpar a mensagem
      timer2 = setTimeout(() => {
        setMessage("");
      }, 5300);
    } else {
      setOpenAlert(false); // Se não houver mensagem, feche o alerta
    }

    // Limpeza dos timers quando o componente desmonta ou a mensagem muda
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [message, setMessage]);

  if (!openAlert) return null; // Não renderiza nada se o alerta não está aberto

  return (
    <div className={`${styles.toast} ${openAlert ? styles.active : ""}`}>
      <div className={styles.toastContent}>
        <div className={styles.simbol}>!</div>
        <div className={styles.message}>
          <span className={`${styles.text} ${styles.text1}`}>
            {message || "Mensagem de fallback"}
          </span>
          <span className={styles.text}>Notificação</span>
        </div>
        <div
          className={styles.close}
          onClick={() => {
            setOpenAlert(false);
            setMessage("");
          }}
        >
          ✖
        </div>
      </div>
      <div
        className={`${styles.progress} ${openAlert ? styles.active : ""}`}
      ></div>
    </div>
  );
};