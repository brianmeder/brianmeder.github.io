function createNewCard() {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `<div class="card-down"></div><div class ="card-up"></div>`;
  return cardElement;

}
 createNewCardTest();


function appendNewCard(parentElement) {
  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}
 appendNewCardTest();


function shuffleCardImageClasses() {
  let cardClasses = ["image-1","image-1", "image-2","image-2", "image-3","image-3", "image-4","image-4", "image-5","image-5", "image-6","image-6"];
  return _.shuffle(cardClasses);
}
 shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  let cardObjectArray = [];
  for(i=0; i<12; i++) {  
    let newCard = appendNewCard(parentElement);
    newCard.classList.add(shuffledImageClasses[i]);
    let newCardObject = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i],
    }
    cardObjectArray.push(newCardObject);
  }
    return cardObjectArray;

}
 createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {

  if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  }
  else {
    return false;
  }

}
 doCardsMatchTest();



let counters = {};


function incrementCounter(counterName, parentElement) {

  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  else { }

  counters[counterName]++;

  parentElement.innerHTML = counters[counterName];

}
 incrementCounterTest();

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  
  incrementCounter("flips", document.getElementById("flip-count"));
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }
  
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

    incrementCounter("matches", document.getElementById("match-count"));
    lastCardFlipped.element.classList.add("border-glow");
    newlyFlippedCard.element.classList.add("border-glow");

  if (counters["matches"] === 6) {
    winAudio.play();
  }
  else {
    matchAudio.play();
  }

  lastCardFlipped = null;
  
}


let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}