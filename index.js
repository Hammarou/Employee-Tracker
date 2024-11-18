const inquirer = require('inquirer');
// IMPORTING queries.js MODULE
const db = require('./db/queries.js')


// SETTING UP COMMAND OPTIONS FOR THE PROGRAM
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
      "Quit"
    ]
  },
]

// GETTING ALL DEPARTMENT CHOICES FOR THE USER
async function getDepartmentChoices() {
  const departments = await db.getAllDepartments()
  const choices = departments.map(department => ({
    name: department.name,
    value: department.id
  }))

  return choices
};

// GETTING ALL ROLE CHOICES FOR THE USER
async function getRoleChoices() {
  const roles = await db.getAllRoles()
  const choices = roles.map(role => ({
    name: role.title,
    value: role.id
  }))

  return choices
};

// GETTING ALL EMPLOYEE CHOICES FOR THE USER
async function getEmployeeChoices() {
  const employees = await db.getAllEmployees()
  const choices = employees.map(employee => ({
    name: `${employee.first_name} ${ employee.last_name }`,
    value: employee.id
  }))

  return choices
};

// ENTRY POINT
async function run() {
  // PROMPTS THE USER FOR A COMMAND AND THEN STORES THEIR CHOICE 
  const { command } = await inquirer.prompt(commands)

  // CONDITIONALLY EXECUTES CODE BASED ON THE COMMAND CHOICE OF THE USER
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
      // PROMPTS THE USER TO MANUALLY INPUT A DEPARTMENT NAME
      const { department } = await inquirer.prompt([
        {
          type: 'input',
          name: 'department',
          message: "Enter department name: "
        }
      ])

      await db.addDepartment(department)
      
      break;
    
    case "Add Role":
      // PROMPTS THE USER TO MANUALLY INPUT THE name, salary AND THEN SELECT AN EXISTING departmentId
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
          type: 'list',
          name: 'departmentId',
          message: "Select the department which this role belongs to: ",
          choices: await getDepartmentChoices()
        }
      ])

      await db.addRole(name, salary, departmentId)

      break;
    
           
      case "Add Employee":
        // PROMPTS THE USER TO MANUALLY INPUT THE firstName, lastName AND THEN SELECT AN EMPLOYEE'S role AND manager
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
          type: 'list',
          name: 'role',
          message: "Select employee's role: ",
          choices: await getRoleChoices()
        },
        {
          type: 'list',
          name: 'manager',
          message: "Select the employee's manager: ",
          choices: await getEmployeeChoices()
        },
      ])

      await db.addEmployee(firstName, lastName, role, manager)

      break;
  
    case "Update Employee Role":
      // PROMPTS THE USER TO SELECT AN EMPLOYEE AND THE EMPLOYEE'S NEW ROLE
      const { employeeId, newRole } = await inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Select an employee: ",
          choices: await getEmployeeChoices()
        },
        {
          type: 'list',
          name: 'newRole',
          message: "Select employee's new role: ",
          choices: await getRoleChoices()
        }
      ])

      await db.updateEmployeeRole(employeeId, newRole)

      break;


    case "Quit":
      console.log("Exit program")
      process.exit()

  }

  await run();

}



run();