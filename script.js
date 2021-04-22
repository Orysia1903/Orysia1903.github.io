window.addEventListener('load', init)
function init() {

    var showPerson = document.querySelectorAll('.show-person');
        next = document.querySelector('#next'),
        previous = document.querySelector('#previous'),
        count = 1,
        hide = document.querySelector('#close'),
        hero = document.querySelector('.hero');

    next.addEventListener('click', nextPage);
    previous.addEventListener('click', previousPage);
    hide.addEventListener('click', hideHero);

    function nextPage() {
        var displayBlock = document.querySelector('.show-heroes'),
            url = `https://swapi.dev/api/people/?page=${count}`;

        displayBlock.classList.remove('show-heroes-hidden');
        displayBlock.classList.add('hide');
   
        if (count < 9) {
            ++count;
            previous.classList.remove('ends');
        } else {
            next.classList.add('ends');
        }
        
        fetch(url)
            .then(function (resp) {
                return resp.json();
                }).then(function (data) {
                    for (var i = 0; i < data.results.length; i++) {
                        showPerson[i].innerHTML = data.results[i].name;
                        showPerson[i].addEventListener('click', showPersons);

                        function showPersons() {
                    
                            var target = event.target,
                                name = document.querySelector('#name'),
                                gender = document.querySelector('#gender'),
                                birthYear = document.querySelector('#birth-year'),
                                homeworld = document.querySelector('#planet'),
                                filmsTitles = document.querySelector('#films'),
                                heroesPlanet = document.querySelector('#species');
                            
                            filmsTitles.innerHTML = '';
                            hero.classList.add('display-hero');

                            name.innerHTML = target.innerHTML;
                            for (var j = 0; j < data.results.length; j++) {

                                if (target.innerHTML == data.results[j].name) {
                                    gender.innerHTML = data.results[j].gender;
                                    birthYear.innerHTML = data.results[j].birth_year;
                                    
                                    var home = data.results[j].homeworld;
                                    var arrayLinkPlanet = home.split(':');
                                    arrayLinkPlanet.splice(1, 0, 's:');
                                    var linkPlanet = arrayLinkPlanet.join('');

                                    fetch(linkPlanet)
                                        .then(function (home) {
                                            return home.json();
                                            }).then(function (planet) {
                                                homeworld.innerHTML = planet.name;
                                    })

                                    if (data.results[j].species.length > 0){
                                        var spec = data.results[j].species[0];
                                        var arrrayLinkSpecies = spec.split(':');
                                        arrrayLinkSpecies.splice(1, 0, 's:');
                                        var linkSpecies = arrrayLinkSpecies.join('');

                                        fetch(linkSpecies)
                                            .then(function (view) {
                                                return view.json();
                                                }).then(function (kind) {
                                                    heroesPlanet.innerHTML = kind.name;
                                        })
                                    } else {
                                        heroesPlanet.innerHTML = 'unknown';
                                    }

                                    // for(var k = 0; k < data.results[j].films.length; k++) {
                                    //     fetch(data.results[j].films[k])
                                    //         .then(function (response) {
                                    //             return response.json();
                                    //             }).then(function (films) {
                                    //         filmsTitles.innerHTML += `${films.title}; <br>`;
                                    //     })
                                    // }
                                    var film = data.results[j].films;
                                    for(var s = 0; s<film.length; s++){
                                    // if(film[0]){
                                        var arrayFilmPlanet = film[s].split(':');
                                        arrayFilmPlanet.splice(1, 0, 's:');
                                        var linkFilm = arrayFilmPlanet.join('');
                                        console.log(linkFilm)
                                        fetch(linkFilm)
                                            .then((first)=>{
                                                return first.json();
                                            }).then(function (firstFilm){
                                                console.log(firstFilm.title)
                                                filmsTitles.innerHTML += `${firstFilm.title}; <br>`;
                                            })
                                    // }
                                }

                                    // if(film[1]){
                                    //     var arrayFilmPlanet = film[1].split(':');
                                    //     arrayFilmPlanet.splice(1, 0, 's:');
                                    //     var linkFilm = arrayFilmPlanet.join('');
                                    //     console.log(linkFilm)
                                    //     fetch(linkFilm)
                                    //         .then((first)=>{
                                    //             return first.json();
                                    //         }).then(function (firstFilm){
                                    //             console.log(firstFilm.title)
                                    //             filmsTitles.innerHTML += `${firstFilm.title}; <br>`;
                                    //         })
                                    // }

                                }
                            }
                        }
                    }
                    }).catch(function (err) {
                        console.error(err)
                    });
    }

    function hideHero(){
        hero.classList.remove('display-hero');
        hero.classList.add('hide');
    }

    function previousPage() {
            if (count > 1) {
                next.classList.remove('ends');
                --count;
            } else {
                previous.classList.add('ends');
            }
        url = `https://swapi.dev/api/people/?page=${count}`;
        fetch(url)
            .then(function (resp) {
                return resp.json();
            }).then(function (data) {
                for (var i = 0; i < data.results.length; i++) {
                    showPerson[i].innerHTML = data.results[i].name;
                }
            })
    }
}
