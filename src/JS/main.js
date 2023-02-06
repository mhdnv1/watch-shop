let url = 'http://localhost:3000/cards'
let products = document.querySelector('.product__cards')
let modalTrigger = document.querySelectorAll('#modal'),
   modal = document.querySelector('.modal')
   modalClose = document.querySelector('.modal__close');
let Form = document.querySelector('form')

modalTrigger.forEach((btn) => {
   btn.addEventListener('click', () => {
      modal.classList.add('show')
      modal.classList.remove('hide')
      document.body.style.overflow = 'hidden'
   })
})

function closeModal() {
   modal.classList.add('hide')
   modal.classList.remove('show')
   document.body.style.overflow = ''
}
modalClose.addEventListener('click', closeModal)

modal.addEventListener('click', (e)=>{
  if (e.target == modal) {
       closeModal()
  }
})

document.addEventListener('keydown', (e)=>{
   if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal()
   }
})

// -------------------------------------------------------------------------------------------------

const getProducts = () => {
   fetch(url)
      .then((res) => res.json())
      .then((res) => res.map((item) => {
         products.innerHTML += `
            <div class="product__card">
              <img src="${item.image}" alt="Airpods">
             <p class="product__card-title">${item.title}</p>
             <p class="product__card-price">$${item.price}</p>
             <p class="product__card-price">${item.memory}GB</p>
             <button class="product__btn">Buy</button>
             <button data-id='${item.id}' class="product__btn delete">Delete</button>
           </div>  
      `
      let btnDelete = document.querySelectorAll('.delete')
      Array.from(btnDelete).forEach((btn)=>{
         btn.addEventListener('click', ()=>{
            fetch(url +`/${btn.dataset.id}`,{
               method:'Delete'
            }).then(()=>{
               getProducts()
            }).catch(()=> alert('Error'))
         })
      })
      }))
}

getProducts()

Form.addEventListener('submit',(e)=>{
   e.preventDefault()
   let product = {
      title: e.target[0].value,
      price: e.target[1].value,
      memory: e.target[2].value,
      image: e.target[3].value
   }
   
   fetch(url, {
      method:'POST',
      headers:{
         'Content-Type':'Application/json'
      },
      body:JSON.stringify(
         product
      )
   }).then((res)=> alert('All is ready'))
   .catch((error)=> alert(error))
})

