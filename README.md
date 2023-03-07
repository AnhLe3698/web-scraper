# Kajiji Web Scraper

## Setup

Install dependencies with `npm install` .

Add an .env file with a variable "PORT=8000"  

## Run The Server 

Running the server normally
```sh
npm start
```

## Run the Client

Drag the client.html file into a web browser

## Api

### Home search for tires

Grabs the first 450 most recent tire posts

`GET /`

Response

```json
[
  {
    "title": "New 22\" Land Rover Wheels & Tires | Range Rover Wheels & Tires",
    "price": "$2,499.00",
    "date": "21/02/2023",
    "location": "Calgary",
    "description": "Set of 4 NEW 22\" Range Rover wheels and tires Range Rover Sport wheels and tires Tires 285/35R22 All season Antares R1 tires (same diameter as 275/45R21 and 275/40R22) This 22\" setup is compatible ...",
    "url": "https://www.kijiji.ca/v-tires-rims/calgary/new-22-land-rover-wheels-tires-range-rover-wheels-tires/1651174587"
  },
  {
    "title": "LT285/70R17 (2857017) ALL TERRAIN 285 70 17 Set of Four Brand New for $700.00!!  Calgary, AB",
    "price": "$700.00",
    "date": "",
    "location": "Calgary",
    "description": "Price: Price does not include GST & Levy Installation with extra fees Brand: FIREMAX Pattern: FM501 Load & Speed Index: 121/118S 8PR Business Phone Number: (368) 999-9988 Store Location: # 12, 91 Skyline Cres NE Calgary AB All tires come with 1 year or 50k km warranty and manufacture quality liability insurance.",
    "url": "https://www.kijiji.ca/v-tires-rims/calgary/lt285-70r17-2857017-all-terrain-285-70-17-set-of-four-brand-new-for-700-00-calgary-ab/cas_25227939"
  },
]
```

### Search any item on Kajiji

Grabs the first 450 most recent posts

`POST /send-search`

Response:

```json
[
  {
    "title": "INTEL i5 Computers for EVERY budget! (Priced Between $75 - $500)",
    "price": "$100.00",
    "date": "03/03/2023",
    "location": "Calgary",
    "description": "Excellent running LENOVO and HP PC's with INTEL i5 processors. Choose from 5 different PC's with various upgrade options to fit your computing wants and needs. ALL PC's are CLEAN, fully stress tested ...",
    "url": "https://www.kijiji.ca/v-desktop-computers/calgary/intel-i5-computers-for-every-budget-priced-between-75-500/1651490428"
  },
  {
    "title": "Pokemon Brilliant Diamond Nintendo Switch Game",
    "price": "$40.00",
    "date": "< 18 minutes ago",
    "location": "Calgary",
    "description": "Only used once or twice but I don't have the case for the game anymore.",
    "url": "https://www.kijiji.ca/v-nintendo-switch/calgary/pokemon-brilliant-diamond-nintendo-switch-game/1652628037"
  },
]
```

