const drawCurrentImage = ctx => {
    const img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
};

const drawLine = (ctx, coordinatesSet) => {
    for (const coordinates of coordinatesSet) {
        for (let i = 0; i < coordinates.length; i++) {
            if (i === 0) {
                ctx.beginPath();
                ctx.moveTo(coordinates[i][0], coordinates[i][1]);
            } else {
                ctx.lineTo(coordinates[i][0], coordinates[i][1]);
                ctx.stroke();
            }
        }
    }
};

const redrawCanvas = (ctx, coordinates) => {
    ctx.clearRect(0, 0, 660, 371);
    drawCurrentImage(ctx);
    drawLine(ctx, coordinates);
};

const finalise = (coordinates, image) => {};

const handleImage = (current, coordinates) => {
    const img = document.getElementById("image");

    img.addEventListener("load", () => {
        const c = document.getElementById("canvas");
        const ctx = c.getContext("2d");

        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;

        redrawCanvas(ctx, []);

        let clickCount = 0;

        const mouseMove = e => {
            const x = e.layerX;
            const y = e.layerY;
            redrawCanvas(
                ctx,
                coordinates
                    .slice(0, coordinates.length - 1)
                    .concat([
                        coordinates[coordinates.length - 1].concat([[x, y]])
                    ])
            );
        };

        c.addEventListener("mousedown", e => {
            const x = e.layerX;
            const y = e.layerY;

            if (clickCount === 0) {
                coordinates[coordinates.length] = [];
            }

            coordinates[coordinates.length - 1].push([x, y]);

            clickCount = clickCount + 1;

            if (clickCount === 1) {
                c.addEventListener("mousemove", mouseMove);
            }

            if (clickCount === 4) {
                coordinates = coordinates
                    .slice(0, coordinates.length - 1)
                    .concat([
                        coordinates[coordinates.length - 1].concat([
                            coordinates[coordinates.length - 1][0]
                        ])
                    ]);
                redrawCanvas(ctx, coordinates);
                c.removeEventListener("mousemove", mouseMove);
                clickCount = 0;
            }
        });
    });

    img.src = current;
};

const images = ["foo.jpg", "bar.jpg"];

window.addEventListener("load", () => {
    let coordinates = [];
    let current = 0;
    handleImage(images[current], coordinates);

    const btn = document.getElementById("submit");

    btn.addEventListener("click", () => {
        finalise(coordinates, images[current]);
        coordinates = [];
        current = current + 1;

        if (current < images.length) {
            handleImage(images[current], coordinates);
        } else {
            window.close();
        }
    });
});
