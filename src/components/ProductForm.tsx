 // src/components/ProductForm.js
 import React, { useState } from 'react';
 import axios from 'axios';
 import styled from 'styled-components';

 const Form = styled.form`
     display: flex;
     flex-direction: column;
     gap: 1rem;
     width: 300px;
 `;

 const Input = styled.input`
     padding: 0.5rem;
     border: 1px solid #ddd;
     border-radius: 4px;
 `;

 const Textarea = styled.textarea`
     padding: 0.5rem;
     border: 1px solid #ddd;
     border-radius: 4px;
 `;

 const Button = styled.button`
     padding: 0.5rem;
     border: none;
     border-radius: 4px;
     background-color: #4A47A3;
     color: white;
     cursor: pointer;

     &:hover {
         background-color: #3b3b87;
     }
 `;

 const ProductForm = ({ product, onSave }) => {
     const [formData, setFormData] = useState(product || {
         nom: '',
         description: '',
         prix: '',
         categorie: '',
         stock: ''
     });

     const handleChange = (e) => {
         setFormData({
             ...formData,
             [e.target.name]: e.target.value
         });
     };

     const handleSubmit = (e) => {
         e.preventDefault();
         const method = product ? 'put' : 'post';
         const url = product ? `http://localhost:3000/produits/${product._id}` : 'http://localhost:3000/produits';

         axios[method](url, formData)
             .then(response => {
                 onSave(response.data);
             })
             .catch(error => console.error('Erreur:', error));
     };

     return (
         <Form onSubmit={handleSubmit}>
             <Input type="text" name="nom" placeholder="Name" value={formData.nom} onChange={handleChange} required />
             <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></Textarea>
             <Input type="number" name="prix" placeholder="Price" value={formData.prix} onChange={handleChange} required />
             <Input type="text" name="categorie" placeholder="Category" value={formData.categorie} onChange={handleChange} required />
             <Input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
             <Button type="submit">Save</Button>
         </Form>
     );
 };

 export default ProductForm;