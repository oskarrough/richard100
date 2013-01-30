// http://www.html5rocks.com/en/tutorials/casestudies/onslaught/#toc-the-game-loop
/* @TODO:

- highscore system with HTML5 data storage
- new graphics
- adrenalin
- buffs
- skills

*/

// Create the canvas
var canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d"),
	debug = document.createElement("div");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
document.body.appendChild(debug);
debug.className = 'debug';


// Game objects
var pregame = true,
	monstersCaught = 0,
	energysCaught = 0;

// Asset class
function Asset(src) {
	this.loaded = false;
	this.img = new Image();
	this.img.onload = function () {
		this.loaded = true;
	};
	this.img.src = src;
}

var bg = {
		asset: new Asset("https://dl.dropbox.com/u/638306/richard100/background.png")
	},
	hero = {
		speed: 256, // movement in pixels per second
		x: 0,
		y: 0,
		asset: new Asset("https://dl.dropbox.com/u/638306/richard100/hero.png")
	},
	monster = {
		x: 0,
		y: 0,
		asset: new Asset("https://dl.dropbox.com/u/638306/richard100/monster.png")
	},
	energy = {
		x: 0,
		y: 0,
		asset: new Asset("https://dl.dropbox.com/u/638306/richard100/energy.png")
	};

// The following shouldn't be needed but is…
bg.asset.img.onload = function () {
	bg.asset.loaded = true;
};
hero.asset.img.onload = function () {
	hero.asset.loaded = true;
};
monster.asset.img.onload = function () {
	monster.asset.loaded = true;
};
energy.asset.img.onload = function () {
	energy.asset.loaded = true;
};

if(localStorage.length === 0) {
	localStorage.setItem('highscore', 0);
}

// Draw everything
var render = function () {
	
	ctx.drawImage(bg.asset.img, 0, 0);
	
	if (hero.asset.loaded) {
		ctx.drawImage(hero.asset.img, hero.x, hero.y);
	}
	// if (monster.asset.loaded) {
	// 	ctx.drawImage(monster.asset.img, monster.x, monster.y);
	// }
	// if (energy.asset.loaded) {
	// 	ctx.drawImage(energy.asset.img, energy.x, energy.y);
	// }

	// // Score
	// var xp = 100;
	// xp -= (monstersCaught * 20);
	// xp += (energysCaught * 20);

	// ctx.fillStyle = "rgb(255, 255, 255)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	// ctx.fillText("Dishes collected: " + monstersCaught, 32, 32);
	// ctx.fillText("Weed found: " + energysCaught, 32, 32*2);
	// ctx.fillText("Happiness: " + xp + "%", 32, 32*3);


	// var newHighscore = false;
	// if(localStorage.getItem('highscore') < xp) {
	// 	localStorage.setItem('highscore', xp);
	// 	newHighscore = true;
	// 	console.log('new highscore');
	// }
	
	// if(xp <= 0) {
	// 	ctx.fillStyle = "rgb(250,80,80)";
	// 	ctx.fillText("OH NOE!!! Find some weed", 32, 32*4);
	// } else {
	// 	ctx.fillStyle = "rgb(80,250,80)";
	// 	ctx.fillText("All good…", 32, 32*4);
	// }

	// ctx.textAlign = "right";
	// ctx.fillText("Highscore: " + localStorage.getItem('highscore') + "%", canvas.width-32, 32);
};


// Handle keyboard controls
//var handleInput = function(){	
	// Create an empty array
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
//};



// Reset the game when the player catches a monster
var reset = function () {
	if(pregame) {
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
		pregame = false;
	}
	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	// Throw the energy somewhere on the screen randomly
	energy.x = 32 + (Math.random() * (canvas.width - 64));
	energy.y = 32 + (Math.random() * (canvas.height - 64));
};



// Update game objects
var update = function (modifier) {
	debug.innerHTML = 'x: ' + Math.round(hero.x) + ', y: ' + Math.round(hero.y) + ', speed: ' + hero.speed + ', modifier: ' + modifier;

	if (38 in keysDown) { // Player holding up
		if ( hero.y > 0 ) {
			hero.y -= hero.speed * modifier;
		} else {
			hero.y = 0;
			//hero.y = canvas.height - 32;
		}
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}
	if (32 in keysDown) { // Player holding space
		hero.y -= (hero.speed*4 ) * modifier;
		//hero.y += (hero.speed*4 ) * modifier;
		// y = -(X-L/2)(X-L/2)*4*H/(L*L) + H;
	}

	// Are they touching?
	if (hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)) {
		++monstersCaught;
		reset();
	}
	
	// Are they touching?
	if (hero.x <= (energy.x + 32) && energy.x <= (hero.x + 32) && hero.y <= (energy.y + 32) && energy.y <= (hero.y + 32)) {
		++energysCaught;
		reset();
	}
};

var monster1,
	hero1;

function setup() {
	monster1 = new Monster(50, 50, 10, "https://dl.dropbox.com/u/638306/richard100/monster.png");
	//hero1 = new Hero();
}

setup();


// The main game loop
// @todo: handleInput(), update(), render()
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	monster1.render();

	then = now;
};


// Let's play this game and initiate it with requestAnimationFrame (see rAF.js)
reset();
var then = Date.now();
(function animloop(){
	requestAnimationFrame(animloop);
	main();
})();