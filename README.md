# Log Monitoring System

A real-time log monitoring system that helps you track, analyze, and visualize application logs through a web interface.

## Learnings - Core Concepts

- **Real-time Data Processing**: Understanding how to handle and process log data in real-time using Node.js streams
- **Event-Driven Architecture**: Implementing event emitters and listeners for handling log events
- **File System Operations**: Working with Node.js fs module for reading and monitoring log files
- **WebSocket Communication**: Implementing real-time bidirectional communication between server and client
- **Asynchronous Programming**: Using async/await and promises for non-blocking operations

## Features

- Real-time log monitoring
- Web-based dashboard
- Log analysis and visualization
- Customizable log patterns and alerts

## Tech Stack

- **Backend**: Node.js
- **Frontend**: HTML, CSS, JavaScript
- **Runtime**: Node.js
- **Package Manager**: npm
- **Dependencies**: See `package.json` for Node.js packages

## Prerequisites

- Node.js (v20 or higher)
- npm (Node Package Manager)
- Modern web browser

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Ac-ayush/Log-monitoring-system.git
   cd Log-monitoring-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   node index.js
   ```

4. Open your web browser and navigate to:
   ```
   http://localhost:9000
   ```

## Project Structure

```
Log-monitoring-system/
├── index.js           # Main application file
├── package.json       # Project configuration and dependencies
├── package-lock.json  # Dependency lock file
├── public/           # Static files (CSS, JS, images)
├── logs/             # Log files directory
└── node_modules/     # Installed dependencies
```

- Add your logs in /app.log file and check the updated log on UI