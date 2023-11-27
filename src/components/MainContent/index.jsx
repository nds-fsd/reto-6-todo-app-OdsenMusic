import React, { memo } from "react";
import Task from "../Task";
import { AnimatePresence, motion } from "framer-motion";
import plusIcon from "../../assets/icons/plus-circle-svgrepo-com.svg";
import moonIcon from "../../assets/icons/moon-svgrepo-com.svg";
import trashIcon from "../../assets/icons/trash-svgrepo-com.svg";
import { newTask } from "../../utils/apifunctions";
import styles from "../MainContent/styles.module.css";

const MainContent = memo(
  ({
    taskFilter,
    taskList,
    forceReload,
    groupList,
    deleteAllTasks,
    handleTheme,
  }) => {
    return (
      <main className={styles.mainContent}>
        {<h1 className={styles.viewportGroupName}>{taskFilter}</h1>}
        <AnimatePresence>
          {taskList
            .filter((task) => taskFilterLogic(task, taskFilter))
            .map((task) => (
              <Task
                key={task.id}
                {...task}
                forceReload={forceReload}
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

        <button className={styles.toggleDarkMode} onClick={handleTheme}>
          <img
            className={styles.toggleDarkMode}
            src={moonIcon}
            alt="Icono de crear tarea"
          />
        </button>
      </main>
    );
  }
);

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
      <div className={styles.deleteAllContainer}>
        <motion.button
          initial={{ opacity: 0, scale: 0.5, translateX: 100 }}
          animate={{ opacity: 1, scale: 1, translateX: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.3,
            ease: [0.24, 0.46, 0.42, 1],
          }}
          exit={{ opacity: 0, scale: 0.5, translateX: 100 }}
          layout
          onClick={deleteAllTasks}
          className={styles.deleteAll}
        >
          <img
            className={styles.deleteAll}
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
        className={styles.addTask}
        onClick={() => handleCreateTask(taskFilter, groupList, forceReload)}
      >
        <img
          className={styles.addTask}
          src={plusIcon}
          alt="Icono de crear tarea"
        />
      </button>
    );
  }
}

function handleCreateTask(taskFilter, groupList, forceReload) {
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
