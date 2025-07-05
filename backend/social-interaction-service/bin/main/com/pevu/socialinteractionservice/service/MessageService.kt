package com.pevu.socialinteractionservice.service

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.model.Message
import com.pevu.socialinteractionservice.repository.MessageRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class MessageService(private val messageRepository: MessageRepository) {

    fun sendMessage(request: MessageRequest): MessageResponse {
        val message = Message(
            senderId = request.senderId,
            receiverId = request.receiverId,
            content = request.content
        )
        val savedMessage = messageRepository.save(message)
        
        return MessageResponse(
            id = savedMessage.id,
            senderId = savedMessage.senderId,
            receiverId = savedMessage.receiverId,
            content = savedMessage.content,
            isRead = savedMessage.isRead,
            createdAt = savedMessage.createdAt
        )
    }

    fun getConversation(userId1: Long, userId2: Long): ConversationResponse {
        val messages1 = messageRepository.findBySenderIdAndReceiverIdOrderByCreatedAtDesc(userId1, userId2)
        val messages2 = messageRepository.findBySenderIdAndReceiverIdOrderByCreatedAtDesc(userId2, userId1)
        
        val allMessages = (messages1 + messages2).sortedBy { it.createdAt }
        
        val unreadCount = messageRepository.countByReceiverIdAndIsReadFalse(userId1)
        
        return ConversationResponse(
            messages = allMessages.map { message ->
                MessageResponse(
                    id = message.id,
                    senderId = message.senderId,
                    receiverId = message.receiverId,
                    content = message.content,
                    isRead = message.isRead,
                    createdAt = message.createdAt
                )
            },
            unreadCount = unreadCount
        )
    }

    fun getUnreadMessages(userId: Long): List<MessageResponse> {
        return messageRepository.findByReceiverIdAndIsReadFalse(userId).map { message ->
            MessageResponse(
                id = message.id,
                senderId = message.senderId,
                receiverId = message.receiverId,
                content = message.content,
                isRead = message.isRead,
                createdAt = message.createdAt
            )
        }
    }

    fun getUnreadCount(userId: Long): Long {
        return messageRepository.countByReceiverIdAndIsReadFalse(userId)
    }

    fun markAsRead(messageId: Long) {
        val message = messageRepository.findById(messageId).orElseThrow {
            IllegalArgumentException("Message not found")
        }
        val updatedMessage = message.copy(isRead = true)
        messageRepository.save(updatedMessage)
    }

    fun deleteMessage(messageId: Long) {
        val message = messageRepository.findById(messageId).orElseThrow {
            IllegalArgumentException("Message not found")
        }
        val updatedMessage = message.copy(isDeleted = true)
        messageRepository.save(updatedMessage)
    }
} 