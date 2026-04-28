const searchInput = document.querySelector(".predictive-search-input")
const resultsContainer = document.querySelector(".predictive-search-results")

let debounceTimer;



searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer)
    const query = searchInput.value.trim();

    if(query.length < 2) {
        resultsContainer.hidden = true;
        return
    }

    debounceTimer(() => {
        fetchResults(query)
    }, 300)
})



async function fetchResults(term) {
    try {
        const response = await fetch(`/search/suggested.json?q=${encodeURIComponent(term)}&resources[type]=product`)
        const data = await response.json()
        const products = data.resources.results.products;

        renderResults(products)
    } catch (error) {
        console.log(error);
    }
}

function renderResults(products) {
    resultsContainer.innerHTML = "";
    resultsContainer.hidden = false;

    if(products.length === 0) {
        resultsContainer.innerHTML = `<div>No products found!</div>`
        return;
    }
    products.forEach((product) => {
        const item = document.createElement("div")
        item.className = "search-item"
        item.innerHTML = `
            <img src="product-title">
            <div>
                <div class="product-title">${product.title}</div>
                <div class="product-price">${product.price}</div>
            </div>
        `
        item.onclick = () => window.location.href = product.url
        resultsContainer.appendChild(item)
    })
}

document.addEventListener("click", (event) => {
    if(!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
        resultsContainer.hidden = true;
    }
})