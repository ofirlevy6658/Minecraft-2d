const world = document.querySelector(".world");
let grid = []; // all the dives
const groundHeight = 50; //the top height of ground use to build trees and stuff
const width = 60;
const height = 60;
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", reset);

//init the world grid consists of divs
const initMatrix = () => {
	for (let i = 0; i < height; i++) {
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
	for (let i = groundHeight; i < height; i++) {
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
	const nums = new Set();
	let random = Math.floor(Math.random() * (width - 3)) + 2; // random place in the ground to build tree
	while (numOfTree > 0) {
		// while (nums.has(random)) {
		// 	// avoid two trees in the same place
		// 	random += Math.random() < 0.5 ? -3 : 3;
		// }
		nums.add(random);
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
		random > 33 ? (random = 3) : (random += 5);
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
function drawRock() {
	for (let i = 1; i < 30; i++) {
		grid[groundHeight - i][0].classList.add("rock");
		grid[groundHeight - i][1].classList.add("rock");
	}
}
function drawGold() {
	for (let i = 1; i < 30; i++) {
		for (let j = 0; j < 7; j++) {
			grid[groundHeight - i][40].classList.add("gold");
			grid[groundHeight - i][41].classList.add("gold");
		}
	}
}
function drawHouse() {
	for (let i = 1; i < 15; i++) {
		for (let j = 0; j < 7; j++) {
			grid[groundHeight - i][52 + j].classList.add("brick");
		}
	}
}

initMatrix();
initGround();
drawTree(5);
drawCloud(25);
drawRock();
drawGold();
drawHouse();

// inventroy
const axe = {
	name: "axe",
	ablity: ["stump", "leaves0", "leaves1"],
	use: false,
};
const shovel = {
	name: "shovel",
	ablity: ["grass", "ground"],
	use: false,
};
const pickAxe = {
	name: "pick-axe",
	ablity: ["rock", "gold", "brick"],
	use: false,
};
const cloudCollecter = {
	name: "cloud-collecter",
	ablity: ["cloud"],
	use: false,
};

const toolArr = [axe, shovel, pickAxe, cloudCollecter];
const tools = document.querySelectorAll("img"); //element and mining tools
// select tool function
tools.forEach((tool) =>
	tool.addEventListener("click", () => {
		tools.forEach((el) => el.setAttribute("data-current", "false")); // remove focus from tool
		// document.body.style.cursor = "url('img/axe-tool-outline.svg')";
		tool.setAttribute("data-current", "true"); //focus to the desire tool
		//switch on the current tool in use
		toolArr.forEach((el) => {
			tool.getAttribute("data-tool") == el.name
				? (el.use = true)
				: (el.use = false);
		});
	})
);

//lisner for the matrix
for (let i = 0; i < width; i++) {
	for (let j = 0; j < width; j++) {
		grid[i][j].addEventListener("click", (e) => {
			//if we have value its mean the block has img on it so we send it to mining function
			if (e.target.classList[1]) mining(e);
			// else we selected clean div sky (no class of img)
			else build(e);
		});
	}
}

function mining(e) {
	let block = e.target;
	//check if the tool has the ablity to mine the mineral
	let currentTool = toolArr.find((tool) => tool.use); // get the tool that currently in use
	let blockClassName = block.classList[1];
	if (!currentTool) return; //mean we dont target any tool we stop the running to avoid errors
	if (currentTool.ablity.includes(blockClassName)) {
		block.classList.remove(`${blockClassName}`);
		currentTool[blockClassName] === undefined // insert the bulding block to the obejct
			? (currentTool[blockClassName] = 1)
			: currentTool[blockClassName]++;
		updateBlockS(blockClassName, currentTool); //send the name of the block that was click and the tool
	}
}

function updateBlockS(block, tool) {
	let blockId = document.querySelector(`#${block}`);
	blockId.textContent = `${tool[block]}`;
}
const blocks = document.querySelectorAll(".building-blocks img");

function build(e) {
	let block;
	blocks.forEach((b) => {
		if (b.getAttribute("data-current") == "true") block = b; // block keep the current block that target
	});
	if (!block)
		// no bulding block selected exit the function
		return;
	let sibling = block.previousElementSibling;
	let blockAmount = toolArr.find((t) => t.ablity.includes(sibling.id));
	if (blockAmount[sibling.id] > 0) {
		e.target.classList.add(`${sibling.id}`);
		sibling.textContent = `${--blockAmount[sibling.id]}`; //update
	}
}

function reset() {
	let blocksZero = document.querySelectorAll(".building-blocks span");
	blocksZero.forEach((b) => (b.textContent = 0));
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			grid[i][j].remove();
		}
	}
	initMatrix();
	initGround();
	drawTree(5);
	drawCloud(25);
	drawRock();
	drawGold();
	drawHouse();
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < width; j++) {
			grid[i][j].addEventListener("click", (e) => {
				//if we have value its mean the block has img on it so we send it to mining function
				if (e.target.classList[1]) mining(e);
				// else we selected clean div sky (no class of img)
				else build(e);
			});
		}
	}
	tools.forEach((el) => el.setAttribute("data-current", "false"));
	toolArr.forEach((t) => {
		t[t.ablity[0]] = 0;
		t[t.ablity[1]] = 0;
		t[t.ablity[2]] = 0;
	});
}
