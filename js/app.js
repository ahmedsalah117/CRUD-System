const pName = document.querySelector(".pName");
const pCategory = document.querySelector(".pCategory");
const pPrice = document.querySelector(".pPrice");
const pDescription = document.querySelector(".pDescription");
const addProduct = document.querySelector(".addProduct");
const clearForm = document.querySelector(".clearForm");
const pForm = document.querySelector(".pForm");
const tBody = document.querySelector(".tBody");
const pNameWarning = document.querySelector(".pNameWarning");
const pCategoryWarning = document.querySelector(".pCategoryWarning");
const pPriceWarning = document.querySelector(".pPriceWarning");
const pDescriptionWarning = document.querySelector(".pDescriptionWarning");
const updateProductBtn = document.querySelector(".updateProduct");
const searchInput = document.querySelector(".searchInput");
let updatedProductIndex;
let ProductsArr = [];

function clearFormHandler() {
  pName.value = "";
  pCategory.value = "";
  pPrice.value = "";
  pDescription.value = "";
}

function deleteHandler(index) {
  ProductsArr.splice(index, 1);
  // localStorage.clear();
  localStorage.setItem("products", JSON.stringify(ProductsArr));
  if (ProductsArr.length !== 0) {
    tBody.innerHTML = "";
    for (const [
      index,
      {
        pName: Name,
        pCategory: Category,
        pPrice: Price,
        pDescription: Description,
      },
    ] of ProductsArr.entries()) {
      tBody.innerHTML += `
        <tr>
        <td>${index}</td>
        <td class="searchedProductName">${Name}</td>
        <td>${Category}</td>
        <td>${Price}</td>
        <td>${Description}</td>
        <td>
          <button class="btn btn-danger" onClick="deleteHandler(${index})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-warning" onClick="updateHandler(${index})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
          `;
    }
  } else {
    tBody.innerHTML = "";
  }
}

function indexHolder(index) {
  //Just to save the product's being updated index
  updatedProductIndex = index;
}

function updateHandler(index) {
  //adding the current (before-update-data) back to the inputs .
  addProduct.classList.add("d-none");
  updateProductBtn.classList.remove("d-none");
  productData = ProductsArr[index];
  pName.value = productData.pName;
  pCategory.value = productData.pCategory;
  pPrice.value = productData.pPrice;
  pDescription.value = productData.pDescription;
  indexHolder(index); // Holding the product index in a separate variable ,so that we can use it with the updateProductBtn eventListener.
}

if (localStorage.getItem("products") !== null) {
  ProductsArr = JSON.parse(localStorage.getItem("products"));
  for (const [
    index,
    {
      pName: Name,
      pCategory: Category,
      pPrice: Price,
      pDescription: Description,
    },
  ] of ProductsArr.entries()) {
    tBody.innerHTML += `
      <tr>
      <td>${index}</td>
      <td class="searchedProductName">${Name}</td>
      <td>${Category}</td>
      <td>${Price}</td>
      <td>${Description}</td>
      <td>
        <button class="btn btn-danger" onClick="deleteHandler(${index})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button class="btn btn-warning" onClick="updateHandler(${index})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
        `;
  }
}

function formValidation() {
  //holding the inputs values.
  const pNameValue = pName.value;
  const pCategoryValue = pCategory.value;
  const pPriceValue = Number(pPrice.value);
  const pDescriptionValue = pDescription.value;
  // Validating each input.

  const pNameIsValid = pNameValue.trim().length > 0;
  const pCategoryIsValid = pCategoryValue.trim().length > 0;
  const pPriceIsValid = typeof pPriceValue === "number" && pPriceValue > 0;
  const pDescriptionIsValid = pDescriptionValue.trim().length > 0;
  //Showing & hiding the validation error messages to the user ,so that he can correct his inputs
  if (pNameIsValid === false) {
    pNameWarning.classList.remove("d-none");
  } else {
    pNameWarning.classList.add("d-none");
  }
  if (pCategoryIsValid === false) {
    pCategoryWarning.classList.remove("d-none");
  } else {
    pCategoryWarning.classList.add("d-none");
  }
  if (pPriceIsValid === false) {
    pPriceWarning.classList.remove("d-none");
  } else {
    pPriceWarning.classList.add("d-none");
  }
  if (pDescriptionIsValid === false) {
    pDescriptionWarning.classList.remove("d-none");
  } else {
    pDescriptionWarning.classList.add("d-none");
  }
  if (
    pNameIsValid &&
    pCategoryIsValid &&
    pPriceIsValid &&
    pDescriptionIsValid
  ) {
    return true;
  } else {
    return false;
  }
}

//Adding a new event
pForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const validationResult = formValidation();

  if (validationResult === true) {
    ProductsArr.push({
      pName: pName.value,
      pCategory: pCategory.value,
      pPrice: pPrice.value,
      pDescription: pDescription.value,
    });
    localStorage.setItem("products", JSON.stringify(ProductsArr));

    for (const [
      index,
      {
        pName: Name,
        pCategory: Category,
        pPrice: Price,
        pDescription: Description,
      },
    ] of ProductsArr.entries()) {
      if (index === ProductsArr.length - 1) {
        tBody.innerHTML += `
        <tr>
        <td>${index}</td>
        <td class="searchedProductName">${Name}</td>
        <td>${Category}</td>
        <td>${Price}</td>
        <td>${Description}</td>
        <td>
          <button class="btn btn-danger" onClick="deleteHandler(${index})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-warning" onClick="updateHandler(${index})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
          `;
      }
    }
    clearFormHandler();
  }
});
//Clearing the form when clicking on the clear button
clearForm.addEventListener("click", () => {
  clearFormHandler();
});
//Updating a current event
updateProductBtn.addEventListener("click", () => {
  //validating the new user input values
  const validationResult = formValidation();
  if (validationResult === true) {
    ProductsArr[updatedProductIndex] = {
      pName: pName.value,
      pCategory: pCategory.value,
      pPrice: pPrice.value,
      pDescription: pDescription.value,
    };
  }
  //updating the local storage and the UI as well with the updated product data.
  localStorage.setItem("products", JSON.stringify(ProductsArr));
  tBody.innerHTML = "";
  for (const [
    index,
    {
      pName: Name,
      pCategory: Category,
      pPrice: Price,
      pDescription: Description,
    },
  ] of ProductsArr.entries()) {
    tBody.innerHTML += `
      <tr>
      <td>${index}</td>
      <td class="searchedProductName">${Name}</td>
      <td>${Category}</td>
      <td>${Price}</td>
      <td>${Description}</td>
      <td>
        <button class="btn btn-danger" onClick="deleteHandler(${index})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button class="btn btn-warning" onClick="updateHandler(${index})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
        `;
  }
  //Switching the Update btn back to the add product btn and clearing the form inputs.
  addProduct.classList.remove("d-none");
  updateProductBtn.classList.add("d-none");
  clearFormHandler();
});

searchInput.addEventListener("input", () => {
  tBody.innerHTML = "";
  searchValue = searchInput.value;
  const firstLowerCased =
    searchValue.charAt(0).toLowerCase() + searchValue.slice(1);
  const firstUpperCased =
    searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
  const lowerCased = searchValue.toLowerCase();
  const upperCased = searchValue.toUpperCase();

  for (const [index, product] of ProductsArr.entries()) {
    if (
      product.pName.includes(searchValue) ||
      product.pName.includes(firstLowerCased) ||
      product.pName.includes(firstUpperCased) ||
      product.pName.includes(lowerCased) ||
      product.pName.includes(upperCased)
    ) {
      tBody.innerHTML += `
      <tr>
      <td>${index}</td>
      <td class="searchedProductName">${product.pName}</td>
      <td>${product.pCategory}</td>
      <td>${product.pPrice}</td>
      <td>${product.pDescription}</td>
      <td>
        <button class="btn btn-danger" onClick="deleteHandler(${index})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button class="btn btn-warning" onClick="updateHandler(${index})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
        `;
    }
  }
  if (searchValue === "") {
    tBody.innerHTML = "";
    for (const [index, product] of ProductsArr.entries()) {
      tBody.innerHTML += `
        <tr>
        <td>${index}</td>
        <td class="searchedProductName">${product.pName}</td>
        <td>${product.pCategory}</td>
        <td>${product.pPrice}</td>
        <td>${product.pDescription}</td>
        <td>
          <button class="btn btn-danger" onClick="deleteHandler(${index})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-warning" onClick="updateHandler(${index})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
          `;
    }
  }
});

searchInput.addEventListener("search", (event) => {
  tBody.innerHTML = "";
  searchValue = searchInput.value;
  const firstLowerCased =
    searchValue.charAt(0).toLowerCase() + searchValue.slice(1);
  const firstUpperCased =
    searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
  const lowerCased = searchValue.toLowerCase();
  const upperCased = searchValue.toUpperCase();
  for (const [index, product] of ProductsArr.entries()) {
    if (
      product.pName.includes(searchValue) ||
      product.pName.includes(firstLowerCased) ||
      product.pName.includes(firstUpperCased) ||
      product.pName.includes(lowerCased) ||
      product.pName.includes(upperCased)
    ) {
      tBody.innerHTML += `
      <tr>
      <td>${index}</td>
      <td class="searchedProductName">${product.pName}</td>
      <td>${product.pCategory}</td>
      <td>${product.pPrice}</td>
      <td>${product.pDescription}</td>
      <td>
        <button class="btn btn-danger" onClick="deleteHandler(${index})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        <button class="btn btn-warning" onClick="updateHandler(${index})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
        `;
    }
  }

  if (searchValue === "") {
    tBody.innerHTML = "";
    for (const [index, product] of ProductsArr.entries()) {
      tBody.innerHTML += `
        <tr>
        <td>${index}</td>
        <td class="searchedProductName">${product.pName}</td>
        <td>${product.pCategory}</td>
        <td>${product.pPrice}</td>
        <td>${product.pDescription}</td>
        <td>
          <button class="btn btn-danger" onClick="deleteHandler(${index})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-warning" onClick="updateHandler(${index})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
          `;
    }
  }
});

window.addEventListener("click", (event) => {
  console.log(event);
  if (
    event.target.localName !== "header" &&
    event.target.localName !== "label" &&
    event.target.localName !== "input"
  ) {
    pNameWarning.classList.add("d-none");

    pCategoryWarning.classList.add("d-none");

    pPriceWarning.classList.add("d-none");

    pDescriptionWarning.classList.add("d-none");
  }
});
