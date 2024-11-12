const client = require('./connection.js');

async function viewDepartments() {
 const results = await client.query('SELECT * FROM departments')
 console.table(results.rows) 
};

async function addRole(name, salary, departmentId) {
  await client.query(`INSERT INTO roles(name, salary, department_id) VALUES ('${ name }', ${ salary }, ${ departmentId })`)
  console.log("Successfully added role")
}; 

async function viewRoles() {
  const results = await client.query(`
    SELECT roles.id, roles.name AS title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id`
  )
  console.table(results.rows)
};

async function viewEmployees() {
  const results = await client.query(`
    SELECT e1.id, e1.first_name, e1.last_name, roles.name AS title, roles.salary, departments.name AS department, CONCAT(e2.first_name,' ', e2.last_name) AS manager
    FROM employees e1
    JOIN roles ON roles.id = e1.role_id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees e2 ON e1.manager_id = e2.id
  `)
  console.table(results.rows)
};

async function addEmployee(firstName, lastName, roleId, managerId) {
  if(managerId) {
    await client.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${ firstName }','${ lastName }', ${ roleId }, ${ managerId })`)
  }
  else {
    await client.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ('${ firstName }','${ lastName }', ${ roleId })`)
  }
  console.log("Successfully added employee")
}

async function addDepartment(departmentName) {
  await client.query(`INSERT INTO departments (name) VALUES ('${ departmentName }')`)
  console.log("Successfully added department")
}

async function updateEmployeeRole(employeeId, roleId) {
  await client.query(`UPDATE employees SET role_id = ${ roleId } WHERE id = ${ employeeId }`)
  console.log("Successfully updated employee role")
}


module.exports = {
  viewDepartments, 
  addRole, 
  viewRoles, 
  viewEmployees, 
  addEmployee, 
  addDepartment, 
  updateEmployeeRole
};