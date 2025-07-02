const itemsContainer = document.querySelector("#list-items")
itemsContainer.className = "row row-cols-1 row-cols-sm2 row-cols-md-3 g-3"
const urlApi = "https://rickandmortyapi.com/api/character"


function addItem(item){

    const charCard = document.createElement("section")
    charCard.className = "card mx-.5 my-2"
    charCard.style = "width: 18rem"
    itemsContainer.append(charCard)  

    const charCardBody = document.createElement("article")
    charCardBody.className = "card-body "
    charCard.append(charCardBody)

    const charCardTitle = document.createElement("h2")
    charCardTitle.className = "card-title"
    charCardTitle.innerText = item.name
    charCardBody.append(charCardTitle)

    const charCardStatus = document.createElement("p")
    charCardStatus.className = "card-text"
    charCardStatus.innerText = item.status
    charCardBody.append(charCardStatus)

    const charCardImg = document.createElement("img")
    charCardImg.className = "card-img-top"
    charCardImg.src = item.image
    charCardBody.append(charCardImg)
}

function fetchCharacter(){
 fetch(urlApi, {
    method: "GET",
 })
  .then(response => {
    // Revisa si la respuesta fue exitosa (e.g., status code 200-299) - Check if the response was successful (e.g., status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // analiza que la respuesta sea JSON - Parse the response body as JSON
    return response.json(); 
  })
  .then(data => {
    console.log(data); // Procesa los datos obtenidos - Process the fetched data
    //iteracion
    data.results.forEach(name => {
      addItem(name)
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error); // Maneja cualquier error - Handle any errors
  });

}

fetchCharacter()

//Id, name, img