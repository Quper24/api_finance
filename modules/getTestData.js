import { readFile } from "fs/promises";
// Путь к файлу данных
const dataFilePath = "./db_test.json";
// Функция-обработчик для GET-запроса
export const getTestData = async (req, res) => {
  try {
    const data = await readFile(dataFilePath, "utf8");
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ message: "Ошибка при чтении файла" });
  }
};
