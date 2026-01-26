import {
  GridComponent,
  ColumnsDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Inject,
  ColumnDirective
} from "@syncfusion/ej2-react-grids";

import {ordersData, ordersGrid} from "../../data/dummy.tsx";
import {Header} from "../../components";

function Orders() {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Orders (will be replaced with Audit)" />
      <GridComponent id="gridcomp" dataSource={ordersData} allowPaging allowSorting>
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>

        <Inject services={[Resize, Sort, ContextMenu, Filter, Page]} />
      </GridComponent>
    </div>
  )
}

export default Orders;