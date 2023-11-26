import React, { forwardRef, memo } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

const ColorSelector = memo(
  // memo para mejorar el rendimiento
  forwardRef(({ id, changeTaskAttribute, forceReload }, ref) => {
    const createColorButton = (color) => (
      <button
        onClick={() => changeTaskAttribute(id, { color }, forceReload)}
        className={`${styles.color} ${styles[color]}`}
      ></button>
    );

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.5, translateY: -50 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
        exit={{ opacity: 0, scale: 0.5, translateY: -50 }}
        className={`${styles.colorSelectorContainer} ${styles.taskColorSelector}`}
      >
        {createColorButton("white")}
        {createColorButton("green")}
        {createColorButton("yellow")}
        {createColorButton("blue")}
        {createColorButton("orange")}
        {createColorButton("purple")}
      </motion.div>
    );
  })
);

export default ColorSelector;
