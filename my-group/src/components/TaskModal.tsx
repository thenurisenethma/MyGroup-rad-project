import { useEffect, useState } from "react"
import type { Task } from "../pages/Dashboard"

interface Props {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  onSave: (task: Task) => Promise<void>
  editTask: Task | null
}

export default function TaskModal({
  isOpen,
  setIsOpen,
  onSave,
  editTask,
}: Props) {
  const [title, setTitle] = useState("")
  const [due, setDue] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  // Sync modal state when editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title)
      setDue(editTask.due)
      setAssignedTo(editTask.assignedTo || "")
    } else {
      setTitle("")
      setDue("")
      setAssignedTo("")
    }
  }, [editTask])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !due) {
      alert("Please fill all fields")
      return
    }

    // Create a task object
    const task: Task = {
      id: editTask?.id ?? "",  // Use empty string if adding a new task
      title,
      due,
      status: editTask?.status || "Pending",
      assignedTo,
    }

    // Await onSave in case it's async
    await onSave(task)

    // Reset fields & close modal
    setTitle("")
    setDue("")
    setAssignedTo("")
    setIsOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h3 className="text-xl font-semibold">
          {editTask ? "Edit Task" : "Add Task"}
        </h3>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 w-full"
        />

        <input
          type="date"
          value={due}
          onChange={e => setDue(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
          placeholder="Assign to (optional)"
          className="border p-2 w-full"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-yellow-400 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
