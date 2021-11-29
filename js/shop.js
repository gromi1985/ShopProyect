// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var subtotal = {
    grocery: {
        value: 0,
        discount: 0
    },
    beauty: {
        value: 0,
        discount: 0
    },
    clothes: {
        value: 0,
        discount: 0
    },
};
var total = 0;



// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    let i = 0;
    while (products[i].id !== id) ++i;

    // 2. Add found product to the cartList array
    cartList.push(products[i]);

}

// Exercise 2
function cleanCart() {
    cartList.splice(0);
}
//Limpiamos los subtotales
for (let key in subtotal){
    subtotal[key].value = 0;
    subtotal[key].discount = 0;
   }


  //Limpiamos el total
  total = 0;

// Exercise 3
function calculateSubtotals_v1() {
    // 1. Create a for loop on the "cartList" array 
    for (let i in cartList) {
        subtotal[cartList[i].type].value += cartList[i].price;
    }
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
}

// Exercise 4
function calculateTotal() {
    // Calculate total price of the cart either using the "cartList" array
    for (let key in subtotal) {
        total += subtotal[key].value;
    }

    applyPromotionsCart();
}

// Exercise 5

function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    for (let elementCart in cartList) {
        const objectReferenced = cart.find((element) => element.id === cartList[elementCart].id);
        if (objectReferenced == undefined) {
            let newElement = cartList[elementCart];
            newElement["quantity"] = 1;
            newElement["subtotal"] = cartList[elementCart].price;
            newElement["subtotalWithDiscount"] = 0;
            cart.push(newElement);
        }
        else {
            objectReferenced.quantity++;
            objectReferenced.subtotal += cartList[elementCart].price;
        }

    }
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

}

// Exercise 6
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for (let elementCart in cart) {
        if (cart[elementCart].quantity >= 3 && cart[elementCart].type === "grocery" && cart[elementCart].name === "cooking oil") {
            cart[elementCart].subtotalWithDiscount = cart[elementCart].quantity * 10;
        }
        if (cart[elementCart].quantity >= 10 && cart[elementCart].type === "grocery" && cart[elementCart].name === "Instant cupcake mixture") {
            cart[elementCart].subtotalWithDiscount = cart[elementCart].quantity * (2 / 3) * cart[elementCart].price;
        }
    }

}

//La estructura del arreglo de objetos cart es
//cart
/*indice {id:valor1,
img:valor2,
price:valor3,
quatity:valor4,
subtotal:valor5,
subtotalWithDiscount:valor6,
type:valor7}*/

// Exercise 7
function addToCart(id) {

    const alert = document.querySelector('.alertAdd');
    alert.classList.remove('hide');
    setTimeout(function () { alert.classList.add('hide') }, 2000);


    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    let objectReferenced;
    let flagImg = false;
    for (let itemProduct in products) {
        if (products[itemProduct].id === id) {
            objectReferenced = cart.find((element) => element.id === id);
            if (objectReferenced == undefined) {
                let newElement = products[itemProduct];
                newElement["quantity"] = 1;
                newElement["subtotal"] = products[itemProduct].price;
                newElement["subtotalWithDiscount"] = 0;
                newElement["img"] = "";
                cart.push(newElement);
            }
            else {
                objectReferenced.quantity++;
                objectReferenced.subtotal += products[itemProduct].price;
                flagImg = true;
            }
            break;
        }
    }
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    //Agrego el link de la imagen en caso de que el item sea nuevo para el carro de la compra y lo pinto nuevamente
    if (!flagImg) {
        addLinkImgCart(id);
        //Renderizamos todos los elementos de la variable cart en el modal del carro de la compra
        printCart();
    }
    else //Si elemento ya existe en el carrito solo renderizo el campo quantity
    {
        renderQuantityCart(objectReferenced.name, objectReferenced.quantity);
    }

    totalCarrito();
    calculateSubtotals();

}

function calculateSubtotals() {
     //Limpiamos variables
     cleanCart();

    // 1. Create a for loop on the "cart" array 
    //Recalculamos los subtotales
    for (let itemCart in cart) {
        subtotal[cart[itemCart].type].value += cart[itemCart].quantity * cart[itemCart].price;
    }
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
    calculateTotal();
}



// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array 
    const index = cart.findIndex((element) => element.id === id);
    const objectReferenced = cart[index];
    if (objectReferenced == undefined) {
        console.log("El elemento no existe");
    }
    else if (objectReferenced.quantity === 1) {
        cart.splice(index, 1);
    }
    else {
        objectReferenced.quantity--;
        objectReferenced.subtotal -= products[index].price;
    }
    calculateSubtotals();
}

// Exercise 10

//Funcion que agrega al arreglo cart el link de la imagen asociada para ser mostrada en el carrito.
function addLinkImgCart(id) {

    //Title del new item
    let itemTitle = "";

    //Indice del arreglo de cart
    let indexItemProduct;

    for (indexItemProduct in cart) {
        if (cart[indexItemProduct].id === id) {
            itemTitle = cart[indexItemProduct].name.toLowerCase();
            break;
        }
    }
    let listTitle = document.querySelectorAll('.card-title');
    for (let item in listTitle) {
        if (listTitle[item].innerHTML != undefined && listTitle[item].innerHTML.toLowerCase() === itemTitle) {
            const ElementCard = listTitle[item].closest('.card');
            const itemImg = ElementCard.querySelector('.grocery-img').src;
            cart[indexItemProduct].img = itemImg;
            break;
        }
    }
}

/*indice {id:valor1,
img:valor2,
name:valor,
price:valor3,
quantity:valor4,
subtotal:valor5,
subtotalWithDiscount:valor6,
type:valor7
}*/

const tbody = document.querySelector('tbody');
//Funcion que renderiza los elementos del carro de la compra, si es nuevo se renderiza todo el carro.
//Por cada item nuevo agregado crea un bloque html tr con clase itemCart mas la info del producto.
function printCart() {
    tbody.innerHTML = '';
    cart.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('itemCart');

        const content = `
            <th scope="row" >1</th>
            <td><img src="./images/product.svg" class="grocery-img"></td>
            <td class="table__title"> <h6 >${item.name}</h6></td>
            <td class="table__price"> <p>${item.price}</p> </td>
            <td class="table__quantity d-flex ">
            <input type="number" min="1" value=${item.quantity} class="input-element border-0">
            <button class="delete btn btn-danger">x</button>
            </td>`;


        tr.innerHTML = content;
        tbody.append(tr);
        tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
        tr.querySelector(".input-element").addEventListener('change', addDeductItems);
    })

    //Creammos un listener para el evento de click del boton con clase delete.


}

//Funcion que renderiza solo el campo quantity, cuando ya existe el elemento en el carrito
function renderQuantityCart(title__product, quantity__product) {

    const tbodyItemCart = tbody.querySelectorAll('.table__title > h6');

    for (let index in tbodyItemCart) {
        if (tbodyItemCart[index].innerHTML === title__product) {
            const ElementCard = tbodyItemCart[index].closest('.itemCart');
            ElementCard.querySelector('.input-element').value = quantity__product;
            break;
        }
    }
}

//Recorro el arreglo cart, calculo del total del carrito y lo renderizo
function totalCarrito() {
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');
    cart.forEach((item) => {
        const precio = item.price;
        total = total + item.quantity * precio;
    });

    itemCartTotal.innerHTML = `Total $${roundToTwo(total)}`
    //Cada vez que renderizamos parte o todo el modal recalculamos el total del cart
    //Por lo que este cart es lo que almacenamos en el storage.
    addItemLocalStorage();
}

//Funcion que eliminará el item del carrito al dar click sobre "X"
//Al dar click sobre "X" se lanza el evento de eliminar.
//Busco su elemento padre mas cercano, ya que necesitaré eliminar su HTML
function removeItemCarrito(e) {

    const alert = document.querySelector('.alertDel');
    alert.innerHTML = "Producto eliminado del carrito";
    alert.classList.remove('hide');
    setTimeout(function () { alert.classList.add('hide') }, 2000);


    const buttonDelete = e.target;
    const tr = buttonDelete.closest('.itemCart'); //tengo el elemento padre del item a eliminar

    //selecciono lo que seria el name del array products, antes de eliminarlo 
    //debo saber cual es el elemento para eliminarlo del array cart
    const titleItemDelete = tr.querySelector('.table__title>h6').textContent;

    for (let index in cart) {
        if (cart[index].name === titleItemDelete) {
            cart.splice(index, 1);
        }
    }

    //Elimino del modal el elemento 
    tr.remove();
    //Renderizo el total del carrito
    totalCarrito();
}

//Funcion que redondea el Total del carrito antes de renderizarlo
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}


//En el carrito suma, resta , valores no permitidos <0 > 5000 items
//recibe el evento de cambio del numero de items
function addDeductItems(e) {
    const buttonChange = e.target;
    const tr = buttonChange.closest('.itemCart');
    const titleChange = tr.querySelector('.table__title > h6').textContent;
    cart.forEach((item) => {
        if (item.name == titleChange) {
            (buttonChange.value < 1 || buttonChange.value > 2000) ? buttonChange.value = 1 : buttonChange.value;
            item.quantity = buttonChange.value;
        }
    });
    totalCarrito();
}


//Almacenamos en localStorage (base de datos local) el arreglo de productos comprados por el usuario
function addItemLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


//Cuando refresquemos la pagina recuperamos lo que hay en el storage, lo almacenamos en la variable storage si esta no es vacia lo asignamos a la variable cart y lo renderizamos.
window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
        cart = storage;
        printCart();
        totalCarrito();
    }
}

