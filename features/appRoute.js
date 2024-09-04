import userRoute from './users/userRoute.js'
import hotelRoute from './hotels/hotelRoute.js'
import roomRoute from './rooms/roomRoute.js'
import destinationRoute from './destination/destinationRoute.js'
import reviewRoute from './reviews/reviewRoute.js'
import rentalRoute from './rentals/rentalRoute.js'
import paymentRoute from './payments/paymentRoute.js'
import locationRoute from './hotels/locations/locationRoute.js'
import cartRoute from './cart/cartRoute.js'
import inviteRoute from './invite/inviteRoute.js'
export default (appRouter) => {
  appRouter.use("/users",userRoute);
  appRouter.use("/payments",paymentRoute);
  appRouter.use("/hotels",hotelRoute);
  appRouter.use("/rooms",roomRoute);
  appRouter.use("/destinations",destinationRoute);
  appRouter.use("/destinations",destinationRoute);
  appRouter.use("/reviews",reviewRoute);
  appRouter.use("/rentals",rentalRoute);
  appRouter.use("/locations",locationRoute);
  appRouter.use("/carts",cartRoute);
  appRouter.use("/invites",inviteRoute);
  return appRouter;
};