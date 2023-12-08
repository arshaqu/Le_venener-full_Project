import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cell: {
    margin: 'auto',
    fontSize: 12,
    padding: 8,
  },
});



function AdminShoworders() {
  const [order, setOrder] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;



  const getDetails = async () => {
    try {
      const response = await axios.post('/api/admin/orderlist', {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("admintoken") }
      });
      setOrder(response.data.orderData);
      setFilteredOrder(response.data.orderData);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-IN', options);
    return formattedDate;
  }

  useEffect(() => {
    if (selectedDate) {
      const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('en-IN');
      const filteredOrders = order.filter(orderItem => {
        const formattedOrderDate = new Date(orderItem.products[0].eventDate).toLocaleDateString('en-IN');
        return formattedOrderDate === formattedSelectedDate;
      });
      setFilteredOrder(filteredOrders);
    } else {
      setFilteredOrder(order);
    }
  }, [selectedDate, order]);

  useEffect(() => {
    getDetails();
  }, []);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-IN', options);
    return formattedDate;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrder.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredOrder.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const SalesReportPDF = () => (
    <Document>
      <Page style={styles.page}>
      <View>
      <Text style={styles.header}>Sales Report</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.cell}>Event Date</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.cell}>Product Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.cell}>Total Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.cell}>Payment</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.cell}>Catagory</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.cell}>Days</Text>
          </View>

          
         
          <View style={styles.tableCol}>
            <Text style={styles.cell}>Status</Text>
          </View>
          {/* Add other columns as needed */}
        </View>
        {order.map((order) => (
         
            <View style={styles.tableRow} key={order.productId}>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{formatDate(order.products[0].eventDate)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{order.products[0].productName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}> ₹ {order.totalAmount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{order.status ? 'Success' : 'False'}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}>{order.products[0].productCatagory}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cell}> {order.products[0].eventPeriod}</Text>
              </View>
           
              <View style={styles.tableCol}>
                <Text style={styles.cell}> {order.history}</Text>
              </View>
              {/* Add other cells as needed */}
            </View>
          
        ))}
      </View>
    </View>
              {/* Add other columns as needed
            </View>
            {order.map((order) => (

  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={order.productId}>
    Render cells for each property of the product 
  </tr>

))}
          </View>
        </View> */}
      </Page>
    </Document>
  )




  return (
    <div>
      <AdminHeader />
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          padding: '10px',
          backgroundColor: '#96C291',
          fontWeight: 'bold',
          color: 'white',
          borderRadius: '8px',
          fontFamily: 'cursive',
          marginTop: '100px',
          marginLeft: '300px',
          cursor: 'pointer',
        }}
        className="hover:bg-blue-500 mr-5"
      >
        Show Orders Details
      </h1>

      <div style={{marginLeft:'250px'}} className='flex'>
      <div   className="ml-32 mx-5">
      <label className="block text-sm font-medium text-gray-700">Filter by Date:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="mt-1 p-2 border rounded-md"
      />
</div>

<PDFDownloadLink style={{marginLeft:'800px'}} document={<SalesReportPDF />} fileName="sales_report.pdf">
        {({ blob, url, loading, error }) => (
           <button
           className={`pdf-download-button ${
             loading
               ? 'bg-gray-500 cursor-not-allowed'
               : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700'
           } text-white font-bold py-2 px-4 rounded`}
           disabled={loading}
         >
           {loading ? 'Loading document...' : 'Download PDF'}
         </button>
        )}
      </PDFDownloadLink>

      </div>

      <table style={{marginLeft:'305px',fontSize:'12px'}} className="mt-3 mr-3  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
        <thead style={{fontSize:'10px'}} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
                  <th  scope="col" class="px-6 py-3">
                      Event Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Product Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Rent Days
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Product Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Total Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Catagory
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Payment_id
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Payment
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Delivery Address
                  </th>
                  <th scope="col" class="px-6 py-3">
                       Status
                  </th>
                 
              </tr>
        </thead>
        <tbody>
          {currentItems.map((orderItem) => (
            <tr
              key={orderItem.products[0]._id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {formatDate(orderItem.products[0].eventDate)}
              </th>
              <td className="px-6 py-2">
                {orderItem.products[0].productName}
              </td>
              <td className="px-6 py-2">
                {orderItem.products[0].eventPeriod}
              </td>
              <td className="px-6 py-2">
                ₹ {orderItem.products[0].productPrice}
              </td>
              <td className="px-6 py-2">
              ₹ {orderItem.totalAmount}
            </td>
              <td className="px-6 py-2">
                {orderItem.status ? 'Success' : 'False'}
              </td>
              <td className="px-6 py-2">
                {orderItem.products[0].productCatagory}
              </td>
              <td className="px-6 py-2">{orderItem.paymentId}</td>
              <td className="px-6 py-2">{orderItem.deliveryAddress}</td>
              <td className="px-6 py-2">{orderItem.history}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`mr-2 px-3 py-1 border ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500'
            } cursor-pointer`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminShoworders;
