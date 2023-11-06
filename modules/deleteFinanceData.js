import { readFile, writeFile } from "fs/promises";

const dataFilePath = "./db.json"; // Путь к файлу данных

export const deleteFinanceData = async (req, res) => {
  const { id } = req.params; // Получаем ID из параметров запроса

  try {
    // Чтение текущих данных
    const data = await readFile(dataFilePath, "utf8");
    const financeData = JSON.parse(data);

    // Фильтрация данных для удаления соответствующей записи
    const newData = financeData.filter((item) => item.id !== id);

    // Если размер массива не изменился, значит, запись не найдена
    if (financeData.length === newData.length) {
      return res
        .status(404)
        .json({ message: "Операция с таким ID не найдена." });
    }

    // Запись обновленных данных обратно в файл
    await writeFile(dataFilePath, JSON.stringify(newData), "utf8");

    res.status(200).json({ message: "Финансовая операция удалена." });
  } catch (err) {
    // Обработка возможной ошибки при чтении или записи файла
    res
      .status(500)
      .json({ message: "Ошибка при удалении финансовой операции." });
  }
};
