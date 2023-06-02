const menSec = document.getElementById("men-sec");
const womenSec = document.getElementById("women-sec");
const jewellerySec = document.getElementById("jewellery-sec");
const electronicsSec = document.getElementById("electronics-sec");

const allFilter = document.getElementById("allBtn");
const menFilter = document.getElementById("menBtn");
const womenFilter = document.getElementById("womenBtn");
const jewelleryFilter = document.getElementById("jewelleryBtn");
const electronicsFilter = document.getElementById("electronicsBtn");

const search = document.getElementById("search");
const rangeBar = document.getElementById("range");

const applyBtn = document.getElementById("apply-btn");
const lowPrice = document.getElementById("low");
const midPrice = document.getElementById("mid");
const highPrice = document.getElementById("high");
const vHighPrice = document.getElementById("vHigh");

let men = [];
let women = [];
let jewelery = [];
let electronics = [];
let myCart = [];
let response = [];

let temp = JSON.parse(localStorage.getItem("cart"));

fetchApi("https://fakestoreapi.com/products");

async function fetchApi(url) {
  try {
    let data = await fetch(url);
    response = await data.json(data);
    // console.log(response);

    men = response.filter((item) => {
      return item.category == "men's clothing";
    });
    // console.log(men);

    women = response.filter((item) => {
      return item.category == "women's clothing";
    });
    // console.log(women);

    jewelery = response.filter((item) => {
      return item.category == "jewelery";
    });
    // console.log(jewelery);

    electronics = response.filter((item) => {
      return item.category == "electronics";
    });
    // console.log(electronics);

    show();
  } catch (error) {
    console.log(error);
  }
}
const searchSection = document.querySelector("#searched-section");
function addToCart(itemId) {
  let temp = response.filter((item) => {
    return item.id == itemId;
  });

  myCart.push(temp[0]);
  localStorage.setItem("cart", JSON.stringify(myCart));
}
allFilter.addEventListener("click", show);

function show() {
  allFilter.classList.add("active");
  searchSection.classList.add("hide");

  const allSec = [menSec, womenSec, jewellerySec, electronicsSec];

  allSec.forEach((item) => {
    item.classList.remove("hide");
  });

  const allFilters = [
    menFilter,
    womenFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  console.log(allFilters);
  allFilters.forEach((section) => section.classList.remove("active"));

  const all1 = men.map((item) => {
    console.log(item);
    return renderItems(item);
  });
  document.getElementById("men-items").innerHTML = all1.join("");

  const all2 = women.map((item) => {
    return renderItems(item);
  });
  document.getElementById("women-items").innerHTML = all2.join("");

  const all3 = jewelery.map((item) => {
    return renderItems(item);
  });
  document.getElementById("jewellery-items").innerHTML = all3.join("");

  const all4 = electronics.map((item) => {
    return renderItems(item);
  });
  document.getElementById("electronics-items").innerHTML = all4.join("");
}

menFilter.addEventListener("click", showMen);
// men btn
function showMen() {
  menSec.classList.remove("hide");
  menSec.classList.add("active");

  const allFilters = [
    allFilter,
    womenFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((item) => item.classList.add("active"));
  const allSec = [womenSec, jewellerySec, electronicsSec];
  allSec.forEach((item) => item.classList.add("hide"));

  const all1 = men.map((item) => {
    return renderItems(item);
  });
  document.getElementById("men-items").innerHTML = all1.join("");
}

// women btn

womenFilter.addEventListener("click", showWomen);

function showWomen() {
  womenSec.classList.add("active");
  womenSec.classList.remove("hide");
  const allSec = [menSec, jewellerySec, electronicsSec];
  allSec.forEach((item) => item.classList.add("hide"));
  const allFilters = [allFilter, menFilter, jewelleryFilter, electronicsFilter];
  allFilters.forEach((item) => item.classList.add("active"));

  const all2 = women.map((item) => {
    return renderItems(item);
  });
  document.getElementById("women-items").innerHTML = all2.join("");
}

// jewelery
jewelleryFilter.addEventListener("click", showJewellery);

function showJewellery() {
  jewellerySec.classList.add("active");
  jewellerySec.classList.remove("hide");
  const allSec = [menSec, womenSec, electronicsSec];
  allSec.forEach((item) => item.classList.add("hide"));
  const allFilters = [allFilter, menFilter, womenFilter, electronicsFilter];
  allFilters.forEach((item) => item.classList.add("active"));

  const all3 = jewelery.map((item) => {
    return renderItems(item);
  });
  document.getElementById("jewelery-items").innerHTML = all3.join("");
}

electronicsFilter.addEventListener("click", showElectronics);

function showElectronics() {
  electronicsSec.classList.add("active");
  electronicsSec.classList.remove("hide");
  const allSec = [menSec, jewellerySec, womenSec];
  allSec.forEach((item) => item.classList.add("hide"));
  const allFilters = [allFilter, menFilter, jewelleryFilter, womenFilter];
  allFilters.forEach((item) => item.classList.add("active"));

  const all3 = electronics.map((item) => {
    return renderItems(item);
  });
  document.getElementById("electronics-items").innerHTML = all3.join("");
}

function renderItems(item) {
  return `
<div class="item">
<div id="img-div">
<img src=${item.image} alt="Item" />
</div>
  <div class="info" id="info-div">
  <div class="title">${item.title.slice(0, 42)}...</div>
  <div class="row">
    <div class="price">$${item.price}</div>
    <div class="sized">S,M,L</div>
  </div>
  <div class="colors">
    Colors:
    <div class="row">
      <div class="circle" style="background-color: #000"></div>
      <div class="circle" style="background-color: #4938af"></div>
      <div class="circle" style="background-color: #203d3e"></div>
    </div>
  </div>
  <div class="row">Rating: ${item.rating.rate}</div>
</div>
 <div id="btn-div">
<button id="addBtn" onclick="addToCart(${item.id})">Add to Cart</button>
</div>
</div>`;
}

search.addEventListener("input", searchItems);
function searchItems() {
  const searchTerm = search.value.toLowerCase().trim();
  let searchResults = response.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );

  const allSections = [
    mensSection,
    womensSection,
    jewellerySection,
    electronicsSection,
  ];
  allSections.forEach((section) => section.classList.add("hide-class"));

  const allFilters = [
    allFilter,
    mensFilter,
    womensFilter,
    jewelleryFilter,
    electronicsFilter,
  ];
  allFilters.forEach((section) => section.classList.remove("active"));

  console.log(searchResults);

  if (searchTerm !== "") {
    const searchHTML = searchResults.map((item) => renderItems(item));
    document.getElementById("searched-items").innerHTML = searchHTML.join("");
    searchSection.classList.remove("hide");
  } else {
    document.getElementById("searched-items").innerHTML = "No items found";
    // document.getElementById("searched-section").classList.add("hide-class");
  }
  if (searchResults.length == 0) {
    document.getElementById("searched-items").innerHTML = "No items found";
  }
}

rangeBar.addEventListener("input", applyRatingFilter);
function applyRatingFilter() {
  const ratingValue = rangeBar.value;
  let ratingResults = response.filter((item) => {
    return Math.floor(item.rating.rate) == ratingValue;
  });
  const searchHTML = ratingResults.map((item) => renderItems(item));
  document.getElementById("searched-items").innerHTML = searchHTML.join("");
  searchSection.classList.remove("hide");
}

//function for  filtering according ti price--------------------------------->
applyBtn.addEventListener("click", filterPrice);
function filterPrice() {
  let resultsArr = [];
  if (lowPrice.checked == true) {
    let temp = response.filter((item) => {
      return item.price <= 25.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }
  if (medium.checked == true) {
    let temp = response.filter((item) => {
      return item.price >= 25.0 && item.price <= 50.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }
  if (highPrice.checked == true) {
    let temp = response.filter((item) => {
      return item.price >= 50.0 && item.price <= 100.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }
  if (veryHigh.checked == true) {
    let temp = response.filter((item) => {
      return item.price >= 100.0;
    });

    temp.forEach((item) => {
      resultsArr.push(item);
    });
  }

  const searchHTML = resultsArr.map((item) => renderItems(item));
  document.getElementById("searched-items").innerHTML = searchHTML.join("");
  searchSection.classList.remove("hide");

  if (
    lowPrice.checked == false &&
    medium.checked == false &&
    highPrice.checked == false &&
    veryHigh.checked == false
  ) {
    document.getElementById("searched-items").innerHTML = "";
    searchSection.classList.add("hide");
  }
}
