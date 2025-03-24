const url = 'https://rickandmortyapi.com/api/character';
const template = document.querySelector('template');
const loading = document.querySelector('.spinner');

const getCharacters = async (url) => {

    try {
        //get info
        const res = await fetch(url);
        const { results } = await res.json();

        //loading
        loading.classList.remove('d-none')
        
        return results;
    } catch (error) {
        alert('Se produjo un error:' + error)
    } finally {
        //loading
        loading.classList.add('d-none')
    }
}

const showCharacters = async () => {
    const characters = await getCharacters(url);
    const fragment = document.createDocumentFragment();
    console.log(characters);

    characters.forEach(character => {
        const { name, image, status, species } = character;
        const clone = template.content.cloneNode('true');
        clone.querySelector('.card-img-top').src = image;
        clone.querySelector('.card-title').textContent = name;
        clone.querySelector('.fst-italic').textContent = species;
        
        switch(status){
            case 'Alive':
                clone.querySelector('#status').classList.add('text-success');
                break;
            case 'Dead':
                clone.querySelector('#status').classList.add('text-danger');
                break;
            case 'unknown':
                clone.querySelector('#status').classList.add('text-secondary');
                break;    
        }

        clone.querySelector('#status').textContent = status;
        fragment.appendChild(clone);
    });

    document.getElementById('cards').appendChild(fragment);
}

showCharacters()