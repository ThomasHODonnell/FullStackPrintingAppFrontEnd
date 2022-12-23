import React from 'react' //convension with REACT
const url = 'http://localhost:3001/api'


function App() {

// useState is the constant stream of data
//saved in current
//usecurrent is whenever want to use post operation or do something with it
//[] is default empty array of current
const [current, setCurrent] = React.useState(''); 
const [next, setNext] = React.useState([]); 



//async statement means there isnt an immediate return of a value from function
//move on and do other stuff rather than leaving cursor here in waiting function
const call = async () => {  
  const res = await fetch(url); //await pairs with async, await waits for promise (data to return)
  const fin = await res.json(); //fetch is js command for calling path (file system, http path etc)
  setCurrent(fin); //fetch will eventually return, landing in 'res'
}//then fin is that data in json form so we can do something with it 
//usecurrent(fin) repopulates current

  React.useEffect(() => { //
    call(); 
  }, []);

  console.log(current); 

  const handleSubmit = async () => {
    const obj = {
      name: current
    };
    const obj2 = {
      method: "POST", 
      body: JSON.stringify(obj), 
      headers: {"Content-type": "application/json"},
    }
    console.log("sending", obj2)
    const res = await fetch("http://localhost:3001/api", obj2)
    const fin = await res.json()
    console.log('fin', fin)
    const arr = [...next, fin]
    console.log('arr', arr)
    setNext(arr)
  }

  const handleChange = (e) => {
    setCurrent(e.target.value)
  }

  return (
    <div className="App">
      <input onChange={(e) => handleChange(e)}></input>
      <button onClick={handleSubmit}>submit</button>
      <div>
      {next.map((p, i) => (<div key = {i} value={p}>{p}</div>))}
      </div>
    </div>
  );
}

export default App;
