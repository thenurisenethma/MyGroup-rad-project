import Navbar from "../components/Navbar"
import TaskModal from "../components/TaskModal"
import { useState, useEffect } from "react"

export interface Task {
  id?: string
  title: string
  due: string
  status: string
  assignedTo?: string
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
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()

        // Normalize _id to id
        const normalized: Task[] = data.map((t: any) => ({
          id: t._id,
          title: t.title,
          due: t.due,
          status: t.status,
          assignedTo: t.assignedTo || "",
        }))

        setTasks(normalized)
      } catch (err) {
        console.error(err)
      }
    }

    fetchTasks()
  }, [userId, token])

  // 🔹 Add / Update task
  const handleSaveTask = async (task: Task) => {
    if (!token || !userId) return

    // ✅ UPDATE
    if (task.id) {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: task.title,
            due: task.due,
            status: task.status,
            assignedTo: task.assignedTo || "",
          }),
        })

        const updated = await res.json()

        if (!res.ok) {
          alert(updated.message || "Failed to update task")
          return
        }

        // Update task in state
        setTasks(prev =>
          prev.map(t => (t.id === task.id ? { ...t, ...updated, id: updated._id } : t))
        )
      } catch (err) {
        console.error(err)
        alert("Something went wrong while updating task")
      }
    }
    // ✅ ADD NEW
    else {
      try {
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
            assignedTo: task.assignedTo || "",
            userId,
          }),
        })

        const created = await res.json()

        if (!res.ok) {
          alert(created.message || "Failed to add task")
          return
        }

        setTasks(prev => [...prev, { ...created, id: created._id }])
      } catch (err) {
        console.error(err)
        alert("Something went wrong while adding task")
      }
    }

    // Close modal
    setEditTask(null)
    setIsModalOpen(false)
  }

  // 🔹 Delete task
  const handleDeleteTask = async (id?: string) => {
    if (!token || !id) return

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.message || "Failed to delete task")
        return
      }

      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error(err)
      alert("Something went wrong while deleting task")
    }
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
                  {task.assignedTo && ` | Assigned to: ${task.assignedTo}`}
                </p>
              </div>

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
                  onClick={() => handleDeleteTask(task.id)}
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
