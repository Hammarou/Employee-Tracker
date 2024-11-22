# Employee Tracker


## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Video Demonstration](#video-demonstration)
- [Application Screenshots](#application-screenshots)
- [GitHub Deployment Location (HTTPS)](#github-deployment-location-https)
- [GitHub Repository Location (HTTPS)](#github-repository-location-https)
- [Credits](#credits)
- [Contributions](#contributions)
- [License](#license)


## Description

-Greetings!

The **Employee Tracker** is a command-line application designed to help business owners manage their employee database. It allows users to view and manage departments, roles, and employees in a company, making it easier to organize and plan the business.


## Features

- View all departments, roles, and employees.
- Add new departments and roles.
- Add employees with specific roles and optional managers.
- Update existing employees' roles.
- Flexible user interface with Inquirer for easy navigation.


## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **PostgreSQL**: Relational database for storing employee data.
- **Inquirer**: Command-line interface for user interaction.
- **pg**: PostgreSQL client for Node.js.


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Hammarou/Employee-Tracker.git
   ```
2. Navigate into the project directory:
   ```bash
   cd employee-tracker
   ```
3. Install the required packages:
   ```bash
   npm install
   ```
4. Set up your PostgreSQL database:
   - Create a database named `employee_tracker`.
   - Create tables for `departments`, `roles`, and `employees` using the provided SQL commands.
    ```sql
    /* Create departments table */
    CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

    /* Create roles table */
    CREATE TABLE roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        salary NUMERIC(10, 2) NOT NULL,
        department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL
    );

    /* Create employees table */
    CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
        manager_id INTEGER REFERENCES employees(id) ON DELETE SET NULL
    );

    ```


5. Create a `.env` file in the root of the project and add your database connection details:
   ```plaintext
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=employee_tracker
   DB_PORT=5432
   ```


## Usage
1. Start the application by running:
   ```bash
   npm run start
   ```
2. Follow the prompts in the command line to interact with the application:
   - Select an action from the main menu (view departments, roles, employees, add entities, or update roles).
   - Provide input as required by the prompts.


## Video Demonstration

To view a video demonstration of the application, please click the following link:

https://drive.google.com/file/d/1fAOE8NSzhSz-x52p9u88UTd0_jsRZX0D/view


## Application Screenshots

![screenshot1](/assets/images/screenshot1.png)
![screenshot2](/assets/images/screenshot2.png)
![screenshot3](/assets/images/screenshot3.png)
![screenshot4](/assets/images/screenshot4.png)


## GitHub Deployment Location (HTTPS)

N/A

* Note: The **Employee Tracker** is a node.js command line interface (CLI) application. Therefore, it cannot be hosted through an internet browser. 


## GitHub Repository Location (HTTPS)

https://github.com/Hammarou/Employee-Tracker


## Credits

N/A


## Contribution

Feel free to fork this application, submit issues, or make pull requests if you have suggestions or improvements. Contributions are welcome!


## License
This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details.