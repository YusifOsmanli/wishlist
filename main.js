const nameInp = document.getElementById("name")
const brandInp = document.getElementById("brand")
const catagoryInp = document.getElementById("category")
const priceInp = document.getElementById("price")
const imageInp = document.getElementById("image")
const saveChangesBtn = document.getElementById("saveChangesBtn")
const wishlistWrapper = document.getElementById("wishlistWrapper")

let products;
let wishlist;



if(!localStorage.getItem("products")){
    products=[]
}else{
    products = JSON.parse(localStorage.getItem("products"))
}
renderProducts(products)

if (!localStorage.getItem("wishlist")) {
    wishlist = []
}
else {
    wishlist = JSON.parse(localStorage.getItem("wishlist"))
}
// renderProducts(products)
renderWishlist(wishlist)

class Product {
    constructor(name, catagory, brand, price,image) {
        this.id = new Date().getTime()
        this.name = name
        this.catagory = catagory
        this.brand = brand
        this.price = price
        this.image=image
    }
}
function getValues() {
    let nameVal = nameInp.value
    let brandVal = brandInp.value
    let catagoryVal = catagoryInp.value
    let priceVal = priceInp.value
    let imageVal = imageInp.value

    return { nameVal, brandVal, catagoryVal, priceVal,imageVal }
}

function resetForm() { // void
    nameInp.value = ""
    brandInp.value = ""
    catagoryInp.value = ""
    priceInp.value = ""
    imageInp.value = ""
}

function addProduct(name, brand, catagory, price,image) {
    let newProduct = new Product(name, catagory, brand, price,image)
    products.push(newProduct) 
    localStorage.setItem("products", JSON.stringify(products))

    renderProducts(products)
}

saveChangesBtn.addEventListener("click",()=>{ 
    let {nameVal, brandVal, catagoryVal, priceVal,imageVal}=getValues()
    addProduct(nameVal, brandVal, catagoryVal, priceVal,imageVal)
    resetForm()
})

function renderProducts(products) {
        let innerHTML = ""
        for (let i = 0; i < products.length; i++) {
            innerHTML += `<div class="col-3 mb-2">
            <a href="#">
              <div class="card" style="width: 18rem">
                <img
                  class="card-img-top"
                  src="${products[i].image}"
                  alt="Card image cap"
                />
                <d iv class="card-body">
                  <h5 class="card-title">${products[i].brand} ${products[i].name}</h5>
                  <p class="card-text">
                    ${products[i].price} AZN
                    ${products[i].category}
                    ${products[i].inStock ? `<span class="text-success">in stock</span>` : `<span class="text-danger">out of stock</span>`}
                  </p>
                  <div class="card__footer">
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        <button class="btn btn-info" onclick="changeStock(${products[i].id})">Change Stock</button>
                        <button class="btn btn-warning" onclick="addToWishlist(${products[i].id})">Add To Wishlist</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${products[i].id})">Delete</button>
                      </div>
                </d>
              </div>
            </a>
          </div>`
        }
        productsWrapper.innerHTML = innerHTML
    }


    function deleteProduct(id) {
            const target = products.find((prod) => prod.id == id)
            const indexOfTarget = products.indexOf(target)
            console.log(indexOfTarget)
            products.splice(indexOfTarget, 1)
            renderProducts(products)
        }

        function renderWishlist(wishlistItems) {
    let innerHTML = ""
    for (let i = 0; i < wishlistItems.length; i++) {
        innerHTML += `
        <li>${wishlistItems[i].brand} ${wishlistItems[i].name} ${wishlistItems[i].price} AZN <button onclick="removeFromWishlist(${wishlistItems[i].id})">delete</button></li>
        `
    }
    wishlistWrapper.innerHTML = innerHTML

}

function addToWishlist(id) {
    let target = products.find((product) => product.id == id)
    let existProd = wishlist.find(wishlistItem => wishlistItem.id == target.id)
    if (existProd) {
        alert("item wishlistdedir")
        return
    }
    else {
        wishlist.push(target)
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
    renderWishlist(wishlist)
}

function removeFromWishlist(id) {
        const target = wishlist.find((wishlistItem) => wishlistItem.id == id)
        const indexOfTarget = wishlist.indexOf(target)
        wishlist.splice(indexOfTarget, 1)
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
        renderWishlist(wishlist)
    }
