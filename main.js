const amount = document.getElementById('amount');
const desc = document.getElementById('desc');
const category = document.getElementById('category');
const eid=document.getElementById('id');

const form = document.getElementById('form');
const ul = document.getElementById('expense-list');

const edit=document.getElementById('edit');

form.addEventListener('submit', onSubmit);
// ul.addEventListener('click', removeUser);
// ul.addEventListener('click', editUser);

edit.addEventListener('click',onSubmit);

document.addEventListener('DOMContentLoaded', DomLoad);

async function DomLoad() {
    try{
        const res = await axios.get("http://localhost:3000/")
        
            for (let i in res.data) {
                showOnScreen(res.data[i]);
           }
            
        }
        catch(err){
        console.log(err)
        }

}

async function onSubmit(e) {
    e.preventDefault();

    if (amount.value == '' || desc.value == '') {
        msg.innerHTML = '<b>Please enter all fields</b>';

        setTimeout(() => {
            msg.remove();
        }, 2000);
    } 
    else {
        if(e =='submit'){
            try{
                expense={
                    amount:amount.value,
                    description:desc.value,
                    category:category.value
                };
                let response= await axios.post("http://localhost:3000/add-expense/",expense);
                showOnScreen(response.data.expense);
            }
            catch(err){
                console.log(err);
            }
            
            form.reset();
        }

        else{
            try{
                expense={
                    id:id.value,
                    amount:amount.value,
                    description:desc.value,
                    category:category.value
                };

                console.log(expense);
                let response= await axios.post("http://localhost:3000/edit-expense/",expense);
                showOnScreen(response.data.expense);
            }
            catch(err){
                console.log(err);
            }
            
            form.reset();
    
        }
    }

}


function removeExpense(id) {
    try{

        axios.delete(`http://localhost:3000/delete/${id}`);
        ul.removeChild(document.getElementById(id));
                            
     
    }
    catch(err){
        console.log(err);
    }

    

}

async function editExpense(id) {
    try{
        const expense=await axios.get(`http://localhost:3000/edit/${id}`);
        const editExpense=expense.data.expense;

       eid.value=id;
       amount.value=editExpense.amount;   
       desc.value=editExpense.description;
       category.value=editExpense.category;

       
        
       let submit=document.getElementById('submit');
       submit.setAttribute('hidden','true');
       
       edit.removeAttribute('hidden');
    
       ul.removeChild(document.getElementById(id));
      

    }
    catch(err){
        console.log(err);
    }
}


function showOnScreen(obj){

    // const parent=document.getElementById()
    const child=`<li id=${obj.id}> 
    ${obj.category} - ${obj.amount} - ${obj.description}
    <button class='btn btn-danger btn-sm float-right margin-auto' onClick=removeExpense(${obj.id})>Delete</button>
    <button class='btn btn-secondary btn-sm float-right mr-2 ' onClick=editExpense(${obj.id})>Edit</button>  
    </li>`

    ul.innerHTML=ul.innerHTML+child;


}