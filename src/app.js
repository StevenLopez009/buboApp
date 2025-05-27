import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js"
import serviceRoutes from "./routes/service.routes.js"
import serviceLog from "./routes/serviceLog.routes.js"
import billsRoutes from "./routes/bills.router.js"

const app = express()

app.use(cors({
  origin:'http://localhost:5173'
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", serviceRoutes)
app.use("/api", serviceLog)
app.use("/api", billsRoutes)


export default app;
