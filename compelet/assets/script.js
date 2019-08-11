//console.log('script.js->');

var table = document.querySelector('#table-inject');

const req = new XMLHttpRequest(); 

req.addEventListener('readystatechange',e=>{
  
  //  console.log(req,req.readyState);
  if(req.readyState === 4 && req.status === 200)
  {
    // console.log('script.js->req eventListen')
    //  console.log("successfully fetched data: " + req.responseText);
    var raw = req.responseText;
    //console.log(typeof(returnraw));
    var obj = JSON.parse(raw);
    //console.log(typeof(obj),obj);
    
    // using the data in obj to create time 
    obj.forEach(element => {
      //console.log(element);
      
      var date = element.date;
      var name = element.name; 
      var reps = element.reps; 
      var weight = element.weight; 
      var unit = element.unit; 
      var id = element.id;
      //console.log(typeof(date));
      
      var tr = document.createElement('TR'); 
      var tdName =  document.createElement('TD');
      var tdUnit =  document.createElement('TD');
      var tdReps =  document.createElement('TD');
      var tdWeight =  document.createElement('TD');
      var tdDate =  document.createElement('TD');
      var tdId =  document.createElement('TD');
      var tdEdit = document.createElement('TD');
      var tdDelete = document.createElement('TD');
      
      tdName.innerText =  name;
      tdUnit.innerText =  unit;
      tdReps.innerText =  reps;
      tdWeight.innerText =  weight;
      tdDate.innerText =  date.slice(0,10);
      tdId.innerText =  id;
      tdEdit.innerHTML = '<button> Edit </button>'; 
      tdDelete.innerHTML = '<button> Delete </button>'; 
      
      tdId.style.visibility ="hidden";
      tdName.className =  "name";
      tdUnit.className =  "unit";
      tdReps.className =  "reps";
      tdWeight.className =  "weight";
      tdDate.className =  "date";
      tdId.className =  "id";
      tdEdit.className =  "edit"; 
      tdDelete.className =  "delete"; 
      
      tr.append(tdName);
      tr.append(tdReps);
      tr.append(tdWeight);
      tr.append(tdDate);
      tr.append(tdUnit);
      tr.append(tdEdit);
      tr.append(tdDelete);
      tr.append(tdId);        
      
      table.append(tr);
      //console.log(date);       
    });
    
  }
  else if(req.readyState === 4)
  {
    console.log('something wrong with the request');
  }
});

req.open('GET', 'flip1.engr.oregonstate.edu:4339/');
req.send();

//--------------------------------------------------------------------------------------
// this part is for button reaction 
var command = document.querySelector('#command');
//var hiddenid = document.querySelector('#id');
//console.log(indicator.value);

table.addEventListener('click',e=>{
  e.preventDefault(); 
  //console.log(e.target.innerText);
  if(e.target.innerText === 'Edit'){
    command.value = 1; 
    
    var form = document.querySelector('form'); 
    //console.log(form.name.value);
    var editNode =e.target.parentElement.parentElement; 
    form.name.value = editNode.childNodes[0].innerText;
    form.reps.value = editNode.childNodes[1].innerText;
    form.weight.value = editNode.childNodes[2].innerText;
    form.date.value = editNode.childNodes[3].innerText;
    form.unit.value = editNode.childNodes[4].innerText;
    form.id.value = editNode.childNodes[7].innerHTML;
    
    //  console.log(hiddenid.value);
  }
  else if (e.target.innerText === 'Delete'){
    console.log('Delete JS detected');
    var deletereq = new XMLHttpRequest(); 
    deletereq.addEventListener('readystatechange',e=>{
      //console.log(deletereq.readyState);
      if(deletereq.readyState ==4){
        window.location.reload(true);
      }
    });
    deletereq.open("POST", '/insert', true); 
    deletereq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    deletereq.send(`command=-1&id=${e.target.parentElement.parentElement.childNodes[7].innerHTML}`);
  }
  //? this can not show! 
  //console.log(editNode.childNodes[7].innerHTML);
});
