const scene = document.querySelector('.scene');
const faces = document.getElementsByClassName('cube-face');
scene.style.perspective = '400px';

let xPercent;
let yPercent;
let dragID;

// Populate gallery images:
let picsumId = 0;
for (face of faces) {
    let maxId = picsumId + 9;
    for (picsumId; picsumId < maxId; picsumId++) {
        face.innerHTML += `<div style="background-image: url(https://picsum.photos/250/250?random=${picsumId})"></div>`;
    }
}

const updatePerspectiveOrigin = () => {
    dragID = requestAnimationFrame(updatePerspectiveOrigin);
    scene.style.perspectiveOrigin = xPercent + '% ' + yPercent + '%';
}

const dragging = () => {
    requestAnimationFrame(updatePerspectiveOrigin);
}

const notDragging = () => {
    cancelAnimationFrame(dragID);
}

scene.addEventListener('wheel', (e) => {
    const newPerspective = parseInt(scene.style.perspective) + e.deltaY * .5;
    scene.style.perspective = `${newPerspective}px`;
});

scene.addEventListener('mousemove', (event) => {
    // Get mouse position relative to scene:
    const bounds = scene.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;

    // Translate mouse position to percentage:
    xPercent = parseInt(relativeX / scene.clientWidth * 100);
    yPercent = parseInt(relativeY / scene.clientHeight * 100);
});

scene.addEventListener('mousedown', dragging);
scene.addEventListener('mouseup', notDragging);
scene.addEventListener('mouseleave', notDragging);

