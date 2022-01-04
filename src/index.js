// when the page loads get all pup data from server using fetch()
//when you have info, add <span> with pup's name to the dog bar
//get stuff I need that's already on the page "good-dodg-filter"
                                            //"dog-bar" "dog-info"

const filterDog = document.querySelector("#good-dog-filter")
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")



let state = {
    dogs: [],
    filter: false
}
document.addEventListener('DOMContentLoaded', getDogs() )

//fetch doggies 
//get dogs from the server
function getDogs() {
   return fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => {
        state.dogs = dogs
        addDogTags(state.dogs)
    })
}

//update dog on server
function updateDog(dog) {
    return fetch('http://localhost:3000/pups/${dog.id}', {
    method:"PATCH",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
    }) .then(resp => resp.json())
    }


//create a single dog bar item
function addDogTag(dog) {
    const dogTag = document.createElement('span')
    dogTag.innerText = dog.name
    dogBar.appendChild(dogTag)

    dogTag.addEventListener('click', () => displayDog(dog))
    
}


//add mutliple dogs on the page
//since is array we can .map around
function addDogTags(dogs){
    dogBar.innerHTML = ''
    dogs.forEach(dog => addDogTag(dog))
}

//a single event listener to listen to span clicks


// display- put the dog on the page
function displayDog(dog) {
     dogInfo.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id='toggle-good-dog'>${dog.isGoodDog ? 'Good' : 'Bad'} Dog!</button>
`
const toggleBtn = dogInfo.querySelector('#toggle-good-dog')//adding the button
console.log(toggleBtn)
toggleBtn.addEventListener('click', () => {  //when user clicks
toggleGoodDog(dog)
updateDog(dog)
})
}


//toggle dog status and refresh button
function toggleGoodDog(dog) {
    dog.isGoodDog = !dog.isGoodDog
    const toggleBtn = dogInfo.querySelector('#toggle-good-dog')
    toggleBtn.innerText = `${dog.isGoodDog ? 'Good' : 'Bad'} Dog!`
    toggleDogsTags()
}

//turn the filter btn on
filterDog.addEventListener('click', () => {
   state.filter = !state.filter
   filterDog.innerText = `Filter good dogs: ${state.filter ? "ON" : "OFF"}`
    toggleDogsTags()

})

// update the dog bar
function toggleDogsTags() {
    const filterDogs = state.filter
    ? state.dogs.filter(dog => dog.isGoodDog)
    : state.dogs //or all dogs
 
    addDogTags(filterDogs)
}




