import React, { memo } from "react";
import styles from "../NavBarMenuCard/styles.module.css";

const NavBarMenuCard = memo(({ icon, text, filterTasks, alt, count }) => {
  //Función que permite cambiar el filtro al hacer click en los menús
  function clickHandler(text) {
    switch (text) {
      case "Tareas":
        filterTasks("");
        break;
      case "Tareas finalizadas":
        filterTasks("Tareas finalizadas");
        break;
      case "Papelera":
        filterTasks("Papelera");
        break;
    }
  }

  return (
    <section
      className={styles.menuCard}
      onClick={() => {
        clickHandler(text);
      }}
    >
      <img src={icon} alt={alt} />
      {text} <p className={styles.counter}>{count}</p>
    </section>
  );
});

export default NavBarMenuCard;
