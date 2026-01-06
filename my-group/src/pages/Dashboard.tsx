import Navbar from "../components/Navbar"
import TaskModal from "../components/TaskModal"
import { useState, useEffect } from "react"

export interface Task {
  id?: string
  title: string
  due: string
  status: string
}

export default function Dashboard() {
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | null>(null)

  // 🔹 Fetch tasks
  useEffect(() => {
    if (!userId || !token) return

    const fetchTasks = async () => {
      const res = await fetch(`http://localhost:5000/api/tasks/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()

      // 🔥 normalize _id → id
      const normalized: Task[] = data.map((t: any) => ({
        id: t._id,
        title: t.title,
        due: t.due,
        status: t.status,
      }))

      setTasks(normalized)
    }

    fetchTasks()
  }, [userId, token])

  // 🔹 Add / Update
const handleSaveTask = async (task: Task) => {
  if (!token) return

  // ✅ UPDATE
  if (task.id) {
    console.log("Updating task with id:", task.id)

    const res = await fetch(
      `http://localhost:5000/api/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: task.title,
          due: task.due,
          status: task.status,
        }),
      }
    )

    const updated = await res.json()

    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...updated, id: updated._id ?? task.id }
          : t
      )
    )
  }
  // ✅ ADD
  else {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: task.title,
        due: task.due,
        status: task.status,
        userId,
      }),
    })

    const created = await res.json()

    setTasks(prev => [
      ...prev,
      { ...created, id: created._id },
    ])
  }

  setEditTask(null)
  setIsModalOpen(false)
}

  // 🔹 Delete
  const handleDeleteTask = async (id: string) => {
    if (!token) return

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <button
            onClick={() => {
              setEditTask(null)
              setIsModalOpen(true)
            }}
            className="bg-yellow-400 px-4 py-2 rounded"
          >
            + Add Task
          </button>
        </div>

        <ul className="space-y-3 bg-white p-6 rounded-xl shadow">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between bg-gray-50 p-3 rounded"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {task.due} | {task.status}
                </p>
              </div>
<p className="text-sm text-gray-500">
  Due: {task.due} | {task.status} 
  {task.assignedTo && ` | Assigned to: ${task.assignedTo}`}
</p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditTask(task)
                    setIsModalOpen(true)
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
              <button
              onClick={() => task.id && handleDeleteTask(task.id)}
              className="text-red-600"
              >
               Delete
              </button>

              </div>
            </li>
          ))}
        </ul>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSave={handleSaveTask}
        editTask={editTask}
      />
    </div>
  )
}
