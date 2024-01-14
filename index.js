const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/answer", async (req, res) => {
  // Your logic for handling the answer endpoint goes here
  try {
    const { message } = req.body;
    // console.log(message);
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo",
    });

    // console.log(completion.choices[0].message.content);
    // console.log(message);
    return res
      .status(200)
      .json({ message: completion.choices[0].message.content });
  } catch (error) {
    // console.log(error);
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
