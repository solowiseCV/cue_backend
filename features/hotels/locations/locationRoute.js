import express from 'express'
import thingsToDoRoute from './thingTodo/route.js'
import topAttractionsRoute from './topAttractions/route.js'
const locationRoute = express.Router();

locationRoute.use("/things_to_do",thingsToDoRoute)
locationRoute.use("/top_attractions",topAttractionsRoute)

export default locationRoute;