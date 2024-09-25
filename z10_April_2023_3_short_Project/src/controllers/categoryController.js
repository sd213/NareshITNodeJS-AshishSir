import express from "express";

let categoryRouter = express.Router();

export default function categoryRouteR(menu){
    categoryRouter.get("/",(req,res)=>{
        res.render("category.ejs", { title: "Posts", menu });
    })
    return categoryRouter;
}
// module. exports = RouteR;
// export default RouteR;