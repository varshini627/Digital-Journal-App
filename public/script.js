let allJournals = [];



async function loadJournals(){


let response =
await fetch("/journals");


allJournals =
await response.json();



displayJournals(allJournals);


}




function displayJournals(data){


let box =
document.getElementById("journals");


box.innerHTML="";



data.forEach(j=>{


box.innerHTML += `


<div class="card">


<h3>${j.title}</h3>


<p>${j.content}</p>


<p>Mood: ${j.mood}</p>



<button onclick="editJournal(${j.id})">

Edit

</button>



<button onclick="deleteJournal(${j.id})">

Delete

</button>


</div>


`;


});


}




async function addJournal(){



let title =
document.getElementById("title").value;


let content =
document.getElementById("content").value;


let mood =
document.getElementById("mood").value;



await fetch("/journals",{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

title,

content,

mood

})


});



loadJournals();



}




async function deleteJournal(id){


await fetch("/journals/"+id,{

method:"DELETE"

});



loadJournals();


}





function searchJournals(){


let text =
document.getElementById("search")
.value
.toLowerCase();



let result =
allJournals.filter(j=>

j.title.toLowerCase()
.includes(text)

);



displayJournals(result);


}





async function editJournal(id){


let journal =
allJournals.find(
j=>j.id==id
);



let title =
prompt(
"New title",
journal.title
);



let content =
prompt(
"New content",
journal.content
);



let mood =
prompt(
"New mood",
journal.mood
);




await fetch("/journals/"+id,{


method:"PUT",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

title,

content,

mood

})


});



loadJournals();


}



loadJournals();