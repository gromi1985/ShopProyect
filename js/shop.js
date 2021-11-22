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
    let i=0;
    while(products[i].id !== id) ++i;

    // 2. Add found product to the cartList array
    cartList.push(products[i]);

}

// Exercise 2
function cleanCart() {
    cartList.splice(0,cartList.length);
}

// Exercise 3
function calculateSubtotals_v1() {
    // 1. Create a for loop on the "cartList" array 
    for( let i in cartList){
        subtotal[cartList[i].type].value += cartList[i].price;
    }
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
}

// Exercise 4
function calculateTotal() {
    // Calculate total price of the cart either using the "cartList" array
    for(let key in subtotal)
    {
        total += subtotal[key].value;
    }

    applyPromotionsCart();
}

// Exercise 5

function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    for(let elementCart in cartList)
    {
        const objectReferenced = cart.find((element) => element.id === cartList[elementCart].id);
        if  (objectReferenced  == undefined) {
            let newElement = cartList[elementCart];
            newElement["quantity"] = 1;
            newElement["subtotal"]  = cartList[elementCart].price;
            newElement["subtotalWithDiscount"] = 0; 
            cart.push(newElement);
        }
        else{
        objectReferenced.quantity++;
        objectReferenced.subtotal += cartList[elementCart].price; 
        }

    }
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

}

// Exercise 6
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for(let elementCart in cart)
    {
        if(cart[elementCart].quantity >= 3 && cart[elementCart].type === "grocery" && cart[elementCart].name==="cooking oil")
        {
            cart[elementCart].subtotalWithDiscount = cart[elementCart].quantity *10;
        }
        if(cart[elementCart].quantity >= 10 && cart[elementCart].type === "grocery" && cart[elementCart].name==="Instant cupcake mixture" )
        {
            cart[elementCart].subtotalWithDiscount = cart[elementCart].quantity *(2/3) * cart[elementCart].price;
        }
    }

}

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    for(itemProduct in products){
        if(products[itemProduct].id === id)
        {
            const objectReferenced= cart.find((element) => element.id === id);
            if  (objectReferenced  == undefined) {
                let newElement = products[itemProduct];
                newElement["quantity"] = 1;
                newElement["subtotal"]  = products[itemProduct].price;
                newElement["subtotalWithDiscount"] = 0; 
                cart.push(newElement);
            }
            else{
            objectReferenced.quantity++;
            objectReferenced.subtotal += products[itemProduct].price; 
            }
        }
    }
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    calculateSubtotals();
}

function calculateSubtotals() {
    // 1. Create a for loop on the "cart" array 
    for(let itemCart in cart){
        subtotal[cart[itemCart].type].value +=cart[itemCart].quantity * cart[itemCart].price;
    }
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
    calculateTotal();
}



// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

// Exercise 10
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
}
