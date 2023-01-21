const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, "Please check your data entry, no name specified!" ]
  },
  rating : {
    type : Number,
    min: 1,
    max: 10
  },
  review : String
});

const personSchema = new mongoose.Schema({
  name : String,
  age : Number,
  favouriteFruit : fruitSchema
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating : 10,
  review: "Mangos are so fking great."
});

// fruit.save();

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name : "Mango",
  rating : 10,
  review : "The best Fruit."
});

mango.save();

const pineapple = new Fruit({
  name : "Pineapple",
  rating : 9,
  review : "Great Fruit."
});

// pineapple.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfully updated the document.");
  }  
});

const person = new Person({
  name : "Amy",
  age : 12,
  favouriteFruit : pineapple
});

// person.save();



// const kiwi = new Fruit({
//   name : "Kiwi",
//   rating : 5,
//   review: "Pretty solid as a weird fruit."
// });

// const banana = new Fruit({
//   name : "Banana",
//   rating : 10,
//   review: "Pretty smooth as fruit."
// });

// const orange = new Fruit({
//   name : "Orange",
//   rating : 7,
//   review: "Pretty good as fruit."
// });

// Fruit.insertMany([kiwi, banana, orange], function(error) {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log("Succesfully saved all the fruits to fruitsDB");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    fruits.forEach(fruit => {
      console.log(fruit.name);
    });

    mongoose.disconnect();
  }
});

// Fruit.updateOne({_id: "63c43c94d6aec387c03b0bf6"}, {name: "Peach"}, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully updated the document.");
//   }

// });

// Fruit.deleteOne({name : "Peach"}, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted the document.");
//   }

// });

// Person.deleteMany({name : "John"}, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted all the documents.");
//   }

// });