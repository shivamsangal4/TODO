

function searchObjectsByTag() {
    let tag = localStorage.getItem('selected_tag');
    arr = ar.filter(obj => obj.tags.includes(tag));
    let text ="";
    for(let i =0 ; i < arr.length ; i++)
    {
        text=text+"Task: "+arr[i].job+" Status: "+arr[i].status_task+"<br>";
    }
    document.getElementById("resultList").innerHTML=text;
}
searchObjectsByTag();
