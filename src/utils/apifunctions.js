export const newTask = async (forceReload) => {
  try {
    const response = await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const json = await response.json();
      forceReload();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (route, stateSetter) => {
  try {
    const response = await fetch(`http://localhost:3000/${route}`);
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
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
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
    console.error(error);
  }
};

export const updateGroup = async (id, payload, forceReload) => {
  const url = `http://localhost:3000/groups/${id}`;
  const headers = {
    "Content-Type": "application/json",
  };

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

export const changeGroupName = (id, event, forceReload) => {
  if (event.target.value === "") {
    return;
  } else {
    updateGroup(id, { name: event.target.value }, forceReload);
  }
};

export const changeGroupColor = (id, currentColor, forceReload) => {
  const colors = ["white", "green", "yellow", "blue", "orange", "purple"];
  const nextColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
  updateGroup(id, { color: nextColor }, forceReload);
};

export const deleteGroup = async (id, forceReload) => {
  const url = `http://localhost:3000/groups/${id}`;

  try {
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      forceReload();
    }
  } catch (error) {
    console.error(error);
  }
};

export const changeTaskAttribute = async (id, payload, forceReload) => {
  const url = `http://localhost:3000/todo/${id}`;

  const headers = {
    "Content-Type": "application/json",
  };

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
