package com.pevu.authservice.service

import com.pevu.authservice.model.User
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtil(
    @Value("\${jwt.secret}") private val secret: String
) {
    fun generateToken(user: User): String {
        val now = Date()
        val expiry = Date(now.time + 1000 * 60 * 60 * 24) // 24h
        return Jwts.builder()
            .setSubject(user.id.toString())
            .claim("role", user.role.name)
            .claim("email", user.email)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact()
    }

    fun getUserIdFromToken(token: String): Long {
        val claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .body
        return claims.subject.toLong()
    }
} 