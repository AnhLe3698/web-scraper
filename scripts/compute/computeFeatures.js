// let ads = [
//   {
//     "title": "tires",
//     "price": "$550.00",
//     "date": "17/02/2023",
//     "location": "Calgary",
//     "description": "Good Year Wrangler Territory M+S 265/65R18 New used 1000 km",
//     "url": "https://www.kijiji.ca/v-tires-rims/calgary/tires/1650702495"
//   },
//   {
//     "title": "Tires Change Over Starting at Only $20!!!",
//     "price": "$15.00",
//     "date": "",
//     "location": "Calgary",
//     "description": "Limitless Tires is offering Tire Mounting with Balancing at $20* per tire for most Cars, Minivans and small SUVs. Light Duty Trucks are only $25* per tire and Heavy Duty Trucks are only $30* per tire. These are not bolt on price gimmicks like other shops, these prices are for dismounting and mounting of tires",
//     "url": "https://www.kijiji.ca/v-tires-rims/calgary/tires-change-over-starting-at-only-20/cas_1460576"
//   },
//   {
//     "title": "REDUCED TO SELL _ 265 60R20 Bridgestone Off 2022 Tundra",
//     "price": "$500.00",
//     "date": "28/02/2023",
//     "location": "Calgary",
//     "description": "265 60R20 Bridgestone Duelers set of 4. Taken off 2022 Toyota Tundra less than 5000km use.$500 OBO Available for viewing daytime hours after hours make an appt. thx.",
//     "url": "https://www.kijiji.ca/v-tires-rims/calgary/reduced-to-sell-_-265-60r20-bridgestone-off-2022-tundra/1648233410"
//   },
//   {
//     "title": "$80 Tire Changes - Mounting and Balancing - Cheap Tires for Sale - Limitless Tire Calgary",
//     "price": "$80.00",
//     "date": "",
//     "location": "Calgary",
//     "description": "Need to swap your tires? Limitless Tires is your most cost-effective solution! Most cars are only $80* for all 4 tires! Most SUVs and Light Trucks are only $80* and most Larger Trucks are only $100*! Please see below for pricing details. ALL TIRE CHANGE PRICES INCLUDE WHEEL BALANCING!!! SAME DAY INSTALL APPOINTMENTS",
//     "url": "https://www.kijiji.ca/v-tires-rims/calgary/80-tire-changes-mounting-and-balancing-cheap-tires-for-sale-limitless-tire-calgary/cas_801660"
//   },
//   {
//     "title": "245/45R19 Nokian Hakkapeliitta winter tires 2018 Sportage",
//     "price": "$700.00",
//     "date": "11/02/2023",
//     "location": "Calgary",
//     "description": "Michelin We have a set of 245/45R19 Nokian Hakkapeliitta R2 winter tires on Aluminum Wheels with TPMS sensors. price is based on wheels. Tires in good condition with 5/32 tread remaining. DOT 1205. Bolt ...",
//     "url": "https://www.kijiji.ca/v-tires-rims/calgary/245-45r19-nokian-hakkapeliitta-winter-tires-2018-sportage/1644101260"
//   },
// ];


const findTires = new IsBrand;
function findAllTires(ads) {
  return {
     michelin: ads.filter(ad => {
      if (findTires.compute(ad, 'michelin')) {
        return ad
      }
    }),
    bridgestone: ads.filter(ad => {
      if (findTires.compute(ad, 'bridgestone')) {
        return ad
      }
    }),
    blizzak: ads.filter(ad => {
      if (findTires.compute(ad, 'blizzak')) {
        return ad
      }
    }),
    yokohoma: ads.filter(ad => {
      if (findTires.compute(ad, 'yokohoma')) {
        return ad
      }
    }),
    goodyear: ads.filter(ad => {
      if (findTires.compute(ad, 'goodYear')) {
        return ad
      }
    })
  }
}

// // console.log(checkName(ads, 'nokian'));
// console.log(findAllTires(ads));