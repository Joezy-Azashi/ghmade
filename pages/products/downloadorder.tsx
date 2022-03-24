import React from "react";
import MainLayout from "../../components/MainLayout";
import { useEffect, useState, useContext } from "react";
import { ProductOrders } from "../../lib/endpoints";
import { CSVLink, CSVDownload } from "react-csv";
import { useRouter } from "next/router";
import moment from 'moment';
import Pagination from "react-paginate";
import { PropagateLoader } from "react-spinners";

const monthData = [
  { 'key': '1', 'name': 'January' },
  { 'key': '2', 'name': 'February' },
  { 'key': '3', 'name': 'March' },
  { 'key': '4', 'name': 'April' },
  { 'key': '5', 'name': 'May' },
  { 'key': '6', 'name': 'June' },
  { 'key': '7', 'name': 'July' },
  { 'key': '8', 'name': 'August' },
  { 'key': '9', 'name': 'September' },
  { 'key': '10', 'name': 'October' },
  { 'key': '11', 'name': 'November' },
  { 'key': '12', 'name': 'December' },
];



const disabled = {};



function downloadorder({ currentPage }) {
  const [allOrders, setAllOrders] = useState([]);
  const [allOrdersCSV, setAllOrdersCSV] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();

  const [monthFilterName, setMonthFilterName] = useState("Month");
  const [typeFilterName, setTypeFilterName] = useState("Type");

  const createDataForCSV = async () => {
    const orderData = [];
    allOrders.map((order: any) => {
      order.order_products.map((product: any) => {
        const row = {
          "Phone Number": order.customer_phone_number,
          "Item": product.name,
          "Price": ((product.price) - (product.discount / 100 * product.price)),
          "Quantity": product.quantity,
          "Date": moment(order.timestamp).format('llll')
        };
        orderData.push(row);
      })
    })
    setAllOrdersCSV(orderData);
  }

  useEffect(() => {
    (async () => {
      const rs = await new ProductOrders().getBusinessOrders(currentPage);
      setTempList(rs.results);
      setAllOrders(rs.results);
      settotalRecords(rs.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  const monthFilter = async (event: any) => {
    setMonthFilterName(event.target.value);
    const rs = event.target.value == '0'
      ? tempList : tempList.filter(item => event.target.value == moment(item.timestamp).format('MMMM'));
    // setTempList(rs);
    setAllOrders(rs.slice(0, recordsPerPage));
  };

  const typeFilter = async (event: any) => {
    setTypeFilterName(event.target.value);

    const rs = ['All', 'Type'].includes(event.target.value)
      ? tempList : tempList.map(item => {
        return {
          ...item,
          products: item.products.filter(product => product.product_type == event.target.value)
        }
      });
    // setTempList(rs);
    setAllOrders(rs.slice(0, recordsPerPage));
  };

  const searchOrder = (event: any) => {
    const rs = tempList.filter((item: any) => {
      return item.order.registered_customer_info_log.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());
    });
    setAllOrders(rs.slice(0, recordsPerPage));
  }

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/products/downloadorder/?page=" + (page.selected + 1));
      // setCurrentPage(page.selected + 1);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="row page-header ">
          <div className="">
            <h1 className="page-title">Orders</h1>
          </div>
        </div>

        <div className=" justify-content-end table-filter">
          <div id="monthfilter__div">
            <div className="form-group mt-2">
              <select className="form-control form-rounded filter-dropdown monthwidth" onChange={monthFilter} value={monthFilterName}>
                <option value="0">Month</option>
                {monthData.map((month: any, index: number) => {
                  return (
                    <option
                      className="dropdown-item"
                      key={index}
                      value={month.name}
                    >
                      {month.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>



          <CSVLink
            filename={"order_report.csv"}
            className="btn btn-primary printorderbtn"
            type="submit"
            id="download-btn"
            data={allOrdersCSV}
            asyncOnClick={true}
            onClick={createDataForCSV}
          >
            Download orders
                    </CSVLink>

        </div>

        <div className="responsivetable">
          <table className="table orderlist" style={{ backgroundColor: "white" }}>
            <thead>
              <tr className="text-muted">
                <th scope="col">Phone Number</th>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>

              {
                allOrders.map((order: any) => (
                  order.order_products.map((product: any) => (
                    <tr key={`${order.id}.${product.id}`}>
                      <td scope="col">. <span style={{marginLeft: "0.8em"}}>{order.customer_phone_number}</span></td>
                      <td scope="col">{product.name}</td>
                      <td scope="col">GH¢ {((product.price) - (product.discount / 100 * product.price))}</td>
                      <td scope="col">{product.quantity}</td>
                      <td scope="col">{moment(order.timestamp).format('Do MMM YY, h:mm a')}</td>
                    </tr>
                  ))
                ))}
            </tbody>

          </table>
          <div className="row">
            {pageReady && allOrders.length <= 0 ? (
              <div style={{ margin: "0 auto" }}>
                <p id="no-products" className="no-products-found mt-3">
                  No data available for this month.
              </p>
              </div>
            ) : !pageReady ? (
              <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                <PropagateLoader size={30} color="#1B98E0" loading />
              </div>
            ) : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
} export default downloadorder;

export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      currentPage,
    },
  };
}