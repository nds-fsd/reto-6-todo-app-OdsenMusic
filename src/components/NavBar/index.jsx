import NavBarGroup from "../NavBarGroup";
import NavBarMenuCard from "../NavBarMenuCard";
import Logo from "../Logo";
import style from "../NavBar/styles.module.css";
import { AnimatePresence } from "framer-motion";
import plusIcon from "/icons/plus-circle-svgrepo-com.svg";
import checkIcon from "/icons/checkmark-circle-svgrepo-com (1).svg";
import trashIcon from "/icons/trash-svgrepo-com.svg";
import taskIcon from "/icons/clipboard-svgrepo-com (1).svg";

export default function NavBar({
  filterTasks,
  forceReload,
  groupList,
  setGroupList,
  taskList,
}) {
  const addNewGroup = async () => {
    try {
      const response = await fetch("http://localhost:3000/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setGroupList((prev) => {
          return [...prev, json];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const taskCounter = () => {
    return taskList.filter((e) => e.done).length;
  };

  return (
    <nav className={style}>
      <Logo />
      <ul>
        <NavBarMenuCard
          filterTasks={filterTasks}
          text="Tareas"
          icon={taskIcon}
          count={taskList.filter((e) => !e.done).length}
        />
        <NavBarMenuCard
          filterTasks={filterTasks}
          text="Tareas finalizadas"
          icon={checkIcon}
          count={taskList.filter((e) => e.done).length}
        />

        <NavBarMenuCard
          filterTasks={filterTasks}
          text="Papelera"
          icon={trashIcon}
          count={taskList.filter((e) => e.deleted).length}
        />
      </ul>

      <div className={style.groups}>
        <AnimatePresence>
          {groupList.map((e) => {
            return (
              <NavBarGroup
                id={e.id}
                key={e.id}
                name={e.name}
                forceReload={forceReload}
                color={e.color}
                filterTasks={filterTasks}
                count={taskList.filter((t) => t.group === e.name).length}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <button onClick={addNewGroup} className={style.addGroup}>
        <img className={style.addGroup} src={plusIcon} alt="" />
        Crear grupo
      </button>
    </nav>
  );
}
