document.addEventListener("DOMContentLoaded", () => {
    fetch('artworks.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('artwork-list');
            data.artworks.forEach(artwork => {
                const link = document.createElement('a');
                link.href = `artwork.html?title=${encodeURIComponent(artwork.title)}`;
                link.textContent = `${artwork.date} ${artwork.title} ${artwork.location}`;
                list.appendChild(link);
            });
        })
        .catch(error => console.error('Error loading artworks:', error));
});
