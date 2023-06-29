window.addEventListener('DOMContentLoaded' , (event) => {

    let currentAudio = null;
    let currentListItem = null;    

    const clientId = 'e29d6dc27cf24a46bbe3a7d3c837e327';
    const clientSecret = 'c874af63695d4b80925eefd1669fc3ff';


    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;

    
        fetch('https://api.spotify.com/v1/artists/05fG473iIaoy82BF1aGhL8/albums?include_groups=album', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            const albums = data.items;

            // Filtrar los álbumes de Slipknot
            const slipknotAlbums = albums.filter(album => album.artists.some(artist => artist.name === 'Slipknot'));

            // Obtener las canciones de cada álbum
            slipknotAlbums.forEach(album => {
                fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const tracks = data.items;

                    const songList = document.getElementById('song-list');
                    tracks.forEach(track => {
                        const listItem = document.createElement('li');
                        const albumImage = document.createElement('img');
                        albumImage.src = album.images[0].url;
                        albumImage.alt = album.name;
                        albumImage.classList.add('album-image');
                        listItem.appendChild(albumImage);
                        listItem.innerHTML += track.name;
                        songList.appendChild(listItem);
    
                        
                        // Agregar eventos de reproducción y detención
                        const playButton = document.createElement('button');
                        playButton.innerHTML = 'Reproducir';
                        listItem.appendChild(playButton);

                        playButton.addEventListener('click', () => {
                            if (currentAudio && currentAudio !== audio) {
                                currentAudio.pause();
                            }

                            if (currentListItem && currentListItem !== listItem) {
                                currentListItem.classList.remove('active');
                            }

                            if (currentAudio === audio && !audio.paused) {
                                audio.pause();
                                playButton.innerHTML = 'Reproducir';
                                listItem.classList.remove('active');
                            } else {
                                audio.play();
                                playButton.innerHTML = 'Detener';
                                listItem.classList.add('active');
                            }

                            currentAudio = audio;
                            currentListItem = listItem;
                        });

                        const audio = new Audio(track.preview_url);

                        audio.addEventListener('ended', () => {
                            playButton.innerHTML = 'Reproducir';
                            listItem.classList.remove('active');
                        });

                        // Cambiar el color de fondo cuando se pasa el cursor sobre la canción
                        listItem.addEventListener('mouseover', () => {
                            listItem.style.backgroundColor = '#EDEDED';
                        });

                        listItem.addEventListener('mouseout', () => {
                            if (currentListItem !== listItem) {
                            listItem.style.backgroundColor = '';
                            }
                        });

                    });
                });
        });



        });



    });


});
