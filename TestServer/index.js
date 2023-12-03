import express from "express";
import cors from "cors";

const port = 4444;

const data = [
  {
    email: "jim@gmail.com",
    number: "221122",
  },
  {
    email: "jam@gmail.com",
    number: "830347",
  },
  {
    email: "john@gmail.com",
    number: "221122",
  },
  {
    email: "jams@gmail.com",
    number: "349425",
  },
  {
    email: "jams@gmail.com",
    number: "141424",
  },
  {
    email: "jill@gmail.com",
    number: "822287",
  },
  {
    email: "jill@gmail.com",
    number: "822286",
  },
];

const app = express();

app.use(express.json());
app.use(cors());

let currentRequest = null;

app.post("/search", (req, res) => {
  try {
    if (currentRequest) {
      clearTimeout(currentRequest);
    }

    const { email, number } = req.body;

    currentRequest = setTimeout(() => {
      let results = data;

      results = results.filter((item) => item.email === email);

      if (number) {
        const formattedNumber = number.replace(/-/g, "");
        results = results.filter((item) => item.number === formattedNumber);
      }

      res.json(results);
    }, 5000);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить данные",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
