const amount = document.getElementById('amount');
const desc = document.getElementById('desc');
const category = document.getElementById('category');

const form = document.getElementById('form');
const ul = document.getElementById('expense-list');



form.addEventListener('submit', onSubmit);
ul.addEventListener('click', removeUser);
ul.addEventListener('click', editUser);

document.addEventListener('DOMContentLoaded', loadFromSorage);

function loadFromSorage() {
    

    for (var i = 0; i < localStorage.length; i++){
        var li = document.createElement("li");
        var key = localStorage.key(i);
        var arr = JSON.parse(localStorage.getItem(key));

        li.appendChild(document.createTextNode(arr[0]));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(key));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(arr[1]));
        li.appendChild(document.createTextNode(" "));

        var del_btn = document.createElement('button');
        del_btn.className = 'btn btn-danger btn-sm float-right delete margin-auto';
        del_btn.appendChild(document.createTextNode('Delete Expense'));


        var edit_btn = document.createElement('button');
        edit_btn.className = 'btn btn-secondary btn-sm float-right mr-2 edit';
        edit_btn.appendChild(document.createTextNode('Edit Expense'));

        li.appendChild(del_btn);
        li.appendChild(edit_btn);

        li.style.padding = "2px";
        li.style.margin = "5px";

        ul.appendChild(li);
    }


}

function onSubmit(e) {
    e.preventDefault();

    if (amount.value == '' || desc.value == '') {
        msg.innerHTML = '<b>Please enter all fields</b>';

        setTimeout(() => {
            msg.remove();
        }, 2000);
    } 
    else {

       
        var li = document.createElement("li");

        li.appendChild(document.createTextNode(amount.value));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(desc.value));
        li.appendChild(document.createTextNode(" "));
        li.appendChild(document.createTextNode(category.value));

        var del_btn = document.createElement('button');
        del_btn.className = 'btn btn-danger btn-sm float-right delete margin-auto';
        del_btn.appendChild(document.createTextNode('Delete Expense'));


        var edit_btn = document.createElement('button');
        edit_btn.className = 'btn btn-secondary btn-sm float-right mr-2 edit';
        edit_btn.appendChild(document.createTextNode('Edit Expense'));

        li.appendChild(del_btn);
        li.appendChild(edit_btn);

        li.style.padding = "2px";
        li.style.margin = "5px";


        var expenseObj = [amount.value, category.value];

        localStorage.setItem(desc.value,JSON.stringify(expenseObj) );

        form.reset();

        ul.appendChild(li);
    }
}


function removeUser(e) {

    if (e.target.classList.contains('delete')) {

        var li = e.target.parentElement;
        var desc_key = li.childNodes[2].textContent;


        localStorage.removeItem(desc_key);

        ul.removeChild(li);

    }

}

function editUser(e) {
    if (e.target.classList.contains('edit')) {

        var li = e.target.parentElement;
        var desc_key = li.childNodes[2].textContent;

        var desc_arr = JSON.parse(localStorage.getItem(desc_key));

  
        amount.value = desc_arr[0];
        desc.value = desc_key;
        category.value = desc_arr[1];


         localStorage.removeItem(desc_key);
         ul.removeChild(li);



    }
}