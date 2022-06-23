import React, {useState, useEffect} from 'react'
import { Subsidiary } from '../models/Subsidiary';
import SubsidiaryService from "./SubsidiaryService";
import 'bootstrap/dist/css/bootstrap.css'; 
import NewSubsidiary from './NewSubsidiary';
import Flag from 'react-world-flags'; 


export default function SubsidiaryListPage() {

  
  /*const [subsidiaries, setSubsidiaries] = useState([new Subsidiary(1, "Avocado", "America", "421 w Melrose", 15, "incorporating"),
  new Subsidiary(2, "Tomato", "Australia", "1034 N Wells", 6, "incorporated"),
   new Subsidiary(3, "Pepper", "United Kingdom", "136 Broadway", 2, "winding down"),
   new Subsidiary(4, "grape", "Germany", "1400 Harrison", 10, "closed")
]); */
  const [subsidiaries, setSubsidiaries] = useState([]);

  useEffect(() => {
    if(!subsidiaries.length){
      onInitialLoad();
    }
  }, []);


  async function onInitialLoad() {
    const subsidiaries = await SubsidiaryService.fetchSubsidiary(); 
    setSubsidiaries(subsidiaries);
  }

  async function onSubsidiaryCreate(name, country, address, count, status) {
    const subsidiary = await SubsidiaryService.createSubsidiary(new Subsidiary(null, name, country, address, count, status));
    setSubsidiaries([...subsidiaries, subsidiary]);
  }

  console.log(subsidiaries);
    
    return (
      <div className='container mt-5'>
        <NewSubsidiary onSubsidiaryCreate = {onSubsidiaryCreate}></NewSubsidiary>
        <table className="table table-hover text-center">
          <thead >
            <tr>
              <th>Company Name</th>
              <th>Country</th>
              <th>Address</th>
              <th>Employees</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className = "align-middle">
            {
            subsidiaries.map((sub)=> 
             <tr key={sub.id}>
              <td>{sub.name}</td>
              <td><Flag code={sub.country} width="40"/></td>
              <td>{sub.address}</td>
              <td>{sub.count}</td>
              <td>
              <div className= {"d-inline-flex justify-content-center rounded text-center container bg-" + sub.color} >
                {sub.status}
              	</div> 
                </td>              
            </tr>
             )} 
          </tbody>
        </table> 
      </div> 
      ) 
}