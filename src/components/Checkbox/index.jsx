import React, { memo } from "react";
import styles from "./styles.module.css";
import doneSFX from "../../assets/sounds/doneSFX.mp3";
import { changeTaskAttribute } from "../../utils/apifunctions";

const Checkbox = memo(({ id, done, forceReload }) => {
  const audioSfx = new Audio(doneSFX); //Añade efecto de sonido
  audioSfx.volume = 0.1;

  const handleCheckbox = async () => {
    const payload = { done: !done };
    changeTaskAttribute(id, payload, forceReload);
    if (!done) audioSfx.play();
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
});

export default Checkbox;
