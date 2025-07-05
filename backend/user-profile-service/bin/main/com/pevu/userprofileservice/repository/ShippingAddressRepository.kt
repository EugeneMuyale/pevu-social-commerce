package com.pevu.userprofileservice.repository

import com.pevu.userprofileservice.model.ShippingAddress
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ShippingAddressRepository : JpaRepository<ShippingAddress, Long> {
    fun findByUserProfileId(userProfileId: Long): List<ShippingAddress>
    fun findByUserProfileIdAndIsDefault(userProfileId: Long, isDefault: Boolean): List<ShippingAddress>
} 