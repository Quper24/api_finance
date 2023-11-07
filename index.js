// Импорт необходимых модулей
import express from "express";
import cors from "cors";

import { getFinanceData } from "./modules/getFinanceData.js";
import { addFinanceData } from "./modules/addFinanceData.js";
import { getCategories } from "./modules/getCategories.js";
import { resetDB } from "./modules/resetDB.js";
import { deleteFinanceData } from "./modules/deleteFinanceData.js";
import { getTestData } from "./modules/getTestData.js";

// Инициализация Express приложения
const app = express();

app.use(cors());

// Middleware для разбора JSON-запросов
app.use(express.json());

// Регистрация обработчиков
app.get("/api/finance", getFinanceData);
app.get("/api/test", getTestData);
app.post("/api/finance", addFinanceData);
app.get("/api/categories", getCategories);
app.get("/api/reset", resetDB);
app.delete("/api/finance/:id", deleteFinanceData);

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
