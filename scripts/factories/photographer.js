function photographerFactory(data) {

    const name = data.name;
    const id = data.id;
    const portrait = data.portrait;
    const picture = `../../assets/photographers/${portrait}`;
    const city = data.city;
    const country = data.country;
    const tagline = data.tagline;
    const price = data.price;

    function getUserCardDOM() {
    
        const article = document.createElement('article');
        const blocPortrait = document.createDocumentFragment();
        const link = document.createElement('a');
        link.href = 'photographer.html';
        link.href += `?id=${id}`;
        link.setAttribute("tabindex", 0);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        // Block portrait permet de mettre un a avec l'img dedans pour la redirection vers la page du photographe
        blocPortrait.appendChild(link).appendChild(img);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h4 = document.createElement('h4');
        h4.textContent = city + ', ' + country;

        const span = document.createElement('span');
        span.textContent = tagline;

        const span2 = document.createElement('span');
        span2.textContent = price + '€/jour';
        span2.classList.add('prices');

        article.appendChild(blocPortrait);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(span);
        article.appendChild(span2);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}