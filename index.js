"use strict";

var option = 'x';
const maxGrids = 9;
var selectedGrids = [];
var arrayBidireccional = new Array(3); /* ARRAY MULTIDIMENSIONAL */


window.onload = function() {
    init();
};

function init() {
    arrayBidireccional[0] = new Array(3);
    arrayBidireccional[1] = new Array(3);
    arrayBidireccional[2] = new Array(3);

    let gridElements = document.getElementsByClassName('item');

    for (let i = 0; i < gridElements.length; i++) {
        gridElements[i].addEventListener('click', function(event) {
            console.log(event.target.attributes);
            let grid = event.target.attributes['data-id'].value;
            //this.style.background = 'yellow';

            let span = document.getElementById('spn' + grid);

            if (!this.contains(span)) {
                let draw = document.createElement('span');
                draw.id = 'spn' + grid;

                if (option === 'x') {
                    draw.innerHTML = 'X';
                } else if (option === 'o') {
                    draw.innerHTML = 'O';
                } else {
                    alert('error');
                    return;
                }

                this.appendChild(draw);

                let number = grid.split('-').splice(1).join('-');
                selectedGrids.push(number);
                insertIntoMatriz(number, option);

                //Todo: check if the user wins
                if (!checkIfWin(option)) {
                    machinePlays();
                } else {
                    alert('You win!');
                }
            }
        });
    }
}

function machinePlays() {
    if (selectedGrids.length < 10) {
        let rdm = getRandomNumber();
        selectedGrids.push(rdm);
        printMachineOption(rdm);

        if (selectedGrids.length == 9) {
            alert('No one won');
        }

        if (checkIfWin('o'))
            alert('You lose');

    } else {
        alert('No one won');
    }
}

function getRandomNumber() {
    var randomNumber = Math.floor(Math.random() * (9 - 1 + 1) + 1).toString();
    if (selectedGrids.indexOf(randomNumber) === -1) {
        return randomNumber;
    } else {
        return getRandomNumber();
    }
}

function printMachineOption(op) {
    let grid = document.getElementsByClassName('grid-' + op);
    let draw = document.createElement('span');

    draw.id = 'spn' + 'grid-' + op;

    if (option === 'x') {
        draw.innerHTML = 'O';
        insertIntoMatriz(op, 'o');
    } else if (option === 'o') {
        draw.innerHTML = 'X';
        insertIntoMatriz(op, 'x');
    } else {
        alert('error');
        return;
    }

    grid[0].appendChild(draw);
}

function insertIntoMatriz(number, player) {
    console.log(number);
    switch (number) {
        case "1":
            arrayBidireccional[0][0] = player;
            break;
        case "2":
            arrayBidireccional[0][1] = player;
            break;
        case "3":
            arrayBidireccional[0][2] = player;
            break;
        case "4":
            arrayBidireccional[1][0] = player;
            break;
        case "5":
            arrayBidireccional[1][1] = player;
            break;
        case "6":
            arrayBidireccional[1][2] = player;
            break;
        case "7":
            arrayBidireccional[2][0] = player;
            break;
        case "8":
            arrayBidireccional[2][1] = player;
            break;
        case "9":
            arrayBidireccional[2][2] = player;
            break;
        default:
            break;
    }
}

function checkIfWin(player) {
    // 8 possible cases to win

    // horizontals
    if (arrayBidireccional[0][0] == player && arrayBidireccional[0][1] == player && arrayBidireccional[0][2] == player) {
        return true
    } else if (arrayBidireccional[1][0] == player && arrayBidireccional[1][1] == player && arrayBidireccional[1][2] == player) {
        return true
    } else if (arrayBidireccional[2][0] == player && arrayBidireccional[2][1] == player && arrayBidireccional[2][2] == player) {
        return true
    }

    // verticals
    else if (arrayBidireccional[0][0] == player && arrayBidireccional[1][0] == player && arrayBidireccional[2][0] == player) {
        return true
    } else if (arrayBidireccional[0][1] == player && arrayBidireccional[1][1] == player && arrayBidireccional[2][1] == player) {
        return true
    } else if (arrayBidireccional[0][2] == player && arrayBidireccional[1][2] == player && arrayBidireccional[2][2] == player) {
        return true
    }

    //diagonals
    else if (arrayBidireccional[0][0] == player && arrayBidireccional[1][1] == player && arrayBidireccional[2][2] == player) {
        return true
    } else if (arrayBidireccional[0][2] == player && arrayBidireccional[1][1] == player && arrayBidireccional[2][0] == player) {
        return true
    }

    return false;
}