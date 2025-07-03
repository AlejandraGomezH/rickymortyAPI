function htmlConstructor(){
  const container = document.querySelector("#container")
  container.className = "container-fluid mx-2"

  const header = document.querySelector("#header")
  header.className = ""

  const titlePage = document.querySelector("#title")
  titlePage.className = "text-primary"
  titlePage.innerText = "The Rick and Morty API"
}
const itemsContainer = document.querySelector("#list-items")
itemsContainer.className = "row mx-2"

const urlApi = "https://rickandmortyapi.com/api/character"

function addItem(item){

    const charCard = document.createElement("section")
    charCard.className = "card mx-2 my-2 p-3"
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
    charCardStatus.className = "card-text p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3"
    charCardStatus.innerText = "Status: "+ item.status
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
    //agregar la respuesta al localstorage
    // Convertir JSON en cadena
    const dataString = JSON.stringify(data.results);
    localStorage.setItem('characters',dataString);
    console.log('Characters guardados en storage')

    //iteracion
    data.results.forEach(name => {
      addItem(name)
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error); // Maneja cualquier error - Handle any errors
  });

}


function loadCharFromStorage (){
  const storedChar = localStorage.getItem('characters');

  if (storedChar){
    try{
      const charArray = JSON.parse(storedChar);
      console.log('Loading characters from localStorage:', charArray);
      charArray.forEach(name => {
      addItem(name)
      })
      return true;//Indica que se cargaron los datos del localstorage
    }catch (error){
      console.log('Error pasando characters del localstorage:', error);
      return false;
    } 
  }else{
    console.log('No se encontraron los chars en el localStorage');
    return false;
  }
  
}

htmlConstructor();
// Intentar cargar desde localStorage primero, si no hay datos, hacer fetch
if(!loadCharFromStorage()){
    fetchCharacter();
}



//Id, name, img