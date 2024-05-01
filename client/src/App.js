import './App.css';

import { useEffect, useState } from 'react';
import axios from "axios";
import Formtable from './components/Formtable';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [formData , setFormData] = useState({
    fullname : "",
    message : "",
  });
  const [dataList, setDataList] = useState([])

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => {
      return {...prev, [name] : value}
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData)
    console.log(data);
    if(data.data.success){
      setAddSection(false);
      alert(data.data.message)
      getFetchData()
      setFormData({
        fullname : "", 
        message : ""
      })
    }
  }
  const getFetchData = async() => {
    const data = await axios.get("/");
    console.log(data);
    if(data.data.success){
      setDataList(data.data.data.map((item) => {
        return{
        ...item,
        createdAt : new Date(item.createdAt).toUTCString()
        }
      }))
    }
  }
  useEffect(() => {
    getFetchData()
  }, [])

  console.log(dataList)


  return (
    <>
      <div className = "container">
        <button className = "btn btn-add" onClick={() => setAddSection(true)}>Please leave your opinion about the museum by clicking here.</button>

        {
          addSection && (
            <Formtable
             handleSubmit = {handleSubmit}
             handleOnChange = {handleOnChange}
             handleclose = {() => setAddSection(false)}
            />
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              { dataList[0] ? (
                dataList.map((el) => {
                  return (
                    <tr>
                      <td>{el.fullname}</td>
                      <td>{el.message}</td>
                      <td>{el.createdAt}</td>
                    </tr>
                  )
                }))
                : (
                  <p style={{textAlign : "center"}}>No data</p>
                )
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
