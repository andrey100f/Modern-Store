import {customersData, customersGrid, earningData} from "../../data/dummy.tsx";
import {Header} from "../../components";
import {
  ColumnDirective,
  ColumnsDirective,
  Edit, Filter,
  GridComponent,
  Inject, Page,
  Sort, Toolbar
} from "@syncfusion/ej2-react-grids";

function Ecommerce() {
  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white md:w-56 p-4 pt-9 rounded-2xl">
              <button type="button" disabled={true} style={{ color: item.iconColor, backgroundColor: item.iconBg }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                {item.icon}
              </button>
              <p className="pt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Customers (will be replaced with Products table)" />
        <GridComponent id="gridcomp"
                       dataSource={customersData}
                       editSettings={{ allowDeleting: true, allowAdding: true, allowEditing: true }} allowPaging allowSorting width="auto"
                       toolbar={['Delete', 'Add']}>
          <ColumnsDirective>
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>

          <Inject services={[Toolbar, Page, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
}

export default Ecommerce;