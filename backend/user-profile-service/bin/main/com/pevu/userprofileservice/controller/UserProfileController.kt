package com.pevu.userprofileservice.controller

import com.pevu.userprofileservice.dto.*
import com.pevu.userprofileservice.service.UserProfileService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(value = ["/api/user", "/api/user/"])
class UserProfileController(
    private val userProfileService: UserProfileService
) {
    @PostMapping(value = ["", "/"])
    fun createProfile(@RequestBody req: UserProfileRequest): ResponseEntity<UserProfileResponse> =
        try {
            ResponseEntity.ok(userProfileService.createProfile(req))
        } catch (ex: IllegalArgumentException) {
            ex.printStackTrace()
            ResponseEntity.badRequest().body(null)
        } catch (ex: Exception) {
            ex.printStackTrace()
            ResponseEntity.internalServerError().body(null)
        }

    @GetMapping("/{userId}")
    fun getProfile(@PathVariable userId: Long): ResponseEntity<UserProfileResponse> {
        return try {
            ResponseEntity.ok(userProfileService.getProfileByUserId(userId))
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/{userId}")
    fun updateProfile(@PathVariable userId: Long, @RequestBody req: UserProfileRequest): ResponseEntity<UserProfileResponse> =
        ResponseEntity.ok(userProfileService.updateProfile(userId, req))

    @PostMapping("/{userId}/address")
    fun addAddress(@PathVariable userId: Long, @RequestBody req: ShippingAddressRequest): ResponseEntity<ShippingAddressResponse> =
        ResponseEntity.ok(userProfileService.addAddress(userId, req))

    @GetMapping("/{userId}/addresses")
    fun listAddresses(@PathVariable userId: Long): ResponseEntity<List<ShippingAddressResponse>> =
        ResponseEntity.ok(userProfileService.listAddresses(userId))

    @PutMapping("/{userId}/address/{addressId}")
    fun updateAddress(@PathVariable userId: Long, @PathVariable addressId: Long, @RequestBody req: ShippingAddressRequest): ResponseEntity<ShippingAddressResponse> =
        ResponseEntity.ok(userProfileService.updateAddress(userId, addressId, req))

    @DeleteMapping("/{userId}/address/{addressId}")
    fun deleteAddress(@PathVariable userId: Long, @PathVariable addressId: Long): ResponseEntity<Void> {
        userProfileService.deleteAddress(userId, addressId)
        return ResponseEntity.noContent().build()
    }
} 