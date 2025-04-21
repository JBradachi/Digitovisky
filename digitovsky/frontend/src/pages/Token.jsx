import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style/Token.module.css";

export default function Token(props) {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <button className={styles.return} onClick={props.close}>&lt;</button>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1>Digite o iToken</h1>
          <input 
            id="iToken" 
            type="text" 
            onChange={(e) => setToken(e.target.value)} 
            placeholder="iToken" 
          />
          <button
            className={styles.primary_button} 
            onClick={() => props.cadastro(token)}
          >
            VALIDAR
          </button>
        </div>
      </div>
    </div>
  );
}
