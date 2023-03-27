const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start")
const scoreEl = document.querySelector("#score")
const msgEl = document.querySelector("#msg")

let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let currentDirection = 1
let score = 0
let timer = 1000
const speed = 0.9
const width = 10
let appleIndex = 0
let timerId = 0


function startGame() {
  msgEl.textContent = "🐍 Snake Game 🐍"
  currentSnake.forEach(index => squares[index].classList.remove("snake"))
  squares[appleIndex].classList.remove("apple")
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  direction = 1
  score = 0
  scoreEl.textContent = score
  timer = 1000
  generateApple()
  currentSnake.forEach(index => squares[index].classList.add("snake"))
  timerId = setInterval(move, timer)
}



function createGrid() {

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    square.classList.add("square")
    grid.appendChild(square)
    squares.push(square)
  }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake"))



function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] % width === width - 1 && direction === 1)
  ) {
    clearInterval(timerId)
    msgEl.textContent = "🧱You lost🧱"

  } else if (squares[currentSnake[0] + direction].classList.contains("snake")) {
    clearInterval(timerId)
    msgEl.textContent = "😱You lost😱"


  }
  else {
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple")
      squares[tail].classList.add("snake")
      currentSnake.push(tail)
      generateApple()
      score++
      scoreEl.textContent = score
      clearInterval(timerId)
      timer = timer * speed
      timerId = setInterval(move, timer)


    }

    squares[currentSnake[0]].classList.add("snake")
  }




}


function generateApple() {
  appleIndex = Math.floor(Math.random() * squares.length)
  if (currentSnake.includes(appleIndex)) {
    generateApple()
  } else {
    squares[appleIndex].classList.add("apple")
  }
}


function control(e) {
  if (e.keyCode === 39) {
    // console.log(`Right`);
    if (currentDirection !== -1) {
      direction = 1;
      currentDirection = direction;
    }
  } else if (e.keyCode === 38) {
    if (currentDirection !== width) {
      direction = -width;
      currentDirection = direction;
    }
  } else if (e.keyCode === 37) {
    if (currentDirection !== 1) {
      direction = -1;
      currentDirection = direction;
    }

  } else if (e.keyCode === 40) {
    if (currentDirection !== -width) {
      direction = +width;
      currentDirection = direction;
    }
  }
}


document.addEventListener("keydown", control)
startBtn.addEventListener("click", startGame)
