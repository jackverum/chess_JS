
let chess = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]

function draw() {
    let out = '';
    let m = 0;

    for (let i = 0; i < chess.length; i++) {
        const arr = chess[i];

        for (let k = 0; k < arr.length; k++) {
            // const element = arr[k];
            if (m % 2 === 0) {
                out += '<div class="chess-block" data-x></div>';
            }
            else {
                out += '<div class="chess-block bg-black"></div>';
            }
           
            m++;
        }
        m++;
        
    }
    document.querySelector('#field').innerHTML = out;
}

// draw();

let map = [];
let step = [];
let start_side_color = 'white';

// Save coordinate where user move from
let move_from_x;
let move_from_y;

function init_map() {
    map = [
        ['R', 'P','', '','', '','p', 'r'],
        ['N', 'P','', '','', '','p', 'n'],
        ['B', 'P','', '','', '','p', 'b'],
        ['Q', 'P','', '','', '','p', 'q'],
        ['K', 'P','', '','', '','p', 'k'],
        ['B', 'P','', '','', '','p', 'b'],
        ['N', 'P','', '','', '','p', 'n'],
        ['R', 'P','', '','', '','p', 'r'],
    ]    
}

function figure_step() {
    step = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
    ]
}

function figureToHtml(figure) {
    switch (figure) {
        case 'K': return '&#9812;'; case 'k': return '&#9818;';
        case 'Q': return '&#9813;'; case 'q': return '&#9819;';
        case 'R': return '&#9814;'; case 'r': return '&#9820;';
        case 'B': return '&#9815;'; case 'b': return '&#9821;';
        case 'N': return '&#9816;'; case 'n': return '&#9822;';
        case 'P': return '&#9817;'; case 'p': return '&#9823;';
        default: return '&nbsp;';
    }
}


function mark_Moves_From() {
    figure_step();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveFrom(x, y)) {
                step[x][y] = 1;
            }
        }        
    }
}
function mark_Moves_To() {
    figure_step();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveTo(x, y)) {
                step[x][y] = 2;
            }
        }        
    }
}

function canMoveFrom(x, y) {
    return getColor(x ,y) == start_side_color;
}
function canMoveTo(x, y) {
    if(map[x][y] == ' ') {
        return true;
    }

    return getColor(x ,y) !== start_side_color; //white can move to black
}

function getColor(x ,y) {
    let figure = map[x][y];
    if (figure == "") return "";
    return (figure.toUpperCase() == figure) ? 'white' : 'black'
}



document.querySelector('#field').addEventListener('click', el => {
// document.querySelectorAll('.chess-block').forEach(el => {
    // el.onclick = figure_coordinate(el);
    let x = el.target.dataset.x;
    let y = el.target.dataset.y;
    if (!x || !y) return;
    console.log(x, y);

    if (step[x][y] == '1') {
        click_box_from(x, y);
    }
    if (step[x][y] == '2') {
        click_box_to(x, y);
    }
});

// function figure_coordinate(el) {
//     console.log(el.target.dataset.x, el.target.dataset.y);
    
//     // let x = el.target.dataset.x;
//     // let y = el.target.dataset.y;

//     // if (step[x][y] == '1') {
//     //     // click_box_from(x, y);
//     // }
//     // if (step[x][y] == '2') {
//     //     click_box_to(x, y);
//     // }
// }

// The cell where figure moves from
function click_box_from(x, y) {
    move_from_x = x;
    move_from_y = y;
    mark_Moves_To();
    show_map();
}
// The cell where figure moves to
function click_box_to(x, y) {
    map[x][y] = map[move_from_x][move_from_y];
    map[move_from_x][move_from_y] = '';
    turn_move();
    mark_Moves_From();
    show_map();
}

function turn_move() {
    // if (start_side_color = 'white') {
    //     start_side_color = 'black';
    // } else {
    //     start_side_color = 'white';
    // }
    start_side_color = (start_side_color = 'white') ? 'black' : 'white';
}


function drop(params) {
    let ball = document.getElementById('ball');
     
    // ball.ondragstart = () => false;

    let currentDroppable = null;

ball.onmousedown = function(event) {

let shiftX = event.clientX - ball.getBoundingClientRect().left;
let shiftY = event.clientY - ball.getBoundingClientRect().top;

ball.style.position = 'absolute';
ball.style.zIndex = 1000;
document.body.append(ball);

moveAt(event.pageX, event.pageY);

function moveAt(pageX, pageY) {
ball.style.left = pageX - shiftX + 'px';
ball.style.top = pageY - shiftY + 'px';
}

function onMouseMove(event) {
moveAt(event.pageX, event.pageY);

ball.hidden = true;
// debugger
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
ball.hidden = false;

if (!elemBelow) return;

let droppableBelow = elemBelow.closest('.droppable');
if (currentDroppable != droppableBelow) {
  if (currentDroppable) { // null если мы были не над droppable до этого события
    // (например, над пустым пространством)
    leaveDroppable(currentDroppable);
  }
  currentDroppable = droppableBelow;
  if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
    // (например, только что покинули droppable)
    enterDroppable(currentDroppable);
  }
}
}

document.addEventListener('mousemove', onMouseMove);

ball.onmouseup = function() {
document.removeEventListener('mousemove', onMouseMove);
ball.onmouseup = null;
};

};
}

function show_map() {
    let html = '<table>';
    // let m = 0;
    for (let y = 7; y >= 0; y--) {
        html += '<tr>';
        html += '<td>' + (y + 1) + '</td>';

        // for (let x = 0; x <= 7; x++) {
        //     if ((y + x) %  2) {
        //         html += `<td>${figureToHtml(map[x][y])}</td>`;            
                
        //     } else {

        //         html += `<td style="background-color: #000">${figureToHtml(map[x][y])}</td>`            
        //     }
        //     // x++;
        // }

        for (let x = 0; x <= 7; x++) {
            if (step[x][y] == '') {
                // html += `<td>${figureToHtml(map[x][y])}</td>`;   
                ((y + x) %  2) ? color = "#fff" : color = "#0e0";
            } else {
                step[x][y] == '1'  ? color = "#542aa5" : color = "lightblue";
            }
            html += `<td style="background-color: ${color}" data-x="${x}" data-y="${y}">${figureToHtml(map[x][y])}</td>`
        }
        html += '</tr>';

    }
    html += '<tr>';
    html += '<td>&nbsp</td>';
    for (let x = 0; x <= 7; x++) {
        html += '<td>' + x + '</td>';
    }
    html += '</tr>';

    document.querySelector('#field').innerHTML = html;

}

!function start() {
    init_map();
    mark_Moves_From();
    show_map();  
}();