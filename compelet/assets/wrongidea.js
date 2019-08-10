//this js should serve 3 functions, frist to create table, second to update row, third to delete rows from database 

// function 1 to create table 
//1. this js shuld be triggered when submit event is occured
// assume we only care about create new one 


//-----------------------
/*      TEST
const click =document.querySelector('#button');
click.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('js file fired');
});
success! 
*/
//-----------------------

const form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    var array =[]; 
    var inputs = document.querySelectorAll('.input');
    //console.log(inputs[0].value);
    inputs.forEach((input)=>{
        array.push(input.value);
    });
    //console.log(array);
    var tr = document.createElement('TR');
    array.forEach((elms)=>{
        var td = document.createElement('TD');
        td.innerText = elms;
        tr.append(td);
    });

    var edit = document.createElement('TD');
    edit.innerHTML='<button>edit</button>';
    tr.append(edit);
    var del = document.createElement('TD');
    del.innerHTML='<button>delete</button>';
    tr.append(del);
    //console.log(tr);

    var tbdy = document.querySelector('tbody');
    //console.log(tbdy);
    tbdy.append(tr);

});
