const client = require('./connection.js');

// FUNCTION GET'S ALL THE DEPARTMENTS FROM THE DATABASE
async function getAllDepartments() {
  const results = await client.query('SELECT * FROM departments ORDER BY id')
  return results.rows
};

// GET'S ALL THE ROLES FROM THE DATABASE WITH THEIR ASSOCIATED DEPARTMENTS
async function getAllRoles() {
  const results = await client.query(`
    SELECT roles.id, roles.name AS title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id`
  )
  return results.rows
};

// GET'S ALL THE EMPLOYESS FROM THE DATABASE WITH THEIR ASSOCIATED ROLES, DEPARTMENTS AND MANGER'S NAMES
async function getAllEmployees() {
  const results = await client.query(`
    SELECT e1.id, e1.first_name, e1.last_name, roles.name AS title, roles.salary, departments.name AS department, CONCAT(e2.first_name,' ', e2.last_name) AS manager
    FROM employees e1
    JOIN roles ON roles.id = e1.role_id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees e2 ON e1.manager_id = e2.id
  `)
  return results.rows
};

// RENDERING ALL THE DEPARTMENTS IN THE DATABASE INTO A TABLE
async function viewDepartments() {
 const rows = await getAllDepartments()
 console.table(rows) 
};

// ADDING A ROLE INTO THE DATABASE
async function addRole(name, salary, departmentId) {
  await client.query(`INSERT INTO roles(name, salary, department_id) VALUES ('${ name }', ${ salary }, ${ departmentId })`)
  console.log("Successfully added role")
}; 

// RENDERING ALL THE ROLES IN THE DATABASE INTO A TABLE
async function viewRoles() {
  const rows = await getAllRoles()
  console.table(rows)
};

// RENDERING ALL THE EMPLOYEES IN THE DATABASE INTO A TABLE
async function viewEmployees() {
  const rows = await getAllEmployees()
  console.table(rows)
};

// ADDING AN EMPLOYEE INTO THE DATABASE
async function addEmployee(firstName, lastName, roleId, managerId) {
  if(managerId) {
    await client.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${ firstName }','${ lastName }', ${ roleId }, ${ managerId })`)
  }
  else {
    await client.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ('${ firstName }','${ lastName }', ${ roleId })`)
  }
  console.log("Successfully added employee")
}

// ADDING A DEPARTMENT INTO THE DATABASE
async function addDepartment(departmentName) {
  await client.query(`INSERT INTO departments (name) VALUES ('${ departmentName }')`)
  console.log("Successfully added department")
}

// UPDATES THE EMPLOYEE'S ROLE
async function updateEmployeeRole(employeeId, roleId) {
  await client.query(`UPDATE employees SET role_id = ${ roleId } WHERE id = ${ employeeId }`)
  console.log("Successfully updated employee role")
}

// EXPORTING ALL PUBLIC FUNCTIONS
module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  viewDepartments, 
  addRole, 
  viewRoles, 
  viewEmployees, 
  addEmployee, 
  addDepartment, 
  updateEmployeeRole
};