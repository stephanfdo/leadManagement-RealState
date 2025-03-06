

1. Introduction
This is a web-based application designed for real estate professionals to manage leads (buyers, sellers, renters, landlords) and use AI to find property matches. The system includes:
•	Admin Panel: Secure interface for managing leads/ secure authentication with JWT authentication 
•	AI Matching: Smart recommendations using ChatGPT
•	Dashboard: View leads in a table, filter/sort data, and manage matches







2. Key Features
Core Features
•	Add/Edit Leads: Create or update leads with forms
•	Lead Table: View all leads with filters/sort options
•	Match Scoring: AI-generated scores (0-100%) for lead compatibility
•	Secure Login: JWT-based authentication for admins
•	Database Storage: SQLite/PostgreSQL for data persistence
Advanced Features
•	AI-Powered Matching: Uses ChatGPT API to analyze location, budget, and property type
•	Error Handling: Friendly messages for API/database errors
•	Responsive UI: Works on all screen sizes
•	Data Encryption: Secure storage of sensitive information







3. Technical Stack
•	Frontend
React JS:	Build user interfaces
Material-UI:	Pre-designed components (tables, forms)
Axios:	Connect frontend/backend
•	Backend
	
Node.js:	Server-side logic
Express.js:	API development
Sequelize:	Database management
•	Database
	
SQLite	Default database (development)

•	AI Integration
	
OpenAI API	Generate match scores & reasons
	
•	Security
	
JWT	User authentication
Bcrypt	Password encryption
Helmet	Secure HTTP headers

•	Tools
	
Git	Version control
Insomnia	API testing
	



4. System Architecture
Frontend (React) → Backend (Node/Express) → Database  
                      ↓  
                  OpenAI API  













5. Setup Guide
Requirements
•	Node.js (v18+)
•	npm
•	OpenAI API Key 
Steps
1.	Clone Repository:
git clone stephanfdo/leadManagement-RealState
2.	Install Dependencies:
cd backend && npm install  
cd ../frontend && npm install  
3.	Configure Environment:
o	Create .env in /backend:
JWT_SECRET=your_secret_key  
OPENAI_API_KEY=sk-your-openai-key  
DB_PATH=./realestate.db  
4.	Run Migrations:
npx sequelize-cli db:migrate  
5.	Start Servers:
:Backend  
cd backend && node server.js  

:Frontend  
cd frontend && npm start  



6. Deployment Notes
•	Security: Use HTTPS, rate limiting, and firewall rules
•	ChatGPT API: Monitor usage at OpenAI Dashboard
•	Hosting: Recommended platforms:
o	Frontend: Vercel/Netlify
o	Backend: AWS EC2/Render


8.	Screenshots 

 



![l8](https://github.com/user-attachments/assets/960eadba-a199-4da1-9812-3523d428e019)

 ![l2](https://github.com/user-attachments/assets/de01a014-d017-485d-9526-db90f4ba47ea)

 ![l3](https://github.com/user-attachments/assets/9c9111ff-6afe-4d88-9f52-7b4e6c6298fe)

 ![l4](https://github.com/user-attachments/assets/1df0ebf3-990e-45ee-932b-9a020264e7a5)

![l5](https://github.com/user-attachments/assets/33f05ac5-83b7-44bd-a3a0-b558574454a1)

![l6](https://github.com/user-attachments/assets/88a3b1fa-5b4b-49eb-956a-640e362332a7)

![l7](https://github.com/user-attachments/assets/a6f3ea1f-355d-42e8-8f81-72145ffd8231)
![l8](https://github.com/user-attachments/assets/c931d5a2-bccb-4dd5-9eb6-dd834d2bf91f)

Note: This project uses the ChatGPT API for match scoring. Ensure you:
1.	Monitor API usage costs
2.	Upgrade credits as needed via OpenAI Billing
3.	Replace the API key if expired
For questions, contact: k.stephanfdo@gmail.com 

