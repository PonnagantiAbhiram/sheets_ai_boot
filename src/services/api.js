import config from '../config/config';

// 🟢 FETCH TASKS
export async function fetchTasks() {
  try {
    const res = await fetch(`${config.API_URL}?action=allTasks`); // ✅ FIXED
    const data = await res.json();

    return (data.data || []).map(row => ({ // ✅ FIXED
      id: row[0],
      title: row[1],
      assignee: row[2],
      dueDate: row[3],
      status: (row[4] || "Pending").toLowerCase().replace(" ", "-"),
      priority: row[5] || "Medium",
      contact: row[6]
    }));

  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

// 🟢 UPDATE STATUS
export async function updateStatus(taskId, status) {
  const mappedStatus =
    status === "done" ? "Completed" :
      status === "start" ? "In Progress" :
        status;

  await fetch(config.API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action: "updateStatus",   // ✅ FIXED
      taskId: taskId,           // ✅ FIXED
      status: mappedStatus      // ✅ FIXED
    })
  });
}

// 🟢 ADD TASK
export async function addTask(data) {
  await fetch(config.API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action: "addTask",
      ...data
    })
  });
}

// 🟢 DELETE TASK
export async function deleteTask(taskId) {
  await fetch(config.API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action: "deleteTask",
      taskId
    })
  });
}
export async function updateTask(data) {
  await fetch(config.API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action: "updateTask",
      ...data
    })
  });
}