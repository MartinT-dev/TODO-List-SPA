//Const Variables
const Input = document.querySelector('.todo-input');
const Button = document.querySelector('.input-bttn');
const List = document.querySelector('.items-list');

//Listener
Button.addEventListener('click', addItem);
List.addEventListener('click', deleteCheck);
List.addEventListener('click', checkBttnCheck);

//Functions

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