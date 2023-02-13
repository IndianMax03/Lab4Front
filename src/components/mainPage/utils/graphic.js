////Mutable data in pixels////////
let ARROW_SIDE_PIX;             //  side of triangle's length
let ARROW_HEIGHT_PIX;           //  side of triangle's height
let DOT_RADIUS_PIX;             //  radius of dots on x/y lines
let HALF_RADIUS_PIX;            //  half-radius size
let WIDTH_PIX;                  //  canvas' width
let HEIGHT_PIX;                 //  canvas' height
let MID_WIDTH_PIX;              //  canvas' half-width
let MID_HEIGHT_PIX;             //  canvas' half-height
let RADIUS_PIX;                 //  radius length
//////////////////////////////////
////Immutable data////////////////
const DOT_COUNT = 5;            //  quantity of dots on x/y lines
//////////////////////////////////
//Mutable display on graph////////
let canvasRadius = "R";         //
let canvasHalfRadius = "R/2";   //
//////////////////////////////////
export function drawGraphic(width = 300, height = 300, rValue = "R", canvas, hits) {

    //  Set data in pixels
    HEIGHT_PIX = +height;
    WIDTH_PIX = +width;
    MID_WIDTH_PIX = WIDTH_PIX / 2;
    MID_HEIGHT_PIX = HEIGHT_PIX / 2;
    HALF_RADIUS_PIX = Math.min(width, height) / 6;
    RADIUS_PIX = HALF_RADIUS_PIX * 2;
    DOT_RADIUS_PIX = Math.min(width, height) / 100;
    ARROW_SIDE_PIX = Math.min(width, height) / 20;
    ARROW_HEIGHT_PIX = Math.sqrt(Math.pow(ARROW_SIDE_PIX, 2) - Math.pow(ARROW_SIDE_PIX / 2, 2));

    //  Get the canvas context to draw
    const ctx = canvas.getContext("2d");

    if (isNaN(rValue) || rValue === "R") {
        drawNormalGraphicsCarcass(ctx);
        canvasRadius = "R";
        canvasHalfRadius = "R/2";
        drawRadius(ctx);
        drawCallForChoiceR(ctx);
    } else {
        canvasRadius = rValue;
        canvasHalfRadius = Math.round((rValue / 2 + Number.EPSILON) * 10) / 10;
        if (canvasRadius > 0) {
            drawNormalGraphicsCarcass(ctx);
            drawRadius(ctx);
        } else if (canvasRadius < 0) {
            canvasRadius = -canvasRadius;
            canvasHalfRadius = -canvasHalfRadius;
            drawMirroredGraphicsCarcass(ctx);
            drawRadius(ctx);
            canvasRadius = -canvasRadius;
            canvasHalfRadius = -canvasHalfRadius;
        } else {
            drawZeroGraphicsCarcass(ctx);
            drawZeroRadius(ctx);
        }
        drawHits(hits, ctx);
    }
}


function drawHits(hits, context) {
    let scale = canvasHalfRadius === 0 ? HALF_RADIUS_PIX : HALF_RADIUS_PIX/canvasHalfRadius;
    let sign =  canvasHalfRadius === 0 ? 1 : Math.sign(canvasRadius);
    hits.forEach((hit) => {
        if (hit.r === canvasRadius) {
            context.fillStyle = hit.success ? "blue" : "crimson";
            context.beginPath();
            context.moveTo(MID_WIDTH_PIX + hit.x * scale * sign, MID_HEIGHT_PIX - hit.y * scale * sign);
            context.arc(MID_WIDTH_PIX + hit.x * scale * sign, MID_HEIGHT_PIX - hit.y * scale * sign, DOT_RADIUS_PIX*3/5, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
        }
    })
}

export function formatCoordinates(xPos, yPos, rValue, canvas) {
    if (isNaN(rValue) || rValue === "R") {
        return {x: null, y: null, r: null};
    } else {
        HEIGHT_PIX = +canvas.height;
        WIDTH_PIX = +canvas.width;
        MID_WIDTH_PIX = WIDTH_PIX / 2;
        MID_HEIGHT_PIX = HEIGHT_PIX / 2;
        HALF_RADIUS_PIX = Math.min(WIDTH_PIX, HEIGHT_PIX) / 6;
        let scale = rValue === 0 ? 1/HALF_RADIUS_PIX : rValue/(2 * HALF_RADIUS_PIX);
        let sign =  rValue === 0 ? 1 : Math.sign(canvasRadius);
        let x = Math.floor((xPos - MID_WIDTH_PIX) * scale * 100000 * sign) / 100000;
        let y = Math.floor((MID_HEIGHT_PIX - yPos) * scale * 100000 * sign) / 100000;
        return {x, y, r: rValue}
    }
}
function drawCallForChoiceR(ctx) {
    ctx.fillStyle = "crimson";
    ctx.strokeStyle = "crimson";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(WIDTH_PIX, HEIGHT_PIX);
    ctx.moveTo(0, HEIGHT_PIX);
    ctx.lineTo(WIDTH_PIX, 0);
    ctx.stroke();
    ctx.fill();

    let fontSize = Math.min(WIDTH_PIX, HEIGHT_PIX) / 20;
    ctx.font = fontSize + 'px serif';

    ctx.strokeText("You have to choose R!", MID_WIDTH_PIX/2, MID_HEIGHT_PIX/4);
}

function drawNormalGraphicsCarcass(ctx) {

    /* Figures' filling style */
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "hsl(141, 70%, 70%)";
    ctx.strokeStyle = "hsl(141, 70%, 70%)";

    /* Figures */

    /* 1 quarter - quarter circle */

    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.arc(MID_WIDTH_PIX, MID_HEIGHT_PIX, RADIUS_PIX, 0, 3 * Math.PI / 2, true);
    ctx.stroke();
    ctx.fill();

    /* 2 quarter - empty */

    /* 3 quarter - triangle */

    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX - RADIUS_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX + HALF_RADIUS_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.stroke();
    ctx.fill();

    /* 4 quarter - rectangle */
    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX + RADIUS_PIX);
    ctx.lineTo(MID_WIDTH_PIX + RADIUS_PIX, MID_HEIGHT_PIX + RADIUS_PIX);
    ctx.lineTo(MID_WIDTH_PIX + RADIUS_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.stroke();
    ctx.fill();

    /* Color of axes and points on the graph */
    ctx.globalAlpha = 1;
    ctx.fillStyle = "hsl(141, 57%, 46%)";
    ctx.strokeStyle = "black";

    /* Ox axis */
    ctx.beginPath();
    ctx.moveTo(0, MID_HEIGHT_PIX);
    ctx.lineTo(WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(WIDTH_PIX - ARROW_HEIGHT_PIX, MID_HEIGHT_PIX - ARROW_SIDE_PIX / 2);
    ctx.lineTo(WIDTH_PIX - ARROW_HEIGHT_PIX, MID_HEIGHT_PIX + ARROW_SIDE_PIX / 2);
    ctx.lineTo(WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.stroke();
    ctx.fill();

    /* Ox axis */
    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, 0);
    ctx.lineTo(MID_WIDTH_PIX - ARROW_SIDE_PIX / 2, ARROW_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX + ARROW_SIDE_PIX / 2, ARROW_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, 0);
    ctx.stroke();
    ctx.fill();

    /* Dots on the graph */
    ctx.beginPath();
        /* Center */
        ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
        ctx.arc(MID_WIDTH_PIX, MID_HEIGHT_PIX, DOT_RADIUS_PIX, 0, 2 * Math.PI);
        /* Horizontal */
        for (let count = 1; count <= DOT_COUNT; count++) {
            if (count === 3) continue;
            let dotX = HALF_RADIUS_PIX * count;
            let dotY = MID_HEIGHT_PIX;
            let radius = DOT_RADIUS_PIX;
            ctx.moveTo(dotX, dotY);
            ctx.arc(dotX, dotY, radius, 0, 2 * Math.PI);
        }
        /* Vertical */
        for (let count = 1; count <= DOT_COUNT; count++) {
            if (count === 3) continue;
            let dotX = MID_WIDTH_PIX;
            let dotY = HEIGHT_PIX - HALF_RADIUS_PIX * count;
            let radius = DOT_RADIUS_PIX;
            ctx.moveTo(dotX, dotY);
            ctx.arc(dotX, dotY, radius, 0, 2 * Math.PI);
        }
    ctx.stroke();
    ctx.fill();
}

function drawZeroGraphicsCarcass(ctx) {

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "hsl(141, 70%, 70%)";
    ctx.strokeStyle = "hsl(141, 70%, 70%)";

    /* Figures - empty */

    /* Color of axes and points on the graph */
    ctx.globalAlpha = 1;
    ctx.fillStyle = "hsl(141, 57%, 46%)";
    ctx.strokeStyle = "black";

    /* Ox axis */
    ctx.beginPath();
    ctx.moveTo(0, MID_HEIGHT_PIX);
    ctx.lineTo(WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(WIDTH_PIX - ARROW_HEIGHT_PIX, MID_HEIGHT_PIX - ARROW_SIDE_PIX / 2);
    ctx.lineTo(WIDTH_PIX - ARROW_HEIGHT_PIX, MID_HEIGHT_PIX + ARROW_SIDE_PIX / 2);
    ctx.lineTo(WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.stroke();
    ctx.fill();

    /* Oy axis */
    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, 0);
    ctx.lineTo(MID_WIDTH_PIX - ARROW_SIDE_PIX / 2, ARROW_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX + ARROW_SIDE_PIX / 2, ARROW_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, 0);
    ctx.stroke();
    ctx.fill();

    /* Dots on the graph */
    ctx.beginPath();
        /* Center */
        ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
        ctx.arc(MID_WIDTH_PIX, MID_HEIGHT_PIX, DOT_RADIUS_PIX, 0, 2 * Math.PI);
        /* Horizontal */
        for (let count = 1; count <= DOT_COUNT; count++) {
            if (count === 3) continue;
            let dotX = HALF_RADIUS_PIX * count;
            let dotY = MID_HEIGHT_PIX;
            let radius = DOT_RADIUS_PIX;
            ctx.moveTo(dotX, dotY);
            ctx.arc(dotX, dotY, radius, 0, 2 * Math.PI);
        }
        /* Vertical */
        for (let count = 1; count <= DOT_COUNT; count++) {
            if (count === 3) continue;
            let dotX = MID_WIDTH_PIX;
            let dotY = HEIGHT_PIX - HALF_RADIUS_PIX * count;
            let radius = DOT_RADIUS_PIX;
            ctx.moveTo(dotX, dotY);
            ctx.arc(dotX, dotY, radius, 0, 2 * Math.PI);
        }
    ctx.stroke();
    ctx.fill();
}

function drawMirroredGraphicsCarcass(ctx) {

    /* Figures' filling style */
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "hsl(141, 70%, 70%)";
    ctx.strokeStyle = "hsl(141, 70%, 70%)";

    /* Figures */

    /* 1 mirrored quarter - triangle */

    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX);
    ctx.lineTo(MID_WIDTH_PIX + RADIUS_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.stroke();
    ctx.fill();

    /* 2 mirrored quarter - rectangle */
    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX - RADIUS_PIX);
    ctx.lineTo(MID_WIDTH_PIX - RADIUS_PIX, MID_HEIGHT_PIX - RADIUS_PIX);
    ctx.lineTo(MID_WIDTH_PIX - RADIUS_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.stroke();
    ctx.fill();

    /* 3 mirrored quarter - quarter circle */

    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.arc(MID_WIDTH_PIX, MID_HEIGHT_PIX, RADIUS_PIX, Math.PI / 2, Math.PI, false);
    ctx.stroke();
    ctx.fill();

    /* 4 mirrored quarter - empty */

    /* Color of axes and points on the graph */
    ctx.globalAlpha = 1;
    ctx.fillStyle = "hsl(141, 57%, 46%)";
    ctx.strokeStyle = "black";

    /* Ox axis */
    ctx.beginPath();
    ctx.moveTo(0, MID_HEIGHT_PIX);
    ctx.lineTo(WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.lineTo(WIDTH_PIX - ARROW_HEIGHT_PIX, MID_HEIGHT_PIX - ARROW_SIDE_PIX / 2);
    ctx.lineTo(WIDTH_PIX - ARROW_HEIGHT_PIX, MID_HEIGHT_PIX + ARROW_SIDE_PIX / 2);
    ctx.lineTo(WIDTH_PIX, MID_HEIGHT_PIX);
    ctx.stroke();
    ctx.fill();

    /* Oy axis */
    ctx.beginPath();
    ctx.moveTo(MID_WIDTH_PIX, HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, 0);
    ctx.lineTo(MID_WIDTH_PIX - ARROW_SIDE_PIX / 2, ARROW_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX + ARROW_SIDE_PIX / 2, ARROW_HEIGHT_PIX);
    ctx.lineTo(MID_WIDTH_PIX, 0);
    ctx.stroke();
    ctx.fill();

    /* Dots on the graph */
    ctx.beginPath();
        /* Center */
        ctx.moveTo(MID_WIDTH_PIX, MID_HEIGHT_PIX);
        ctx.arc(MID_WIDTH_PIX, MID_HEIGHT_PIX, DOT_RADIUS_PIX, 0, 2 * Math.PI);
        /* Horizontal */
        for (let count = 1; count <= DOT_COUNT; count++) {
            if (count === 3) continue;
            let dotX = HALF_RADIUS_PIX * count;
            let dotY = MID_HEIGHT_PIX;
            let radius = DOT_RADIUS_PIX;
            ctx.moveTo(dotX, dotY);
            ctx.arc(dotX, dotY, radius, 0, 2 * Math.PI);
        }
        /* Vertical */
        for (let count = 1; count <= DOT_COUNT; count++) {
            if (count === 3) continue;
            let dotX = MID_WIDTH_PIX;
            let dotY = HEIGHT_PIX - HALF_RADIUS_PIX * count;
            let radius = DOT_RADIUS_PIX;
            ctx.moveTo(dotX, dotY);
            ctx.arc(dotX, dotY, radius, 0, 2 * Math.PI);
        }
    ctx.stroke();
    ctx.fill();
}

function drawRadius(ctx) {
    /* Font */
    let fontSize = Math.min(WIDTH_PIX, HEIGHT_PIX) / 20;
    ctx.font = fontSize + 'px serif';
    /* Color */
    ctx.fillStyle = "hsl(141, 57%, 46%)";
    ctx.strokeStyle = "hsl(141, 57%, 46%)";

    /* Center (0) */
    ctx.strokeText(0, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);

    /* R/2 */
    ctx.strokeText('-' + canvasHalfRadius, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX + HALF_RADIUS_PIX + DOT_RADIUS_PIX);   //  Bot
    ctx.strokeText(canvasHalfRadius, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX - HALF_RADIUS_PIX + DOT_RADIUS_PIX);               //  Top
    ctx.strokeText('-' + canvasHalfRadius, MID_WIDTH_PIX - HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);   //  Left
    ctx.strokeText(canvasHalfRadius, MID_WIDTH_PIX + HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);               //  Right

    /* R */
    ctx.strokeText('-' + canvasRadius, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX + 2 * HALF_RADIUS_PIX + DOT_RADIUS_PIX);   //  Bot
    ctx.strokeText(canvasRadius, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX - 2 * HALF_RADIUS_PIX + DOT_RADIUS_PIX);               //  Top
    ctx.strokeText('-' + canvasRadius, MID_WIDTH_PIX - 2 * HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);   //  Left
    ctx.strokeText(canvasRadius, MID_WIDTH_PIX + 2 * HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);               //  Right

    /* x + y */
    /* Color */
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.fillText('y', MID_WIDTH_PIX - HALF_RADIUS_PIX / 3, MID_HEIGHT_PIX - 2.75 * HALF_RADIUS_PIX + DOT_RADIUS_PIX);
    ctx.fillText('x', MID_WIDTH_PIX + 2.75 * HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX + HALF_RADIUS_PIX / 3);
}

function drawZeroRadius(ctx) {
    /* Font */
    let fontSize = Math.min(WIDTH_PIX, HEIGHT_PIX) / 20;
    ctx.font = fontSize + 'px serif';

    /* Color */
    ctx.fillStyle = "hsl(141, 57%, 46%)";
    ctx.strokeStyle = "hsl(141, 57%, 46%)";

    let rad = 2;
    let hrad = 1;

    /* Center (0) */
    ctx.strokeText(0, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);

    /* R/2 */
    ctx.strokeText('-' + hrad, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX + HALF_RADIUS_PIX + DOT_RADIUS_PIX);   //  Bot
    ctx.strokeText(hrad, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX - HALF_RADIUS_PIX + DOT_RADIUS_PIX);               //  Top
    ctx.strokeText('-' + hrad, MID_WIDTH_PIX - HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);   //  Left
    ctx.strokeText(hrad, MID_WIDTH_PIX + HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);               //  Right

    /* R */
    ctx.strokeText('-' + rad, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX + 2 * HALF_RADIUS_PIX + DOT_RADIUS_PIX);   //  Bot
    ctx.strokeText(rad, MID_WIDTH_PIX + HALF_RADIUS_PIX / 6, MID_HEIGHT_PIX - 2 * HALF_RADIUS_PIX + DOT_RADIUS_PIX);               //  Top
    ctx.strokeText('-' + rad, MID_WIDTH_PIX - 2 * HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);   //  Left
    ctx.strokeText(rad, MID_WIDTH_PIX + 2 * HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX - HALF_RADIUS_PIX / 6);               //  Right

    /* x + y */
    /* Color */
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.fillText('y', MID_WIDTH_PIX - HALF_RADIUS_PIX / 3, MID_HEIGHT_PIX - 2.75 * HALF_RADIUS_PIX + DOT_RADIUS_PIX);
    ctx.fillText('x', MID_WIDTH_PIX + 2.75 * HALF_RADIUS_PIX - DOT_RADIUS_PIX, MID_HEIGHT_PIX + HALF_RADIUS_PIX / 3);
}
