import { readFile, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Путь к файлу данных
const dataFilePath = "./db.json";
// Путь к файлу с категориями
const categoriesFilePath = "./db_categories.json";

function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getUTCMonth() + 1), // Месяцы начинаются с 0
      day = '' + d.getUTCDate(),
      year = d.getUTCFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

// Функция-обработчик для POST-запроса
export const addFinanceData = async (req, res) => {
  const { type, amount, description, category } = req.body;

  // Предопределенные типы категорий
  const allowedTypes = ["income", "expenses"];

  // Проверяем, является ли тип одним из разрешенных значений
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({
      message:
        "Тип операции не распознан. Допустимые значения: 'income' или 'expenses'.",
    });
  }

  // Валидация на наличие полей
  // Валидация на наличие остальных обязательных полей
  if (amount == null || description == null || category == null) {
    return res.status(400).json({ message: "Отсутствуют обязательные поля" });
  }

  const id = uuidv4();

  const date = new Date().toISOString();
  const formattedDate = formatDate(date);
  
  const formatCategory =
    category[0].toUpperCase() + category.slice(1).toLowerCase();

  const newItem = {
    id,
    type,
    amount,
    description,
    category: formatCategory,
    date: formattedDate,
  };

  try {
    // Добавление новой категории в db_categories.json, если таковая ещё не существует
    const categoriesData = await readFile(categoriesFilePath, "utf8");
    const categories = JSON.parse(categoriesData);

    // Проверяем, есть ли категория в соответствующем списке, и добавляем при необходимости
    if (!categories[type].includes(formatCategory)) {
      categories[type].push(formatCategory);
      await writeFile(categoriesFilePath, JSON.stringify(categories), "utf8");
    }

    // Добавление новой финансовой записи в db.json
    const data = await readFile(dataFilePath, "utf8");
    const financeData = JSON.parse(data);
    financeData.push(newItem);
    await writeFile(dataFilePath, JSON.stringify(financeData), "utf8");

    res.status(201).json(newItem);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "Ошибка при работе с файлом" });
  }
};
