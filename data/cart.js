export const cart = [

];

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

    updateCartQuantity();
}

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

}
