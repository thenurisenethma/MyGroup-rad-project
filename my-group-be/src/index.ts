import app from "./app"
import dotenv from "dotenv"
import connectDB from "./config/db"
import taskRoutes from "./routes/task.routes"

app.use("/api/tasks", taskRoutes)

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
