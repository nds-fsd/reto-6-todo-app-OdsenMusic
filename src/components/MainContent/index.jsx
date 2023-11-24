import React from "react";
import Task from "../Task";
import { AnimatePresence, motion } from "framer-motion";
import plusIcon from "../../assets/icons/plus-circle-svgrepo-com.svg";
import moonIcon from "../../assets/icons/moon-svgrepo-com.svg";
import trashIcon from "../../assets/icons/trash-svgrepo-com.svg";

function MainContent({
  toggleEditMode,
  taskFilter,
  taskList,
  forceReload,
  groupList,
  deleteAllTasks,
  newTask,
  handleTheme,
}) {
  return (
    <main>
      <h1 className="viewportGroupName">{taskFilter}</h1>
      <AnimatePresence>
        {taskList
          .filter((task) => taskFilterLogic(task, taskFilter))
          .map((task) => (
            <Task
              key={task.id}
              {...task}
              forceReload={forceReload}
              toggleEditMode={toggleEditMode}
              groupList={groupList}
            />
          ))}

        {renderDeleteAllButton(taskFilter, taskList, deleteAllTasks)}
      </AnimatePresence>

      <button className="add-task" onClick={() => newTask(forceReload)}>
        <img className="add-task" src={plusIcon} alt="Icono de crear tarea" />
      </button>
      <button className="toggleDarkMode" onClick={handleTheme}>
        <img
          className="toggleDarkMode"
          src={moonIcon}
          alt="Icono de crear tarea"
        />
      </button>
    </main>
  );
}

function taskFilterLogic(task, taskFilter) {
  if (taskFilter === "Papelera") return task.deleted;
  return (
    !task.deleted &&
    ((!taskFilter && !task.done) ||
      (taskFilter === "Tareas finalizadas" && task.done) ||
      (taskFilter && task.group && task.group.includes(taskFilter)))
  );
}

function renderDeleteAllButton(taskFilter, taskList, deleteAllTasks) {
  if (taskFilter === "Papelera" && taskList.some((task) => task.deleted)) {
    return (
      <div className="deleteAllContainer">
        <motion.button
          exit={{ opacity: 0, scale: 0.5, translateX: 100 }}
          layout
          onClick={deleteAllTasks}
          className="deleteAll"
        >
          <img
            className="deleteAll"
            src={trashIcon}
            alt="Icono de eliminar todo"
          />
        </motion.button>
      </div>
    );
  }
}

export default MainContent;
