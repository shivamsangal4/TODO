function separateTasksByPriority(tasks) {
    const highPriorityTasks = tasks.filter(task => task.priority === "high");
    const mediumPriorityTasks = tasks.filter(task => task.priority === "medium");
    const lowPriorityTasks = tasks.filter(task => task.priority === "low");
    let highPriorityTask="<p1 style='color:red';font-weight: bold;>High</p1> <br>";
    let mediumPriorityTask="<p1 style='color:blue';font-weight: bold;>Medium</p1> <br>";
    let lowPriorityTask="<p1 style='color:green; font-weight: bold;'>Low</p1> <br>";
    for(let i=0 ; i< highPriorityTasks.length; i++)
    {
        highPriorityTask=highPriorityTask+"Task: "+highPriorityTasks[i].job+" Status: "+highPriorityTasks[i].status_task+"<br>";
    }
    for(let i=0 ; i< mediumPriorityTasks.length; i++)
    {
        mediumPriorityTask=mediumPriorityTask+"Task: "+mediumPriorityTasks[i].job+" Status: "+mediumPriorityTasks[i].status_task+"<br>";
    }
    for(let i=0 ; i< lowPriorityTasks.length;i++)
    {
        lowPriorityTask=lowPriorityTask+"Task: "+lowPriorityTasks[i].job+" Status: "+lowPriorityTasks[i].status_task+"<br>";
    }
    
    document.getElementById('_high').innerHTML=highPriorityTask;
    document.getElementById('_medium').innerHTML=mediumPriorityTask;
    document.getElementById('_low').innerHTML=lowPriorityTask;
}
separateTasksByPriority(ar);
 