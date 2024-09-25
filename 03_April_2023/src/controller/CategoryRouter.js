let express = require('express');
let catagoryRouter = express.Router()



let category = [
  {
    id: 1,
    category: "Fashion",
    thumb: "https://i.ibb.co/56VP0Fn/cloths.jpg",
  },
  {
    id: 2,
    category: "Electronics",
    thumb: "https://i.ibb.co/pw5Wtdx/appliances.jpg",
  },
  {
    id: 3,
    category: "Essentials",
    thumb: "https://i.ibb.co/0cw34xm/essentials.jpg",
  },
  {
    id: 4,
    category: "Footwear",
    thumb: "https://i.ibb.co/r3SZq8S/footware.jpg",
  },
];

function routeR(menu){
  catagoryRouter.get("/", (req, res) => {
    // res.send(catagory);
    // res.render('catagory');
    res.render("category.ejs", { title: "Category Page", category, menu });
  });
  catagoryRouter.get("/details", (req, res) => {
    res.send("Category Details");
  });
  return catagoryRouter
}
module.exports = routeR;