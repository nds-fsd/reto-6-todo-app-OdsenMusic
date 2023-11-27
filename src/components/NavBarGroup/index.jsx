import React, { memo } from "react";
import { motion } from "framer-motion";
import styles from "../NavBarGroup/styles.module.css";
import colorIcon from "../../assets/icons/color-swatch-svgrepo-com.svg";
import crossIcon from "../../assets/icons/cross-circle-svgrepo-com.svg";
import {
  changeGroupName,
  changeGroupColor,
  deleteGroup,
} from "../../utils/apifunctions";

const NavBarGroup = memo(
  ({ id, name, color, forceReload, filterTasks, setTaskFilter, count }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5, translateY: 50 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
        exit={{ opacity: 0, scale: 0.5, translateY: 25 }}
        layout
        className={`${styles.groupFrame} ${styles[color]}`}
        onClick={() => filterTasks(name)}
      >
        <button
          className={styles.deleteGroupButton}
          onClick={() => {
            deleteGroup(id, forceReload, setTaskFilter);
          }}
        >
          <img className={styles.deleteGroupImg} src={crossIcon} alt="" />
        </button>
        <button
          onClick={() => changeGroupColor(id, color, forceReload)}
          className={styles.personalizeColor}
        >
          <img className={styles.personalizeColor} src={colorIcon} alt="" />
        </button>
        <textarea
          className={styles.groupName}
          defaultValue={name}
          onBlur={() => changeGroupName(id, event, forceReload, setTaskFilter)}
          placeholder="Grupo"
          maxLength="13"
        >
          {}
        </textarea>
        <p className={styles.counter}>{count}</p>
      </motion.div>
    );
  }
);

export default NavBarGroup;
