import React, { useEffect, useState } from "react";
import "../../style/global.css";
import { useNavigate } from "react-router-dom";
import styles from "../../style/SelecionaAvatar.module.css";

export default function SelecionaAvatar() {
  const [urlAvatar, setUrlAvatar] = useState("");
  const rotaAluno = "http://localhost:8080/aluno";
  const rotaImg = "http://localhost:8080/images/avatars";

  const navigate = useNavigate();

  useEffect(() => {
    loadAvatarImage();
  }, [urlAvatar]);

  async function confirmAvatar() {
    try {
      navigate("/LoginAluno");
      navigate(0);
    } catch (error) {
      console.log("SelecionaAvatar.jsx >>>", error);
      return false;
    }
  }

  async function getNextAvatar() {
    return await fetch(`${rotaAluno}/nextAvatar`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Um erro ocorreu");
        }
        console.log("SelecionaAvatar.jsx >>> Recebido next avatar", response);
      })
      .catch((error) => {
        alert("Um erro ocorreu ao tentar recuperar o avatar do aluno.");
        console.log("SelecionaAvatar.jsx >>> ", error);
        throw new error();
      });
    loadAvatarImage();
  }

  async function getPrevAvatar() {
    return await fetch(`${rotaAluno}/prevAvatar`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Um erro ocorreu");
        }
        console.log("SelecionaAvatar.jsx >>> Recebido prev avatar", response);
      })
      .catch((error) => {
        alert("Um erro ocorreu ao tentar recuperar o avatar do aluno.");
        console.log("SelecionaAvatar.jsx >>> ", error);
        throw new error();
      });
    loadAvatarImage();
  }

  async function loadAvatarImage() {
    return await fetch(`${rotaImg}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro no carregamento da imagem");
        return response.blob();
      })
      .then((imagem) => {
        const urlTemp = URL.createObjectURL(imagem);
        setUrlAvatar(urlTemp);
      });
  }

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h1 className={styles.h1}>Selecione o novo avatar</h1>
        <div className={styles.select_avatar}>
          <button className={styles.nav_left} onClick={getPrevAvatar}>
            &lt;
          </button>
          <img className={styles.avatar} src={urlAvatar} />
          <button className={styles.nav_right} onClick={getNextAvatar}>
            &gt;
          </button>
        </div>
        <button className={styles.primary_button} onClick={confirmAvatar}>
          Selecionar
        </button>
      </div>
    </div>
  );
}
