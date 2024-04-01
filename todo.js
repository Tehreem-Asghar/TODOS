#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
async function todoApp() {
    let storeData = [];
    let condition = true;
    console.log(chalk.bgGreen.white.bold("\n\t\tWELCOM TO TODO APPLICATION\n"));
    let add = await inquirer.prompt([
        {
            name: "Add",
            type: "input",
            message: chalk.magenta("What do you want to add in your todo list? enter pleas."),
        },
    ]);
    storeData.push(add.Add);
    console.log(chalk.green(storeData), chalk.yellow("Successfully add in your todo list"));
    let again = true;
    while (again) {
        let moreAdd = await inquirer.prompt([
            {
                name: "addMore",
                type: "confirm",
                message: chalk.magenta("Do you want to add more!?"),
                default: false,
            },
        ]);
        if (!moreAdd.addMore) {
            again = false;
            continue;
        }
        let Add = await inquirer.prompt([
            {
                name: "add",
                type: "input",
                message: chalk.blue("Add Item..."),
            },
        ]);
        storeData.push(Add.add);
        console.log(chalk.green(storeData), chalk.yellow("add successfuly."));
    }
    let Select = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: chalk.magenta(" Select an operation that you want to do in your todo list"),
            choices: [
                chalk.yellow("update"),
                chalk.red("view"),
                chalk.green("delete"),
                chalk.blue("exit"),
            ],
        },
    ]);
    if (Select.select == chalk.yellow("update")) {
        while (condition) {
            let update = await inquirer.prompt([
                {
                    name: "Update",
                    type: "list",
                    message: chalk.magenta("Select an item that you want to update"),
                    choices: storeData,
                },
            ]);
            let addtodo = await inquirer.prompt([
                {
                    name: "Add",
                    type: "input",
                    message: chalk.magenta("Add Item..."),
                },
            ]);
            let newTodo = storeData.filter((val) => val !== update.Update);
            storeData = [...newTodo, addtodo.Add];
            console.log(chalk.blue(storeData), chalk.yellow.bold("Update Successfully.."));
            let moreAdd = await inquirer.prompt([
                {
                    name: "addMore",
                    type: "confirm",
                    message: chalk.magenta("Do you want to update more!?"),
                    default: false,
                },
            ]);
            condition = moreAdd.addMore;
        }
    }
    else if (Select.select == chalk.red("view")) {
        console.log(chalk.cyan(storeData));
    }
    else if (Select.select == chalk.green("delete")) {
        let delet = await inquirer.prompt([
            {
                name: "Delet",
                type: "list",
                message: chalk.magenta("what do you want to delet choise pleas."),
                choices: storeData,
            },
        ]);
        let Delet = storeData.filter((val) => val !== delet.Delet);
        storeData = [...Delet];
        console.log(chalk.red(storeData), chalk.yellow.bold("Successfully Delet from your todo..."));
    }
    else if (Select.select == chalk.blue("exit")) {
        console.log(chalk.blue("Exit"));
    }
    let Another = await inquirer.prompt([
        {
            message: chalk.magenta.bold("Do you Want To do again Run todo app ?"),
            type: "list",
            name: "Again",
            choices: ["Yes", "No"],
        },
    ]);
    if (Another.Again === "Yes") {
        todoApp();
    }
}
todoApp();
