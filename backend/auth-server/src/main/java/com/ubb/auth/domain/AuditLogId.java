package com.ubb.auth.domain;

import static com.ubb.auth.domain.ErrorMessages.UTILITY_CLASS;

public class AuditLogId {

    public static final String COLLECTION_NAME = "auditLogs";
    public static final String ENTITY_TYPE = "entityType";
    public static final String EVENT_TYPE = "eventType";
    public static final String USER_ID = "userId";
    public static final String ENTITY_ID = "entityId";
    public static final String TIMESTAMP = "timestamp";

    private AuditLogId() {
        throw new IllegalStateException(UTILITY_CLASS);
    }

}
