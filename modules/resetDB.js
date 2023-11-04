import { writeFile } from "fs/promises";

// Путь к файлу данных
const dataFilePath = "./db.json";
// Путь к файлу с категориями
const categoriesFilePath = "./db_categories.json";

// Функция-обработчик для сброса базы данных
export const resetDB = async (req, res) => {
  // Стандартное содержимое для db_categories.json
  const defaultCategories = {
    income: ["Зарплата", "Подарки"],
    expenses: ["Еда", "Транспорт", "Развлечения", "Образование"],
  };

  try {
    // Очистка файла db.json
    await writeFile(dataFilePath, JSON.stringify([]), "utf8");

    // Восстановление файла db_categories.json
    await writeFile(
      categoriesFilePath,
      JSON.stringify(defaultCategories),
      "utf8",
    );

    res.status(200).json({ message: "База данных была успешно сброшена." });
  } catch (err) {
    // Обработка возможной ошибки при записи файла
    res.status(500).json({ message: "Ошибка при сбросе базы данных." });
  }
};
