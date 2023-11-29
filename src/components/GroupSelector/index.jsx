import { forwardRef, memo } from "react";
import styles from "../GroupSelector/styles.module.css";
import { motion } from "framer-motion";

const GroupSelector = memo(
  forwardRef(
    ({ groupList, group, changeTaskAttribute, id, forceReload }, ref) => {
      const getButtonStyle = (groupName) => {
        //el grupo seleccionado se vuelve verde
        return group === groupName ? styles.assignedGroup : "";
      };

      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.5, translateY: -50 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
          exit={{ opacity: 0, scale: 0.5, translateY: -50 }}
          className={styles.groupSelectorContainer}
        >
          <button
            value="none"
            className={`${styles.groupSelectorButton} ${getButtonStyle(
              "none"
            )}`}
            onClick={() => {
              changeTaskAttribute(id, { group: "none" }, forceReload);
            }}
          >
            Ninguno
          </button>
          {groupList.map((e) => (
            <button
              key={e.name}
              onClick={() => {
                changeTaskAttribute(id, { group: e.name }, forceReload);
              }}
              className={`${styles.groupSelectorButton} ${getButtonStyle(
                e.name
              )}`}
              value={e.name}
            >
              {e.name}
            </button>
          ))}
        </motion.div>
      );
    }
  )
);

export default GroupSelector;
