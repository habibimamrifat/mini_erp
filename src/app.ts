import express from "express";
import cors from "cors";
import router from "./app/routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./app/config/swagger";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_, res) => {
  res.send("Mini ERP API Running");
});

export default app;
