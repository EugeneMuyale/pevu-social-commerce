package com.pevu.authservice.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class EmailService(@Autowired private val mailSender: JavaMailSender) {
    fun sendOtpEmail(to: String, otp: String) {
        val message = SimpleMailMessage()
        message.setTo(to)
        message.setSubject("Your OTP Code")
        message.setText("Your OTP code is: $otp")
        mailSender.send(message)
    }
} 