import React, {useState, useEffect} from 'react'
import { Subsidiary } from '../models/Subsidiary';
import 'bootstrap/dist/css/bootstrap.css'; 


export default function SubsidiaryListPage(props) {

  
  const [subsidiaries, setSubsidiaries] = useState([new Subsidiary(1, "Avocado", "America", "421 w Melrose", 15, "incorporating"),
  new Subsidiary(2, "Tomato", "Australia", "1034 N Wells", 6, "incorporated"),
   new Subsidiary(3, "Pepper", "United Kingdom", "136 Broadway", 2, "winding down"),
   new Subsidiary(4, "grape", "Germany", "1400 Harrison", 10, "closed")
]); 

  


  console.log(subsidiaries);
    
    return (
      <div className='container mt-5'>
        <table className="table table-hover">
          <thead >
            <tr>
              <th>Company Name</th>
              <th>Country</th>
              <th>Address</th>
              <th>Employees</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/*props.*/subsidiaries.map((sub) => 
            <tr key={sub.id}>
              <th>{sub.name}</th>
              <td>{sub.country}</td>
              <td>{sub.address}</td>
              <td>{sub.count}</td>
              <td>
              <div className= {"d-inline-flex justify-content-center rounded text-center container bg-" + sub.color} >
                {sub.status}
              	</div> 
                </td>              
            </tr> )} 
          </tbody>
        </table> 
      </div> 
      ) 
}
