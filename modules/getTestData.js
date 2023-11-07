import { readFile } from "fs/promises";
// Путь к файлу данных
const dataFilePath = "./db_test.json";

const validateDate = (date) =>
  /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(new Date(date).getTime());

// Функция-обработчик для GET-запроса
export const getTestData = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const data = await readFile(dataFilePath, "utf8");
    let financeData = JSON.parse(data);

    if (startDate || endDate) {
      const start = startDate || "2000-01-01";
      const end = endDate || new Date().toISOString().split("T")[0];

      if (!validateDate(start) || !validateDate(end)) {
        return res.status(400).json({
          message: "Некорректный формат даты. Используйте формат YYYY-MM-DD.",
        });
      }
      const startDataTimeStamp = new Date(start).getTime();
      const endDataTimeStamp = new Date(end).getTime();
      const filterFinanceData = financeData.filter(({ date }) => {
        const timestampDate = new Date(date).getTime();
        return (
          timestampDate >= startDataTimeStamp &&
          timestampDate <= endDataTimeStamp
        );
      });
      res.json(filterFinanceData);
    } else {
      res.json(financeData);
    }

    // Фильтруем данные в соответствии с датами
  } catch (err) {
    res.status(500).json({ message: "Ошибка при работе с файлом данных" });
  }
};
