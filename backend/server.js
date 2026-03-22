const dotenv = require("dotenv");
dotenv.config({ path: require("path").resolve(__dirname, ".env") });
console.log(process.env.ANTHROPIC_API_KEY);

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; //dynamaic port assignment

app.use(cors());
app.use(express.json());

const { Anthropic } = require("@anthropic-ai/sdk");
// Initialize Anthropic Client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

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
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 300,
      system: "Summarize the following text concisely, focusing on key points.",
      messages: [{ role: "user", content: text }]
    });

    res.json({ summary: msg.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
