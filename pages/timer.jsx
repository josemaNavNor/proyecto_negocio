import {useEffect, useState } from "react";

export default function timer() {

    const [contador, setContador] = useState(0);
    const [estrellas, setEstrella] = useState(1);
    const [calculo, setCalculo] = useState(0);

    useEffect(() => {
        setTimeout(() => {
           setContador((prevContador) => prevContador + 1); 
        }, 1000);
    });

    useEffect (
        () => {
            if(contador == 10){ alert("Contador paso 10...") };
        }, [contador]
    );

    useEffect(() => {
        setCalculo(() => estrellas * 2);
    },[estrellas])

    return (
        <div>
            <p>Contador: {contador}</p>
            <p>Estrellas: {estrellas}</p>
            <p>Estrellasx2: {calculo}</p>
            <button onClick={() => setEstrella((prevEstrellas) => prevEstrellas + 1)}>Incrementar estrellas</button>
        </div>
    )
}
