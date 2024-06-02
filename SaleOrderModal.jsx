
import { useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import SaleOrderTable from './SaleOrderTable';
import CompletedSaleOrders from './CompletedSaleOrders';
import ActiveSaleOrders from './ActiveSaleOrders';
import 'bootstrap/dist/css/bootstrap.min.css';

const productSchema = {
    id: 209,
    display_id: 8,
    owner: 1079,
    name: "New Product",
    category: "The god of War",
    characteristics: "New Product Characteristics",
    features: "",
    brand: "New Product Brand",
    sku: [
        {
            id: 248,
            selling_price: 54,
            max_retail_price: 44,
            amount: 33,
            unit: "kg",
            quantity_in_inventory: 0,
            product: 209
        },
        {
            id: 247,
            selling_price: 32,
            max_retail_price: 32,
            amount: 33,
            unit: "kg",
            quantity_in_inventory: 0,
            product: 209
        },
        {
            id: 246,
            selling_price: 23,
            max_retail_price: 21,
            amount: 22,
            unit: "kg",
            quantity_in_inventory: 1,
            product: 209
        }
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z"
};

const SaleOrderModal = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [saleOrders, setSaleOrders] = useState([]);
    const [showActiveOrders, setShowActiveOrders] = useState(false);
    const [showCompletedOrders, setShowCompletedOrders] = useState(false);
    const [isReadonly, setIsReadonly] = useState(false);

    const openForm = () => {
        setFormVisible(true);
        setIsReadonly(false);
    };

    const closeForm = () => {
        setFormVisible(false);
        setSelectedProductId(null);
        setQuantity(1);
    };

    const handleProductChange = (event) => {
        setSelectedProductId(parseInt(event.target.value));
        setQuantity(1);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value >= 1 ? value : 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedProductId !== null) {
            const selectedProduct = productSchema.sku.find(item => item.id === selectedProductId);
            const totalAmount = selectedProduct ? selectedProduct.selling_price * quantity : 0;

            const newOrder = {
                productId: selectedProductId,
                sellingPrice: selectedProduct.selling_price,
                quantity,
                totalAmount,
            };

            setSaleOrders(prevOrders => {
                const updatedOrders = prevOrders.filter(order => order.productId !== selectedProductId);
                return [...updatedOrders, newOrder];
            });

            closeForm();
        }
    };

    const openFormWithPrefill = (order, readonly = false) => {
        setSelectedProductId(order.productId);
        setQuantity(order.quantity);
        setIsReadonly(readonly);
        setFormVisible(true);
    };

    const selectedProduct = productSchema.sku.find(item => item.id === selectedProductId);
    const totalAmount = selectedProduct ? selectedProduct.selling_price * quantity : 0;

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '50px' }}>
            <div className="d-flex justify-content-center align-items-center" style={{ gap: "30px" }}>
                <Button variant="info" onClick={() => setShowActiveOrders(true)}>Active Sale Orders</Button>
                <Button variant="warning" onClick={() => setShowCompletedOrders(true)}>Completed Sale Orders</Button>
                <Button variant="success" onClick={openForm}>+ Sale Order</Button>
            </div>

            <Modal show={formVisible} onHide={closeForm} centered className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Sale Order Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="productId" className="mb-3">
                            <Form.Label column sm="4">Product ID:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    as="select"
                                    onChange={handleProductChange}
                                    value={selectedProductId || ''}
                                    disabled={isReadonly}
                                >
                                    <option value="" disabled>Select a product ID</option>
                                    {productSchema.sku.map(item => (
                                        <option key={item.id} value={item.id}>{item.id}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        {selectedProduct && (
                            <>
                                <Form.Group as={Row} controlId="sellingPrice" className="mb-3">
                                    <Form.Label column sm="4">Selling Price (per unit):</Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" value={selectedProduct.selling_price} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="quantity" className="mb-3">
                                    <Form.Label column sm="4">Quantity:</Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                            readOnly={isReadonly}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="totalAmount" className="mb-3">
                                    <Form.Label column sm="4">Total Amount:</Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" value={totalAmount} readOnly />
                                    </Col>
                                </Form.Group>
                            </>
                        )}

                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeForm}>Close</Button>
                            {!isReadonly && <Button variant="primary" type="submit">Submit</Button>}
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {saleOrders.length > 0 && <SaleOrderTable saleOrders={saleOrders} openFormWithPrefill={openFormWithPrefill} />}

            {showActiveOrders && (
                <ActiveSaleOrders
                    saleOrders={saleOrders}
                    openFormWithPrefill={openFormWithPrefill}
                    onClose={() => setShowActiveOrders(false)}
                />
            )}

            {showCompletedOrders && (
                <CompletedSaleOrders
                    saleOrders={saleOrders}
                    openReadonlyForm={(order) => openFormWithPrefill(order, true)}
                    onClose={() => setShowCompletedOrders(false)}
                />
            )}
        </div>
    );
};

export default SaleOrderModal;
