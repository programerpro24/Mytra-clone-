const ConvenienceFess=99;
let bagItemObjects;

onLoad();

function onLoad(){
    loadbagitemObjects();
    displayBagItems();
    displayBagSummery();
}

function displayBagSummery(){
    let bagSummeryElement=document.querySelector('.bag-summary');
    let totalItem=bagItemObjects.length;
    let totalMRP=0;
    let totalDiscount=0;
    let finalPayment=0;

    bagItemObjects.forEach(price=>{
        totalMRP+=price.original_price;
        totalDiscount+=price.original_price-price.current_price;

    });

    finalPayment=totalMRP-totalDiscount+ConvenienceFess;

    bagSummeryElement.innerHTML=`<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value"> ₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value"> ₹ ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`

}



function loadbagitemObjects(){
    bagItemObjects=bagItems.map(item=>{
        for(i=0; i<= items.length; i++){
            if(item==items[i].id){
                return items[i];
            };
        };
    });
  
};



function removeFromBag(itemId){
    bagItems=bagItems.filter(bagItemId=> bagItemId!=itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadbagitemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummery();
    }
    

function displayBagItems(){
    let containerElement = document.querySelector('.bag-items-container');
    bagItemObjects.forEach(item=>{
    containerElement.innerHTML+=generateItemHTML(item);    
    });
}


function generateItemHTML(item){
return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onClick="removeFromBag(${item.id})">X</div>
          </div>
`
}