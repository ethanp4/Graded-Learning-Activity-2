let data
let sortedData
let prevSortMethod = "Ascending"
let count = 0

const requestProducts = (url) => {
    return $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).then(data => {
        return data;
    }).catch(error => {
        throw `Error, status code ${error.status}: ${error.statusText}`;
    });
};

function appendToPage() {
    count = 0
    $("#content").html("")
    method = $("#sort").val()
    filter = $("#filter").val()

    if (method != prevSortMethod) {
        //use this to only reverse the data if necessary
        sortedData.reverse()
    }

    $.each(sortedData, (index, product) => {
        if (filter == "None" || filter.toLowerCase() == product.category) {
            count++
            //if there is no filter or the filter matches the category
            //then add the item to the page
            $("#content").append(`
            <div class="product">
                <h3>${product.title}</h3>   
                <img src="${product.image}" alt="${product.title}">
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
            </div>
        `)
        }
    });
    $("#count").html(`${count} products found`)
    prevSortMethod = method;
}

$(()=> {
    const url = "https://fakestoreapi.com/products";

    requestProducts(url)
    .then(data => {
        sortedData = data.sort((a, b) => {
            return a.price - b.price;
        })

        appendToPage();
    })
})

