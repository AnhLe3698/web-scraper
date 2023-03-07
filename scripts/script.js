function sortItemsBySearch(items, searchQuery) {
  const searchTerms = searchQuery.trim().toLowerCase().split(' ');

  items.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const aDesc = a.description.toLowerCase();
    const bDesc = b.description.toLowerCase();
    let aScore = 0;
    let bScore = 0;

    // Weight titles by search terms
    searchTerms.forEach(term => {
      if (aTitle.includes(term)) {
        aScore += 2;
      }
      if (bTitle.includes(term)) {
        bScore += 2;
      }
    });

    // Weight descriptions by search terms
    searchTerms.forEach(term => {
      if (aDesc.includes(term)) {
        aScore += 1;
      }
      if (bDesc.includes(term)) {
        bScore += 1;
      }
    });

    // Compare scores
    if (aScore > bScore) {
      return -1;
    } else if (aScore < bScore) {
      return 1;
    } else {
      return 0;
    }
  });

  return items;
}

// Create the cards for the listings
const createListings = function(data, containerName) {
  let container = containerName || '.card-container';
  const cardContainer = document.querySelector(container);
  $(container).empty();
  data.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.classList.add('card-title');
    title.innerText = item.title;
    card.appendChild(title);

    const price = document.createElement('p');
    price.classList.add('card-price');
    price.innerText = item.price;
    card.appendChild(price);

    const date = document.createElement('p');
    date.classList.add('card-date');
    date.innerText = item.date;
    card.appendChild(date);

    const location = document.createElement('p');
    location.classList.add('card-location');
    location.innerText = item.location;
    card.appendChild(location);

    const description = document.createElement('p');
    description.classList.add('card-description');
    description.innerText = item.description.substring(0, 100) + '...';
    card.appendChild(description);

      // const toggleDescription = document.createElement('button');
      // toggleDescription.classList.add('card-toggle-description');
    description.innerText = item.description;
      // toggleDescription.innerText = 'Read More';
      // toggleDescription.addEventListener('click', () => {
      //   if (description.innerText.endsWith('...')) {
      //     toggleDescription.innerText = 'Read More';
      //     toggleDescription.innerText = 'Read Less';
      //   } else {
      //     description.innerText = item.description.substring(0, 100) + '...';
      //     toggleDescription.innerText = 'Read More';
      //   }
      // });
      // card.appendChild(toggleDescription);

    const url = document.createElement('a');
    url.classList.add('card-url');
    url.innerText = 'View on Kijiji';
    url.href = item.url;
    card.appendChild(url);

    cardContainer.appendChild(card);
  });
}

// GLobally visible array of Objects
let adsArray; // Stores all our Ads

// Executes upon page refresh
fetch('http://localhost:8080/')
  .then(response => response.text())
  .then(data => {
    
    // console.log(data.text());
    adsArray = JSON.parse(data);
    createListings(adsArray);
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'none';
  }) 
  .catch(error => console.error(error));

  $(document).ready(function() {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'block';
    $('#search-input').change(function() {
      const searchText = $(this).val();
      createSortedElements(searchText, adsArray);
    });
  });

  $(document).ready(function() {
    $('form').submit(function(event) {
      event.preventDefault(); // prevent the default behavior of the 
      const searchText = $(this).val();
      createSortedElements(searchText, adsArray);
    });

    // Show the button if user scrolls down 20px or more
    $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {
        $('#back-to-top-btn').removeClass('hidden');
      } else {
        $('#back-to-top-btn').addClass('hidden');
      }
    });
  
    // Scroll to top when the button is clicked
    $('#back-to-top-btn').click(function() {
      $('html, body').animate({scrollTop : 0},800);
      return false;
    });




const searchForm = document.getElementById('submitSearch');


// Grabbing the resulting data fgrom a search result
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const spinner = document.getElementById('loading-spinner');
  const searchTerm = document.getElementById('searchTerm').value.split(' ').join('-');
  $('.card-container').empty();
  spinner.style.display = 'block';
  fetch('http://localhost:8080/send-search', {
    method: 'POST',
    body: JSON.stringify({ searchTerm: searchTerm }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    // console.log(adsArray);
    adsArray = JSON.parse(data);
    createListings(adsArray);
    spinner.style.display = 'none';
  })
  .catch(error => console.error(error));
});  

});    
  
function createSortedElements(searchTerms, dataO) {
  let data = sortItemsBySearch(dataO, searchTerms);
  createListings(data);
}

// Adding listener for button
$("#filter-tires").on("click", (e) => {
  e.preventDefault();
  let findCertainBrandedTires = findAllTires(adsArray);
  // console.log(findCertainBrandedTires);
  $('.card-container').empty()
  for (const brands in findCertainBrandedTires) {
    
    console.log(findCertainBrandedTires[`${brands}`]);
    if(findCertainBrandedTires[`${brands}`].length !== 0) {
      $('.card-container').append(`<h1 class="container-head">${brands.toUpperCase()}</h1>`);
      $('.card-container').append(`<div class="${brands} container-styles"></div>`);
      createListings(findCertainBrandedTires[`${brands}`], '.' + brands)
    }

  }
})

// ------------ADD BACK LATER--------------------

  // const form = document.getElementById('submitUrl');

  // form.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   const spinner = document.getElementById('loading-spinner');
  //   const url = document.getElementById('urlInput').value;
  //   $('.card-container').empty();
  //   spinner.style.display = 'block';
  //   fetch('http://localhost:8080/send-url', {
  //     method: 'POST',
  //     body: JSON.stringify({ url: url }),
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //   .then(response => {
  //     console.log(response.text())
  //     return response.text()}
  //   )
  //   .then(data => {
  //     console.log(adsArray);
  //     adsArray = JSON.parse(data);
  //     createListings(adsArray);
  //     spinner.style.display = 'none';
  //   })
  //   .catch(error => console.error(error));
  // });  


  

//Deprecated
//////////////////////////////////////
////////READ CSV FILE FUNCTIONS//////
/////////////////////////////////////
function handleFiles(files) {
  // Check for the various File API support.
  if (window.FileReader) {
    // FileReader are supported.
    getAsText(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  // Handle errors load
  reader.onload = loadHandler;
  // reader.onerror = errorHandler;
  // Read file into memory as UTF-8      
  reader.readAsText(fileToRead);
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}
////////////////////////////////////////
/////////READ END////////////////////////
/////////////////////////////////////////

function processData(csv) {

  ////////////////////////////////////
  ///////READ FROM CSV///////////////
  //////////////////////////////////
  $(".csv-data").empty();
  var allTextLines = csv.split(/\r\n|\n/); // makes an array
  for(let i = 1; i < allTextLines.length; i++) {
    $(".csv-data").append(`<p>${allTextLines[i]}</p>`);
    $(".csv-data").append(`<p>--------------------</p>`);
  }

}
