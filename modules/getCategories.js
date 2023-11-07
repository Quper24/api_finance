// Импорт необходимого модуля
import { readFile } from "fs/promises";

// Путь к файлу с категориями
const categoriesFilePath = "./db_categories.json";

// Функция-обработчик для GET-запроса категорий
export async function getCategories(req, res) {
  try {
    // Читаем текущие категории из файла
    const data = await readFile(categoriesFilePath, "utf8");
    const categories = JSON.parse(data);

    // Возвращаем категории в ответе
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при работе с файлом" });
  }
}
