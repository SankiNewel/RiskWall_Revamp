# RiskWall

RiskWall is a real-time risk alert system that processes file-based events and displays them on a live dashboard.

## 🚀 Overview

The system consists of three main components:
1.  **RiskWall.Worker**: A background service that watches a folder (`DropZone`) for new files (CSV/Excel), parses them, and publishes `AlertCreated` events to RabbitMQ.
2.  **RiskWall.API**: A .NET Web API that consumes alert events from RabbitMQ, saves them to a PostgreSQL database, and pushes real-time updates to connected clients via SignalR.
3.  **RiskWall.Client**: An Angular frontend application that displays a live feed of alerts.

## 🛠️ Prerequisites

-   [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (or later)
-   [Node.js](https://nodejs.org/) (v18+) & npm
-   [RabbitMQ](https://www.rabbitmq.com/) (running strictly on `localhost:5672` default)
-   [PostgreSQL](https://www.postgresql.org/) (running on `localhost:5432` default)

## 📂 Project Structure

```
RiskWall/
├── DropZone/               # Watch folder for input files
├── src/
│   ├── RiskWall.API/       # Backend API & Consumer
│   ├── RiskWall.Client/    # Angular Frontend
│   ├── RiskWall.Core/      # Shared Domain Entities & Interfaces
│   ├── RiskWall.Infrastructure/ # Data Access & External Services
│   ├── RiskWall.Worker/    # File Watcher & Producer
│   └── ...
```

## ⚡ Getting Started

### 1. Infrastructure Setup

Ensure **PostgreSQL** and **RabbitMQ** are running.
If using Docker:
```bash
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
docker run --name some-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### 2. Backend (API)

The API will automatically create the database on startup if it doesn't exist.

```bash
cd src/RiskWall.API
dotnet run
```
*API will run on `http://localhost:5034`*

### 3. Worker Service

The worker watches the `RiskWall/DropZone` directory.

```bash
cd src/RiskWall.Worker
dotnet run
```

### 4. Frontend (Client)

```bash
cd src/RiskWall.Client
npm install
npm start
```
*Client will run on `http://localhost:4200`*

## 🔄 Workflow

1.  **File Drop**: Place a CSV or Excel file in the `DropZone` folder.
    -   *Example CSV format:* `Date,Severity,Message,Details`
2.  **Processing**: `RiskWall.Worker` detects the file/changes, parses content, and publishes a message to RabbitMQ.
3.  **Consumption**: `RiskWall.API` receives the message, saves it to the DB, and broadcasts it.
4.  **Display**: `RiskWall.Client` receives the SignalR event and updates the dashboard instantly.

## ⚙️ Configuration

-   **Connection Strings**: Managed in `appsettings.json` in API/Worker projects.
-   **RabbitMQ**: Defaults to `localhost`, guest/guest. Configured in `Program.cs`.
-   **Watch Path**: Configurable in `RiskWall.Worker` `appsettings.json` (Key: `WatchPath`). Default is `C:\Sanket\RiskWall\DropZone`.

## 🧪 Testing

To test the flow manually:
1. Ensure all services are running.
2. Create a file `test.csv` in `DropZone` with content:
   ```csv
   2023-11-01,Critical,System Failure,Database connection lost
   ```
3. Check the Angular Dashboard or API logs.
