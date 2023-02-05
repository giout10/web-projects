import {canvas, context, house} from '/modules/elements.js'
import {Bomb} from '/modules/bomb.js'
import {reset, drawBackground, drawBomb} from '/modules/drawing.js'
import {setNumber, setColor, setPath} from '/modules/random.js'

// puntuacion
let score = 0;

// cada vez que una bomba se cancela, se crea y se lanza otra. La siguiente variable es donde se almacena las caracteristicas aleatorias de cada bomba desplegada
let b = new Bomb();
setNewBomb(b);

// comprobar si la bomba ha impactado con la casa
function hit(bomb)
{
    if (bomb.x >= house.x && bomb.y >= house.y)
    {
        // se pasa la velocidad de la bomba a 0 y se cancela su animacion
        bomb.speedX = 0;
        bomb.speedY = 0;    
    }
}

// definir bomba con caracteristicas aleatorias
function setNewBomb()
{
    let number = setNumber();
    let color = setColor();
    b = new Bomb(number, color);
    setPath(b);

    // cada vez que se cree una nueva bomba, la velocidad aumentara (proporcionalmente en ambas coordenadas)
    if (score > 0)
    {
        b.speedX *= (1 + score/25);
        b.speedY *= (1 + score/25);
    }
}

// cancelar bomba
function cancelBomb(e)
{
    // si se presiona una tecla cuyo numero sea igual al de la bomba
    if (e.key == `${b.number}`)
    {
        // la bomba que ha sido cancelada, deja de pintarse, ya que sus valores iniciales han cambiado
        setNewBomb();
    }

    // cada bomba cancelada es un punto mas
    score++; 
}

// lanzar bomba
function launch()
{
    // antes de hacer cualquier animacion, se debe repintar todo de nuevo
    reset(canvas, context, house);

    // El siguiente codigo es el que maneja la velocidad y repinta la bomba, este solo se ejecutara mientras ninguna bomba impacte en la casa
    if (b.speedX != 0 && b.speedY != 0)
    {
        drawBomb(context, b);

        // movimiento de la bomba
        b.x += b.speedX;
        b.y += b.speedY;

        // se comprueba que la pelota no haya impactado en la casa
        hit(b);

        // la funcion request repite el callback alrededor de 60 veces por segundo, de esta manera el ammabiente se repinta y se vuelve a dibujar la bomba en otra posicion y da la ilusion de que esta moviendose
        requestAnimationFrame(launch);
    }
}

launch();

addEventListener('keydown', cancelBomb);  
