document.addEventListener('DOMContentLoaded', () => {
    const circleElements = document.querySelectorAll('circle');
    let isDragging = false;
    let offsetX, offsetY;
    let currentElement = null;

    circleElements.forEach(circleElement => {
        circleElement.addEventListener('mousedown', (event) => {
            isDragging = true;
            currentElement = circleElement;
            offsetX = event.clientX - circleElement.getBoundingClientRect().left;
            offsetY = event.clientY - circleElement.getBoundingClientRect().top;
            event.stopPropagation(); // Prevent event from propagating to other elements
        });
    });

    circleElements.forEach(circleElement => {
        circleElement.addEventListener('mousemove', (event) => {
            if (isDragging && currentElement === circleElement) {
                circleElement.style.position = 'absolute';
                circleElement.style.left = `${event.clientX - offsetX}px`;
                circleElement.style.top = `${event.clientY - offsetY}px`;
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;
                console.log(`Circle Element moved to coordinates: (${x}, ${y})`);
            }
        });
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        currentElement = null;
        const circleList = Array.from(circleElements).map(circle => circle.outerHTML);
        console.log('List of Circles:', circleList);
    });
});
