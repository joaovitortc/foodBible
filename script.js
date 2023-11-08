document.addEventListener('DOMContentLoaded', () => {
    const template = document.querySelector(".option");
    const options = document.querySelector(".options");
    const searchInput = document.querySelector("[data-search]");
    const cover = document.querySelector(".cover");

    let dishes = [];

    searchInput.addEventListener("input", e => {
        options.classList.remove('hide');
        const value = e.target.value.toLowerCase().trim();
        dishes.forEach(user => {
            if (value != ''){
                const isVisible = user.name.toLowerCase().includes(value)
                user.element.classList.toggle("hide", !isVisible );
            } else {
                options.classList.add('hide');
            }
        })
    })

    const name =  template.querySelector(".name");
    const ingredients = template.querySelector(".ingredients");

    fetch("data.json")
    .then(res => res.json())
    .then(data => { 
        dishes = data.dishes.map(dish => {
        const card = template.content.cloneNode(true).children[0]
        const name =  card.querySelector(".name");
        const ingredients = card.querySelector(".ingredients");

        name.textContent = dish.dish_name;

        card.addEventListener("click", e => {
            const clickedCard = e.target.closest(".card");

            // if there's any other card already on the screen, remove it
            const child = toAppend.querySelector(".picked-dish")
            if(child) {
                toAppend.removeChild(child)
            }
            //handle the creation of the dish card
            cardOnClick(clickedCard);
        })

        options.appendChild(card);
        return {name : dish.dish_name, ingredients:dish.ingredients, allergies:dish.common_allergies, pickupTime:dish["pick-up_time"], element: card}
        })
    })
    
    const toAppend = document.body.querySelector(".toAppend");

    function cardOnClick(card) {
        let name;
        let ingredients;
        let commonAllergies;
        let pickupTime;
        let image;

        cover.classList.remove('hide');
        name = card.querySelector(".name").textContent;

        dishes.forEach(dish => {

            if(dish.name === name ) {
                
                ingredients = dish.ingredients;
                commonAllergies = dish.allergies;
                //image = dish.img;
                pickupTime = dish.pickupTime;


                // Create a new div element with the "picked-dish" class
                const pickedDish = document.createElement("div");
                pickedDish.classList.add("picked-dish");

                // Create the close button element
                const closeButton = document.createElement("button");
                closeButton.setAttribute("id", "close-button");
                closeButton.textContent = "X";
                closeButton.addEventListener("click", e => {
                    toAppend.removeChild(pickedDish);
                    cover.classList.add('hide');
                })

                // Create the dish name element
                const dishName = document.createElement("h1");
                dishName.setAttribute("id", "dish-name");
                dishName.textContent = name;

                // Create the dish image element
                const dishImage = document.createElement("img");
                dishImage.setAttribute("id", "dish-img");

                // Create the "Common Allergies" heading
                const allergiesHeading = document.createElement("h2");
                allergiesHeading.textContent = "Common Allergies";

                // Create the allergies paragraph
                const allergyList = document.createElement("ul");
                allergyList.setAttribute("id", "allergies");


                dish.allergies.forEach(allergy => {
                    const element = document.createElement('li');
                    element.textContent = allergy;
                    allergyList.appendChild(element);
                })

                // Create the "Ingredients" heading
                const ingredientsHeading = document.createElement("h2");
                ingredientsHeading.textContent = "Ingredients";

                // Create the ingredients paragraph
                const ingredientsParagraph = document.createElement("p");
                ingredientsParagraph.setAttribute("id", "ingredients");

                // Create the ingredients list (unordered list)
                const ingredientsList = document.createElement("ul");
                ingredientsList.setAttribute("id", "list");

                dish.ingredients.forEach(ingredient => {
                    const element = document.createElement('li');
                    element.textContent = ingredient;
                    var text = element.textContent;
                    var regex = /\((.*?)\)/g;
                    var newText = text.replace(regex, '<span class="in-parentheses">($1)</span>');
                    element.innerHTML = newText;
                    ingredientsList.appendChild(element);
                })

                // Create the "Pick-up time" heading
                const pickUpTimeHeading = document.createElement("h3");
                pickUpTimeHeading.textContent = "Pick-up time";

                // Create the pick-up time paragraph
                const pickUpTimeParagraph = document.createElement("p");
                pickUpTimeParagraph.setAttribute("id", "pick-up-time");
                pickUpTimeParagraph.textContent = dish.pickupTime;

                // Append the elements in the desired order
                pickedDish.appendChild(closeButton);
                pickedDish.appendChild(dishName);
                pickedDish.appendChild(dishImage);
                pickedDish.appendChild(allergiesHeading);
                pickedDish.appendChild(allergyList);
                pickedDish.appendChild(ingredientsHeading);
                pickedDish.appendChild(ingredientsParagraph);
                ingredientsParagraph.appendChild(ingredientsList);
                pickedDish.appendChild(pickUpTimeHeading);
                pickedDish.appendChild(pickUpTimeParagraph);

                // Add the created "pickedDish" div to the document
                toAppend.appendChild(pickedDish);

            }
            
        })  

    }


})