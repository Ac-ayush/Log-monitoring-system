const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const fs = require("fs");
const readline = require("readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Function to get last n lines of a file
function getLastNLines(filePath, n) {
  return new Promise((resolve, reject) => {
    const lines = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      lines.push(line);
      if (lines.length > n) {
        lines.shift();
      }
    });

    rl.on("close", () => {
      resolve(lines);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}

// Function to watch log file
function watchLogFile(filePath) {
  let lastPosition = 0;
  let isReading = false;

  // Get initial file size
  try {
    const stats = fs.statSync(filePath);
    lastPosition = stats.size;
  } catch (err) {
    console.error("Error getting initial file size:", err);
    return;
  }

  // Watch for changes
  fs.watch(filePath, async (eventType, filename) => {
    if (eventType === "change" && !isReading) {
      isReading = true;
      try {
        const stats = fs.statSync(filePath);
        if (stats.size < lastPosition) {
          // File was truncated
          lastPosition = 0;
        }

        const stream = fs.createReadStream(filePath, {
          start: lastPosition,
          encoding: "utf8",
        });

        let buffer = "";
        stream.on("data", (chunk) => {
          buffer += chunk;
          const lines = buffer.split("\n");
          buffer = lines.pop(); // Keep the last incomplete line in buffer

          lines.forEach((line) => {
            if (line.trim()) {
              io.emit("log-update", line);
            }
          });
        });

        stream.on("end", () => {
          lastPosition = stats.size;
          isReading = false;
        });

        stream.on("error", (err) => {
          console.error("Error reading file:", err);
          isReading = false;
        });
      } catch (err) {
        console.error("Error processing file change:", err);
        isReading = false;
      }
    }
  });
}

// Handle Socket.io connection
io.on("connection", async (socket) => {
  console.log("Socket connection established:", socket.id);

  try {
    // Send last 10 lines when client connects
    const lastLines = await getLastNLines("./logs/app.log", 10);
    socket.emit("initial-logs", lastLines);
  } catch (err) {
    console.error("Error sending initial logs:", err);
  }
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

// Start watching the log file
watchLogFile("./logs/app.log");

server.listen(9000, () => console.log("Server started at PORT 9000"));
