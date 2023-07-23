let a = "";
function start() {


    const kr = JSON.parse(localStorage.getItem('logs'));

   
    if (kr != null)
        for (var i = 0; i < kr.length; i++) {
            a= a+`{action: ${kr[i].action} ,data task_num: ${kr[i].task_num}, job: ${kr[i].job}, subtask: ${kr[i].subtask}, due_date: ${kr[i].due_date} ,priority: ${kr[i].priority} ,status_task: ${kr[i].status_task}, tags: ${kr[i].tags}, reminder: ${kr[i].reminder} }<br>`;
        }
}

start();
console.log(a);
document.getElementById('logs').innerHTML=a;