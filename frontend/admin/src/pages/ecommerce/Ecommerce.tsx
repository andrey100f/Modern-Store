import {earningData} from "../../data/dummy.tsx";
import {Header} from "../../components";
import {
  type ActionEventArgs,
  ColumnDirective,
  ColumnsDirective,
  Edit, Filter,
  GridComponent,
  Inject, Page,
  Sort, Toolbar
} from "@syncfusion/ej2-react-grids";
import {productsGrid} from "./products-table-data.ts";
import {useEffect, useRef, useState} from "react";
import {addProduct, deleteProduct, getProducts, updateProduct} from "../../api/products-api.ts";
import type {Product} from "../../api/types/product.ts";

function Ecommerce() {
  const [products, setProducts] = useState<Product[]>([]);
  const gridRef = useRef<GridComponent | null>(null);

  useEffect(() => {
    async function getAllProducts() {
      const res = await getProducts();
      setProducts(res);
    }

    getAllProducts();
  }, []);

  const handleActionBegin = async (args: ActionEventArgs) => {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        args.cancel = true;

        try {
          const payload = args.data as Partial<Product>;
          await addProduct(payload);
          const newProducts = await getProducts();
          setProducts(newProducts);
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }

      if (args.action === 'edit') {
        args.cancel = true;

        try {
          const { id, ...payload } = args.data as Product;
          const res = await updateProduct(id, payload);
          setProducts((prevProducts) => prevProducts.map((prod) => prod.id === res.id ? res : prod));
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }
    }

    if (args.requestType === 'delete') {
      args.cancel = true;
      const rows = Array.isArray(args.data) ? args.data : [args.data];
      await Promise.all((rows).map((r) => deleteProduct(r.id)));
      setProducts((prevProducts) => prevProducts.filter((prod) => !rows.some((r) => r.id === prod.id)));
    }
  }

  const handleActionComplete = (args: ActionEventArgs) => {
    if (args.requestType === "save") {
      gridRef.current?.closeEdit();
    }
  };

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
        <Header title="Products" />
        <GridComponent id="gridcomp"
                       dataSource={products}
                       editSettings={{ allowDeleting: true, allowAdding: true, allowEditing: true }} allowPaging allowSorting width="auto"
                       toolbar={['Delete', 'Add', 'Edit', 'Update', 'Cancel']}
                       actionBegin={handleActionBegin}
                       actionComplete={handleActionComplete}>
          <ColumnsDirective>
            {productsGrid.map((item, index) => (
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