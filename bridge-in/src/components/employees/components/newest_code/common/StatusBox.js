import React from 'react'

export default function Alert(props){



// }

//   {
// //  className,
// //  show,
// //  onHide,
//   variant='danger',
//   status,
//   children
// })

 // function colorStatus(status){
  //   const base = "badge rounded-pill text-bg-"
  //   if(status === "Hired"){
  //     return base + "success"
  //   }
  //   else if(status === "Onboarding"){
  //     return base + "warning"
  //   }
  //   else if(status === "Employed"){
  //     return base + "primary"
  //   }
  //   else if(status === "Offboarding"){
  //     return base + "orange"
  //   }
  //   else if(status === "Terminated"){
  //     return base+"secondary"
  //   }
  //   else{
  //     return base+"dark"

  //   };
  // };


 // {/* {"badge rounded-pill text-bg-danger" + variant} */}
// {
  return (
    <>
      {
        <span className=
          {props.colorStatus(props.status)}
        >
          {props.children}
        </span>
      }
    </>

  )
}

