// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/produits')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <Table>
                <thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Price</Th>
                        <Th>Category</Th>
                        <Th>Stock</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <Td>{product.nom}</Td>
                            <Td>{product.description}</Td>
                            <Td>{product.prix}</Td>
                            <Td>{product.categorie}</Td>
                            <Td>{product.stock}</Td>
                            <Td>
                                {/* Actions for edit and delete will be added here */}
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductList;