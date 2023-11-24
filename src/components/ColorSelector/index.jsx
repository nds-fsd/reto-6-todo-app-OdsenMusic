import React from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

function ColorSelector({ changeTaskAttribute }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateY: -50 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      exit={{ opacity: 0, scale: 0.5, translateY: -50 }}
      className={`${styles.colorSelectorContainer} ${styles.taskColorSelector}`}
    >
      <button
        onClick={() => changeTaskAttribute({ color: "white" })}
        className={`${styles.color} ${styles.white}`}
      ></button>
      <button
        onClick={() => changeTaskAttribute({ color: "green" })}
        className={`${styles.color} ${styles.green}`}
      ></button>
      <button
        onClick={() => changeTaskAttribute({ color: "yellow" })}
        className={`${styles.color} ${styles.yellow}`}
      ></button>
      <button
        onClick={() => changeTaskAttribute({ color: "blue" })}
        className={`${styles.color} ${styles.blue}`}
      ></button>
      <button
        onClick={() => changeTaskAttribute({ color: "orange" })}
        className={`${styles.color} ${styles.orange}`}
      ></button>
      <button
        onClick={() => changeTaskAttribute({ color: "purple" })}
        className={`${styles.color} ${styles.purple}`}
      ></button>
    </motion.div>
  );
}

export default ColorSelector;
