import { useState } from "react";
const Table = (props) => {
    const [trade, setTrade] = useState({
        symbol: null,
        trades: [],
        newTrade: {
            symbol: "",
            tradeDate: "",
            sellingDate: "",
            quantity: "",
            totalCost: "",
            realized: "",
            dividend: "",
            avgPrice: "",
            sellingPrice: "",
            pAndL: "",
            return: "",
        }
    });

    return (
        <div className="responsive">
        <table>
            <tr>
                <th>ID</th>
                <th>Symbol</th>
                <th>Trade Date</th>
                <th>Selling Date</th>
                <th>Day(s)</th>
                <th>L/S</th>
                <th>Quantity</th>
                <th>Total Cost</th>
                <th>Total Revenue</th>
                <th>Dividend</th>
                <th>Average Price</th>
                <th>Selling Price</th>
                <th>P/L</th>
                <th>Return</th>
            </tr>
            <tr>
                <td>

                </td>

            </tr>
        </table>
        </div>
    );
};

export default Table;