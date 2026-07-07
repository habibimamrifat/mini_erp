import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import router from "./app/routes";
import swaggerSpec from "./app/config/swagger";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandeller";

const app = express();

// =========================
// Middlewares
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mini-erp-azure.vercel.app",
      "https://mini-erp-main.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

// =========================
// Routes
// =========================
app.get("/", (_, res) => {
  res.send("Mini ERP API Running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", router);

// =========================
// 404 Handler
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route Not Found",
  });
});

// =========================
// Global Error Handler
// =========================
app.use(globalErrorHandler);

export default app;
