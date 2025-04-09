export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [

        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1
        },
        {
            productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity : 2,
    
        }
    ];
}





function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    })

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push(
            {
                productId: productId,
                quantity: 1,
            }
        )
    }

    saveToStorage();
    updateCartQuantity();

}

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

}


export function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);

    console.log(cart);
    saveToStorage();

}



