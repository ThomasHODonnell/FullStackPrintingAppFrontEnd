import React from 'react' //convension with REACT
const url = 'http://localhost:3001/api'


function App() {
  // current - we track the the user's input
  // next - a list of the user's previously saved inputs
  const [current, setCurrent] = React.useState(''); 
  const [next, setNext] = React.useState([]); 

  // the initial api call gathers up previously saved data
  const call = async () => {  
    const res = await fetch(url); // awaits response
    const fin = await res.json(); // translates respose
    setCurrent(fin); // add as user's current input
  }

  // empty array is only called once on load
  React.useEffect(() => {
    call(); 
  }, []);

  // on button click, we save new data via post request
  const handleSubmit = async () => {
    const obj = {
      name: current
    };
    const obj2 = {
      method: "POST", 
      body: JSON.stringify(obj), 
      headers: {"Content-type": "application/json"},
    }
    const res = await fetch("http://localhost:3001/api", obj2)
    const fin = await res.json();
    const arr = [...next, fin];
    // we add the new input into the array
    setNext(arr);
  }

  const handleChange = (e) => {
    setCurrent(e.target.value)
  }

  return (
    <div className="App">
      <input onChange={(e) => handleChange(e)}></input>
      <button onClick={handleSubmit}>submit</button>
      {/* All the items in our array are listed here */}
      <div>
      {next.map((p, i) => (<div key = {i} value={p}>{p}</div>))}
      </div>
    </div>
  );
}

export default App;
