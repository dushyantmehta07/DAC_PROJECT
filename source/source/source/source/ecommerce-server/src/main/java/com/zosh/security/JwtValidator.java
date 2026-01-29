package com.zosh.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.List;

public class JwtValidator extends GenericFilter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        String header = request.getHeader("Authorization");

        // ✅ Skip if header missing or not Bearer
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        String token = header.substring(7);

        // ✅ Skip if token empty or "null"
        if (token == null || token.trim().isEmpty() || token.equalsIgnoreCase("null")) {
            chain.doFilter(req, res);
            return;
        }

        try {
            String email = JwtProvider.getEmailFromToken(token);

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(email, null, List.of());

            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception ex) {
            // ✅ Invalid token → ignore authentication instead of crashing
            System.out.println("Invalid JWT token: " + ex.getMessage());
            SecurityContextHolder.clearContext();
        }

        chain.doFilter(req, res);
    }
}
