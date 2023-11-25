import React, { memo } from "react";
const NavBarMenuCard = memo(({ icon, text, filterTasks, alt, count }) => {
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
      onClick={() => {
        clickHandler(text);
      }}
    >
      <img src={icon} alt={alt} />
      {text} <p className="counter">{count}</p>
    </section>
  );
});

export default NavBarMenuCard;
