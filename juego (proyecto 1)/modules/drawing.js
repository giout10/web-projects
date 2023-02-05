// funciones utilizadas para dibujar en el canvas

function drawBackground(canvasContext, house)
{
    // casa temporal
    canvasContext.beginPath();
    canvasContext.fillStyle = 'teal';
    canvasContext.rect(house.x,house.y,house.width,house.height);
    canvasContext.fill();
    canvasContext.closePath();

    // paisaje temporal
    canvasContext.beginPath();
    canvasContext.fillStyle = 'black';
    canvasContext.rect(0,350,600,250);
    canvasContext.fill();
    canvasContext.closePath();
}

function reset(canvas, context, house)
{
    // se elimina todo y se pinta de nuevo el fondo del canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(context, house);
}

function drawBomb(canvasContext, bomb)
{
    // se dibuja la bomba
    canvasContext.fillStyle = bomb.color,
    canvasContext.arc(bomb.x, bomb.y, bomb.size, 0, Math.PI*2, true);
    canvasContext.fill();

    // se dibuja el numero adherido a la bomba
    canvasContext.fillStyle = 'white'; 
    canvasContext.font = '20px Arial'
    canvasContext.fillText(`${bomb.number}`, bomb.x - 5, bomb.y + 5);
}

export {reset, drawBackground, drawBomb}