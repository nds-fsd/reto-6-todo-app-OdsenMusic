const API_URL_Base = "http://localhost:3000/";
const API_URL_Tasks = "http://localhost:3000/todo/";
const API_URL_Groups = "http://localhost:3000/groups/";

export const newTask = async (forceReload, color, group) => {
  try {
    const response = await fetch(API_URL_Tasks, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color: color, group: group }),
    });
    if (response.ok) {
      forceReload();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (route, stateSetter) => {
  try {
    const response = await fetch(API_URL_Base + route);
    if (response.ok) {
      const json = await response.json();
      stateSetter(json);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id, forceReload) => {
  try {
    const response = await fetch(API_URL_Tasks + id, {
      method: "DELETE",
    });
    if (response.ok) {
      forceReload();
    }
  } catch (error) {
    console.log(error);
  }
};

export const addNewGroup = async (setGroupList) => {
  try {
    const response = await fetch(API_URL_Groups, {
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

export const updateGroup = async (id, payload, forceReload) => {
  try {
    const response = await fetch(API_URL_Groups + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      forceReload();
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeGroupName = (id, event, forceReload, setTaskFilter) => {
  if (event.target.value === "") {
    return;
  } else {
    updateGroup(id, { name: event.target.value }, forceReload);
    setTaskFilter(event.target.value);
  }
};

export const changeGroupColor = (id, currentColor, forceReload) => {
  const colors = ["white", "green", "yellow", "blue", "orange", "purple"];
  const nextColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
  updateGroup(id, { color: nextColor }, forceReload);
};

export const deleteGroup = async (id, forceReload, setTaskFilter) => {
  try {
    const response = await fetch(API_URL_Groups + id, { method: "DELETE" });
    if (response.ok) {
      forceReload();
      setTaskFilter("");
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeTaskAttribute = async (id, payload, forceReload) => {
  try {
    const response = await fetch(API_URL_Tasks + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      forceReload();
    }
  } catch (error) {
    console.log(error);
  }
};
