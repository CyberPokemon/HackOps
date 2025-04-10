
# 💧 Smart Local Water Supply Scheduler

### 🚀 Team HackOps  
**Members:**  
- Arghadeep Tambuli  
- Imon Mallik  
- Soumi Sahu  
- Abhilasha Shee

---

## 📝 Problem Statement
**Smart Local Water Supply Scheduler** aims to bridge the communication gap between citizens and municipalities regarding water distribution. It enables citizens to register their water needs while allowing municipality admins to monitor demand, assess supply capacity, and set up efficient weekly water schedules.

---

## 📌 Description

This web application provides:
- A registration and login system for both **Citizens** and **Municipality Admins**.
- A feature for citizens to **request water** based on their needs.
- A dashboard for municipality admins to **review water demand**, compare it with available supply, and **allocate water** accordingly.

---

## 🌐 Website Features

### 👤 Citizen Side:
- Register/Login  
- Submit water requests (municipality & ward-wise)  
- View status/history of water allocations  

### 🏛️ Admin Side:
- Register/Login  
- Dashboard to view all citizen demands  
- Set up and manage weekly schedules based on demand vs available supply  

---

## 🧰 Tech Stack

### 🔹 Frontend
- HTML  
- CSS  
- JavaScript  

### 🔹 Backend
- Spring Boot  
- Spring Security (for authentication & authorization)  

### 🔹 Database
- PostgreSQL  

---

## 🛠️ Setup Instructions

### 📥 Clone the Repository
```bash
git clone https://github.com/CyberPokemon/HackOps.git
cd HackOps
```

---

### 💻 Frontend Setup

1. **Install Live Server** extension in [Visual Studio Code](https://code.visualstudio.com/).
2. Navigate to:
   ```
   frontend/websiteversion2/html/index.html
   ```
3. Right-click and **Start with Live Server**.

---

### ⚙️ Backend Setup

**Prerequisites:**
- Java 21
- IntelliJ IDEA

1. Open the backend project in IntelliJ IDEA.
2. Build and **run the application**.

---

### 🗄️ Database Setup

**Prerequisites:**
- Install [PostgreSQL](https://www.postgresql.org/).

1. Create a database named:
   ```
   watermanagementsystem
   ```
2. Configure `application.properties` in the backend with:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/watermanagementsystem
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD
   ```
