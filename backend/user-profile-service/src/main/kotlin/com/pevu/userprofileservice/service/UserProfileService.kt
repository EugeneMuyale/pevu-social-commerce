package com.pevu.userprofileservice.service

import com.pevu.userprofileservice.dto.*
import com.pevu.userprofileservice.model.ShippingAddress
import com.pevu.userprofileservice.model.UserProfile
import com.pevu.userprofileservice.repository.ShippingAddressRepository
import com.pevu.userprofileservice.repository.UserProfileRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class UserProfileService(
    private val userProfileRepository: UserProfileRepository,
    private val addressRepository: ShippingAddressRepository
) {
    @Transactional
    fun createProfile(request: UserProfileRequest): UserProfileResponse {
        // Check if a profile already exists for this userId
        if (userProfileRepository.findByUserId(request.userId).isPresent) {
            throw IllegalArgumentException("A profile already exists for this user.")
        }
        // Only check username uniqueness if provided
        if (!request.username.isNullOrBlank() && userProfileRepository.findByUsername(request.username).isPresent) {
            throw IllegalArgumentException("This username is already taken.")
        }
        try {
            val profile = UserProfile(
                userId = request.userId,
                fullName = request.fullName,
                username = request.username,
                role = request.role,
                avatarUrl = request.avatarUrl,
                businessName = request.businessName,
                businessDocUrl = request.businessDocUrl,
                businessLocation = request.businessLocation,
                businessType = request.businessType,
                businessDescription = request.businessDescription
            )
            return userProfileRepository.save(profile).toResponse()
        } catch (ex: Exception) {
            throw IllegalArgumentException("Failed to create profile: ${ex.message}")
        }
    }

    fun getProfileByUserId(userId: Long): UserProfileResponse =
        userProfileRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Profile not found") }.toResponse()

    @Transactional
    fun updateProfile(userId: Long, request: UserProfileRequest): UserProfileResponse {
        val profile = userProfileRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Profile not found") }
        val updated = profile.copy(
            fullName = request.fullName,
            username = request.username,
            updatedAt = Instant.now(),
            businessName = request.businessName,
            businessDocUrl = request.businessDocUrl,
            businessLocation = request.businessLocation,
            businessType = request.businessType,
            businessDescription = request.businessDescription
        )
        return userProfileRepository.save(updated).toResponse()
    }

    @Transactional
    fun addAddress(userId: Long, request: ShippingAddressRequest): ShippingAddressResponse {
        val profile = userProfileRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Profile not found") }
        if (request.isDefault) {
            val addresses = addressRepository.findByUserProfileId(profile.id)
            addresses.filter { it.isDefault }.forEach {
                addressRepository.save(it.copy(isDefault = false, updatedAt = Instant.now()))
            }
        }
        val address = ShippingAddress(
            userProfile = profile,
            street = request.street,
            city = request.city,
            state = request.state,
            postalCode = request.postalCode,
            country = request.country,
            isDefault = request.isDefault
        )
        return addressRepository.save(address).toResponse()
    }

    fun listAddresses(userId: Long): List<ShippingAddressResponse> {
        val profile = userProfileRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Profile not found") }
        return addressRepository.findByUserProfileId(profile.id).map { it.toResponse() }
    }

    @Transactional
    fun updateAddress(userId: Long, addressId: Long, request: ShippingAddressRequest): ShippingAddressResponse {
        val profile = userProfileRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Profile not found") }
        val address = addressRepository.findById(addressId).orElseThrow { NoSuchElementException("Address not found") }
        if (address.userProfile.id != profile.id) throw IllegalAccessException("Address does not belong to user")
        if (request.isDefault) {
            val addresses = addressRepository.findByUserProfileId(profile.id)
            addresses.filter { it.isDefault && it.id != addressId }.forEach {
                addressRepository.save(it.copy(isDefault = false, updatedAt = Instant.now()))
            }
        }
        val updated = address.copy(
            street = request.street,
            city = request.city,
            state = request.state,
            postalCode = request.postalCode,
            country = request.country,
            isDefault = request.isDefault,
            updatedAt = Instant.now()
        )
        return addressRepository.save(updated).toResponse()
    }

    @Transactional
    fun deleteAddress(userId: Long, addressId: Long) {
        val profile = userProfileRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Profile not found") }
        val address = addressRepository.findById(addressId).orElseThrow { NoSuchElementException("Address not found") }
        if (address.userProfile.id != profile.id) throw IllegalAccessException("Address does not belong to user")
        addressRepository.delete(address)
    }
}

private fun UserProfile.toResponse() = UserProfileResponse(
    id, userId, fullName, username, role, avatarUrl, dateJoined, createdAt, updatedAt,
    businessName, businessDocUrl, businessLocation, businessType, businessDescription
)

private fun ShippingAddress.toResponse() = ShippingAddressResponse(
    id, street, city, state, postalCode, country, isDefault, createdAt, updatedAt
) 