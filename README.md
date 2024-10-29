# Todo App - Fullstack Setup Documentation 📋

This project contains a **frontend built with React** and a **backend using ASP.NET Core** with **PostgreSQL** as the database.

---

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)  
- .NET Core SDK (v6.0 or higher)  
- Docker (for PostgreSQL setup)  
- Git (for cloning the repository)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

---

## Backend Setup (ASP.NET Core)

### 1. Navigate to the Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
dotnet restore
```

### 3. Update the PostgreSQL Connection String

In the `appsettings.json` file, update the following section:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=todoapi;Username=postgres;Password=your_password"
  }
}
```

Replace `your_password` with the password you set for PostgreSQL in Docker.

### 4. Apply Database Migrations

Make sure the PostgreSQL container is running, then apply the migrations:

```bash
dotnet ef database update
```

### 5. Run the Backend Server

```bash
dotnet run
```

The backend will run on `http://localhost:5000`.

---

## Frontend Setup (React)

### 1. Navigate to the Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Frontend Server

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

---

## Using Docker to Set Up PostgreSQL

### 1. Run PostgreSQL in Docker

```bash
docker run --name todo-postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres
```

Explanation:
- `--name todo-postgres`: Names the container.
- `-e POSTGRES_PASSWORD=your_password`: Sets the password for the PostgreSQL user.
- `-p 5432:5432`: Exposes port 5432 to the host machine.
- `-d`: Runs the container in detached mode.

### 2. Check if the Container is Running

```bash
docker ps
```

You should see `todo-postgres` in the list of running containers.

### 3. Connect to PostgreSQL in the Docker Container

```bash
docker exec -it todo-postgres psql -U postgres
```

---

## Testing the Fullstack Application

1. Make sure both the backend and frontend are running:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

2. Add some todos using the frontend.

3. Verify that the data is saved in PostgreSQL by connecting to the database with a tool like pgAdmin or DBeaver.

---

## Stopping and Managing the PostgreSQL Container

### Stop the Container

```bash
docker stop todo-postgres
```

### Start the Container

```bash
docker start todo-postgres
```

### Remove the Container (Optional)

If you want to remove the PostgreSQL container:

```bash
docker rm -f todo-postgres
```

To remove the PostgreSQL image:

```bash
docker rmi postgres
```

---

## Troubleshooting

1. **Database Connection Issues:**  
   Ensure the Docker container is running and PostgreSQL is listening on port 5432.

2. **CORS Issues:**  
   If you encounter CORS errors, update the CORS policy in the ASP.NET Core backend.

3. **Docker Command Not Found:**  
   Ensure Docker is installed and added to your system’s PATH.

---

## Conclusion

You now have a complete fullstack **Todo App** running with a **React frontend**, **ASP.NET Core backend**, and **PostgreSQL database in Docker**. Enjoy building and extending your app!
