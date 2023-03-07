//packages
const express = require('express'); //server package
const cors = require('cors'); // XSITE package
const fs = require('fs'); // file reader package
const cheerio = require('cheerio'); // Handle HTML
const axios = require('axios'); // Request Library

const app = express(); // Instantiating server
const port = process.env.PORT || 8080; // Port 

// Middleware
app.use(express.json());
app.use(cors());


// Listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Landing page request
app.get('/', (req, res) => {
  makeAPICall().then(output => {
    res.send(output);
  });
});

// Not implemented
// app.post('/send-url', (req, res) => {
//   const url = req.body.url;
//   console.log('Received URL:', url);
//   res.sendStatus(200);
// });

// Receive search terms and send a response
app.post('/send-search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  console.log('Received Search Term:', searchTerm);
  
  makeAPICallSearch(searchTerm).then(output => {
    res.json(output)
  });
});


async function makeAPICall() {
  try {
    // const response = await axios.get('https://www.kijiji.ca/b-calgary/tires/k0l1700199?rb=true&dc=true'); // or axios.post(url, data) for a POST request
    
    const response = await axios.get('https://www.kijiji.ca/b-calgary/tires/k0l1700199?rb=true&dc=true'); // or axios.post(url, data) for a POST request
    const $ = cheerio.load(response.data);
  
    let arrayOfPosts = [];
    $('div[data-listing-id][data-vip-url]').each((index, element) => {
      const $ele = cheerio.load(element);
      const url = 'https://www.kijiji.ca' + $(element).attr('data-vip-url').trim();
      const title = $ele('a.title').text().trim();
      const price = $ele('div.price').text().trim();
      const date = $ele('span.date-posted').text().trim();
      const location = $ele('div.location span:first-child').text().split('\n').join('').trim();
      const description = $ele('div.description').text().trim();  
      

      const postObject = {
        title: title,
        price: price,
        date: date,
        location: location,
        description: description,
        url,
      };

      arrayOfPosts.push(postObject) 
    });
    let links = []
    $('.pagination a').each((index, element) => {
      if(index !== $('.pagination a').length - 1 && index !== $('.pagination a').length - 2) {
        const href = 'https://www.kijiji.ca' + $(element).attr('href');
        links.push(href);
      }
    });
    const requests = links.map(url => axios.get(url));
    return Promise.all(requests)
      .then(responses => {
        responses.map(response => {
          const $dat = cheerio.load(response.data);
          $dat('div[data-listing-id][data-vip-url]').each((index, element) => {
            const $ele = cheerio.load(element);
            const url = 'https://www.kijiji.ca' + $(element).attr('data-vip-url').trim();
            const title = $ele('a.title').text().trim();
            const price = $ele('div.price').text().trim();
            const date = $ele('span.date-posted').text().trim();
            const location = $ele('div.location span:first-child').text().split('\n').join('').trim();
            const description = $ele('div.description').text().trim();  
            
      
            const postObject = {
              title: title,
              price: price,
              date: date,
              location: location,
              description: description,
              url,
            };
            
            arrayOfPosts.push(postObject) 
          });
          
        });
        // console.log('+++++', arrayOfPosts, '+++++')
        saveDataToFile(JSON.stringify(arrayOfPosts, null, 2), 'data1.txt')
        return (JSON.stringify(arrayOfPosts));
      })
      .catch(error => {
        console.log(error);
      });

    // console.log('-----', arrayOfPosts, '-----')
    
    // return (JSON.stringify(arrayOfPosts)); // returns the data received from the API
  } catch (error) {
    console.error(error);
  }

  
}

async function makeAPICallSearch(searchTerm) {
  try {
    const urlFromSearch = 'https://www.kijiji.ca/b-calgary/' + searchTerm + '/k0l1700199?rb=true&dc=true';
    const response = await axios.get(urlFromSearch); // or axios.post(url, data) for a POST request
    const $ = cheerio.load(response.data);
    

    let arrayOfPosts = [];
    $('div[data-listing-id][data-vip-url]').each((index, element) => {
      const $ele = cheerio.load(element);
      const url = 'https://www.kijiji.ca' + $(element).attr('data-vip-url').trim();
      const title = $ele('a.title').text().trim();
      const price = $ele('div.price').text().trim();
      const date = $ele('span.date-posted').text().trim();
      const location = $ele('div.location span:first-child').text().split('\n').join('').trim();
      const description = $ele('div.description').text().trim();  
      

      const postObject = {
        title: title,
        price: price,
        date: date,
        location: location,
        description: description,
        url,
      };

      arrayOfPosts.push(postObject) 
    });
    let links = []
    $('.pagination a').each((index, element) => {
      if(index !== $('.pagination a').length - 1 && index !== $('.pagination a').length - 2) {
        const href = 'https://www.kijiji.ca' + $(element).attr('href');
        links.push(href);
      }
    });
    const requests = links.map(url => axios.get(url));
    return Promise.all(requests)
      .then(responses => {
        responses.map(response => {
          const $dat = cheerio.load(response.data);
          $dat('div[data-listing-id][data-vip-url]').each((index, element) => {
            const $ele = cheerio.load(element);
            const url = 'https://www.kijiji.ca' + $(element).attr('data-vip-url').trim();
            const title = $ele('a.title').text().trim();
            const price = $ele('div.price').text().trim();
            const date = $ele('span.date-posted').text().trim();
            const location = $ele('div.location span:first-child').text().split('\n').join('').trim();
            const description = $ele('div.description').text().trim();  
            
      
            const postObject = {
              title: title,
              price: price,
              date: date,
              location: location,
              description: description,
              url,
            };
            
            arrayOfPosts.push(postObject) 
          });
          
        });
        // console.log('+++++', arrayOfPosts, '+++++')
        saveDataToFile(JSON.stringify(arrayOfPosts, null, 2), 'data1.txt')
        return (JSON.stringify(arrayOfPosts));
      })
      .catch(error => {
        console.log(error);
      });

    // console.log('-----', arrayOfPosts, '-----')
    
    // return (JSON.stringify(arrayOfPosts)); // returns the data received from the API
  } catch (error) {
    console.error(error);
  }

  
}


// async function makeTestCall() {
//   try {
//     const response = await axios.get('https://www.kijiji.ca/');
//     const $ = cheerio.load(response.data);
//     saveDataToFile(response.data, 'data2.txt')
//     return $;
//   } catch (error) {
//     console.error(error);
//   }
// } 

// makeTestCall();

function saveDataToFile(data, filename) {
  fs.writeFile(filename, data, (err) => {
    if (err) throw err;
    console.log(`Data saved to ${filename}`);
  });
}

// function saveDataToFile(data, filename) {
//   fs.appendFile(filename, data, (err) => {
//     if (err) throw err;
//     console.log(`Data saved to ${filename}`);
//   });
// }
