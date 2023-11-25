import NavBarGroup from "../NavBarGroup";
import NavBarMenuCard from "../NavBarMenuCard";
import Logo from "../Logo";
import style from "../NavBar/styles.module.css";
import { AnimatePresence } from "framer-motion";
import plusIcon from "/icons/plus-circle-svgrepo-com.svg";
import checkIcon from "/icons/checkmark-circle-svgrepo-com (1).svg";
import trashIcon from "/icons/trash-svgrepo-com.svg";
import taskIcon from "/icons/clipboard-svgrepo-com (1).svg";
import { addNewGroup } from "../../utils/apifunctions";
import { memo } from "react";

const NavBar = memo(
  ({
    filterTasks,
    forceReload,
    groupList,
    setGroupList,
    taskList,
    setTaskFilter,
  }) => {
    return (
      <nav className={style}>
        <Logo />
        <ul>
          <NavBarMenuCard
            filterTasks={filterTasks}
            text="Tareas"
            icon={taskIcon}
            count={taskList.filter((e) => !e.done).length}
            alt="Todas las tareas"
          />
          <NavBarMenuCard
            filterTasks={filterTasks}
            text="Tareas finalizadas"
            icon={checkIcon}
            count={taskList.filter((e) => e.done && !e.deleted).length}
            alt="Todas las tareas finalizadas"
          />

          <NavBarMenuCard
            filterTasks={filterTasks}
            text="Papelera"
            icon={trashIcon}
            count={taskList.filter((e) => e.deleted).length}
            alt="Tareas en papelera"
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
                  setTaskFilter={setTaskFilter}
                  count={
                    taskList.filter((t) => {
                      return t.group === e.name && !t.deleted;
                    }).length
                  }
                />
              );
            })}
          </AnimatePresence>
        </div>
        <button
          onClick={() => addNewGroup(setGroupList)}
          className={style.addGroup}
        >
          <img
            className={style.addGroup}
            src={plusIcon}
            alt="Icono de añadir grupo"
          />
          Crear grupo
        </button>
      </nav>
    );
  }
);

export default NavBar;
