import { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  function itemAddHandle(item) {
    setItems((i) => [...i, item]);
  }

  function itemDeleteHandle(id) {
    setItems((i) => i.filter((item) => item.id !== id));
  }

  function itemToggleHandle(id){
    setItems(i=> i.map(item=> item.id===id? {...item, packed: !item.packed}: item));
  }

  return (
    <>
      <Logo />
      <Form itemAdd={itemAddHandle} />
      <PackingList items={items} itemDelete={itemDeleteHandle} itemToggle={itemToggleHandle}/>
      <Stats/>
    </>
  );
}

function Logo() {
  return <h1>🧳 Far Away 🌴</h1>;
}

function Form({itemAdd}) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    let items = { id: Date.now(), name, quantity, packed: false };
    //* Send the item to the parent
    itemAdd(items);

    //* Return to default states
    setName('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for the trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item.."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" value="ADD" />
    </form>
  );
}

function PackingList({items , itemDelete, itemToggle}) {
  return (
    <div className="packingList">
      <ul className="list">
        {items.map((item) => (
          <Item item={item} itemDelete={itemDelete} itemToggle={itemToggle} key={item.id} />
        ))}
      </ul>
      <div className="btns">
        <select>
          <option></option>
          <option></option>
          <option></option>
        </select>
        <button>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, itemDelete, itemToggle }) {

  return (
      <li>
        <input type="checkbox" value={item.packed} onChange={()=> itemToggle(item.id)}/>
        <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
          {item.quantity} {item.name}{' '}
          <button onClick={()=>itemDelete(item.id)}>❌</button>
        </span>
      </li>
    );
}

function Stats() {
  return (
    <footer>
      <p>You have X items on your list, you have packed X (X%)</p>
    </footer>
  );
}

export default App;
