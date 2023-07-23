// Function to convert datetime-local strings to Date objects for comparison
function parseDeadlineToDateTime(dateString) {
    // Split the string into date and time parts
    const [datePart, timePart] = dateString.split('T');
    // Split the time part into hours and minutes
    const [hours, minutes] = timePart.split(':');
    // Parse the year, month, day, hours, and minutes as integers
    const year = parseInt(datePart.slice(0, 4), 10);
    const month = parseInt(datePart.slice(5, 7), 10) - 1; // Months are 0-based in JavaScript Dates
    const day = parseInt(datePart.slice(8, 10), 10);
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);
    // Create a new Date object
    return new Date(year, month, day, parsedHours, parsedMinutes);
}

// Function to sort the array of objects by deadline
function sortByDeadline(objectsArray) {
    return objectsArray.sort((a, b) => {
        const dateA = parseDeadlineToDateTime(a.due_date);
        const dateB = parseDeadlineToDateTime(a.due_date);
        return dateA - dateB;
    });
}

// Sort the array by deadline
const sortedArray = sortByDeadline(ar);
let result="<ul>";
for(let i =0 ;i< sortedArray.length; i++)
{
    result=result+`<li>Task: ${sortedArray[i].job} Status: ${sortedArray[i].status_task} Deadline: ${sortedArray[i].due_date}</li>`
}
result=result+`</ul>`;
console.log(result);
document.getElementById('sorted_date').innerHTML=result;
