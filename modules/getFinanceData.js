import { readFile } from "fs/promises";
// Путь к файлу данных
const dataFilePath = "./db.json";
// Функция-обработчик для GET-запроса
import { readFile } from "fs/promises";

const dataFilePath = "./db.json";

export const getFinanceData = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Получаем начальную и конечную дату месяца
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const currentDay = now.toISOString().split("T")[0];

  // Устанавливаем значения по умолчанию, если даты не были предоставлены
  const start = startDate || firstDayOfMonth;
  const end = endDate || currentDay;

  // Проверка валидности формата даты
  const validateDate = (date) =>
    /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(new Date(date).getTime());

  if (!validateDate(start) || !validateDate(end)) {
    return res
      .status(400)
      .json({
        message: "Некорректный формат даты. Используйте формат YYYY-MM-DD.",
      });
  }

  try {
    const data = await readFile(dataFilePath, "utf8");
    let financeData = JSON.parse(data);

    // Фильтруем данные в соответствии с датами
    financeData = financeData.filter((item) => {
      const itemDate = item.date;
      return itemDate >= start && itemDate <= end;
    });

    res.json(financeData);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при работе с файлом данных" });
  }
};
