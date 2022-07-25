import styles from "./App.css";
import {useState, useEffect } from 'react';
import Table from "./dataTable/table"
import img from "./assets/icons8-refresh-30.png";

function App() {
  const [selectedClient, setSelectedClient] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  function getUser(){
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => console.log(error));
  }
  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
    loadData(event.target.value);
  }
  function refresh(){
    setSelectedClient("");
    loadData("");
  }
  function loadData(selectedUser) {
    const url = "https://jsonplaceholder.typicode.com/todos";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if(selectedUser){
          const filterData = json.filter(item=> item.userId == selectedUser)
          setData(filterData);
        }else{
          setData(json);
        }
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getUser();
    loadData("");
  }, []);
  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
  }, [data]);


  return (
    <main className={styles.container}>
      <h1>TO Do Table</h1>
      <div class="dropdown">
        <span>
          <select value={selectedClient}
            onChange={handleSelectChange}>
          <option value="" selected="selected">
              select User
            </option>
            {users.map((e) => (
              <option value={e.id}>{e.username}</option>
            ))}
          </select>
        </span>
        <span>
          <img class="refresh" src={img} alt="image is missing" onClick={refresh} />
        </span>
      </div>
      <div className={styles.wrapper}>
      {isLoading ? (
          <p>NO DATA AVAILABLE</p>
        ) :<Table data={data} rowsPerPage={10} />
      }
        
      </div>
    </main>
  );
}


export default App;

