const world = document.querySelector(".world");
let grid = [];
const groundHeight = 29; //the top height of ground use to build trees and stuff
const groundLength = 40;
//
//init the world grid consists of divs
const initMatrix = () => {
	for (let i = 0; i < 30; i++) {
		grid[i] = [];
		for (let j = 0; j < groundLength; j++) {
			const div = document.createElement("div");
			div.classList.add("square");
			grid[i][j] = div;
			world.appendChild(div);
		}
	}
};

const initGround = () => {
	for (let i = groundHeight; i < 40; i++) {
		for (let j = 0; j < groundLength; j++) {
			const div = document.createElement("div");
			div.classList.add("square");
			div.classList.add("ground");
			world.appendChild(div);
		}
	}
};

const drawTree = (numOfTree) => {
	while (numOfTree > 0) {
		let random = Math.floor(Math.random() * (groundLength - 3)) + 2; // random place on the ground to build tree
		let heigtTree = Math.floor(Math.random() * 15) + 1;
		//stump
		for (let i = 0; i < heigtTree; i++) {
			grid[groundHeight - i][random].classList.add("stump");
		}
		//leaves
		for (let i = heigtTree; i < heigtTree + 6; i++) {
			grid[groundHeight - i][random].classList.add(`leaves${random % 2}`); //create two version of leaves
			grid[groundHeight - i][random - 1].classList.add(`leaves${random % 2}`);
			grid[groundHeight - i][random + 1].classList.add(`leaves${random % 2}`);
		}
		numOfTree--;
	}
};
const drawCloud = (numOfCloud) => {};

initMatrix();
initGround();
drawTree(4);
