package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.*;
import com.ecommerce.backend.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final CartRepository cartRepo;
    private final CartItemRepository cartItemRepo;
    private final ProductRepository productRepo;

    public OrderController(OrderRepository orderRepo,
                           OrderItemRepository orderItemRepo,
                           CartRepository cartRepo,
                           CartItemRepository cartItemRepo,
                           ProductRepository productRepo) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.cartRepo = cartRepo;
        this.cartItemRepo = cartItemRepo;
        this.productRepo = productRepo;
    }

    // ✅ Place Order
    @PostMapping("/place/{userId}")
    public Order placeOrder(@PathVariable Long userId) {

        Cart cart = cartRepo.findByUserId(userId);
        List<CartItem> cartItems = cartItemRepo.findByCartId(cart.getId());

        double total = 0;

        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PLACED");
        order = orderRepo.save(order);

        for (CartItem item : cartItems) {
            Product product = productRepo.findById(item.getProductId()).get();

            double price = product.getPrice();
            total += price * item.getQuantity();

            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(order.getId());
            orderItem.setProductId(product.getId());
            orderItem.setPrice(price);
            orderItem.setQuantity(item.getQuantity());

            orderItemRepo.save(orderItem);
        }

        order.setTotal(total);
        orderRepo.save(order);

        // ✅ Clear cart
        cartItemRepo.deleteAll(cartItems);

        return order;
    }

    // ✅ Order History
    @GetMapping("/user/{userId}")
    public List<Order> getOrders(@PathVariable Long userId) {
        return orderRepo.findByUserId(userId);
    }
    // ✅ Admin - Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
    // ✅ Get items for a specific order
    @GetMapping("/{orderId}/items")
    public List<OrderItem> getOrderItems(@PathVariable Long orderId) {
        return orderItemRepo.findByOrderId(orderId);
    }

}
