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
