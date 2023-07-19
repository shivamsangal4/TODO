let total_element = 0;
let ar = [];
let lists = "";

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
            ar.push({ task_num: kr[i].task_num, job: kr[i].job });
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

function AddElement(task)
{
    total_element++;
    let ele = {task_num: total_element, job:task};
    ar.push(ele);
    localStorage.setItem('array',JSON.stringify(ar));
    localStorage.setItem('curr_count',total_element);
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

function update(task_num)
{
    let task = document.getElementById('change').value
    let index = ar.indexOf(ar.find(o => o.task_num === task_num));
    ar[index] = {task_num: total_element, job:task};
    localStorage.setItem('array',JSON.stringify(ar));
    display();
}

function display_textbox(num)
{
    lists="";
    for(var i =0 ; i< ar.length; i++)
    {
        if(ar[i].task_num==num)
        lists=lists+'<input type="text" id="change" value= " '+ar[i].job +'"><button class="Add" onclick=\' update('+ar[i].task_num+')\'>change</button><br>';
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
        lists=lists+'<p1 onclick="display_textbox('+ar[i].task_num+')">'+ar[i].job +'</p1><button class="delete" onclick=" DeleteElement('+ar[i].task_num+')">Delete</button><br>';
    }
     document.getElementById('content').innerHTML=lists;

    
}

start();
display();
let btn = document.getElementById('addelement');
btn.addEventListener("click", function () {
    let todo = document.getElementById('text1').value;
    if (todo =="")
        window.alert("please enter some data");
    else
        AddElement(todo);
    display();
});
console.log(ar);