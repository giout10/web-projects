// prototipo de la bomba
export class Bomb
{
    constructor(number = 1, color = 'black')
    {
        this.number = number;
        this.size = 25;
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY =  0;
        this.color = color;
    }
}