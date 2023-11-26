import React, { memo } from "react";
import { deleteTask } from "../../utils/apifunctions";
import style from "./styles.module.css";
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
        <div className={style.taskMenuContainer}>
          <button
            className="taskBarMenuButton"
            key={key}
            onClick={handleDelete}
          >
            <img className={style.icon} src={trashIcon} alt="" />
          </button>

          <button
            onClick={handleGroupSelectorVisibility}
            className="taskBarMenuButton"
          >
            <img className={style.icon} src={groupIcon} alt="" />
          </button>

          <button
            onClick={handleColorSelectorVisibility}
            className="taskBarMenuButton"
          >
            <img className={style.icon} src={brushIcon} alt="" />
          </button>
        </div>
      );
    } else {
      return (
        <div className={style.taskMenuContainer}>
          <button onClick={toggleDeleted} className="taskBarMenuButton">
            <img className={style.icon} src={recoverIcon} alt="" />
          </button>
          <button
            className="taskBarMenuButton"
            key={key}
            onClick={handleDelete}
          >
            <img
              className={style.icon}
              src="src/assets/icons/trash-svgrepo-com.svg"
              alt=""
            />
          </button>
        </div>
      );
    }
  }
);

export default TaskMenu;
