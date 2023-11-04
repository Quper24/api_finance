// Импорт необходимых модулей
import express from "express";

import { getFinanceData } from "./modules/getFinanceData.js";
import { addFinanceData } from "./modules/addFinanceData.js";
import { getCategories } from "./modules/getCategories.js";

// Инициализация Express приложения
const app = express();

// Middleware для разбора JSON-запросов
app.use(express.json());

// Регистрация обработчиков
app.get("/api/finance", getFinanceData);
app.post("/api/finance", addFinanceData);
app.get("/api/categories", getCategories);

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
