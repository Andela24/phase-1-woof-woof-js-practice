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

//fetch doggies 
//get dogs from the server
function getDogs() {
   return fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
}

//create a single dog bar item
    // const renderDogBarItem = dog =>  //showing on the page/DOM
    // `<span data-id=${dog.id} class='dog-bar-item'>${dog.name}</span>` //returning the string

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

// document.addEventListener('click', event => {
//    if(event.target.className === 'dog-bar-item') {
//     const id = event.target.dataset.id
//     const foundDog = state.dogs.find( dog => dog.id === parseInt(id)) //finding specific dog, does the dog name match
//     displayDog(foundDog)
//    }
// })

// display- put the dog on the page
function displayDog(dog) {
     dogInfo.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id='toggle-good-day'>${dog.isGoodDog ? 'Good' : 'Bad'} Dog!</button>
`
const toggleBtn = dogInfo.querySelector('#toggle-good-dog')//adding the button
toggleBtn.addEventListener('click', () => toggleGoodDog(dog))//when user clicks

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

function toggleDogsTags() {
    const filterDogs = state.filter
    ? state.dogs.filter(dog => dog.isGoodDog)
    : state.dogs //or all dogs
 
    addDogTags(filterDogs)
}



getDogs()
.then(dogs => {
    state.dogs = dogs
    addDogTags(state.dogs)
})
