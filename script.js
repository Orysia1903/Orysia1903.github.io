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
            count++;
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
                            species = document.querySelector('#species');
                        
                        hero.classList.add('display-hero');

                        name.innerHTML = target.innerHTML;
                        for (var j = 0; j < data.results.length; j++) {

                            if (target.innerHTML == data.results[j].name) {
                                gender.innerHTML = data.results[j].gender;
                                birthYear.innerHTML = data.results[j].birth_year;
                                
                                var dom = data.results[j].homeworld;
                                var arrayLinkPlanet = dom.split(':');
                                arrayLinkPlanet.splice(1, 0, 's:');
                                var linkPlanet = arrayLinkPlanet.join('');
                                console.log(linkPlanet)
                                fetch(linkPlanet)
                                    .then(function (home) {
                                        return home.json();
                                    }).then(function (planet) {
                                        
                                        homeworld.innerHTML = planet.name;
                                    })

                                // if (data.results[j].species.length > 0){
                                //     fetch(data.results[j].species[0])
                                //     .then(function (view) {
                                //             return view.json()
                                //     }).then(function (kind) {
                                //         species.innerHTML = kind.name;
                                //     })
                                // } else {
                                //     species.innerHTML = 'unknown';
                                // }

                                // for(var k = 0; k < data.results[j].films.length; k++) {
                                //     fetch(data.results[j].films[k])
                                //     .then(function (response) {
                                //             return response.json()
                                //     }).then(function (films) {
                                //         console.log(films);
                                //     })
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
            if (count >= 1) {
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
