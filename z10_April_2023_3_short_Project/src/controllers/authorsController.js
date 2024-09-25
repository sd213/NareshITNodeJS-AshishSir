import express from "express";

let authorRouter = express.Router();

export default function RouteR(menu) {
  authorRouter.get("/", (req, res) => {
    res.render("authors.ejs",{title:"Authors",menu});
  });
  return authorRouter;
}

