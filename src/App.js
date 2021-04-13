import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import "./styles.css";

export default function App() {

  const [state, setState] = useState({
    symbol: null,
      trades: [],
      newTrade: {
          no: "",
          symbol: "",
          tradeDate: "",
          sellingDate: "",
          days: "",
          lOrS: "",
          quantity: "",
          totalCost: "",
          totalReveneue: "",
          dividend: "",
          avgPrice: "",
          sellingPrice: "",
          pAndL: "",
          return: "",
      },
      editMode: false
  })

  async function getAppData() {
    try {
      const BASE_URL = 'http://localhost:3002/api/trades';
      const trades = await fetch(BASE_URL).then(res => res.json());
      console.log(trades);
      setState((prevState) => ({
        ...prevState,
        trades,
      }));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppData();
  }, []);

  async function handleSubmit(event) {

    event.preventDefault();
    
    const BASE_URL = 'http://localhost:3002/api/trades';

    if(!state.editMode) {

      const trades = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({...state.newTrade })
      }).then(res => res.json());
      
      setState((prevState) => ({
        ...prevState,
        trades,
        newTrade: {
          no: "",
          symbol: "",
          tradeDate: "",
          sellingDate: "",
          days: "",
          lOrS: "",
          quantity: "",
          totalCost: "",
          totalReveneue: "",
          dividend: "",
          avgPrice: "",
          sellingPrice: "",
          pAndL: "",
          returns: "",
        },
      }));
    } else {
      const { no, symbol, tradeDate, sellingDate, days, lOrS, quantity, totalCost, 
              totalRevenue, dividend, avgPrice, sellingPrice, pAndL, returns, _id } = state.newTrade;

      const trades = await fetch(`${BASE_URL}/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({ no, symbol, tradeDate, sellingDate, days, lOrS, quantity, totalCost, 
          totalRevenue, dividend, avgPrice, sellingPrice, pAndL, returns })
      }).then(res => res.json());

      setState(prevState => ({
        ...prevState,
        trades,
        newTrade: {
          no: "",
          symbol: "",
          tradeDate: "",
          sellingDate: "",
          days: "",
          lOrS: "",
          quantity: "",
          totalCost: "",
          totalReveneue: "",
          dividend: "",
          avgPrice: "",
          sellingPrice: "",
          pAndL: "",
          returns: "",
        },
        editMode: false
      }));
    }
  }

  function handleChange(event) {
    setState((prevState) => ({
      ...prevState, 
      newTrade: {
        ...prevState.newTrade,
        [event.target.name]: event.target.value 
      }
    })) 
  };

  async function handleDelete(tradeId) {

    const URL = `http://localhost:3002/api/trades/${tradeId}`;
    
    const trades = await fetch(URL, {
      method: 'DELETE'
    }).then(res => res.json());

    setState(prevState => ({
      ...prevState,
      trades,
    }));
  }

  function handleEdit(tradeId) {
    const { no, symbol, tradeDate, sellingDate, days, lOrS, quantity, totalCost, 
      totalRevenue, dividend, avgPrice, sellingPrice, pAndL, returns, _id } = state.trades.find(trade => trade._id === tradeId);
    setState(prevState => ({
      ...prevState,
      newTrade: {
        no, 
        symbol, 
        tradeDate, 
        sellingDate, 
        days, 
        lOrS, 
        quantity, 
        totalCost, 
        totalRevenue, 
        dividend, 
        avgPrice, 
        sellingPrice, 
        pAndL, 
        returns,
        _id
      },
      editMode: true
    }));
  }

  // function handleCancel() {
  //   setState(prevState => ({
  //     ...prevState,
  //     newTrade: {
  //       no: "",
  //       symbol: "",
  //       tradeDate: "",
  //       sellingDate: "",
  //       days: "",
  //       lOrS: "",
  //       quantity: "",
  //       totalCost: "",
  //       totalReveneue: "",
  //       dividend: "",
  //       avgPrice: "",
  //       sellingPrice: "",
  //       pAndL: "",
  //       returns: "",
  //     },
  //     editMode: false
  //   }));
  // }
  console.log(state);
  return (
    <>
      <Header />
      <div className="responsive">
        <table>
          <tr>
            <th>No.</th>
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
            <th>Return (%)</th>
          </tr>
        </table>
        <table>
          {state.trades.map((trade) => (
          <tr key={trade}>
            <td>{trade.no}</td>
            <td>{trade.symbol}</td>
            <td>{trade.tradeDate}</td>
            <td>{trade.sellingDate}</td>
            <td>{trade.quantity}</td>
            <td>{trade.totalCost}</td>
            <td>{trade.totalRevenue}</td>
            <td>{trade.dividend}</td>
            <td>{trade.avgPrice}</td>
            <td>{trade.sellingPrice}</td>
            <td>{trade.pAndL}</td>
            <td>{trade.return}</td>
            <button onClick={() => handleDelete(trade._id)}>DELETE</button>
            { !state.editMode && <button onClick={() => handleEdit(trade._id)}>EDIT</button> }

          </tr>
          ))}
        </table>
      </div>
      <div className="form-split"> 

        <form className="form1" onSubmit={handleSubmit} >
          <label>No.</label>
          <input type="text" name="no" value={state.newTrade.no} onChange={handleChange} /> <br /> <br />
          <label>Symbol</label>
          <input type="text" name="symbol" value={state.newTrade.symbol} onChange={handleChange}/> <br /> <br />
          <label>Trade Date</label>
          <input type="text" name="tradeDate" value={state.newTrade.tradeDate} onChange={handleChange}/> <br /> <br />
          <label>Selling Date</label>
          <input type="text" name="sellingDate" value={state.newTrade.sellingDate} onChange={handleChange}/> <br /> <br />
          <label>Day(s)</label>
          <input type="text" name="days" value={state.newTrade.days} onChange={handleChange}/> <br /> <br />
          <label>Long/Short</label>
          <input type="text" name="lOrS" value={state.newTrade.lOrS} onChange={handleChange}/> <br /> <br />
          <label>Quantity</label>
          <input type="text" name="quantity" value={state.newTrade.quantity} onChange={handleChange}/> <br /> <br />
        {/* </form>
        <form className="form2" onSubmit={handleSubmit}> */}
          <label>Total Cost</label>
          <input type="text" name="totalCost" value={state.newTrade.totalCost} onChange={handleChange}/> <br /> <br />
          <label>Total Revenue</label>
          <input type="text" name="totalRevenue" value={state.newTrade.totalRevenue} onChange={handleChange}/> <br /> <br />
          <label>Dividend</label>
          <input type="text" name="dividend" value={state.newTrade.dividend} onChange={handleChange}/> <br /> <br />
          <label>Average Price</label>
          <input type="text" name="avgPrice" value={state.newTrade.avgPrice} onChange={handleChange}/> <br /> <br />
          <label>Selling Price</label>
          <input type="text" name="sellingPrice" value={state.newTrade.sellingPrice} onChange={handleChange}/> <br /> <br />
          <label>Profit & Loss</label>
          <input type="text" name="pAndL" value={state.newTrade.pAndL} onChange={handleChange} /> <br /> <br />
          <label>Return (%)</label>
          <input type="text" name="returns" value={state.newTrade.returns} onChange={handleChange}/> <br /> <br />
          <button>ADD TRADE</button>
        </form>
      </div>
      
    </>
  );
}
















            
               

                  
            


     



