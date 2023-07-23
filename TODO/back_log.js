const arrayOfObjects= ar;
function convertToLocalDate(dateTimeLocal) {
    const [datePart, timePart] = dateTimeLocal.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return new Date(year, month - 1, day, hour, minute);
}

// Function to show the backlog (tasks with deadlines less than the current date)
function showBacklog() {
    const currentDate = new Date();
    
    // Filter the objects whose deadline is less than the current date
    const backlogTasks = arrayOfObjects.filter(obj => {
        const deadlineDateTime = convertToLocalDate(obj.due_date);
        return deadlineDateTime < currentDate;
    });

    return backlogTasks;
}


const sortedArray = showBacklog();
let result="<ul>";
for(let i =0 ;i< sortedArray.length; i++)
{
    result=result+`<li>Task: ${sortedArray[i].job} Status: ${sortedArray[i].status_task} Deadline: ${sortedArray[i].due_date}</li>`
}
result=result+`</ul>`;
console.log(result);
document.getElementById('back_logs').innerHTML=result;
