# 🚀 AI-Powered Lead Intelligence CRM

A high-performance Lead Management System designed for wellness coaches. This platform leverages **Gemini AI** to analyze lead history and generate personalized outreach strategies, featuring a **Redis-backed** dashboard for real-time business intelligence via **MongoDB Aggregation Pipelines**.

---

## 🏗️ Architecture & Strategy

### 📂 Database Design (MongoDB)
* **Users:** Stores coach profiles and hashed credentials (JWT Auth).
* **Leads:** The core entity. Includes contact details, status (`NEW`, `INTERESTED`, `CONVERTED`, `REJECTED`), and source data.
* **Activities:** A timeline-based collection tracking every interaction (calls, status changes, AI generations) to build the lead history.

**Indexing Strategy:**
* `assignedTo`: Compound index with `status` for fast dashboard filtering.
* `phone`: Unique index to prevent duplicate leads.
* `name`: Text index for the global search functionality.

### ⚡ Caching Strategy (Redis)
To ensure the dashboard remains lightning-fast, we implement a **Read-Aside Caching** strategy:
1.  **Dashboard Stats:** Fetched from Redis in `< 2ms`.
2.  **Cache Miss:** If empty, the system runs a heavy **MongoDB Aggregation Pipeline**, stores the result in Redis with a **600s TTL**, and returns it.
3.  **Invalidation:** On `createLead` or `updateStatus`, the cache key `dashboard:{userId}` is purged to ensure data consistency.



### 📊 Aggregation Pipeline Logic
The "Lead Center" stats are calculated using a single-pass `$facet` pipeline. This performs grouping by status, grouping by source, and total counts in one database hit, reducing server overhead.

---

## 🛠️ Setup & Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd server


```bash
git clone <your-repo-url>
cd server
cd

## 🔐 Environment Configuration

To run this project, you will need to add the following environment variables to your `.env` files.

### Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://default:4NSXID9iqESKRfygsI9uQXAgMDFqVLNc@redis-11654.c240.us-east-1-3.ec2.cloud.redislabs.com:11654
GEMINI_API_KEY=your_google_ai_studio_key