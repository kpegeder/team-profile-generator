const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// List of questions
const questions = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "managerName",
    validate: verifyName,
  },
  {
    type: "input",
    message: "What is your manager's id?",
    name: "managerId",
    validate: verifyNumber,
  },
  {
    type: "input",
    message: "What is your manager's email?",
    name: "managerEmail",
    validate: verifyEmail,
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "managerOfficeNumber",
    validate: verifyNumber,
  },
];

const employeeType = [
  {
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "teamType",
    choices: ["Engineer", "Intern", "I don't want to add any more team member"],
  },
];

const addEngineerQuestion = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "engineerName",
    validate: verifyName,
  },
  {
    type: "input",
    message: "What is your engineer's Id?",
    name: "engineerId",
    validate: verifyNumber,
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "engineerEmail",
    validate: verifyEmail,
  },
  {
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "engineerGithub",
    validate: verifyGithub,
  },
];

const addInternQuestion = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "internName",
    validate: verifyName,
  },
  {
    type: "input",
    message: "What is your intern's Id?",
    name: "internId",
    validate: verifyNumber,
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "internEmail",
    validate: verifyEmail,
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "internSchool",
    validate: verifySchool,
  },
];

async function promptUser() {
  // Create array for team members
  const employee = [];

  // Get answers for manager
  let ansMan = await inquirer.prompt(questions);
  const manager = new Manager(
    ansMan.managerName,
    ansMan.managerId,
    ansMan.managerEmail,
    ansMan.managerOfficeNumber
  );

  // Type of team member
  let memberType = await inquirer.prompt(employeeType);

  while (memberType.teamType != "I don't want to add any more team member") {
    if (memberType.teamType === "Engineer") {
      let ansEng = await inquirer.prompt(addEngineerQuestion);
      const engineer = new Engineer(
        ansEng.engineerName,
        ansEng.engineerId,
        ansEng.engineerEmail,
        ansEng.engineerGithub
      );
      employee.push(engineer);
      memberType = await inquirer.prompt(employeeType);
    } else {
      let ansInt = await inquirer.prompt(addInternQuestion);
      const intern = new Intern(
        ansInt.internName,
        ansInt.internId,
        ansInt.internEmail,
        ansInt.internSchool
      );
      employee.push(intern);
      memberType = await inquirer.prompt(employeeType);
    }
  }

  employee.push(manager);
  return employee;
}

async function init() {
  const team = await promptUser();

  fs.writeFileSync(outputPath, render(team));
}

init();

// Validation functions
function verifyNumber(input) {
  if (isNaN(input) || input === "") {
    return "Please enter a number";
  } else if (input.length >= 9) {
    return "Please enter a number under 10 digits";
  } else if (input < 0) {
    return "Please enter a positive number";
  }

  return true;
}

function verifyName(name) {
  if (name === "") {
    return "Please enter a name";
  } else if (!isNaN(name)) {
    return "Please don't enter a number";
  } else if (name.length > 26) {
    return "Please enter a shorter name";
  }

  return true;
}

function verifySchool(name) {
  if (name === "") {
    return "Please enter a school name";
  } else if (!isNaN(name)) {
    return "Please don't enter a number";
  } else if (name.length > 26) {
    return "Please enter a shorter school name";
  }
  return true;
}

function verifyEmail(name) {
  if (name === "") {
    return "Please enter an email name";
  } else if (!name.includes("@")) {
    return "Please enter an email with @";
  } else if (name.length > 26) {
    return "Please enter a shorter name";
  }
  return true;
}

function verifyGithub(name) {
  if (name === "") {
    return "Please enter a name";
  } else if (name.length > 39) {
    return "Please enter a shorter username";
  }
  return true;
}
