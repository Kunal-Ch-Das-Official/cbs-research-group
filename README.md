# CBS Research Group Backend


# Overview
The CBS Research Group Backend is a RESTful API designed to manage the operations of the CBS Research Group. This API is built with Node.js and Express.js, leveraging MongoDB for data storage. The backend supports various functionalities, including user authentication, CRUD operations, and automated email services.

# Table of Contents
* Project Information
* Technology Stack
* Architecture
* Features
* Routes
* Base URLs
* Single Endpoints
* Multiple Endpoints
* Setup and Installation
* Usage
* Contributing
* License


# Project Information
* Project Name: CBS Research Group Backend
* Owner: Dr. Chinmoy Bhattachary
* Organization: CBS Research Group
* About Organization: CBS Research Group is a chemistry research lab, under (Indian Institute of Engineering Science and Technology)
  Shibpur (IIEST, Shibpur) has a more than 160 years long and rich history.
* Adress: Botanic Garden, Dist: Howrah, West Bengal, India - 711103  +91 (033) 2668 4561 to 63  +91 (033) 2668 2916 (Fax)  
* Author: Kunal Chandra Das
* Position: Web Developer


# Technology Stack
* Backend Framework: Express.js
* Runtime: Node.js
* Database: MongoDB
* Cloud Provider: Cloudinary
* File Handling: Multer
* Authentication: json web token, uuid
* Cacheing: node-cache



# Architecture
The backend follows a Multi-Tier Architecture, ensuring separation of concerns and scalability.

# Features
* CRUD Operations: Manage data for various entities such as alumni, members, projects, and more.
* Authentication: Secure login and registration for admin users.
* Automatic Email Service: Send emails for registration, password reset, and contact responses.
* Data Cacheing: Autometically cached the data after first request.
* And many more.


## Routes:

# Base URLs
```
|---------------------------------------------------------------------------------------------------------|
| Route Name	             |  Base URL                                                                  |
|---------------------------------------------------------------------------------------------------------|
| Admin Authentication       | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-admin       |
|---------------------------------------------------------------------------------------------------------|
| Admin Registration Request | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/register-request|
|---------------------------------------------------------------------------------------------------------|
| Contact Us                 | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/contact-us      |
|---------------------------------------------------------------------------------------------------------|
| Doctorate Alumni           | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/doctorate       |
|---------------------------------------------------------------------------------------------------------|
| Masters Alumni             | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/masters         |
|---------------------------------------------------------------------------------------------------------|
| PHD Members                | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/phd             |
|---------------------------------------------------------------------------------------------------------|
| MSC Members                | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/msc             |
|---------------------------------------------------------------------------------------------------------|
| Current Group News         | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/latest-news     |
|---------------------------------------------------------------------------------------------------------|
| Lab Instruments            | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/facilities      |
|---------------------------------------------------------------------------------------------------------| 
| Projects                	 | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/cbs-labs        |
|---------------------------------------------------------------------------------------------------------|
| Publication                | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/publication     |
|---------------------------------------------------------------------------------------------------------|
| Personal Awards            | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/personal        |
|---------------------------------------------------------------------------------------------------------|
| Team Awards                | /iiest-shibpur/chemistry-department/cbs-research-groups/v1/team            |
|---------------------------------------------------------------------------------------------------------|
```



# Single Endpoints
```
|-----------------------------------------|
| Entity 	           | Endpoint         |
|-----------------------------------------| 
| Doctorate Alumni     | /alumni-data     |
|-----------------------------------------|
| Masters Alumni       | /alumni-data     |
|-----------------------------------------|
| PHD Members          | /members         |
|-----------------------------------------| 
| MSC Members          | /members         |
|-----------------------------------------|
| Current Group News   | /groups          |
|-----------------------------------------|
| Lab Instruments      | /lab-instruments |
|-----------------------------------------|
| Projects             | /projects        |
|-----------------------------------------|
| Publication          | /about-info      |
|-----------------------------------------|
| Personal Awards      | /awards          | 
|-----------------------------------------|
| Team Awards          | /awards          |
|-----------------------------------------|
```


## Multiple Endpoints:

# Admin Authentication:
```
|--------------------------------------------------------|
| Action 	               | Endpoint                    |
|--------------------------------------------------------| 
| Admin Registration       | /register                   |
|--------------------------------------------------------|
| Admin Login              | /login                      |
|--------------------------------------------------------|
| Get Logged-in Admin      | /logged-in-admin            | 
|--------------------------------------------------------|
| Change Password          | /change-password            |
|--------------------------------------------------------|
| Send Password Reset Link | /send-reset-password-link   |
|--------------------------------------------------------|
| Reset Password           | /reset-password/:id/:token  |
|--------------------------------------------------------|
| Projects                 | /projects                   |
|--------------------------------------------------------|
| Publication              | /about-info                 |
|--------------------------------------------------------|
| Personal Awards          | /awards                     | 
|--------------------------------------------------------|
| Team Awards              | /awards                     |
|--------------------------------------------------------|
```	

# Admin Registration Request
```
|------------------------------------|	
| Action 	     | Endpoint          |
|------------------------------------| 
| Create Request | /admin            |
|------------------------------------|
| Get Requests   | /admin            |
|------------------------------------|
| Delete Request | /admin            | 
|------------------------------------|
| Accept Request | /admin-accept/:id |
|------------------------------------|
| Reject Request | /admin-denied/:id |
|------------------------------------|
```
	
	
# Contact Us
```
|-----------------------------------------|
| Action 	         | Endpoint           |
|-----------------------------------------| 
| Post Information   | /information       |
|-----------------------------------------|
| Get Information    | /information       |
|-----------------------------------------|
| Delete Information | /information       | 
|-----------------------------------------|
| Send Response      | /response-mail/:id |
|-----------------------------------------|
```


## Setup and Installation

* Clone the Repository:
```bash
  git clone https://github.com/Kunal-Ch-Das-Official/cbs-research-group.git
```
* Navigate to the Project Directory:
```bash
 cd cbs-research-group-backend
```
Install Dependencies:
```bash
 npm install
```
Set Up Environment Variables:
Create a .env file and configure the necessary environment variables (e.g., MongoDB URI, Cloudinary API keys, etc.).

Run the Server In Development:
```bash
 npm run dev
```
Run the Server In Production:
```bash
 npm start
```

# Usage
* Use tools like Postman to interact with the API endpoints.
* Implement the routes according to the base URLs and endpoints provided.
# Contributing
* Contributions are welcome! Please fork the repository and create a pull request with your changes.

# License
* This project is licensed under the MIT License.