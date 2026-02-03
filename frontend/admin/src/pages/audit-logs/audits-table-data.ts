export const auditsGrid = [
  { headerText: 'Audit Log ID', field: 'id', isPrimaryKey: true, textAlign: 'Center', width: 100 },
  { headerText: 'Entity Type', field: 'entityType', textAlign: 'Left', width: 150 },
  { headerText: 'Timestamp', field: 'timestamp', textAlign: 'Left', width: 120 },
  { headerText: 'User ID', field: 'userId', textAlign: 'Right', width: 100, format: 'C2' },
  { headerText: 'Event Type', field: 'eventType', textAlign: 'Left', width: 200 },
  { headerText: 'Entity ID', field: 'entityId', textAlign: 'Left', width: 250 },
];
