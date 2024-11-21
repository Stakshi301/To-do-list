const inputField = document.getElementById('input_field');
const addTaskButton = document.getElementById('add_task_button');
const list = document.getElementById('list');
const redButton = document.getElementById('red_button'); // Red filter button
const greenButton = document.getElementById('green_button'); // Green filter button
const yellowButton = document.getElementById('yellow_button'); // Yellow filter button

addTaskButton.addEventListener('click', function () {
    const task = inputField.value.trim();
    if (task) {
        const listItem = document.createElement('li');
        listItem.className = 'task';
        
        // Add the task text as a separate span
        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.className = 'task-text';
        listItem.appendChild(taskText);

        // Create buttons
        const redStatusButton = createButton('Not Started', 'red', 'red-button');
        const greenStatusButton = createButton('Completed', 'green', 'green-button');
        const yellowStatusButton = createButton('In Progress', 'yellow', 'yellow-button');
        const deleteButton = createDeleteButton(listItem);

        // Add event listeners to toggle state
        addToggleEvent(redStatusButton, listItem, 'Pending', 'red');
        addToggleEvent(greenStatusButton, listItem, 'Completed', 'green');
        addToggleEvent(yellowStatusButton, listItem, 'Progress', 'yellow');

        // Append buttons to the list item
        listItem.appendChild(redStatusButton);
        listItem.appendChild(greenStatusButton);
        listItem.appendChild(yellowStatusButton);
        listItem.appendChild(deleteButton);

        // Set initial status as "Not Started"
        listItem.dataset.status = 'Not Started'; // Set status to 'Not Started'
        
        list.appendChild(listItem);
        inputField.value = ''; // Clear the input field
    }
});

// Function to create a button
function createButton(text, color, className) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.style.backgroundColor = color;
    button.style.borderRadius = '50%'; // Initial border-radius for round shape
    button.style.width = '5px'; // Initial size
    button.style.height = '5px'; // Initial size
    return button;
}

// Function to create a delete button
function createDeleteButton(listItem) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.className = 'delete-button';
    button.addEventListener('click', function () {
        list.removeChild(listItem);
    });
    return button;
}

// Function to add toggle event to a button
function addToggleEvent(button, listItem, statusText, color) {
    button.addEventListener('click', function () {
        const buttons = listItem.querySelectorAll('button');
        const isExpanded = button.classList.contains('expanded');

        if (isExpanded) {
            // Revert to the original state
            buttons.forEach(btn => {
                if (btn !== button && btn.className !== 'delete-button') {
                    btn.style.display = 'inline-block'; // Make sure other buttons reappear
                } else if (btn.className !== 'delete-button') {
                    btn.classList.remove('expanded', 'show-text');
                    btn.style.width = '5px'; // Reset to original size
                    btn.style.height = '5px'; // Reset to original size
                    btn.style.borderRadius = '50%'; // Revert to circular shape
                    btn.textContent = btn.dataset.originalText; // Restore original text
                }
            });
        } else {
            // Expand clicked button and hide others
            buttons.forEach(btn => {
                if (btn !== button && btn.className !== 'delete-button') {
                    btn.style.display = 'none'; // Hide other status buttons
                } else if (btn.className !== 'delete-button') {
                    btn.classList.add('expanded', 'show-text');
                    btn.dataset.originalText = btn.textContent; // Save original text
                    btn.textContent = statusText; // Show status text
                    btn.style.color = '#fff';
                    btn.style.width = '78px'; // Set expanded size
                    btn.style.height = '30px'; // Set expanded size
                    btn.style.borderRadius = '5px'; // Make it square
                    btn.style.padding='5px';
                    btn.style.color='black';
                }
            });
        }
        listItem.dataset.status = statusText; // Update the task status
    });
}
