
import cartService from "./cartService.js";

class CartController {
  async createCart(req, res) {
    const userId = req.user.id;
    try {
        const cartData = {
            ...req.body,
            user_id: userId,
            hotel_id : req.body.hotel_id || req.params.hotel_id,
            rental_id : req.body.rental_id || req.params.rental_id
        }
      const cart = await cartService.createCart(cartData);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await cartService.getCartById(req.params.id);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const cart = await cartService.updateCart(req.params.id, req.body);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCart(req, res) {
    try {
      const cart = await cartService.deleteCart(req.params.id);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCarts(req, res) {
    try {
      const carts = await cartService.getAllCarts();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CartController();
