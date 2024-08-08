document.addEventListener("DOMContentLoaded", () => {
    const categories = ["Websites", "Games", "Films", "Photography", "Sculpture", "Performances"];
    fetch('artworks.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('artwork-list');
            categories.forEach(category => {
                const categoryHeader = document.createElement('h2');
                categoryHeader.textContent = category;
                list.appendChild(categoryHeader);

                const categoryArtworks = data.artworks.filter(artwork => artwork.category === category);
                categoryArtworks.forEach(artwork => {
                    const link = document.createElement('a');
                    link.href = `artwork.html?title=${encodeURIComponent(artwork.title)}`;
                    link.textContent = `${artwork.date} ${artwork.title} ${artwork.location}`;
                    list.appendChild(link);
                });
            });
        })
        .catch(error => console.error('Error loading artworks:', error));
});
