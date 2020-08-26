//Const Variables
const Input = document.querySelector('.todo-input');
const Button = document.querySelector('.input-bttn');
const List = document.querySelector('.items-list');
const Filter = document.querySelector('.filter-todo-items');

//Let Variables
let task = document.getElementById('taskId');
let taskBttn = document.getElementById('taskBttn');

//Listener
document.addEventListener('DOMContentLoaded', getItems);
Button.addEventListener('click', addItem);
List.addEventListener('click', deleteCheck);
List.addEventListener('click', checkBttnCheck);
// Filter.addEventListener('click', filterList);


//Functions

//Show the task form
function toggleTask(){

   task.classList.toggle('show');

   taskBttn.classList.toggle('hide');
}

//Check if the field is empty
function checkIfEmpty(){
    
}

function addItem(event){

    //Prevent the form from submiting
    event.preventDefault();

    //Item div
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    //LI
    const newItem = document.createElement('li');
    newItem.innerText = Input.value;
    newItem.classList.add('todo-item');
    itemDiv.appendChild(newItem);

    //Add item to local storage
    saveLocalItems(Input.value);


    //Checked bttn
    const checkBttn = document.createElement('button');
    checkBttn.innerHTML = '<i class="fas fa-check"></i>';
    checkBttn.classList.add('check-bttn');
    itemDiv.appendChild(checkBttn);

    //Delete bttn
    const deleteBttn = document.createElement('button');
    deleteBttn.innerHTML= '<i class="fas fa-trash"></i>';
    deleteBttn.classList.add('delete-bttn');
    itemDiv.appendChild(deleteBttn);

    //Append all items in the list and clear the input value
    List.appendChild(itemDiv);
    Input.value = "";

}

function deleteCheck(event){
    //Target the item
    const target = event.target;

    //Delete Item
    if(target.classList[0] === 'delete-bttn'){

        //Target the parent of the item
        const deleteParent = target.parentElement;

        //Add delete transition
        deleteParent.classList.add('fall');
        removeLocalItems(deleteParent);
        
        //Delete the parent
        deleteParent.addEventListener('transitionend', function(){
            deleteParent.remove();
        })
    }


}

function checkBttnCheck(event){
    //Target the item
    const target = event.target;

    //Delete Item
    if(target.classList[0] === 'check-bttn'){

        //Target the parent of the item
        const checkParent = target.parentElement;

        //Check the parent
        checkParent.classList.toggle('completed');
    }
}


//Filter the list
function filterList(e){
    const items = List.childNodes;

    items.forEach(function(item){
        switch(e.target.value){
            case "all":
                item.style.display = 'flex';
                break;
            case "checked":
                if(item.classList.contains('completed')){
                    item.style.display = 'flex';
                }else {
                    item.style.display = 'none';
                }
                break;
            case "unchecked":
                if(!item.classList.contains('completed')){
                    item.style.display = 'flex';
                }else {
                    item.style.display = 'none';
                }
                break;
            
        }
    })
}


//Save items in local storage
function saveLocalItems(item){
    //Check the local storage
    let items;

    if(localStorage.getItem('items')=== null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));

    }

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

//Get items from local storage
function getItems(){

     //Check the local storage
     let items;

     if(localStorage.getItem('items')=== null){
         items = [];
     }else{
         items = JSON.parse(localStorage.getItem('items'));
 
     }

    items.forEach(function(item){
         //Item div
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    //LI
    const newItem = document.createElement('li');
    newItem.innerText = item;
    newItem.classList.add('todo-item');
    itemDiv.appendChild(newItem);

    //Checked bttn
    const checkBttn = document.createElement('button');
    checkBttn.innerHTML = '<i class="fas fa-check"></i>';
    checkBttn.classList.add('check-bttn');
    itemDiv.appendChild(checkBttn);

    //Delete bttn
    const deleteBttn = document.createElement('button');
    deleteBttn.innerHTML= '<i class="fas fa-trash"></i>';
    deleteBttn.classList.add('delete-bttn');
    itemDiv.appendChild(deleteBttn);

    //Append all items in the list and clear the input value
    List.appendChild(itemDiv);
     })
}

//Remove item from local storage
function removeLocalItems(item){
      //Check the local storage
      let items;

      if(localStorage.getItem('items')=== null){
          items = [];
      }else{
          items = JSON.parse(localStorage.getItem('items'));
      }
        //Finding the index of the item that we want to remove
      const itemIndex = item.children[0].innerText;
        //Removing it
      items.splice(items.indexOf(itemIndex) , 1);
      localStorage.setItem('items',JSON.stringify(items));
}
