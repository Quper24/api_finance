import { readFile, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Путь к файлу данных
const dataFilePath = "./db.json";
// Путь к файлу с категориями
const categoriesFilePath = "./db_categories.json";

// Функция-обработчик для POST-запроса
export const addFinanceData = async (req, res) => {
  const { type, amount, description, category } = req.body;
  const id = uuidv4();

  // Валидация на наличие полей
  if (
    type == null ||
    amount == null ||
    description == null ||
    category == null
  ) {
    return res.status(400).json({ message: "Отсутствуют обязательные поля" });
  }

  const newItem = { id, type, amount, description, category };

  try {
    // Добавление новой категории в db_categories.json, если таковая ещё не существует
    const categoriesData = await readFile(categoriesFilePath, "utf8");
    const existingCategories = JSON.parse(categoriesData);
    if (!existingCategories.includes(category)) {
      existingCategories.push(category);
      await writeFile(
        categoriesFilePath,
        JSON.stringify(existingCategories),
        "utf8",
      );
    }

    // Добавление новой финансовой записи в db.json
    const data = await readFile(dataFilePath, "utf8");
    const financeData = JSON.parse(data);
    financeData.push(newItem);
    await writeFile(dataFilePath, JSON.stringify(financeData), "utf8");

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при работе с файлом" });
  }
};
