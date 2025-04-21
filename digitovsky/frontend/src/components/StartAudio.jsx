import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "../../style/StartAudio.module.css";
function StartAudio() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      sessionStorage.setItem("playing", "true");
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      sessionStorage.setItem("playing", "false");
      setIsPlaying(false);
    }
  };


  useEffect(() => {
    if (sessionStorage.getItem("playing") === "false") {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (sessionStorage.getItem("muted") === "true") {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  },[])

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
    sessionStorage.setItem("muted", audioRef.current.muted);
  };

  return (
    <div className={styles.content}>
      <div className={styles.audio}>
        <audio ref={audioRef} autoPlay loop>
          <source src="../../assets/musica.opus" type="audio/mpeg" />
          Seu navegador não oferece suporte para audio
        </audio>
        <div className={styles.audioButtons}>
          <button className={styles.playButton} onClick={togglePlay}>
            {isPlaying ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
          <button className={styles.muteButton} onClick={toggleMute}>
            {isMuted ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5.707 4.293a1 1 0 0 0-1.414 1.414l14 14a1 1 0 0 0 1.414-1.414l-.004-.005C21.57 16.498 22 13.938 22 12a9.972 9.972 0 0 0-2.929-7.071 1 1 0 1 0-1.414 1.414A7.972 7.972 0 0 1 20 12c0 1.752-.403 3.636-1.712 4.873l-1.433-1.433C17.616 14.37 18 13.107 18 12c0-1.678-.69-3.197-1.8-4.285a1 1 0 1 0-1.4 1.428A3.985 3.985 0 0 1 16 12c0 .606-.195 1.335-.59 1.996L13 11.586V6.135c0-1.696-1.978-2.622-3.28-1.536L7.698 6.284l-1.99-1.991ZM4 8h.586L13 16.414v1.451c0 1.696-1.978 2.622-3.28 1.536L5.638 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 6.037c0-1.724-1.978-2.665-3.28-1.562L5.638 7.933H4c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
                <path
                  fill-rule="evenodd"
                  d="M14.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 18 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 1-.014-1.437A4.085 4.085 0 0 0 16 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <input
          className={styles.muteInput}
          type="range"
          min="0"
          max="1"
          step="0.1"
          onChange={(e) => (audioRef.current.volume = e.target.value)}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default StartAudio;
