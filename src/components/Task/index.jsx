import React, { useState, useEffect, useRef, memo } from "react";
import Checkbox from "../Checkbox";
import ColorSelector from "../ColorSelector";
import TaskMenu from "../TaskMenu";
import GroupSelector from "../GroupSelector";
import style from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { changeTaskAttribute } from "../../utils/apifunctions";

const Task = memo(
  ({ id, text, color, done, deleted, group, forceReload, groupList }) => {
    const [colorSelectorVisibility, setColorSelectorVisibility] =
      useState(false);
    const [groupSelectorVisibility, setGrupSelectorVisibility] =
      useState(false);

    let groupSelectorRef = useRef();
    let colorSelectorRef = useRef();

    useEffect(() => {
      let handler = (e) => {
        if (!groupSelectorRef.current.contains(e.target)) {
          setGrupSelectorVisibility(false);
        }
      };
      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    });

    useEffect(() => {
      let handler = (e) => {
        if (!colorSelectorRef.current.contains(e.target)) {
          setColorSelectorVisibility(false);
        }
      };
      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    });

    const handleTextChange = (event) =>
      changeTaskAttribute(id, { text: event.target.value }, forceReload);
    const handleColorSelectorVisibility = () => {
      setColorSelectorVisibility(!colorSelectorVisibility);
    };

    const handleGroupSelectorVisibility = () => {
      setGrupSelectorVisibility(!groupSelectorVisibility);
    };
    let completed = "";

    if (done) {
      completed = style.completed;
    } else {
      completed = "";
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5, translateX: 100 }}
        animate={{ opacity: 1, scale: 1, translateX: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.3,
          ease: [0.24, 0.46, 0.42, 1],
        }}
        exit={{ opacity: 0, scale: 0.5, translateX: 100 }}
        layout
        className={style.taskWrapper}
      >
        <AnimatePresence>
          {colorSelectorVisibility && (
            <ColorSelector
              key={`${id} colorSelector`}
              id={id}
              forceReload={forceReload}
              changeTaskAttribute={changeTaskAttribute}
              colorSelectorRef={colorSelectorRef}
            />
          )}
          {groupSelectorVisibility && (
            <GroupSelector
              key={`${id} groupSelector`}
              id={id}
              group={group}
              groupList={groupList}
              forceReload={forceReload}
              changeTaskAttribute={changeTaskAttribute}
              groupSelectorRef={groupSelectorRef}
            />
          )}
        </AnimatePresence>
        <article className={`${style[color]} ${completed}`}>
          <textarea
            defaultValue={text}
            onBlur={handleTextChange}
            className={style.taskText}
            maxLength={47}
          />
          <TaskMenu
            id={id}
            forceReload={forceReload}
            groupList={groupList}
            group={group}
            deleted={deleted}
            changeTaskAttribute={changeTaskAttribute}
            handleColorSelectorVisibility={handleColorSelectorVisibility}
            handleGroupSelectorVisibility={handleGroupSelectorVisibility}
          />
        </article>
        {!deleted && <Checkbox id={id} done={done} forceReload={forceReload} />}
      </motion.div>
    );
  }
);

export default Task;
