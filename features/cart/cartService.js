
import Cart from './cartModel.js';

class CartService {
  async createCart(cartData) {
    try {
      const cart = new Cart(cartData);
      return await cart.save();
    } catch (error) {
      throw new Error(`Failed to create cart: ${error.message}`);
    }
  }

  async getCartById(cartId) {
    try {
      return await Cart.findById(cartId).populate("items.item");
    } catch (error) {
      throw new Error(`Failed to retrieve cart: ${error.message}`);
    }
  }

  async updateCart(cartId, updateData) {
    try {
      return await Cart.findByIdAndUpdate(cartId, updateData, { new: true });
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  }

  async deleteCart(cartId) {
    try {
      return await Cart.findByIdAndDelete(cartId);
    } catch (error) {
      throw new Error(`Failed to delete cart: ${error.message}`);
    }
  }

  async getAllCarts() {
    try {
      return await Cart.find().populate("items.item");
    } catch (error) {
      throw new Error(`Failed to retrieve carts: ${error.message}`);
    }
  }
}

export default new CartService();
