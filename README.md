# User Management App



https://github.com/user-attachments/assets/3a71c7be-8d38-4169-8e19-8e482572be6a


 
A full-stack user management web application built with **Node.js**, **Express**, **EJS**, and **MySQL** — demonstrating complete CRUD operations with a real relational database.
 
---
 
## Features
 
-  Home page showing total number of users in the database
-  View all users from MySQL database
-  Add a new user (username, email, password)
-  Edit / Update username (with password verification)
-  Delete a user (with password verification)
-  Password-protected update and delete actions
-  Faker.js integration for generating random user data

---

## 🔗 API Routes
 
| Method | Route | Description |
|---|---|---|
| GET | `/` | Home page — total user count |
| GET | `/user` | View all users |
| GET | `/user/new` | Show add user form |
| POST | `/user/new` | Add a new user |
| GET | `/user/:id/edit` | Show edit form |
| PATCH | `/user/:id` | Update username (password required) |
| GET | `/user/:id/delete` | Show delete confirmation |
| DELETE | `/user/:id` | Delete user (password required) |
 
---
 
## Acknowledgement & Help
 
This project is still in progress and I am continuously learning and improving it.
 
If you have any suggestions, improvements, or feedback — feel free to:
 
-  *Star* this repo if you found it helpful
-  Open an **Issue** if you find any bugs
-  Submit a **Pull Request** if you want to contribute
-  Reach out to me directly

> **Note:** I am actively looking for help and guidance to improve this project further —  
> whether it's better code structure, UI improvements, adding authentication, or any other enhancements.  
> Any kind of contribution or suggestion is warmly welcome! 
 
---
 
## 👤 Author
 
**Jabir** — built as part of learning MySQL with Node.js and Express.js.
 
- GitHub: [@Muhammad-Jabir](https://github.com/Muhammad-Jabir)
- Email: bhaiahmad3122@gmail.com
