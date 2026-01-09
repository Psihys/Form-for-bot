import express from 'express';

export const getAllFromCart = (req, res) => {
    const {products} = req.body
    const user = req.user
    // Логика получения всех товаров из корзины пользователя userId
    const existingItem = user.cartItems.find(item => item.productId === products.productId);
    if (existingItem) {
        return res.status(400).json({ message: 'Product already in cart' });
    }

    

}

export const addToCart = (req, res) => {   
    // Логика добавления товара в корзину

}

