console.log('====================================');
console.log("Connected");
console.log('====================================');

let data;

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        showCategory('Men');
    })
    .catch(error => console.error('Error fetching data:', error));

function showCategory(category) {
    if (!data || !data.categories) {
        console.error('Data not available yet');
        return;
    }



    const productContainer = document.getElementById('productContainer');
    const menTab = document.getElementById('men');
    const womenTab = document.getElementById('women');
    const kidTab = document.getElementById('kid');

    const menImg = document.getElementById('men-img');
    const womenImg = document.getElementById("women-img");
    const kidImg = document.getElementById("kid-img");


    menTab.classList.remove('active');
    womenTab.classList.remove('active');
    kidTab.classList.remove('active');

    
    
    



    if (category === 'Men') {
        menTab.classList.add('active');
        menImg.classList.remove('img');
        menImg.classList.add('img-show');
        womenImg.classList.add("img");
        kidImg.classList.add("img");
    } else if (category === 'Women') {
        womenTab.classList.add('active');
        womenImg.classList.remove("img");
        womenImg.classList.add("img-show");
        kidImg.classList.add("img");
        menImg.classList.add("img");
    } else if (category === 'Kids') {
        kidTab.classList.add('active');
        kidImg.classList.remove("img");
        kidImg.classList.add("img-show");
        menImg.classList.add("img");
        womenImg.classList.add("img");
    }

    productContainer.innerHTML = '';


    const categoryProducts = data.categories.find(cat => cat.category_name === category).category_products;


    categoryProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const title = document.createElement('h3');
        title.textContent = product.title;
        title.className = 'title';

        const dot = document.createElement('img');
        dot.src = 'assets/dot.svg';
        dot.alt = 'Dot';
        dot.className = 'dot';

        const vendor = document.createElement('p');
        vendor.textContent = '' + product.vendor;
        vendor.className = 'vendor';

        const priceContainer = document.createElement('div');
        priceContainer.className = 'price-container';

        const price = document.createElement('p');
        price.textContent = 'Rs ' + product.price;
        price.className = 'price';

        const comparePrice = document.createElement('p');
        comparePrice.textContent = '' + (product.compare_at_price || 'N/A');
        comparePrice.className = 'compare-price';

        const discount = document.createElement('p');
        discount.textContent = '' + ((product.compare_at_price - product.price) / 100 || 'N/A') + '% Off';
        discount.className = 'discount';

        if (product.badge_text !== null) {
            const badge = document.createElement('p');
            badge.textContent = '' + (product.badge_text || "");
            badge.className = 'badge';
            card.appendChild(badge);
        }

        const button = document.createElement('button');
        button.textContent = 'Add to cart';
        button.className = 'add-to-cart';

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;

        cardContent.appendChild(title);
        cardContent.appendChild(dot);
        cardContent.appendChild(vendor);

        priceContainer.appendChild(price);
        priceContainer.appendChild(comparePrice);
        priceContainer.appendChild(discount);


        // Append elements to the card
        card.appendChild(image);
        card.appendChild(cardContent);
        card.appendChild(priceContainer);
        card.appendChild(button);

        // Append the card to the product container
        productContainer.appendChild(card);
    });
}