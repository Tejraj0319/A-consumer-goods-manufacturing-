/* eslint-disable react/prop-types */

import { Button } from 'react-bootstrap';
import SaleOrderTable from './SaleOrderTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActiveSaleOrders = ({ saleOrders, openFormWithPrefill, onClose }) => {
  return (
    <div className="mt-5" style={{ height: '250px' }}>
      <Button variant="secondary" className='float-start btn-danger' onClick={onClose}>Close Active Sale Orders</Button>
      <SaleOrderTable saleOrders={saleOrders} openFormWithPrefill={openFormWithPrefill} />
    </div>
  );
};

export default ActiveSaleOrders;


