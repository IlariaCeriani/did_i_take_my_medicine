
const submit = document.getElementById('submit-btn');
const container = document.querySelector('.medicine-container');

let medArr = [];

submit.addEventListener('click', () => {
    const medName = document.getElementById('nome').value;
    const medAmount = document.getElementById('quantita').value;

    medArr.push({ name : `${medName}`, amount : `${medAmount}`});

    let txtArr = medArr.map((item) => {
        
        function amountNum(num) {
            let amountNum = [];
            for (let x=0; x < num; x++) {
               amountNum.push(`<button class="amount-btn"></button>`);
            }
            return amountNum.join('');
        }
        return `<section class="medicine">
        <h2 class="medicine_name">${item.name}</h2>
        <button class="delete-btn" type="button" data-id="${item.name}">X</button>
        <div class="medicine_amount">
            ${amountNum(item.amount)}
        </div>
        </section>`
    }).join('');


    container.innerHTML = txtArr;

    
   const deleteBtn = document.querySelectorAll('.delete-btn');
    const amountBtn = document.querySelectorAll('.amount-btn');
      
    amountBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('amount-done');
        })
    });
    
    deleteBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
           let dataset = e.currentTarget.dataset.id;
           let index = medArr.map(function(e) { return e.name; }).indexOf(`${dataset}`);
           medArr.splice(index, 1);

        })
    })
 
    
})








