import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent";
import { getData, newTask, deleteTask } from "./utils/apifunctions.js";
import "./index.css";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [background, setBackground] = useState("");
  const [taskFilter, setTaskFilter] = useState("");
  const [reload, setReload] = useState(false);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    getData("todo", setTaskList);
    getData("groups", setGroupList);
  }, [reload]);

  useEffect(() => {
    switch (taskFilter) {
      case "Papelera":
        setBackground("red");
        break;
      case "Tareas finalizadas":
        setBackground("green");
        break;
      case "":
        setBackground("");
        break;
      default:
        const foundGroup = groupList.find(
          (group) => group.name.toString() === taskFilter
        );
        setBackground(foundGroup ? foundGroup.color : "");
        break;
    }
  }, [taskFilter, groupList]);

  const forceReload = () => setReload(!reload);
  const filterTasks = (filter) => setTaskFilter(filter);
  const handleTheme = () =>
    theme === "darkMode" ? setTheme("") : setTheme("darkMode");
  const deleteAllTasks = () => {
    const tasksToDelete = taskList.filter((task) => task.deleted);
    tasksToDelete.forEach((task) => deleteTask(task.id, forceReload));
  };

  return (
    <div className={`viewport ${background} ${theme}`}>
      <NavBar
        filterTasks={filterTasks}
        groupList={groupList}
        taskList={taskList}
        setGroupList={setGroupList}
        forceReload={forceReload}
      />
      <MainContent
        taskFilter={taskFilter}
        taskList={taskList}
        forceReload={forceReload}
        groupList={groupList}
        deleteAllTasks={deleteAllTasks}
        newTask={newTask}
        handleTheme={handleTheme}
      />
    </div>
  );
};

export default App;
