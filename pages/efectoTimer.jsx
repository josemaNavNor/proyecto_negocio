// import { useEffect, useState } from "react";

// export default function contador(){
//     const [contador, setContador] = useState(0);
//     const [estrellas, setEstrellas] = useState(0);

//     useEffect( ()=> {
//         setTimeout(()=> {
//             setContador((prevContador) => prevContador + 1);
//         }, 1000);
//     });
//     useEffect(
//         ()=>{
//             if(contador== 10) {alert("contador paso de 10..."+ contador)};
//         },[contador]
//     );    

//     return(
//         <div> 
//            <p> contador: {contador}</p>
//            <p> Estrellas: {estrellas}</p>
//            <button onClick={()=>setEstrellas()= useState(0)}></button>
        
//         </div>
//     )
    
// }