'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];


//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury':0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury':0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury':0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function calculatePrice(){
  var n = Object.keys(deliveries).length;
  var m = Object.keys(truckers).length;
  var x = 0;
  for (var i=0;i<n;i++){
    for (var j=0;j<m;j++){
      if (deliveries[i].truckerId == truckers[j].id){
        x = j;
        break;
      }
    }
    deliveries[i].price = (deliveries[i].distance*truckers[x].pricePerKm)+(deliveries[i].volume*truckers[j].pricePerVolume);
    console.log(deliveries[i].id);
    console.log(deliveries[i].price);
  }
}
function calculatePriceVol(){
  var n = Object.keys(deliveries).length;
  var m = Object.keys(truckers).length;
  var x = 0;
  var priceVol = 0;
  for (var i=0;i<n;i++){
    for (var j=0;j<m;j++){
      if (deliveries[i].truckerId == truckers[j].id){
        x = j;
        break;
      }
    }
    //offers: base price + 0.9 * op + 0.7* op+ 0.5* op
    //price 1: base price
    if ((deliveries[i].volume-5) < 0){
        priceVol = deliveries[i].volume*truckers[j].pricePerVolume;
    }
    else{
      //price 1: base price
      priceVol = 5*truckers[j].pricePerVolume;
      if ((deliveries[i].volume-10) < 0){
        //price 2: 0.9
         priceVol += (deliveries[i].volume-5)*(0.9*truckers[j].pricePerVolume);
      }
      else{
        priceVol += 5*(0.9*truckers[j].pricePerVolume);
        if ((deliveries[i].volume-25) < 0){
          //price 3: 0.7
            priceVol += (deliveries[i].volume-10)*(0.7*truckers[j].pricePerVolume);
        }
        else{
          priceVol += 15*(0.7*truckers[j].pricePerVolume);
          if ((deliveries[i].volume-15) > 0){
          //price 3: 0.7
            priceVol += (deliveries[i].volume-25)*(0.5*truckers[j].pricePerVolume);
        }
        }
      }
    }
    deliveries[i].price = (deliveries[i].distance*truckers[x].pricePerKm)+priceVol
    console.log(deliveries[i].id);
    console.log(deliveries[i].price);
  }
}

function calculateCommission(){
  var n = Object.keys(deliveries).length;
  for(var i=0;i<n;i++){
    deliveries[i].commission.insurance = (0.5*0.3*deliveries[i].price);
    var m = deliveries[i].distance%500;
    deliveries[i].commission.treasury = m;
    deliveries[i].commission.convargo = 0.3*deliveries[i].price-deliveries-m-deliveries[i].commission.insurance;
  }
}

function calculatePriceDeduc(){
  var n = Object.keys(deliveries).length;
  var m = Object.keys(truckers).length;
  var x = 0;
  var priceVol = 0;
  for (var i=0;i<n;i++){
    for (var j=0;j<m;j++){
      if (deliveries[i].truckerId == truckers[j].id){
        x = j;
        break;
      }
    }
    //offers: base price + 0.9 * op + 0.7* op+ 0.5* op
    //price 1: base price
    if ((deliveries[i].volume-5) < 0){
        priceVol = deliveries[i].volume*truckers[j].pricePerVolume;
    }
    else{
      //price 1: base price
      priceVol = 5*truckers[j].pricePerVolume;
      if ((deliveries[i].volume-10) < 0){
        //price 2: 0.9
         priceVol += (deliveries[i].volume-5)*(0.9*truckers[j].pricePerVolume);
      }
      else{
        priceVol += 5*(0.9*truckers[j].pricePerVolume);
        if ((deliveries[i].volume-25) < 0){
          //price 3: 0.7
            priceVol += (deliveries[i].volume-10)*(0.7*truckers[j].pricePerVolume);
        }
        else{
          priceVol += 15*(0.7*truckers[j].pricePerVolume);
          if ((deliveries[i].volume-15) > 0){
          //price 3: 0.7
            priceVol += (deliveries[i].volume-25)*(0.5*truckers[j].pricePerVolume);
        }
        }
      }
    }
    if (deliveries[i].deductibleReduction == true){
    priceVol += deliveries[i].volume;
  }
    deliveries[i].price = (deliveries[i].distance*truckers[x].pricePerKm)+priceVol
    console.log(deliveries[i].id);
    console.log(deliveries[i].price);
  }
}
console.log("Manasa");
console.log(truckers);
console.log(deliveries);
console.log(actors);
calculatePrice();
calculatePriceVol();
calculateCommission();
calculatePriceDeduc();
