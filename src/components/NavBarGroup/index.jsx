import React, { memo } from "react";
import { motion } from "framer-motion";
import style from "../NavBarGroup/styles.module.css";
import colorIcon from "../../assets/icons/color-swatch-svgrepo-com.svg";
import crossIcon from "../../assets/icons/cross-circle-svgrepo-com.svg";
import {
  changeGroupName,
  changeGroupColor,
  deleteGroup,
} from "../../utils/apifunctions";

const NavBarGroup = ({
  id,
  name,
  color,
  forceReload,
  filterTasks,
  setTaskFilter,
  count,
}) => {
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
      <button
        className={style.deleteGroupButton}
        onClick={() => {
          deleteGroup(id, forceReload, setTaskFilter);
        }}
      >
        <img className={style.deleteGroupImg} src={crossIcon} alt="" />
      </button>
      <button
        onClick={() => changeGroupColor(id, color, forceReload)}
        className={style.personalizeColor}
      >
        <img className={style.personalizeColor} src={colorIcon} alt="" />
      </button>
      <textarea
        className={style.groupName}
        defaultValue={name}
        onBlur={() => changeGroupName(id, event, forceReload, setTaskFilter)}
        placeholder="Grupo"
        maxLength="13"
      >
        {}
      </textarea>
      <p className={style.counter}>{count}</p>
    </motion.div>
  );
};

export default NavBarGroup;
