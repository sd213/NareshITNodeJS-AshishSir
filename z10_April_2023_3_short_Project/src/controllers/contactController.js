import express from "express";
let contactRouter = express.Router();
export default function contactRouteR(menu) {
  contactRouter.get("/", (req, res) => {
    res.render("contact.ejs",{title:"Contact",menu});
  });
  return contactRouter
}