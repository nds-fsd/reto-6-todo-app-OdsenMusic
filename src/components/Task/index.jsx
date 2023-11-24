import React, { useState, useEffect } from "react";
import Checkbox from "../Checkbox";
import ColorSelector from "../ColorSelector";
import TaskMenu from "../TaskMenu";
import GroupSelector from "../GroupSelector";
import style from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Task({
  id,
  text,
  color,
  done,
  deleted,
  group,
  forceReload,
  toggleEditMode,
  groupList,
}) {
  const [colorSelectorVisibility, setColorSelectorVisibility] = useState(false);
  const [groupSelectorVisibility, setGrupSelectorVisibility] = useState(false);
  const url = `http://localhost:3000/todo/${id}`;
  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (groupSelectorVisibility) {
      const timer = setTimeout(() => {
        setGrupSelectorVisibility(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [groupSelectorVisibility]);

  useEffect(() => {
    if (colorSelectorVisibility) {
      const timer = setTimeout(() => {
        setColorSelectorVisibility(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [colorSelectorVisibility]);

  const changeTaskAttribute = async (payload) => {
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

  const handleTextChange = (event) =>
    changeTaskAttribute({ text: event.target.value });
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
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
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
          toggleEditMode={toggleEditMode}
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
