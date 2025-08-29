// import dotenv from "dotenv";
// dotenv.config();

// console.log(process.env.OPENAI_API_KEY);

// const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     inputs: "Write me a short fantasy story about a dragon and a girl."
//   })
// });

// const result = await response.json();
// console.log(result);

// const server = http.createServer(async (req, res) => {
//   if (req.url === "/generate" && req.method === "GET") {
//     try {
//       const completion = await client.chat.completions.create({
//         model: "openai/gpt-oss-20b:together", // або інший, який ти хочеш
//         messages: [
//           {
//             role: "user",
//             content: "Write a short story about anything (2-3 sentences)",
//           },
//         ],
//       });

//       const story = completion.choices[0].message.content;
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ story }));
//     } catch (err) {
//       console.error(err);
//       res.writeHead(500);
//       res.end("Error generating story");
//     }
//     return;
//   }

//   // решта коду для статичних файлів
//   let filePath = "./public" + (req.url === "/" ? "/index.html" : req.url);
//   const extname = path.extname(filePath).toLowerCase();
//   let contentType = "text/html";

//   switch (extname) {
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".css":
//       contentType = "text/css";
//       break;
//   }

//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       res.writeHead(404);
//       res.end("File not found");
//     } else {
//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(content, "utf-8");
//     }
//   });
// });

// server.listen(3000, () => console.log("Server running at http://localhost:3000"));

import dotenv from "dotenv";
import OpenAI from "openai";
import http from "http";
import path from "path";
import fs from "fs";

dotenv.config();

const client = new OpenAI({
  // baseURL: "https://router.huggingface.co/v1",
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b:together",
    messages: [
      {
        role: "user",
        content: "Write a short story about anything (2-3 sentences)",
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

run();
