import React from "react";
import styles from "./styles.module.css";
import doneSFX from "../../assets/sounds/doneSFX.wav";

export default function Checkbox({ id, done, forceReload }) {
  const audioSfx = new Audio(doneSFX);
  audioSfx.volume = 0.3;

  const handleCheckbox = async () => {
    const payload = { done: !done };

    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        forceReload();
        if (!done) audioSfx.play();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <label className={styles.taskCheckbox}>
      <input
        type="checkbox"
        checked={done}
        onChange={handleCheckbox}
        className={styles.taskCheckbox}
      />
      <span className={styles.taskCheckbox}></span>
    </label>
  );
}
