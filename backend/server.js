const dotenv = require("dotenv");
dotenv.config({ path: require("path").resolve(__dirname, ".env") });

// using gemini sdk for this project to understand more browse https://github.com/googleapis/js-genai
const { GoogleGenAI } = require("@google/genai");
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});


const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; //dynamaic port assignment

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.get("/api/majorincidents", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.rfs.nsw.gov.au/feeds/majorIncidents.json"
    );
    if (!response.ok) {
      throw new Error("failed to fetch the incidents");
    }
    const data = await response.json();
    //Send data back to client
    res.json(data);
  } catch (err) {
    console.error("Error in data fetch:", err);
    //Send response as error
    res.status(500).json({ err: "Internal server error" });
  }
});

// POST endpoint to generate summary
app.post("/api/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text input is required" });
  }

  try {
    const prompt = `Here are the current NSW fire incidents: ${text}. 
Write a clear, plain English summary in bullet points. 
Focus on locations, alert levels, and any safety advice. Keep it short and easy to read.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [{text: prompt}]
    });

    const summary = response.text;   // ← this is how we get the text in the new SDK

    console.log("AI Summary generated:", summary);

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
