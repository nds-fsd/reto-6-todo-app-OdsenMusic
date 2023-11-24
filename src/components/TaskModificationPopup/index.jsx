import React from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

export default function TaskModificationPopup({ toggleEditMode, text }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      exit={{ opacity: 0 }}
      onClick={toggleEditMode}
      className={styles.taskPopupContainer}
    >
      <article onClick={null} className={styles.taskPopup}>
        <textarea
          className={styles.taskText}
          autoFocus
          defaultValue={text}
        ></textarea>
      </article>
    </motion.div>
  );
}
