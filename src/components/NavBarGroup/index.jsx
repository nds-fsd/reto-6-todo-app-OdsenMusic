import React from "react";
import { motion } from "framer-motion";
import style from "../NavBarGroup/styles.module.css";
import colorIcon from "../../assets/icons/color-swatch-svgrepo-com.svg";
import crossIcon from "../../assets/icons/cross-circle-svgrepo-com.svg";

export default function NavBarGroup({
  id,
  name,
  color,
  forceReload,
  filterTasks,
  count,
}) {
  const url = `http://localhost:3000/groups/${id}`;
  const headers = {
    "Content-Type": "application/json",
  };

  const updateGroup = async (payload) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        forceReload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeGroupName = (event) => {
    if (event.target.value === "") {
      return;
    } else {
      updateGroup({ name: event.target.value });
    }
  };

  const changeGroupColor = () => {
    const colors = ["white", "green", "yellow", "blue", "orange", "purple"];
    const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
    updateGroup({ color: nextColor });
  };

  const deleteGroup = async () => {
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (response.ok) {
        forceReload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateY: 50 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      exit={{ opacity: 0, scale: 0.5, translateY: 25 }}
      layout
      className={`${style.groupFrame} ${style[color]}`}
      onClick={() => filterTasks(name)}
    >
      <button className={style.deleteGroupButton} onClick={deleteGroup}>
        <img className={style.deleteGroupImg} src={crossIcon} alt="" />
      </button>
      <button onClick={changeGroupColor} className={style.personalizeColor}>
        <img className={style.personalizeColor} src={colorIcon} alt="" />
      </button>
      <textarea
        className={style.groupName}
        defaultValue={name}
        onBlur={changeGroupName}
        placeholder="Nuevo grupo"
        maxLength="13"
      >
        {}
      </textarea>
      <p className={style.counter}>{count}</p>
    </motion.div>
  );
}
