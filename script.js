let canvas = document.getElementById("snake")
let context = canvas.getContext("2d") //rendenriza o desenho 
let box = 32 //tamanho de cada quadrado 
let snake = [] 

//posição da snake na tela
snake[0] = {
    x: 8*box,
    y: 8*box
}
let direction = "right"

//posição aletória para a food dentro do limite da tela
let food = {
    x:Math.floor(Math.random()*15+1)*box,
    y:Math.floor(Math.random()*15+1)*box
}

function createBG() {
    context.fillStyle = "lightgreen" //cor do fundo(canvas) 
    context.fillRect(0, 0, 16*box, 16*box) //desenha o fundo(canvas)
}

function createSnake() {
    for(i=0; i<snake.length; i++) {
        context.fillStyle = "green" //cor da snake
        context.fillRect(snake[i].x, snake[i].y, box, box) //desenha a snake
    }
}

//função que cria food da snake
function drawFood() {
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

//evento para detectar movimentos na tela
document.addEventListener("keydown", update) //detecta ações de clique na tela
//função para direcionar a snake de acordo com a tecla apertada
//evitando que mude na direção contrária
function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right" 
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

function startGame() {
    //condições que evitam que a snake atravesse as paredes(a tela do jogo)
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16*box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box;

    //quando a cabeça da snake chocar com o corpo da snake e mostra gameover
    for(i=1; i<snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game)
            alert("Game Over :(")
            window.location.reload()
        } 
    }

    //incia as funções para criar a Tela, Snake, Food
    createBG()  
    createSnake()
    drawFood()

    let snakeX = snake[0].x //posição da snake no eixo de x
    let snakeY = snake[0].y // posição da snake no eixo de y

    //coordenadas da snake
    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY -= box
    if(direction == "down") snakeY += box

    //quando a snake comer uma food
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop()
        document.getElementById("scoreUser").innerHTML = snake.length //atualiza a pontuação do jogador
    }else {
        //muda a posição da food depois da snake comer uma food
        food.x = Math.floor(Math.random()*15+1)*box
        food.y = Math.floor(Math.random()*15+1)*box
    }

    //adiciona elemento na primeira posição do array(da snake)
    let newHead = {
        x:snakeX,
        y:snakeY
    }
    snake.unshift(newHead)
}


function startSG() {
    document.getElementById("snake").removeAttribute("hidden") //mostra a tela do jogo
    document.getElementById("scoreSG").removeAttribute("hidden") //mostra a pontuação do jogador
    document.getElementById("startLi").hidden = "true" //escode o botão de iniciar do menu
}

function backToMenuSG() {
    document.getElementById("snake").hidden = "true" //esconde a tela da snake
    document.getElementById("scoreSG").hidden = "true" //esconde a pontução do jogador
    document.getElementById("startLi").removeAttribute("hidden") //mostra o botão de iniciar do menu
    snake.length = 1 //reseta o tamanho da snake
}

//inicia o jogo e renova a função startGame a cada 100 milisegundos(velocidade do jogo)
let game = setInterval(startGame, 100) 