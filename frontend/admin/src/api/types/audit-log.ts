export interface AuditLog {
  id: string;
  entityType: string;
  timestamp: string;
  userId: string;
  eventType: string;
  entityId: string;
}