const inquirer = require('inquirer')
const fs = require('fs');

 const setShape = require('./lib/setShape.js');

const fileContent = "./examples/logo.svg";

//color selection
const colorKeywords = ['aliceblue', 'antiquewhite', 'aqua', 'aquaMarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']



let promptQuestions = () => {

    return inquirer.prompt([
        // ***SHAPE***
        {
            name: 'shape',
            message: 'What is the shape of your logo?',
            type: 'list',
            choices: ['Circle', 'Square', 'Triangle'],
        },
    
        // ****SHAPE COLOR***
        // user choose color keyword or hexadecimal for shapeColor
        {
            name: 'shapeColorChoice',
            message: 'What is the color of the shape? Choose a color format: ',
            type: 'list',
            choices: ['colorkeyword', 'hexadecimal']
        },
        // color keyword (validate with colorKeywords array)
        {
            type: "input",
            name: "shapeColor",
            message: "Enter the shape color keyword",
            when: (answers) => {
                if(answers.shapeColorChoice === 'colorkeyword') {
                    return true;
                }
                return false;
            },
            validate: (answer) => {
                let answerLowercase = answer.toLowerCase();
                for (var i = 0, len = colorKeywords.length; i < len; ++i) {
                    if (answerLowercase.indexOf(colorKeywords[i]) != -1) {
                    return true;
                }}
                return console.log("\n Please enter a valid color keyword")
            }
        },
        // hexadecimal (validate hexadecimal with RegEx pattern)
        {
            type: "input",
            name: "shapeColor",
            message: "Enter the shape hexadecimal number (#CCCCCC)",
            when: (answers) => {
                if(answers.shapeColorChoice === 'hexadecimal') {
                    return true;
                }
                return false;
            },
            validate: (answer) => {
                const hexRegEx = '^#[A-Fa-f0-9]{6}$'
                if (!answer.match(hexRegEx)) {
                    return console.log("\n Please enter a valid hexadecimal")
                }
                return true;
            }
        },
    
        // ***TEXT***
        // validate user can only submit 3 characters
        {
            name: 'text',
            message: 'What is the text? (three character maximum)',
            type: 'input',
            validate: (answer) => {
                if (answer.length > 3) {
                    return console.log("\n Text must be three characters or less! Please try again");
                }
                return true;
            }
        },
    
        // ***TEXT COLOR***
        // user choose color keyword or hexadecimal for textColor
        {
            name: 'textColorChoice',
            message: 'What is the color of the text? Choose a color format: ',
            type: 'list',
            choices: ['colorkeyword', 'hexadecimal']
        },
        // color keyword (validate with colorKeywords array)
        {
            type: "input",
            name: "textColor",
            message: "Enter the text color keyword",
            when: (answers) => {
                if(answers.textColorChoice === 'colorkeyword') {
                    return true;
                }
                return false;
            },
            validate: (answer) => {
                let answerLowercase = answer.toLowerCase();
                for (var i = 0, len = colorKeywords.length; i < len; ++i) {
                    if (answerLowercase.indexOf(colorKeywords[i]) != -1) {
                    return true;
                }}
                return console.log("\n Please enter a valid color keyword")
            }
        },
        // hexadecimal (validate hexadecimal with RegEx pattern)
        {
            type: "input",
            name: "textColor",
            message: "Enter the text hexadecimal number (#CCCCCC)",
            when: (answers) => {
                if(answers.textColorChoice === 'hexadecimal') {
                    return true;
                }
                return false;
            },
            validate: (answer) => {
                const hexRegEx = '^#[A-Fa-f0-9]{6}$'
                if (!answer.match(hexRegEx)) {
                    return console.log("\n Please enter a valid hexadecimal")
                }
                return true;
            }
        },
    ])
        .then((response) => {
            const svg = setShape(response);
            fs.writeFile(fileContent, svg, ()=> console.log('Generated logo.svg'));
        })
        .catch(err => {
            console.log(err)
        });

}


//call functuon
function init() {
    promptQuestions()
}
init()