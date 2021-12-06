
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
let move_color = 'white';

// Save coordinate where user move from
let move_from_x;
let move_from_y;

function init_map() {
		map = [
				['R', 'P',' ', ' ', ' ', ' ', 'p', 'r'],
				['N', 'P',' ', ' ', ' ', ' ', 'p', 'n'],
				['B', 'P',' ', ' ', ' ', ' ', 'p', 'b'],
				['Q', 'P',' ', ' ', ' ', ' ', 'p', 'q'],
				['K', 'P',' ', ' ', ' ', ' ', 'p', 'k'],
				['B', 'P',' ', ' ', ' ', ' ', 'p', 'b'],
				['N', 'P',' ', ' ', ' ', ' ', 'p', 'n'],
				['R', 'P',' ', ' ', ' ', ' ', 'p', 'r'],
		]    
}

function init_step() {
		step = [
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], 
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
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

																								// Show where figure make moves (source and destination)
function can_Move(sx, sy, dx, dy) {
	
	if (!can_Move_From(sx, sy)) return false;
	if (!can_Move_To(dx, dy)) return false;
	// Check correct moves acooding to the chess rules
	if (!is_Correct_Move(sx, sy, dx, dy)) return false;
	return true; 
}

function is_Correct_Move(sx, sy, dx, dy) {
	// let figure - we get know what the figure is in current cell
	let figure = map[sx][sy];

	if (is_King(figure))   {
		return is_Correct_King_Move(sx, sy, dx, dy);
	}
	if (is_Queen(figure))  {
		return is_Correct_Queen_Move(sx, sy, dx, dy);
	}
	if (is_Bishop(figure)) {
		return is_Correct_Bishop_Move(sx, sy, dx, dy);
	}
	if (is_Knight(figure)) {
		return is_Correct_Knight_Move(sx, sy, dx, dy);
	}
	if (is_Rook(figure))   {
		return is_Correct_Rook_Move(sx, sy, dx, dy);
	}
	if (is_Pawn(figure))   {
		return is_Correct_Pawn_Move(sx, sy, dx, dy);
	}
	return true;
}

function is_King  (figure) {return figure.toUpperCase() == 'K'};
function is_Queen (figure) {return figure.toUpperCase() == 'Q'};
function is_Bishop(figure) {return figure.toUpperCase() == 'B'};
function is_Knight(figure) {return figure.toUpperCase() == 'N'};
function is_Rook  (figure) {return figure.toUpperCase() == 'R'};
function is_Pawn  (figure) {return figure.toUpperCase() == 'P'};


function is_Correct_King_Move(sx, sy, dx, dy) {
	if(Math.abs(dx - sx) <= 1 && Math.abs(dy - sy) <= 1) return true;
	return false;
};
function is_Correct_Queen_Move(sx, sy, dx, dy) {
	// if(Math.abs(dx - sy) == 1 && Math.abs(dy - sy) == 1) return true;
	return true
};
function is_Correct_Bishop_Move(sx, sy, dx, dy) {

	let delta_x = Math.sign(dx - sx);
	let delta_y = Math.sign(dy - sy);

	if (Math.abs(delta_x) + Math.abs(delta_y) != 2) { // и 1 равно только когда перемещаемся по одному направлению
		return false;
	}
	// // The same,  but more fully 
	// // Check is there any real figure on the path of movement
	do {
		sx += delta_x;
		sy += delta_y;
	// 	// Check if we get end of the desk (last cell on the board)
		if (sx == dx && sy == dy) return true;
	// 	// If we don't get end of the desk
	// 	// Check is any figure on the path
	// 	// debugger
	// 	if (map[sx][sy] != '') {
	// 		return false;
	// 	}

	// 	if((map [sx] [sy]) != ' ') {return false};
	// 	if(is_empty(sx, sy)) {return false};
	} while (is_empty(sx, sy));


	return false;


	// return true
};
function is_Correct_Knight_Move(sx, sy, dx, dy) {
	if(Math.abs(dx- sx) == 1 && Math.abs(dy - sy) == 2) return true;
	if(Math.abs(dx- sx) == 2 && Math.abs(dy - sy) == 1) return true;
	return false;
};
function is_Correct_Rook_Move(sx, sy, dx, dy) {
	// Определяем координаты для вычисления куда нужно смещать фигуру для  движения по косой
	// let delta_x = 0;
	// let delta_y = 0;
	// Проверка куда пошла и пошла она по косой
	let delta_x = Math.sign (dx - sx);
	let delta_y = Math.sign (dy - sy);
	// if(dx > sx) delta_x = 1;
	// if(dx < sx) delta_x = -1;
	// // На ноль не нужно провереть так как мы начинаем с 0
	// if(dy > sy) delta_y = 1;
	// if(dy < sy) delta_y = -1; // Эти вычисления определяют смещение по оси
	// Math.abs(delta_x) и Math.abs(delta_y) эти выражения проверяет равно либо 0 либо 1
	// и проверяет  перемещене по X или по Y 
	if (Math.abs(delta_x) + Math.abs(delta_y) != 1) { // и 1 равно только когда перемещаемся по одному направлению
		return false;
	}
	// The same,  but more fully 
	// if (Math.abs(delta_x) == 1 && Math.abs(delta_y) == 0 ||
	// 		Math.abs(delta_x) == 0 && Math.abs(delta_y) == 1) {
	// 	return false;
	// }

	// Check is there any real figure on the path of movement
	do {
		sx += delta_x;
		sy += delta_y;
		// Check if we get end of the desk (last cell on the board)
		if (sx == dx && sy == dy) return true;
		// If we don't get end of the desk
		// Check is any figure on the path
		// debugger
		// console.log(map[sx][sy]);
		// console.log('sx', [sx]);
		// console.log('sy', [sy]);
		// console.log(map[sx][sy]);
		// if(map[sx][sy] != ' ') {
		// 	return false;
		// }

		// if((map [sx] [sy]) != ' ') {return false};
		// if(is_empty(sx, sy)) {return false};
	} while (is_empty(sx, sy));


	return false;
};

function is_empty(x, y) {
	if(!on_Map(x, y)) return false;
	return map[x][y] == ' ';
}

function on_Map(x, y) {
	return (x >= 0 && x <= 7 && 
				  y >= 0 && y <= 7);
}

function is_Correct_Pawn_Move(sx, sy, dx, dy) {
	return true
};



function mark_Moves_From() {
	init_step();
	for (let sx = 0; sx <= 7; sx++) {
		for (let sy = 0; sy <= 7; sy++) {
			for (let dx = 0; dx <= 7; dx++) {
				for (let dy = 0; dy <= 7; dy++) {
					// if we can move from sx,sy to dx,dy then we can mark as 1 (step[sx][sy] = 1;)
					if (can_Move(sx, sy, dx, dy)) {
							step[sx][sy] = 1;
					}
				}        
			}
		}        
	}
}
function mark_Moves_To() {
	init_step();
	for (let x = 0; x <= 7; x++) {
		for (let y = 0; y <= 7; y++) {
			if (can_Move(move_from_x, move_from_y, x, y)) {
					step[x][y] = 2;
			}
		}        
	}
}

function can_Move_From(x, y) {
	if(!on_Map(x, y)) return false;
	return get_Color(x ,y) == move_color;
}

function can_Move_To(x, y) {
	if(!on_Map(x, y)) return false;
	if(map[x][y] == ' ') {
			return true;
	}
	return get_Color(x ,y) != move_color; //white can move to black
}

		function get_Color(x ,y) {
				let figure = map[x][y];
				if (figure == " ") return "";
				// debugger
				return (figure.toUpperCase() == figure) ? 'white' : 'black';
		}

		function click_box(x, y) {
			if (step[x][y] == '1') {
				click_box_from(x, y);
			}
			if (step[x][y] == '2') {
				click_box_to(x, y);
			}
		}
		// // // // ///
		// document.querySelector('#field').addEventListener('click', el => {
		// 		let x = el.target.dataset.x;
		// 		let y = el.target.dataset.y;
		// 		// We avoid cells whith numbers (letters), around the desk
		// 		if (!x || !y) return;
		// 		// console.log(x, y);

		// 		if (step[x][y] == '1') {
		// 				click_box_from(x, y);
		// 		}
		// 		if (step[x][y] == '2') {
		// 				click_box_to(x, y);
		// 		}
		// });

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
		map[move_from_x][move_from_y] = ' ';
		turn_move();
		mark_Moves_From();
		show_map();
}

function turn_move() {
		// if (move_color = 'white') {
		//     move_color = 'black';
		// } else {
		//     move_color = 'white';
		// }
		move_color = (move_color == 'white') ? 'black' : 'white';
}


function dropAndDown(params) {
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
						if (step[x][y] == ' ') {
								// html += `<td>${figureToHtml(map[x][y])}</td>`;   
								((y + x) %  2) ? color = "#fff" : color = "#0e0";
						} else {
								step[x][y] == '1'  ? color = "#542aa5" : color = "lightblue";
						}
						html += `<td onclick="click_box(${x}, ${y})" style="background-color: ${color}" data-x="${x}" data-y="${y}">${figureToHtml(map[x][y])}</td>`
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