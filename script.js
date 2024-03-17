let data
let sortedData
let prevSortMethod = "Ascending"

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
    $("#content").html("")
    method = $("#sort").val()
    filter = $("#filter").val()

    console.log(filter)

    if (method != prevSortMethod) {
        //use this to only reverse the data if necessary
        sortedData.reverse()
    }

    $.each(sortedData, (index, product) => {
        if (filter == "None" || filter.toLowerCase() == product.category) {
            //if there is no filter or the filter matches the category
            //then add the item to the page
            $("#content").append(`
            <div>
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Description: ${product.description}</p>
                <p>Category: ${product.category}</p>
                <img src="${product.image}" alt="${product.title}">
            </div>
        `)
        }
    });

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

