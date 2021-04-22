init = () => {

    let showPerson = document.querySelectorAll('.show-person');
        next = document.querySelector('#next'),
        previous = document.querySelector('#previous'),
        count = 1,
        hide = document.querySelector('#close'),
        next = document.querySelector('#next'),
        hero = document.querySelector('.hero');

    nextPage = () => {
        let displayBlock = document.querySelector('.show-heroes'),
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
            .then( (resp) => {
                return resp.json();
                }).then( (data) => {
                    for (let i = 0; i < data.results.length; i++) {
                        showPerson[i].innerHTML = data.results[i].name;
                        
                        showPersons = () => {
                    
                            let target = event.target,
                                name = document.querySelector('#name'),
                                gender = document.querySelector('#gender'),
                                birthYear = document.querySelector('#birth-year'),
                                homeworld = document.querySelector('#planet'),
                                filmsTitles = document.querySelector('#films'),
                                heroesPlanet = document.querySelector('#species');
                                
                            
                            filmsTitles.innerHTML = '';
                            hero.classList.add('display-hero');

                            name.innerHTML = target.innerHTML;
                            for (let j = 0; j < data.results.length; j++) {
                                let film = data.results[j].films;

                                if (target.innerHTML == data.results[j].name) {
                                    gender.innerHTML = data.results[j].gender;
                                    birthYear.innerHTML = data.results[j].birth_year;
                                    
                                    let home = data.results[j].homeworld;
                                    let arrayLinkPlanet = home.split(':');
                                    arrayLinkPlanet.splice(1, 0, 's:');
                                    let linkPlanet = arrayLinkPlanet.join('');

                                    fetch(linkPlanet)
                                        .then( (home) => {
                                            return home.json();
                                            }).then( (planet) => {
                                                homeworld.innerHTML = planet.name;
                                    })

                                    if (data.results[j].species.length > 0) {
                                        let spec = data.results[j].species[0];
                                        let arrrayLinkSpecies = spec.split(':');
                                        arrrayLinkSpecies.splice(1, 0, 's:');
                                        let linkSpecies = arrrayLinkSpecies.join('');

                                        fetch(linkSpecies)
                                            .then( (view) => {
                                                return view.json();
                                                    }).then( (kind) => {
                                                        heroesPlanet.innerHTML = kind.name;
                                        })
                                    } else {
                                        heroesPlanet.innerHTML = 'unknown';
                                    }

                                    for(let s = 0; s < film.length; s++) {
                                        let arrayFilmPlanet = film[s].split(':');
                                        arrayFilmPlanet.splice(1, 0, 's:');
                                        let linkFilm = arrayFilmPlanet.join('');
                                        fetch(linkFilm)
                                            .then( (first) => {
                                                return first.json();
                                                    }).then( (firstFilm) => {
                                                        filmsTitles.innerHTML += `${firstFilm.title}; <br>`;
                                            })
                                    }
                                }
                            }
                        }
                        showPerson[i].addEventListener('click', showPersons);
                    }
                    }).catch( (err) => {
                        console.error(err)
                    });
    }

    hideHero = () => {
        hero.classList.remove('display-hero');
        hero.classList.add('hide');
    }

    previousPage = () => {
            if (count > 1) {
                next.classList.remove('ends');
                --count;
            } else {
                previous.classList.add('ends');
            }
        url = `https://swapi.dev/api/people/?page=${count}`;
        fetch(url)
            .then( (resp) => {
                return resp.json();
            }).then( (data) => {
                for (let i = 0; i < data.results.length; i++) {
                    showPerson[i].innerHTML = data.results[i].name;
                }
            })
    }

    next.addEventListener('click', nextPage);
    previous.addEventListener('click', previousPage);
    hide.addEventListener('click', hideHero);
}

window.addEventListener('load', init);



