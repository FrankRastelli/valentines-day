const header = document.querySelector(".header");
const yes = document.querySelector(".yes-button");
const no = document.querySelector(".no-button");

// For button movement
const avoidanceRadius = 150;
const moveSpeed = 50;

document.addEventListener("mousemove", (event) => {
    // Get cursor position
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    const elementRect = no.getBoundingClientRect();
    const elementX = elementRect.left + elementRect.width / 2;
    const elementY = elementRect.top + elementRect.height / 2;

    const deltaX = mouseX - elementX;
    const deltaY = mouseY - elementY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Move button if cursor is within the avoidance radius
    if (distance < avoidanceRadius) {
        // Calculate the direction away from the cursor
        const directionX = -deltaX / distance;
        const directionY = -deltaY / distance;

        // Calculate the new position
        const newX = elementRect.left + directionX * moveSpeed;
        const newY = elementRect.top + directionY * moveSpeed;

        // Apply new position
        if (newX > 0 && newX + elementRect.width < window.innerWidth && newY > 0 && newY + 
            elementRect.height < window.innerHeight) {
                no.style.left = newX + 'px';
                no.style.top = newY + 'px';
        }
    }
});

yes.addEventListener("click", ()=> {
    header.remove();
    yes.remove();
    no.remove();
});