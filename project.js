// <link rel="stylesheet" type="text/css" href="project.css">


//fetch from the database
fetch("http://localhost:3000/ingredients")
//convert to JSON
.then(response => response.json())
//ingredients grabs the array 
.then(ingredients => {
    //for reach ingredient grabs each ingredient in the array
    ingredients.forEach(ingredient => {
        //create a p element for each ingredient on the menu
        const p = document.createElement('p')
        //add the text from name section in the json file
        p.textContent = ingredient.name
        //append to menu section of html
        document.querySelector('#menu').append(p)
    
    })

    //event handler for hover over menu
    //selects the menu
    const menuTexts = document.querySelectorAll('#menu p')



    // Attach event listeners to each menu item
    menuTexts.forEach(item => {
    //mouseover creates event when mouse goes over the menu    
    item.addEventListener('mouseover', () => addHoverEffect(item))
    //mouseout removes the event when cursor leaves the menu 
    item.addEventListener('mouseout', () => removeHoverEffect(item))
    });



    //selects the form and creates a submit event
    document.querySelector('form').addEventListener('submit', (e) => {
        //prevents the page from going back to initial page load
        e.preventDefault();
        //targets the id value in the select portion and puts the values into an array
        const selections = [e.target["bread"].value, e.target["veggie"].value, e.target["deli"].value]
        // filters through the array based on the 3 selected ingredients (using section includes)
        // then it maps the 3 ingredients objects calories to get a new array
        const caloriesArray = ingredients.filter((ingredient) => selections.includes(ingredient.name)).map(item=>item.calories)
        //adds up 3 elements of new calories array into a variable
        const caloriesTotal = totalCount(caloriesArray)

        //repeat steps for carbs, protein, fat
        const carbsArray = ingredients.filter((ingredient) => selections.includes(ingredient.name)).map(item=>item.carbs)
        const carbsTotal = totalCount(carbsArray)
        const proteinArray = ingredients.filter((ingredient) => selections.includes(ingredient.name)).map(item=>item.protein)
        const proteinTotal = totalCount(proteinArray)
        const fatArray = ingredients.filter((ingredient) => selections.includes(ingredient.name)).map(item=>item.fat)
        const fatTotal = totalCount(fatArray)

        //displays the totals in each container upon submittion
        document.querySelector('#nutrition-container-2 p').textContent = `Calories: ${caloriesTotal}`
        document.querySelector('#nutrition-container-3 p').textContent = `Carbohydrates: ${carbsTotal}g`
        document.querySelector('#nutrition-container-4 p').textContent = `Protein: ${proteinTotal}g`
        document.querySelector('#nutrition-container-5 p').textContent = `Fat: ${fatTotal}g`

        
    })
    
})

//summing function for calories carbs protein and fat
//function takes the array
const totalCount = array =>{
//sets the counter to 0
    let total = 0
//for each item in the array it adds to total
    array.forEach (num => total += num)
// then returns a total
        return total        
}


//image selector portion
//sets the initial array index to 0, will be used later
let currentIndex = 0
//creates an empty image array
let imagesArray=[]
//fetches from the JSON file with images endpoint
fetch("http://localhost:3000/images")
//converts to JS
.then(response => response.json())
.then(images => {
    //fills the empty array with the fetched images
    imagesArray = images
    //selects the image id and adds a click event that changes the image
    document.querySelector('#image').addEventListener('click', changeImage)
    //sets default image to first image of array
    document.querySelector('#image').src = imagesArray[currentIndex].image
    //sets default text to first text in array
    document.querySelector('#image-text').textContent = imagesArray[currentIndex].name
    //sets default description to first description in array
    document.querySelector('#image-description').textContent = imagesArray[currentIndex].description
    }
 


)


function changeImage() {
//rotates through the images array by changing the index by 1
currentIndex++
//if the end of the array is reached, goes back to the first element
if (currentIndex >= imagesArray.length) {
currentIndex = 0; 
}
//selects image id, sets src(image), uses the image array(index which changes at each click).image(image key in json file)
document.querySelector('#image').src = imagesArray[currentIndex].image
//changes the name of the sandwich by 1 index as well
document.querySelector('#image-text').textContent = imagesArray[currentIndex].name
//changes the description of the sandwich by 1 index as well
document.querySelector('#image-description').textContent = imagesArray[currentIndex].description
}



//functions to change the background color of the menu item when mouse is over item, 
//and to remove it when curser leaves item

function addHoverEffect(element) {
    console.log("mouseEnter")
    //changes the background color of the selected item
    element.style.backgroundColor = '#f0f0f0'; 
    }
    
    
function removeHoverEffect(element) {
    //removes background color
    element.style.backgroundColor = ''; 
    }



