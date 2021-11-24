
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
        ['', '1', '2', '2', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
    ]
}

function markMoviesFrom() {
    figure_step();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveFrom(x, y)) {
                step[x][y] = 1;
            }
        }        
    }
}

function canMoveFrom(x, y) {
    return getColor(x ,y) == start_side_color;
}

function getColor(x ,y) {
    let figure = map[x][y];
    if (figure == "") return "";
    return (figure.toUpperCase() == figure) ? 'white' : 'black'
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
                step[x][y] == '1'  ? color = "brown" : color = "lightblue";
            }
            html += `<td style="background-color: ${color}">${figureToHtml(map[x][y])}</td>`
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

init_map();
markMoviesFrom();
figureToHtml();
show_map();