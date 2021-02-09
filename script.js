const scene = document.querySelector('.scene');
const cube = document.querySelector('.cube');
const faces = cube.children;

let picsumID = 0;
let xPercentPO;
let yPercentPO;
let dragID;

class Orientation {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
// Cube orientation:
const cubeO = new Orientation(0, 0, 0);
// Cube face orientations:
const faceOs = [
    new Orientation(  0,   0,   0),
    new Orientation(  0,  90,   0),
    new Orientation(  0, 180,   0),
    new Orientation(  0, -90,   0),
    new Orientation( 90,   0,   0),
    new Orientation(-90,   0,   0)
];

const setCubeOrientation = () => {
    cube.style.transform = `translateZ(calc(var(--translate-distance) * -1)) 
        rotateY(${cubeO.y}deg) rotateX(${cubeO.x}deg) rotateZ(${cubeO.z}deg)`;
}

const setFaceOrientation = (i) => {
    faces[i].style.transform = `rotateX(${faceOs[i].x}deg) rotateY(${faceOs[i].y}deg) rotateZ(${faceOs[i].z}deg) 
        translateZ(var(--translate-distance))`;
}

const createImages = (i) => {
    let maxId = picsumID + 9;
    for (picsumID; picsumID < maxId; picsumID++) {
        faces[i].innerHTML += `<div style="background-image: url(https://picsum.photos/250/250?random=${picsumID})"></div>`;
    }
}

const updatePerspectiveOrigin = () => {
    dragID = requestAnimationFrame(updatePerspectiveOrigin);
    scene.style.perspectiveOrigin = xPercentPO + '% ' + yPercentPO + '%';
}

const dragging = () => {
    requestAnimationFrame(updatePerspectiveOrigin);
}

const notDragging = () => {
    cancelAnimationFrame(dragID);
}

const rotateCube = (event) => {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
            cubeO.y % 180 == 0 ? cubeO.x += 90 : cubeO.z += 90;
            break;
        case 'ArrowRight':
        case 'd':
            cubeO.y -= 90;
            break;
        case 'ArrowDown':
        case 's':
            cubeO.y % 180 == 0 ? cubeO.x -= 90 : cubeO.z -= 90;
            break;
        case 'ArrowLeft':
        case 'a':
            cubeO.y += 90;
            break;
    }
    setCubeOrientation();
}


// Build cube:
scene.style.perspective = '400px';
setCubeOrientation();
for (let i = 0; i < faces.length; i++) {
    setFaceOrientation(i);
    createImages(i);
}

// Drag and drop:
scene.addEventListener('mousemove', (event) => {
    // Get mouse position relative to scene:
    const bounds = scene.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;

    // Translate mouse position to percentage:
    xPercentPO = parseInt(relativeX / scene.clientWidth * 100);
    yPercentPO = parseInt(relativeY / scene.clientHeight * 100);
});
scene.addEventListener('mousedown', dragging);
scene.addEventListener('mouseup', notDragging);
scene.addEventListener('mouseleave', notDragging);

// Zoom perspective:
scene.addEventListener('wheel', (e) => {
    const newPerspective = parseInt(scene.style.perspective) + e.deltaY * .5;
    scene.style.perspective = `${newPerspective}px`;
});

// Rotate:
document.addEventListener('keyup', rotateCube);

