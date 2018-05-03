const drawCurrentImage = ctx => {
    const img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
};

const drawLine = (ctx, coordinates) => {
    for (let i = 0; i < coordinates.length; i++) {
        if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(coordinates[i][0], coordinates[i][1]);
        } else {
            ctx.lineTo(coordinates[i][0], coordinates[i][1]);
            ctx.stroke();
        }
    }
};

const finalise = coordinates => {

};

window.addEventListener('load', () => {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");

    drawCurrentImage(ctx);

    let coordinates = [];
    let clickCount = 0;

    c.addEventListener('mousedown', e => {
        const x = e.layerX;
        const y = e.layerY;

        coordinates.push([x, y]);

        clickCount = clickCount + 1;

        if (clickCount === 1) {
            c.addEventListener('mousemove', e => {
                drawLine(ctx, coordinates);
            });
        }

        if (clickCount > 4) {
            const finalCoordinates = coordinates.slice(0, 4).concat([coordinates[0]]);
            drawLine(ctx, finalCoordinates);
            finalise(finalCoordinates);
            coordinates = [];
            clickCount = 0;
        }
    });
});
