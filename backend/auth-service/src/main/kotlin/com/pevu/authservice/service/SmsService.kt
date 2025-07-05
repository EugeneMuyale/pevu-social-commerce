package com.pevu.authservice.service

import com.twilio.Twilio
import com.twilio.rest.api.v2010.account.Message
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import jakarta.annotation.PostConstruct

@Service
class SmsService(
    @Value("twilio.account-sid") private val accountSid: String,
    @Value("twilio.auth-token") private val authToken: String,
    @Value("twilio.from-number") private val fromNumber: String
) {
    @PostConstruct
    fun init() {
        Twilio.init(accountSid, authToken)
    }

    fun sendOtpSms(to: String, otp: String) {
        Message.creator(
            com.twilio.type.PhoneNumber(to),
            com.twilio.type.PhoneNumber(fromNumber),
            "Your OTP code is: $otp"
        ).create()
    }
} 