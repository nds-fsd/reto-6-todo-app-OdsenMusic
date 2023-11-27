import React, { memo } from "react";
import { deleteTask } from "../../utils/apifunctions";
import styles from "./styles.module.css";
import recoverIcon from "../../assets/icons/reply-svgrepo-com.svg";
import brushIcon from "../../assets/icons/brush-svgrepo-com.svg";
import groupIcon from "../../assets/icons/tag-2-svgrepo-com.svg";
import trashIcon from "../../assets/icons/trash-svgrepo-com.svg";

const TaskMenu = memo(
  ({
    key,
    id,
    forceReload,
    handleColorSelectorVisibility,
    handleGroupSelectorVisibility,
    changeTaskAttribute,
    deleted,
  }) => {
    // Toggle  para enviar o recuperar tareas en la papelera
    const toggleDeleted = async (deleted) => {
      changeTaskAttribute(id, { deleted: !deleted }, forceReload);
    };

    const handleDelete = () => {
      if (deleted) {
        deleteTask(id, forceReload);
      } else {
        toggleDeleted();
      }
    };

    if (!deleted) {
      return (
        <div className={styles.taskMenuContainer}>
          <button
            className="taskBarMenuButton"
            key={key}
            onClick={handleDelete}
          >
            <img className={styles.icon} src={trashIcon} alt="" />
          </button>

          <button
            onClick={handleGroupSelectorVisibility}
            className="taskBarMenuButton"
          >
            <img className={styles.icon} src={groupIcon} alt="" />
          </button>

          <button
            onClick={handleColorSelectorVisibility}
            className="taskBarMenuButton"
          >
            <img className={styles.icon} src={brushIcon} alt="" />
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.taskMenuContainer}>
          <button onClick={toggleDeleted} className="taskBarMenuButton">
            <img
              className={styles.icon}
              src={recoverIcon}
              alt="Icono de recuperación"
            />
          </button>
          <button
            className="taskBarMenuButton"
            key={key}
            onClick={handleDelete}
          >
            <img
              className={styles.icon}
              src="src/assets/icons/trash-svgrepo-com.svg"
              alt="Icono de papelera"
            />
          </button>
        </div>
      );
    }
  }
);

export default TaskMenu;
