const world = document.querySelector(".world");
let grid = []; // all the dives
const groundHeight = 35; //the top height of ground use to build trees and stuff
const width = 40;
//
//init the world grid consists of divs
const initMatrix = () => {
	for (let i = 0; i < 40; i++) {
		grid[i] = [];
		for (let j = 0; j < width; j++) {
			const div = document.createElement("div");
			div.classList.add("square");
			grid[i][j] = div;
			world.appendChild(div);
		}
	}
};

const initGround = () => {
	for (let i = groundHeight; i < 40; i++) {
		for (let j = 0; j < width; j++) {
			if (i === groundHeight)
				//first iteration for grass
				grid[i][j].classList.add("grass");
			else grid[i][j].classList.add("ground");
			world.appendChild(grid[i][j]);
		}
	}
};

const drawTree = (numOfTree) => {
	while (numOfTree > 0) {
		let random = Math.floor(Math.random() * (width - 3)) + 2; // random place in the ground to build tree
		let heightTree = Math.floor(Math.random() * 15) + 3;
		//stump
		for (let i = 0; i < heightTree; i++) {
			grid[groundHeight - i - 1][random].classList.add("stump");
		}
		//leaves
		for (let i = heightTree; i < heightTree + 6; i++) {
			grid[groundHeight - i][random].classList.add(`leaves${random % 2}`); //create two version of leaves
			grid[groundHeight - i][random - 1].classList.add(`leaves${random % 2}`);
			grid[groundHeight - i][random + 1].classList.add(`leaves${random % 2}`);
		}
		numOfTree--;
	}
};
const drawCloud = (numOfCloud) => {
	while (numOfCloud > 0) {
		let randomRow = Math.floor(Math.random() * 5) + 3; // random place in the sky to build cloud
		let randomCol = Math.floor(Math.random() * (width - 8)) + 4;
		for (let i = 0; i < 3; i++) {
			for (let j = i; j < 2; j++) {
				grid[randomRow - i][randomCol + j].classList.add("cloud");
			}
		}
		numOfCloud--;
	}
};

initMatrix();
initGround();
drawTree(4);
drawCloud(12);

// inventroy
const axe = {
	ablity: ["stump", "leaves0", "leaves1"],
	use: "false", //resources
};
const shovel = {
	ablity: ["grass", "ground"],
	use: "false",
};
const pickAxe = {
	ablity: ["stone"],
	use: "false",
};
const toolArr = [axe, shovel, pickAxe];

const tools = document.querySelectorAll("img");
// select tool function
tools.forEach((tool) =>
	tool.addEventListener("click", () => {
		tools.forEach((el) => el.setAttribute("data-current", "false")); // remove focus from tool
		// document.body.style.cursor = "url('img/axe-tool-outline.svg')";
		tool.setAttribute("data-current", "true"); //focus to the desire tool
		//switch on the current tool in use
		if (tool.getAttribute("data-tool") == "axe") {
			axe.use = true;
			shovel.use = false;
			pickAxe.use = false;
		} else if (tool.getAttribute("data-tool") == "shovel") {
			axe.use = false;
			shovel.use = true;
			pickAxe.use = false;
		} else if (tool.getAttribute("data-tool") == "pick-axe") {
			axe.use = false;
			shovel.use = false;
			pickAxe.use = true;
		}
	})
);

//lisner for the matrix
for (let i = 0; i < width; i++) {
	for (let j = 0; j < width; j++) {
		grid[i][j].addEventListener("click", mining);
	}
}

function mining(e) {
	let block = e.target;
	console.log(block);
	//check if the tool has the ablity to mine the mineral
	let currentTool = toolArr.filter((tool) => tool.use); // get the tool that currently in use
	if (currentTool[0].ablity.includes(block.classList[1])) {
		block.style.visibility = "hidden";
		console.log("test");
	}
}
