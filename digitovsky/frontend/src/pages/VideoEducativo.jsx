import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video from "../../assets/VideoEducativo.mp4"
import styles from "../../style/VideoEdutativo.module.css";


export default function VideoEdutativo () {

  const navigate = useNavigate()
  useEffect(() => {
    null
  },[])

  function SkipVideo() {
    navigate("/Jogar")
  }

  function returnPage() {
    navigate("/LoginAluno");
  }

  return (

    <div className={styles.content}>
      <button className={styles.return} onClick={returnPage}>
        &lt;
      </button>
     <h1 className={styles.titulo}>
        Aprenda a Jogar!
      </h1>
      <video controls className={styles.video}>
        <source src={video} type="video/mp4"/>
      </video>

      <button onClick={SkipVideo} className={styles.primary_button}>
        Continuar
      </button>
    </div>

  )
}
