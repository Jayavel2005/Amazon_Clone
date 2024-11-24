import {cart,removeFromCart} from "../data/cart.js"
import { products} from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../data/deliveryOptions.js"







let cartItems = ""
cart.forEach((cartItem)=>{

    const productId = cartItem.productId;
    let matchingItem;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingItem = product;
        }
    });


  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays,"days");
  const dateString = deliveryDate.format("dddd, MMMM, D")
    
    
    cartItems +=`
        <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
              </div>
            </div>
          </div>
    `;
});

function deliveryOptionsHTML(matchingItem, cartItem){

  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,"days");
    const dateString = deliveryDate.format("dddd, MMMM, D")
    const priceStirng = deliveryOption.priceCents === 0 ? "FREE" : `$${(deliveryOption.priceCents/100).toFixed(2)} - `;

    const isChecked = deliveryOption.id ===  cartItem.deliveryOptionId;

    html +=` <div class="delivery-option">
        <input type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceStirng} Shipping
          </div>
        </div>
      </div>`
  })
  return html;
}
document.querySelector(".js-order-summary").innerHTML = cartItems;
document.querySelectorAll(".js-delete-quantity-link").forEach((link)=>{
    link.addEventListener("click",()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();
        
        
        
    })
})
// console.log(cartItems);
