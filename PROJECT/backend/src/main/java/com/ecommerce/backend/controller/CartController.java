package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.*;
import com.ecommerce.backend.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    private final CartRepository cartRepo;
    private final CartItemRepository itemRepo;

    public CartController(CartRepository cartRepo, CartItemRepository itemRepo) {
        this.cartRepo = cartRepo;
        this.itemRepo = itemRepo;
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestParam Long userId,
                              @RequestParam Long productId,
                              @RequestParam Integer quantity) {

        Cart cart = cartRepo.findByUserId(userId);

        if (cart == null) {
            cart = new Cart();
            cart.setUserId(userId);
            cart = cartRepo.save(cart);
        }

        CartItem item = new CartItem();
        item.setCartId(cart.getId());
        item.setProductId(productId);
        item.setQuantity(quantity);

        return itemRepo.save(item);
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        Cart cart = cartRepo.findByUserId(userId);
        return itemRepo.findByCartId(cart.getId());
    }
}
