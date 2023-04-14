function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`; //ajouter les images dans le dossier assets (voir dossier "doc")

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' ); //image du photographe
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' ); //titre avec nom du photographe
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}