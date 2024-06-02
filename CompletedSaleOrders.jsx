/* eslint-disable react/prop-types */


import { Table, Button } from 'react-bootstrap';
import { RiMoreFill } from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompletedSaleOrders = ({ saleOrders, openReadonlyForm, onClose }) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const todayDate = formatDate(new Date());

    return (
        <div className="mt-4">
            <Button variant="danger" onClick={onClose} className="mb-3 float-start" style={{marginTop:"5px"}}>Close Completed Sale Orders</Button>
            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                    <tr>
                        <th className="text-center">Product ID</th>
                        <th className="text-center">Selling Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total Amount</th>
                        <th className="text-center">Last Modified</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {saleOrders.map((order, index) => (
                        <tr key={index}>
                            <td className="text-center">{order.productId}</td>
                            <td className="text-center">${order.sellingPrice.toFixed(2)}</td>
                            <td className="text-center">{order.quantity}</td>
                            <td className="text-center">${order.totalAmount.toFixed(2)}</td>
                            <td className="text-center">{todayDate}</td>
                            <td className="text-center">
                                <button className="btn btn-link" onClick={() => openReadonlyForm(order)}>
                                    <RiMoreFill size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CompletedSaleOrders;
