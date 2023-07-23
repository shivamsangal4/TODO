
// Sample array of objects with deadlines in datetimelocal format
const arrayOfObjects = ar;

// Function to convert the datetimelocal format to a JavaScript Date object
function convertToLocalDate(dateTimeLocal) {
    const [datePart, timePart] = dateTimeLocal.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return new Date(year, month - 1, day, hour, minute);
}

// Function to separate objects based on start and end date
function separateObjectsByDate(startDate, endDate) {
    const startDateTime = convertToLocalDate(startDate);
    const endDateTime = convertToLocalDate(endDate);

    return arrayOfObjects.filter(obj => {
        const deadlineDateTime = convertToLocalDate(obj.due_date);
        return deadlineDateTime >= startDateTime && deadlineDateTime <= endDateTime;
    });
}

// Example usage
function search_start(){
const startDate = document.getElementById('start_date').value;
const endDate = document.getElementById('end_date').value;
const sortedArray = separateObjectsByDate(startDate, endDate);


let result="<ul>";
for(let i =0 ;i< sortedArray.length; i++)
{
    result=result+`<li>Task: ${sortedArray[i].job} Status: ${sortedArray[i].status_task} Deadline: ${sortedArray[i].due_date}</li>`
}
result=result+`</ul>`;
console.log(result);
document.getElementById('search_by_date').innerHTML=result;
}