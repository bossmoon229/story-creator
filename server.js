import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const port = 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    // віддаємо статичні файли з public/
    let filePath = path.join(
      __dirname,
      "public",
      req.url === "/" ? "index.html" : req.url
    );

    const ext = path.extname(filePath);
    let contentType = "text/html";
    if (ext === ".js") contentType = "application/javascript";
    if (ext === ".css") contentType = "text/css";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  } else if (req.method === "POST" && req.url === "/generate") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { prompt } = JSON.parse(body);

        const response = await client.chat.completions.create({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "user",
              content: "Write story about anything(5-6 sentences)",
            },
          ],
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ text: response.choices[0].message.content }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Something went wrong" }));
      }
    });
  }
});

server.listen(port, () => {
  console.log(`✅ Сервер працює на http://localhost:${port}`);
});
