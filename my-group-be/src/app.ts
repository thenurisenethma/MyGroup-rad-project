import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import groupRoutes from "./routes/group.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/groups", groupRoutes);

export default app
