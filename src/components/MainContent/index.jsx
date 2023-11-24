import React from "react";
import Task from "../Task";
import { AnimatePresence, motion } from "framer-motion";
import plusIcon from "../../assets/icons/plus-circle-svgrepo-com.svg";
import moonIcon from "../../assets/icons/moon-svgrepo-com.svg";
import trashIcon from "../../assets/icons/trash-svgrepo-com.svg";
import { newTask } from "../../utils/apifunctions";

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
      {<h1 className="viewportGroupName">{taskFilter}</h1>}
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
        {renderAddTaskButton(
          taskFilter,
          handleCreateTask,
          groupList,
          forceReload
        )}
      </AnimatePresence>

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

function renderDeleteAllButton(
  taskFilter,
  taskList,
  deleteAllTasks,
  handleCreateTask
) {
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

function renderAddTaskButton(
  taskFilter,
  handleCreateTask,
  groupList,
  forceReload
) {
  if (taskFilter !== "Papelera" && taskFilter !== "Tareas finalizadas") {
    return (
      <button
        className="add-task"
        onClick={() => handleCreateTask(taskFilter, groupList, forceReload)}
      >
        <img className="add-task" src={plusIcon} alt="Icono de crear tarea" />
      </button>
    );
  }
}

function handleCreateTask(taskFilter, groupList, forceReload) {
  console.log("elfiltro" + taskFilter);
  if (
    taskFilter === "Papelera" ||
    taskFilter === "" ||
    taskFilter === "Tareas finalizadas"
  ) {
    newTask(forceReload, "white", "none");
  } else {
    const newTaskColor = groupList.find(
      (e) => e.name.toString() === taskFilter
    ).color;

    newTask(forceReload, newTaskColor, taskFilter);
  }
}

export default MainContent;
