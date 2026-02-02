package com.ubb.auth.model;

import com.ubb.auth.domain.AuditLogId;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = AuditLogId.COLLECTION_NAME)
@Data
@Builder
public class AuditLog {

    @Id
    private String id;

    @Field(name = AuditLogId.ENTITY_TYPE)
    private String entityType;

    @Field(name = AuditLogId.EVENT_TYPE)
    private String eventType;

    @Field(name = AuditLogId.ENTITY_ID)
    private String entityId;

    @Field(name = AuditLogId.USER_ID)
    private String userId;

    @Field(name = AuditLogId.TIMESTAMP)
    private String timestamp;

}
