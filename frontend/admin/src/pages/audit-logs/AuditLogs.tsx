import {
  GridComponent,
  ColumnsDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Inject,
  ColumnDirective} from "@syncfusion/ej2-react-grids";

import {Header} from "../../components";
import {useEffect, useState} from "react";
import {getAuditLogs} from "../../api/audit-api.ts";
import type {AuditLog} from "../../api/types/audit-log.ts";
import {auditsGrid} from "./audits-table-data.ts";

function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    async function getAllAuditLogs() {
      const res = await getAuditLogs();
      setAuditLogs(res);
    }

    getAllAuditLogs();
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Audit Logs" />
      <GridComponent id="gridcomp"
                     dataSource={auditLogs}
                     allowPaging allowSorting width="auto">
        <ColumnsDirective>
          {auditsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>

        <Inject services={[Resize, Sort, ContextMenu, Filter, Page]} />
      </GridComponent>
    </div>
  )
}

export default AuditLogs;