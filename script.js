let canvas = document.getElementById("snake")
let context = canvas.getContext("2d") //rendenriza o desenho 
let box = 32 //tamanho de cada quadrado 
let snake = [] 
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"

function createBG() {
    context.fillStyle = "lightgreen" //cor do fundo(canvas) 
    context.fillRect(0, 0, 16*box, 16*box) //desenha o fundo(canvas)
}

function createSnake() {
    for(i=0; i<snake.length; i++) {
        context.fillStyle = "green" //cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box) //desenha a cobrinha
    }
}

function startGame() {
    createBG()  
    createSnake()

    let snakeX = snake[0].x //posição da cobrinha no eixo de x
    let snakeY = snake[0].y // posição da cobrinha no eixo de y

    //coordenadas da cobrinha
    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY += box
    if(direction == "down") snakeY -= box

    //retira o último elemento do array(da cobrinha)
    snake.pop()

    //adiciona um elemento na frente do array(da cobrinha)
    let newHead = {
        x: snakeX,
        y:snakeY
    }

    snake.unshift(newHead)
}


let game = setInterval(startGame, 100) // renova a função startGame a cada 100 milisegundos

