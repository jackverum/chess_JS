
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

// Pawn attack for passant (взятие на проходе)
let pawn_attack_x; // координаты битого поля 
let pawn_attack_y;


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
	// if (!is_Correct_Move(sx, sy, dx, dy)) return false;
	// return true; 
	return is_Correct_Move(sx, sy, dx, dy);
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

// This function will check how figures move acooding to the lines
function is_Correct_Line_Move(sx, sy, dx, dy, figure) {
		let delta_x = Math.sign (dx - sx);
		let delta_y = Math.sign (dy - sy);
		
		// if (Math.abs(delta_x) + Math.abs(delta_y) == 0) return false; // и 1 равно только когда перемещаемся по одному направлению
		if (!is_Correct_Line_Delta (delta_x, delta_y, figure)) return false;	
		do {
			sx += delta_x;
			sy += delta_y;
			if (sx == dx && sy == dy) return true;
		} while (is_Empty(sx, sy));
		// return false;
	
		return false;
}

function is_Correct_Line_Delta (delta_x, delta_y, figure) {
	if (is_Bishop(figure)) {
		return is_Correct_Bishop_Delta(delta_x, delta_y)
	}
	if (is_Queen(figure)) {
		return is_Correct_Queen_Delta(delta_x, delta_y)
	}
	return false;
}

function is_Correct_Bishop_Delta(delta_x, delta_y) {
	return Math.abs(delta_x) + Math.abs(delta_y) == 2;
}
function is_Correct_Rook_Delta(delta_x, delta_y) {
	return Math.abs(delta_x) + Math.abs(delta_y) == 1;
}
function is_Correct_Queen_Delta(delta_x, delta_y) {
	return true;
	// return Math.abs(delta_x) + Math.abs(delta_y) == 0; // We can dont make == 0 , just return true,  and avoid this Math 
}

function is_Correct_King_Move(sx, sy, dx, dy) {
	if(Math.abs(dx - sx) <= 1 && Math.abs(dy - sy) <= 1) return true;
	return false;
};
function is_Correct_Queen_Move(sx, sy, dx, dy) {
	return  is_Correct_Line_Move(sx, sy, dx, dy, 'Q');
};


function is_Correct_Bishop_Move(sx, sy, dx, dy) {

	return  is_Correct_Line_Move(sx, sy, dx, dy, 'B');

	// let delta_x = Math.sign (dx - sx);
	// let delta_y = Math.sign (dy - sy);
	
	// if (Math.abs(delta_x) + Math.abs(delta_y) != 2) return false; // и 1 равно только когда перемещаемся по одному направлению
		
	// do {
	// 	sx += delta_x;
	// 	sy += delta_y;
	// 	// if (!on_Map[sx][sy] ) return false;
	// 	// Check if we get end of the desk (last cell on the board)
	// 	if (sx == dx && sy == dy) return true;
	// 	// if (map[sx][sy] != " ") return false;
	// // } while (is_empty(sx, sy));
	// } while (is_Empty(sx, sy));
	// // return false;

	// return false;
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
	} while (is_Empty(sx, sy));


	return false;
};

function is_Empty(x, y) {
	if(!on_Map(x, y)) return false;
	return map[x][y] == ' ';
}

function on_Map(x, y) {
	return (x >= 0 && x <= 7 && 
				  y >= 0 && y <= 7);
}

function is_Correct_Pawn_Move(sx, sy, dx, dy) {
	if (sy < 1 || sy > 6) return false; // coordinates for pawn equal from 1 - 6
	if (get_Color(sx, sy) == 'white' ) {
		return is_Correct_Sign_Pawn_Move(sx, sy, dx, dy, +1);
		// return is_Correct_White_Pawn_Move(sx, sy, dx, dy);
	}
	if (get_Color(sx, sy) == 'black' ) {
		return is_Correct_Sign_Pawn_Move(sx, sy, dx, dy, -1);
		// return is_Correct_Black_Pawn_Move(sx, sy, dx, dy);
	}
	return false;
};

// accoding to block_diagram 
/*
`https://viewer.diagrams.net/?tags=%7B%7D&target=self&highlight=0000ff&edit=_blank&layers=1&nav=1&title=chess_block_diagram.drawio#R7V3dc%2BI2EP9b%2BsBM7yGMLclfj0kI14dre3PpTJunjA8r4J6xGdsk0L%2B%2Bki2B5XUCJGBEq3vwWbL8gfan1f52V8oA385Xn%2FNwMfs1i2gyQFa0GuDRACHb9gL2H69ZixoHe3XNNI%2Bjus7aVtzH%2F1DRUNYu44gWoq6uKrMsKeOFWjnJ0pROSqUuzPPsRW32lCWRUrEIp1T5DF5xPwkTCpr9GUflrK71kbet%2F4XG05l8s%2B2KXzwPZWPx4GIWRtlLowrfDfBtnmVlfTZf3dKE957aL%2BNXrm4%2BLKdpuc8NXyfJA%2Fn9aTz%2B8iUNHh6%2FfUvv0ytUP%2BU5TJbiBw9G9sB3ByNrcIOqo1PVsM8di99RrmXn5NkyjSh%2FvjXANy%2BzuKT3i3DCr74wPLC6WTlPWMlmp8UPWk5mojALJ7NlTj%2FzRiPCKp6ytByH8zjhQLnOJ%2FxZk7Jg7xuFS9a9NBeN7rNlXr1hVpYMA8jB1%2BzAfjU%2F8AbFcJpl04SGi7gYTrJ5dWFSVE3HT%2FUr2KnyEgfdtF9TIxHxHwZ7WnT%2BM81LumpUiZ7%2FTLM5LXP2HktcdRCub5HjIBDlly2obFcgZdYAFHEFlgWOp5tHb0XNToS0D5A87pA8k7YtZc6ON5Xkb6rzAAifvYMNQmoE%2F6bgieUrgt88oiF434Nyx%2FaJ5E66R7zXGOtWdT4y0v%2Bw9D3bVqVvEyD9AHVIH59I%2Bg6Q%2FpSWj7dZkuU%2FfwJCZlPWoupzugqnWcr6ZEHzmH0J7y9Z%2B1VWod1geIpXVE7y%2F3twkKClGjBUDRs7SJkTghOhwwXoKNi3sb607CH75xqA9AoQG7kKQDCCRgP7ih4BYmM4EUTMXhbFNEv5jDBZ5s%2BVVciFptqIb8szy8tZxhATJl%2BybCFa%2FU3Lci16NlyWmQoYuorLv%2FjDh4T4ovzArw0tbrNW5dFKvL0qrEVBU%2FDYLv%2FQNLrm5IWVswXl46oow3zThNRNmsWi%2BsjNUOMjLE6n7CrvFHYvU%2FOvXGT4zNd1Fzqy%2BCA7jBe23VeV1o3O%2FNoY7W%2BCvpB9uEP11F%2F6FgKFrcRh9%2BYYymkSlvGzSuO6BoS49WsWs2%2FejD3kW0PPUYYfcR31KaJb6xu3I4tJLlw3mi14g%2BL1V2EPvAmh1lCtn7kduJsf%2Bv6x7AFl%2F0ALMLyZqipbBl2ZZz9oZTJsh%2FxTnCStqjCJpwy5ownDQgVyrvhixqyvxYV5HEXJaxbkIWpD05F8rGmAAa8NEOy7YCYguMOOtE41ETj6TgROcxowU8AeU8D71XbQjzYObDACCNlLGR9LWwZAW%2F6WvaYs99WQDfQaZXkkZdniVNhCQFF2udlOpygtAJw%2FOEoMdLSDDrI8BTtXdnBm7EDv%2FNqYaDpCBzuBAh1k%2B2e2z6Cb16gdPbETEBU7gQTF2dQOdAM%2BhUlBocVvYgB7yPfKHqKW7Yoge%2Bs1BuQQ7djb1gkVCG4j3VBDC2%2FcVK%2B5onip7YvSFFYXRO6kr22nU064q45NAw93pPltmuiIWfeknjQbutIa%2BRNeFUcdiywKXuPXsdZHGWZlR6sujBvx17vq3JHn7Ejq%2B3igzk34tP09Z2dTfhYXj4vwJWWHogjTsmoSzrkaTr8XiwoFVlcGhwngnDaAQ4Br14GzO3IcqPy9k03vPkCrcfxqCZ9AxvakZehBQtovq4BeMAMdLaHjgZAB8aAnrFfwIOgJMy5UHbGDAgTNqDO7UTe%2FYgueMl8aSvpOSkralJT4MDGt37RE7TJLNMXAOfNDiKtQ8yvGzd0Nez%2BEm7%2Bfk0qquZOTSqSeOjTJSaftecQP6qNqsvnWfmHKQ6kuctU4l4ud0%2FNcV2O3keoyQs4OVJrBLQa3yJqQeRJ193kyhaI7baKH0SunpzN7lNopuq7w1Z90mMlOOtCd1OUW%2BikuHu%2Fmi3L9c7QaIPY5VrT%2BZFxBh5pchThHx3ILBcDA7kjoYt%2B4MdOaNpj0ChzfyIZrggxD09F%2BZyZHy353LRhw7pegwYCzcQ1pCR4cEFX1BA6ATq%2BOIVe%2FXNIt5fECrJiW72E7mgLqgiKRUtvtthuPnpD6MWjDJVPaQPsQWBsE94ZgqWY1QTCCK0YjmpTh46qiESN%2BRKxfxlfszIYMpCMOXd%2B%2F3txvd8Wq96gyHKbvTQwYIWmZnU4HbUF9LllFMFnNcBYdweNJm1JAx7Og2dkvYzEL4C4EOg4mO6HTbygb5kGYDNmPbIRgqfIlHpBvr8FIDFMVTLT5%2FZrfcfUSL9HO4aApAi6IX0mw7ORXct3ouXOVWzrPFwsVTxpZkp3Ujiz5MrLEjreNDcBGjav1ZmC2iD4hq5m8XJO4OqrUJoAR7xVODiPJGPcnfYbh9Z2wbKvxTg9BVY1kImEv%2FA7DuIIxtT6QUixTeOU%2BhJZzblsLOpgMDdMSO3LcS91gw5UMvbIwbFw%2FlwEc31VdP7blntn3g6HvxxC8D6xwVeXrBmde3yqtEUPw%2FjsET%2FK23QTP14LgeerOrwHqgd%2BRrs19j8Pv0IH8DpkFqBpo5jaf80nHFrNy6UcvfM7Rbp1HZwr04K3852Z6kBMMTHrQ2eeGfXcPJafZPfTQucFveVmCHjYpIIYtXYbOdtsq%2B8zbARHIlYwH7gNkCamGoY%2Fhov5%2BNwPydZuRNUXAJU2I%2Fp4TonP0CfFjugbuTVLIREEZNjIEok8CgdU9MQN3z%2B1rTkcgYG6GiRfoiZ1WwCCwMMBOrwEDB1oym%2FWRhVgfWasbntFs2WYTLS1g1P7TaZYPowfIc%2FvUQWYfpEsBT2udrW0RuNFJv6vdTG7hMdlUW7wduqFXNuXCFCujGrSEjm%2B1oBOceXc9FwHoGA%2BdjshBnuqis21y5tX3MsHC%2BOiOYzX4QVvAJ8uSY8Xt34Cunf3bP6WN7%2F4F`
*/
function is_Correct_Sign_Pawn_Move(sx, sy, dx, dy, sign) {
	if (is_Pawn_Passant(sx, sy, dx, dy, sign)) return true;
	if (!is_Empty(dx, dy)) { // это взятие ???
		if (Math.abs(dx - sx) != 1) return false; // 1 step to the left or right sides
		return dy - sy == sign;
	};
	if (dx != sx) return false;
	if (dy - sy == sign) return true;
	if (dy - sy == sign*2) { // or sign + sign // on two cells
		if (sy != 1 && sy != 6) return false; // Проверка нет ли напротив пешки фигуры, перед ходом на 2 клетки
		// Here we work with pawn. How it can move on 2 cell forward.
		// And we can controll this 2 cell moving in fn click_box_to(x, y)
		return is_Empty(sx, sy + sign);
	}
	// return true;
	return false;
}
// function is_Correct_White_Pawn_Move(sx, sy, dx, dy) {
// 	if (is_Pawn_Passant(sx, sy, dx, dy)) return true;
// 	if (!is_Empty(dx, dy)) { // это взятие ???
// 		if (Math.abs(dx - sx) != 1) return false; // 1 step to the left or right sides
// 		return dy - sy == 1;
// 	};
// 	if (dx != sx) return false;
// 	if (dy - sy == 1) return true;
// if (dy - sy == 2) { // on two cells
// 		if (sy != 1) return false; // Проверка нет ли напротив пешки фигуры, перед ходом на 2 клетки
// 		// Here we work with pawn. How it can move on 2 cell forward.
// 		// And we can controll this 2 cell moving in fn click_box_to(x, y)
// 		return is_Empty(sx, sy + 1);
// 	}
// 	// return true;
// 	return false;
// }
// function is_Correct_Black_Pawn_Move(sx, sy, dx, dy) {
// 	if (is_Pawn_Passant(sx, sy, dx, dy)) return true;
// 	if (!is_Empty(dx, dy)) { // это взятие ???
// 		if (Math.abs(dx - sx) != 1) return false; // 1 step to the left or right sides
// 		return dy - sy == -1;
// 	};
// 	if (dx != sx) return false;
// 	if (dy - sy == -1) return true;
// 	if (dy - sy == -2) {
// 		if (sy != 6) return false; // Проверка нет ли напротив пешки фигуры, перед ходом на 2 клетки
// 		// Here we work with pawn. How it can move on 2 cell forward.
// 		// And we can controll this 2 cell moving in fn click_box_to(x, y)
// 		return is_Empty(sx, sy - 1);
// 	}
// 	// return true;
// 	return false;
// 	// return true;
// }
// function is_Pawn_Passant(sx, sy, dx, dy) {
// 	if (!(pawn_attack_x == dx && pawn_attack_y == dy))	return false;
// 	if (sy != 4) return false; // только с 4-ой горизонтали можно взятие на проходе
// 	if (dy - sy != 1) return false;
// 	return (Math.abs(dx - sx) == 1);
// }
function is_Pawn_Passant(sx, sy, dx, dy, sign) {
	if (!(pawn_attack_x == dx && pawn_attack_y == dy))	return false;
	if (sign == +1 && sy != 4) return false; // только с 4-ой горизонтали можно взятие на проходе
	if (sign == -1 && sy != 3) return false; // только с 3-ой горизонтали можно взятие на проходе
	if (dy - sy != sign) return false;
	return (Math.abs(dx - sx) == 1);
}
 

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
function click_box_to(to_x, to_y) {
		// What/Which was figure moved
		let from_Figure  = map[move_from_x][move_from_y]; 
		// Where was this figure moved to
		let to_Figure = map[to_x][to_y];

		// map[to_x][to_y] & map[move_from_x][move_from_y] === it is our moving of firures
		map[to_x][to_y] = from_Figure;
		map[move_from_x][move_from_y] = ' ';

		

		check_Pawn_Attack (from_Figure, to_x, to_y)

		turn_move();
		mark_Moves_From();
		show_map();
}

function check_Pawn_Attack (from_Figure, to_x, to_y) {
// BEFORE STEP

			// Removing an enemy pawn figure from the chessboard 
			if (is_Pawn(from_Figure)) {
				if (to_x == pawn_attack_x && to_y == pawn_attack_y) {
					if (move_color == 'white') map[to_x][to_y - 1] = ' '; // white
					if (move_color == 'black') map[to_x][to_y + 1] = ' '; // black
				}
			} 

// NEXT STEP after BEFORE STEP
			// Reset cell value, if there was no passant attack
			pawn_attack_x = -1;
			pawn_attack_y = -1;
			// We check is it PAWN figure in this cell
			if (is_Pawn(from_Figure)) {
				// If pawn move throw 2 cells
				if (Math.abs(to_y - move_from_y)) {
					// We save coordinate cell after passant attack to general coordinate move_from_x
					pawn_attack_x = move_from_x;
					// After moving pawn figure 2 cells: we get arithmetic mean, final & start cells divided by two
					pawn_attack_y = (to_y + move_from_y) / 2;
				}
			}
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