import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent"; // Importar el nuevo componente
import { getData, newTask, deleteTask } from "./utils/apifunctions.js";
import "./index.css";

const App = () => {
  // State declarations
  const [taskList, setTaskList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [background, setBackground] = useState("");
  const [taskFilter, setTaskFilter] = useState("");
  const [reload, setReload] = useState(false);
  const [theme, setTheme] = useState("");

  // Effect to fetch data
  useEffect(() => {
    getData("todo", setTaskList);
    getData("groups", setGroupList);
  }, [reload]);

  // Effect for setting background based on taskFilter
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

  // Handler functions
  const toggleEditMode = () => setEditMode(!editMode);
  const forceReload = () => setReload(!reload);
  const filterTasks = (filter) => setTaskFilter(filter);
  const handleTheme = () =>
    theme === "darkMode" ? setTheme("") : setTheme("darkMode");
  const deleteAllTasks = async () => {
    const tasksToDelete = taskList.filter((task) => task.deleted);
    tasksToDelete.forEach((task) => deleteTask(task.id, forceReload));
  };

  // Main JSX
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
        toggleEditMode={toggleEditMode}
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
