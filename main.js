const createPetBtn = document.getElementById("createPetBtn");

class Pet {
  constructor(petName, animalType) {
    this.petName = petName;
    this.animalType = animalType;
    this.tiredness = 50;
    this.hunger = 50;
    this.loneliness = 50;
    this.happiness = 50;
  }

  nap() {
    this.tiredness = this.setMax(this.tiredness - 50);
    this.happiness = this.setMax(this.happiness - 20);
    this.hunger = this.setMax(this.hunger + 20);
    this.loneliness = this.setMax(this.loneliness + 20);
    console.log(`${this.petName} has taken a nap.`);
  }

  play() {
    this.tiredness = this.setMax(this.tiredness + 20);
    this.happiness = this.setMax(this.happiness + 30);
    this.hunger = this.setMax(this.hunger + 20);
    this.loneliness = this.setMax(this.loneliness - 10);
    console.log(`You played with ${this.petName}!`);
  }

  eat() {
    this.hunger = this.setMax(this.hunger - 60);
    this.tiredness = this.setMax(this.tiredness + 10)
    console.log(`${this.petName} has eaten.`);
  }

  setMax(num) {
    return Math.min(Math.max(parseInt(num), 0), 100); 
  }
}

const images = {
  dog: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  cat: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2",
  rabbit: "https://www.mypetsname.com/wp-content/uploads/2019/10/White-Bunny.jpg"
}

const drawAlertMessage = (pet, container) => {
  const alertMessage = document.querySelector(".alertMsg");
  if(alertMessage) {
    alertMessage.remove();
  }
  const aside = document.createElement("aside");
  aside.classList.add("alertMsg");   
  aside.innerText = `${pet.petName} is tired and needs to take a nap.`
  container.appendChild(aside);
};

const drawFeedbackMsg = (msg, container) => {
  const alertMessage = document.querySelector(".alertMsg");
  if(alertMessage) {
    alertMessage.remove();
  }
  const aside = document.createElement("aside");
  aside.classList.add("alertMsg");   
  aside.innerText = msg;
  container.appendChild(aside);
}

const drawPetCard = (pet, petContainer) => {
  if(petContainer) {
  while(petContainer.lastElementChild) {
    petContainer.removeChild(petContainer.lastElementChild);
  }}

  let imgURL;

  if(pet.animalType === "dog") {
    imgURL = images.dog;
  } else if(pet.animalType === "cat") {
    imgURL = images.cat;
  } else if(pet.animalType === "rabbit") {
    imgURL = images.rabbit;
  };

  petContainer.id = `${pet.petName}Card`;
  petContainer.classList.add("pet-container")

  const petList = document.getElementById("petList");
  petContainer.innerHTML = `
  <h2>${pet.petName}</h2>
  <p>Type: ${pet.animalType}</p>
  <img src="${imgURL}">
  <label for="happiness">Happiness</label>
  <progress id="happiness" value=${pet.happiness} max="100"></progress>
  <label for="tiredness">Tiredness</label>
  <progress id="tiredness" value=${pet.tiredness} max="100"></progress>
  <label for="hunger">Hunger</label>
  <progress id="hunger" value=${pet.hunger} max="100"></progress>
  <label for="loneliness">Loneliness</label>
  <progress id="loneliness" value=${pet.loneliness} max="100"></progress>
  <button class="nap pet-action-btn">Nap</button>
  <button class="play pet-action-btn">Play</button>
  <button class="eat pet-action-btn">Eat</button>
  `
  // Check if the container already exists, if it doesn't append it to the list.
  if(!petContainer.isConnected) {
  petList.prepend(petContainer);
  }

  setEventListeners(pet);
}

const setEventListeners = (pet) => {
  const napBtns = document.querySelectorAll(".nap");
  const playBtns = document.querySelectorAll(".play");  
  const eatBtns = document.querySelectorAll(".eat");

  napBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      pet.nap();
      const container = e.currentTarget.parentElement;
      drawPetCard(pet, container);
      drawFeedbackMsg(`${pet.petName} has taken a nap.`, container);
    })
  });
  playBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const container = e.currentTarget.parentElement;
      if (pet.tiredness < 70) {
      pet.play();
      drawPetCard(pet, container);
      drawFeedbackMsg(`You played with ${pet.petName}!`, container);
      } else {
        drawAlertMessage(pet, container);
      }
    })
  });
  eatBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      pet.eat();
      const container = e.currentTarget.parentElement;
      drawPetCard(pet, container);
      drawFeedbackMsg(`${pet.petName} has eaten.`, container);
    })
  });
}

createPetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const petContainer = document.createElement("div");
  const petNameInput = document.getElementById("petName").value;
  const species = document.getElementById("species").value;

  const container = e.currentTarget.parentElement;
  const alertMessage = document.querySelector(".alertMsg");
  if(alertMessage) {
    alertMessage.remove();
  }

  if (petNameInput && species) {
    const newPet = new Pet(petNameInput, species)
    drawPetCard(newPet, petContainer);
  } else {
    const aside = document.createElement("aside");
    aside.classList.add("alertMsg");
    aside.innerText = "Please fill required fields.";
    container.appendChild(aside);
  }
})