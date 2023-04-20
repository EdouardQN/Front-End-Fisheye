function photographerFactory(data) {

    // console.log(data);
    // let tabPhotographers = [];
    // for ( let i=0; i< data.length; i++){
    //     tabPhotographers.push(data.photographers[i]);
    //     console.log(tabPhotographers[i]);
    // }
    // console.log(tabPhotographers);

        const name = data.photographers[0].name;
        const portrait = data.photographers[0].portrait;
        const picture = `../../assets/photographers/${portrait}`;
        const city = data.photographers[0].city;
        const country = data.photographers[0].country;
        const tagline = data.photographers[0].tagline;
        const price = data.photographers[0].price;
        console.log(name);
    


    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

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