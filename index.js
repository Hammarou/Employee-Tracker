const inquirer = require('inquirer');
const db = require('./db/queries.js')
const commands = [
  {
    type: 'list',
    name: 'command',
    message: "Select A Command",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
      'Quit'
    ]
  },
]

async function run() {
  const { command } = await inquirer.prompt(commands)

  switch (command) {
    case "View All Departments": 
      await db.viewDepartments()
      break;

    case "View All Roles":
      await db.viewRoles()
      break;
    
    case "View All Employees":
      await db.viewEmployees()
      break;
    
    case "Add Department":
      const { department } = await inquirer.prompt([
        {
          type: 'input',
          name: 'department',
          message: "Enter department name: "
        }
      ])
      
      break;
    
    case "Add Role":
      const { name, salary, departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: "Enter name of the role: "
        },
        {
          type: 'input',
          name: 'salary',
          message: "Enter salary of the role: "
        },
        {
          type: 'input',
          name: 'departmentId',
          message: "Enter department which the role belongs to: "
        }
      ])
      break;
    
    case "Add Employee":
      const { firstName, lastName, role, manager } = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter employee's first name: "
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter employee's last name: "
        },
        {
          type: 'input',
          name: 'role',
          message: "Enter employee's role: "
        },
        {
          type: 'input',
          name: 'manager',
          message: "Enter employee's manager: "
        },
      ])
      break;
  
    case "Update Employee Role":
      const { employeeId, newRole } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: "Enter employee ID: "
        },
        {
          type: 'input',
          name: 'newRole',
          message: "Enter employee's new role: "
        }
      ])
      break;

    case "Quit":
      console.log("Exit program")
      process.exit()

  }

  await run();

}



run();