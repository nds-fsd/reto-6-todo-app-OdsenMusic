import React from "react";
import styles from "./styles.module.css";

export default function Checkbox({ id, done, forceReload }) {
  const changeCheckbox = async () => {
    let payload = {
      done: !done,
    };
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        forceReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <label className={styles.taskCheckbox}>
      <input
        className={styles.taskCheckbox}
        onChange={changeCheckbox}
        checked={done}
        type="checkbox"
      />
      <span className={styles.taskCheckbox}></span>
    </label>
  );
}
