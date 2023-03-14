import React, { ChangeEvent, ReactElement } from 'react'
import { CartItemType } from '../context/CartProvider'
import { ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType
}

const CartLineComponent = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
    const img: string = new URL(`../images/${item.sku}.jpeg`, import.meta.url).href

    const lineTotal: number = (item.qty * item.price)

    const highestQty: number = 20 > item.qty ? 20 : item.qty

    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, qty: Number(e.target.value) }
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div arria-aria-label="Item Name">{item.name}</div>
            <div arria-aria-label="Price Per Item">{new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(item.price)}</div>

            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>
            <select
                name="itemQty"
                id="itemQty"
                className="cart__select"
                value={item.qty}
                aria-label='Item Quantity'
                onChange={onChangeQty}
            >{options}</select>
            <div className="cart__item-subtotal" aria-label='Line Item Subtotal'>
                {new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(lineTotal)}
            </div>
            <button
                className="cart__button"
                aria-label='Remove Item From Cart'
                title="Remove Item From Cart"
                onClick={onRemoveFromCart}
            >
                X
            </button>
        </li>
    )

    return content
}

export default CartLineComponent