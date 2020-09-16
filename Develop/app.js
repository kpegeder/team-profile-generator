const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "managerName"
  },
  {
    type: "input",
    message: "What is your manager's id?",
    name: "managerId"
  },
  {
    type: "input",
    message: "What is your manager's email?",
    name: "managerEmail"
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "managerOfficeNumber"
  }
];

const employeeType = [
  {
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "teamType",
    choices: ["Engineer", "Intern", "I don't want to add any more team member"]
  }
];

const addEngineerQuestion = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "engineerName"
  },
  {
    type: "input",
    message: "What is your engineer's Id?",
    name: "engineerId"
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "engineerEmail"
  },
  {
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "engineerGithub"
  }
];

const addInternQuestion = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "internName"
  },
  {
    type: "input",
    message: "What is your intern's Id?",
    name: "internId"
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "internEmail"
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "internSchool"
  }
];

async function promptUser() {
  // Create array for team members and object
  const arrayIntern = [];
  const arrayEngineer = [];
  const arrayManager = [];
  const answers = {};

  // Get answers for manager
  let manager = await inquirer.prompt(questions);
  arrayManager.push(manager);

  // Type of team member
  let memberType = await inquirer.prompt(employeeType);
  console.log(memberType.teamType);
  while (memberType.teamType != "I don't want to add any more team member") {
    switch (memberType.teamType) {
      case "Engineer":
        let engineer = await inquirer.prompt(addEngineerQuestion);
        arrayEngineer.push(engineer);
        memberType = await inquirer.prompt(employeeType);
        break;
      case "Intern":
        let intern = await inquirer.prompt(addInternQuestion);
        arrayIntern.push(intern);
        memberType = await inquirer.prompt(employeeType);
        break;
    }
  }

  answers.Manager = arrayManager;
  answers.Engineer = arrayEngineer;
  answers.Intern = arrayIntern;
  render(answers);
  return answers;
}

promptUser();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
