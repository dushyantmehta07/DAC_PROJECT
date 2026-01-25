package com.ecommerce.backend.controller;

import com.ecommerce.backend.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/stats")
@CrossOrigin("*")
public class AdminStatsController {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public AdminStatsController(OrderRepository orderRepo,
                                ProductRepository productRepo,
                                UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    @GetMapping
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalOrders = orderRepo.count();
        long totalProducts = productRepo.count();
        long totalUsers = userRepo.count();

        double totalRevenue = orderRepo.findAll()
                .stream()
                .mapToDouble(o -> o.getTotal() == null ? 0 : o.getTotal())
                .sum();

        stats.put("totalOrders", totalOrders);
        stats.put("totalProducts", totalProducts);
        stats.put("totalUsers", totalUsers);
        stats.put("totalRevenue", totalRevenue);

        return stats;
    }
}
