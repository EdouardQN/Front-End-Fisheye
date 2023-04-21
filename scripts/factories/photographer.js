function photographerFactory(data) {

        console.log("data", data);

        const name = data.name;

        const portrait = data.portrait;
        const picture = `../../assets/photographers/${portrait}`;
        const city = data.city;
        const country = data.country;
        const tagline = data.tagline;
        const price = data.price;
        // console.log(name);
    


    function getUserCardDOM() {
    
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        console.log(name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const div = document.createElement('div');
        div.textContent = city + ', ' + country;

        const span = document.createElement('span');
        span.textContent = tagline;

        const span2 = document.createElement('span');
        span2.textContent = price + '€/jour';
        span2.classList.add('prices');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div);
        article.appendChild(span);
        article.appendChild(span2);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}