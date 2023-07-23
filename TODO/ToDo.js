let total_element = 0;
let ar = [];
let lists = "";
let logs = [];
let selected_tag="";

function start() {


    const str = localStorage.getItem('array');
    const kr = JSON.parse(localStorage.getItem('array'));

    if (localStorage.getItem('curr_count') == null) {

        localStorage.setItem('curr_count', 0);
    }
    else
        total_element = parseInt(localStorage.getItem('curr_count'));

    if (kr != null)
        for (var i = 0; i < kr.length; i++) {
            ar.push({ task_num: kr[i].task_num, job: kr[i].job, subtask: kr[i].subtask, due_date:kr[i].due_date ,priority:kr[i].priority ,status_task: kr[i].status_task, tags:kr[i].tags, reminder: kr[i].reminder });
        
        }

    //logs from local storage to logs[]
    const kk = JSON.parse(localStorage.getItem('logs'));

    if (kk != null)
        for (var i = 0; i < kk.length; i++) {
            logs.push({action: kk[i].action , task_num: kk[i].task_num, job: kk[i].job, subtask: kk[i].subtask, due_date: kk[i].due_date ,priority: kk[i].priority ,status_task: kk[i].status_task, tags: kk[i].tags, reminder: kk[i].reminder });
        }
}

function fetchApi()
{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response)=>{
        if(!response.ok)
        throw new Error("network response not ok");
        return response.json();
    }).then((data)=>{
        data.forEach((element) => {
            AddElement(element.title);
        });
        display();
    })
}
function AddSubtask(task_num)
{
    let task = document.getElementById('change').value
    let index = ar.indexOf(ar.find(o => o.task_num === task_num));
    ar[index] = {task_num: total_element, job:task};
    localStorage.setItem('array',JSON.stringify(ar));
    display();
}



function DeleteElement(task_num)
{
    total_element--;
    let index = ar.indexOf(ar.find(o => o.task_num === task_num));
    ar.splice(index,1);

    if(ar.length<1)
    {
        localStorage.removeItem('array');
    }
    else
    {
        localStorage.setItem('array', JSON.stringify(ar));
    }
    display();
}


function display_textbox(num)
{
    lists="";
    let high="",low="",medium="";
    for(var i =0 ; i< ar.length; i++)
    {
        if(ar[i].task_num==num)
        {
            if(ar[i].priority=="high")
            high="selected";
            if(ar[i].priority=="low")
            low="selected";
            if(ar[i].priority=="medium")
            medium="selected";
        
            lists=lists+'Enter Task:<input type="text" id="_text1" value= " '
            +ar[i].job +`"><br>`
            +
            `Enter Tags:
            <input type="text" id="_text2" placeholder="Like: play,ball,games" value='${reverseparseTagandSubtask(ar[i].tags)}'>
            <br>
            Enter Deadline:
            <input type="datetime-local" id="_deadline" value="${ar[i].due_date}">
            <br>
            Priority:
            <select  name="Priority " id="_priority" >
            <option value="high" ${high}>high</option>    
            <option value="medium" ${medium}>medium</option>
            <option value="low" ${low}>low</option>
            </select>
            <br>
            Reminder:
            <input type="datetime-local" id="_Reminder" name="Reminder" value="${ar[i].reminder}">
            <br>`+
            `<button class="Add" onclick=\' update(${ar[i].task_num}
            )\'>update</button><br>`;
        }
        else
        lists=lists+'<p1 onclick="display_textbox('+ar[i].task_num+')">'+ar[i].job +'</p1><button class="delete" onclick=" DeleteElement('+ar[i].task_num+')">Delete</button><br>';
    }
     document.getElementById('content').innerHTML=lists;
}

function display()
{
    lists="";
    for(var i =0 ; i< ar.length; i++)
    {
        let stat;
        if(ar[i].status_task=='done')
        {
            stat="mark pending";
        }
        else
        stat ="mark done"
        lists=lists+'<p1 onclick="display_textbox('+ar[i].task_num+')">'+ar[i].job +'</p1><button class="delete" onclick=" markdone('+ar[i].task_num+')"> '+stat+'</button><br>'+'<button class="delete" onclick=" DeleteElement('+ar[i].task_num+')">Delete</button><br>';
    }
     document.getElementById('content').innerHTML=lists;

     populateDropdown();
}
     function populateDropdown() {
            const dropdown = document.getElementById('tagDropdown');
            const uniqueTags = new Set();

            // Loop through each object and add its tags to the 'uniqueTags' set
            ar.forEach(obj => {
                if(obj.tags!=null)
                obj.tags.forEach(tag => uniqueTags.add(tag));
            });

            // Create and append options to the drop-down menu
            dropdown.innerHTML="";
            uniqueTags.forEach(tag => {
                const option = document.createElement('option');
                option.text = tag;
                dropdown.add(option);
            });
        }
        
start();
display();
let btn = document.getElementById('addelement');
btn.addEventListener("click", function () {
    let todo = document.getElementById('text1').value;
    let tags= document.getElementById('text2').value;
    let deadline = document.getElementById('deadline').value;
    let priority = document.getElementById('priority').value;
    let reminder = document.getElementById('Reminder').value;
    
    let _tags= parseTagandSubtask(tags);

    if (todo =="")
        window.alert("please enter Task");
    else if (deadline =="")
        window.alert("please enter Deadline");
    else
        AddElement(todo,[],deadline,priority,"Not Done",_tags,reminder);
    display();
});

console.log(ar);



// update.js
function AddElement(task, _subtask , _date, _priority, _status , _tags, _reminder)
{
    total_element++;
    
    let ele = {task_num: total_element, job:task, subtask:_subtask, due_date: _date , priority: _priority , status_task : "pending" , tags:_tags , reminder:_reminder  };
    ar.push(ele);
    let log  = {action : "add", task_num: total_element, job:task, subtask:_subtask, due_date: _date , priority: _priority , status_task : "pending" , tags:_tags , reminder:_reminder  };
    logs.push(log);

    localStorage.setItem('array',JSON.stringify(ar));
    localStorage.setItem('curr_count',total_element);

    localStorage.setItem('logs',JSON.stringify(logs));

}

function DeleteElement(task_num)
{
    let index = ar.indexOf(ar.find(o => o.task_num === task_num));
    let log  = {action : "delete", task_num: task_num, job:ar[index].job, subtask:ar[index].subtask, due_date: ar[index].due_date , priority: ar[index].priority , status_task : ar[index].status_task , tags:ar[index].tags , reminder:ar[index].reminder  };
    logs.push(log);
    ar.splice(index,1);

    if(ar.length<1)
    {
        localStorage.removeItem('array');
    }
    else
    {
        localStorage.setItem('array', JSON.stringify(ar));
    }

    localStorage.setItem('logs',JSON.stringify(logs));
    display();
}

function update(task_num)
{
    let todo = document.getElementById('_text1').value;
    let tags= document.getElementById('_text2').value;
    let deadline = document.getElementById('_deadline').value;
    let priority = document.getElementById('_priority').value;
    let reminder = document.getElementById('_Reminder').value;
    
    let _tags= parseTagandSubtask(tags);
    let index = ar.indexOf(ar.find(o => o.task_num === task_num));
    if (todo =="")
        window.alert("please enter Task");
    else if (deadline =="")
        window.alert("please enter Deadline");
    else
        {
            let index = ar.indexOf(ar.find(o => o.task_num === task_num));
            ar[index] = {task_num: task_num, job:todo, subtask:"", due_date: deadline , priority: priority , status_task : ar[index].status_task , tags:_tags , reminder:reminder  };
            localStorage.setItem('array',JSON.stringify(ar));
            display();
        }
        
        let log  = {action : "update", task_num: task_num, job:ar[index].job, subtask:ar[index].subtask, due_date: ar[index].due_date , priority: ar[index].priority , status_task : ar[index].status_task , tags:ar[index].tags , reminder:ar[index].reminder  };
        logs.push(log);
        localStorage.setItem('logs',JSON.stringify(logs));
        
}

function markdone(task_num)
{
    let index = ar.indexOf(ar.find(o => o.task_num === task_num));
    let log;
    let _status= ar[index].status_task;
    if(_status=='done')
    {
    ar[index].status_task='pending';
    log  = {action : "mark_done", task_num: task_num, job:ar[index].job, subtask:ar[index].subtask, due_date: ar[index].due_date , priority: ar[index].priority , status_task : ar[index].status_task , tags:ar[index].tags , reminder:ar[index].reminder  };
}
    else
    {ar[index].status_task='done';
    log  = {action : "mark_pending", task_num: task_num, job:ar[index].job, subtask:ar[index].subtask, due_date: ar[index].due_date , priority: ar[index].priority , status_task : ar[index].status_task , tags:ar[index].tags , reminder:ar[index].reminder  };
}
    localStorage.setItem('array', JSON.stringify(ar));
    logs.push(log);
    localStorage.setItem('logs',JSON.stringify(logs));
    display();
}

function parseTagandSubtask(tags)
{
    if(tags==undefined)
    return [];
    return tags.split(",").map(str => str.trim());
}

function reverseparseTagandSubtask(tags)
{
    if(tags==undefined)
    return [];
    return tags.join(', ');
}

function selected__tag()
{
    selected_tag= document.getElementById('tagDropdown').value;
    localStorage.setItem('selected_tag',selected_tag);
}
    