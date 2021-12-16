
const submit = document.getElementById('submit-btn');
const container = document.querySelector('.medicine-container');
const form = document.querySelector('.medicine-form');


form.addEventListener('submit', addItem);
window.addEventListener('DOMContentLoaded', setupItems)


function addItem(e){
    e.preventDefault();
    let medName = document.getElementById('nome').value;
    let medAmount = document.getElementById('quantita').value;
    createListMed(medName, medAmount);
    addToLocalStorage(medName, medAmount);

   document.getElementById('nome').value = '';
   document.getElementById('quantita').value = '';
}

function createListMed(name, amount) {

    function amountNum() {
        let amountNum = [];
        for (let x=0; x < amount; x++) {
             amountNum.push(`<button class="amount-btn"></button>`);
        }
        return amountNum.join('');
    }

    let element = document.createElement('article');
    element.classList.add('medicine');
    const attr = document.createAttribute('data-id');
    attr.value = name;
    element.setAttributeNode(attr);
    element.innerHTML = `<h2 class="medicine_name">${name}</h2>
             <button class="delete-btn" type="button" data-id="${name}">X</button>
             <div class="medicine_amount">
                 ${amountNum()}
             </div>`;

    container.appendChild(element);

    const deleteBtn = document.querySelector('.delete-btn');
    const amountBtn = document.querySelectorAll('.amount-btn');

    deleteBtn.addEventListener('click', deleteItem);
    amountBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('amount-done');
        })
    })



    
}

function deleteItem(e) {
    let element= e.currentTarget.parentElement;
    const id = element.dataset.id;
    container.removeChild(element);
    removeFromLocalStorage(id);
}


// *******************STORAGE**************+
function setupItems(){
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach((item) => {
            createListMed(item.name, item.amount);
        })
    }
}

function addToLocalStorage(name, amount){
    const medicines = { name, amount};
    let items = getLocalStorage();
    items.push(medicines);
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item) {
        if (item.name !== id) {
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(items));
}

// let medArr = [];

// submit.addEventListener('click', () => {
//     const medName = document.getElementById('nome').value;
//     const medAmount = document.getElementById('quantita').value;

//     medArr.push({ name : `${medName}`, amount : `${medAmount}`});
    
// })

// document.addEventListener('click', (e) => {
// //    if (submit.contains(e.target) && medArr!==[]) {
//        let txtArr = medArr.map((item) => {
        
//         function amountNum(num) {
//             let amountNum = [];
//             for (let x=0; x < num; x++) {
//                amountNum.push(`<button class="amount-btn"></button>`);
//             }
//             return amountNum.join('');
//         }
//         return `<section class="medicine">
//         <h2 class="medicine_name">${item.name}</h2>
//         <button class="delete-btn" type="button" data-id="${item.name}">X</button>
//         <div class="medicine_amount">
//             ${amountNum(item.amount)}
//         </div>
//         </section>`
//     }).join('');


//     container.innerHTML = txtArr;
   

//    const deleteBtn = document.querySelectorAll('.delete-btn');
//    const amountBtn = document.querySelectorAll('.amount-btn');
//    console.log(amountBtn);
      
//    amountBtn.forEach((btn) => {
//        btn.addEventListener('click', () => {
//            btn.classList.toggle('amount-done');
//         })
//     })
   
    
//   deleteBtn.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         let dataset = e.currentTarget.dataset.id;
//         let index = medArr.map(function(e) { return e.name; }).indexOf(`${dataset}`);
//         medArr.splice(index, 1);

//     })
//   })


// })



    







