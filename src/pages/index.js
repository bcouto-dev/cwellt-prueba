import React, { useEffect, useState } from "react"; 
import Head from 'next/head';
import { Inter } from "next/font/google";
import FormularioCompra from "@/form/FormularioCompra";


/*We bring the data from the server to be able to use it for the table*/
Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/entradas')
  const json = await res.json()
  return { data: json }
}

export default function Home({data}) {

  const [results, setResults] = useState(data);
  const [resultsNewData, setResultsNewData] = useState("");
  /*We send the info of the form and if everything is fine we refresh the data for the table*/
  const addEntry = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/entradas', {
        method: 'post',
        body: JSON.stringify({resultsNewData, date: new Date().toISOString()})
      });
      if (res.ok) {
        const updatedRes = await fetch('http://localhost:3000/api/entradas');
        const updatedData = await updatedRes.json();
        setResults(updatedData);
      }else {
        console.error('Failed to delete entry');
      }    
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
  
  };
  /*Incomplete, it will take the id or date and send it to the delete*/
  const deleteEntry = async (date) => {
    try {
        const res = await fetch(`http://localhost:3000/api/entradas`, {
          method: 'delete',
          body: JSON.stringify(date)
        });

        if (res.ok) {
            console.log('Entry deleted successfully');
            const updatedRes = await fetch('http://localhost:3000/api/entradas');
            const updatedData = await updatedRes.json();
            setResults(updatedData);
        } else {
            console.error('Failed to delete entry');
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
};
/*It manages the changes of values of our inputs*/
  const onChange = (e) => {
    const { name, value } = e.target;
    setResultsNewData(prevResults => ({
      ...prevResults,
      [name]: value
    }));
  };
/*To refresh the table in each render*/
  useEffect(() => {
    setResults(data);
  },[data])
  
  return (
    <>
    <Head>
      <title>Home</title>
      <link href="https://unpkg.com/tailwindcss@2.1.0/dist/tailwind.min.css" rel="stylesheet" />
    </Head>
    <div className="container mx-auto">

      <div className="flex text-center">
        <div className="w-full m-4">
          <h1 className="text-4xl mt-8">Taquilla de cine. Registro de venta de entradas</h1>
        </div>
      </div>
      <div className="flex mb-4 text-center">
      </div>
      {results && <FormularioCompra data={results} item="Total" onChange={onChange} />}
      <div className="flex text-center">
        <div className="w-full m-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addEntry}>
              Finalizar compra
          </button>
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-8 text-center justify-center flex flex-col	px-16">
          <h2 className="text-2xl font-semibold mb-4">Lista de entradas</h2>
          <table class="border-collapse table-fixed text-sm px-8">
            <thead>
            <tr class="text-left font-medium odd:bg-gray-100">
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Película</th>
                <th>Nº Entradas</th>
              </tr>
            </thead>
            <tbody>
            {results ? results.map((result, index) => (
              <tr key={index} class="text-left odd:bg-blue-100 even:bg-white">
                <td>{result.resultsNewData.name}</td>
                <td>{result.resultsNewData.surname}</td>
                <td>{result.resultsNewData.film}</td>
                <td>{result.resultsNewData.quantity}</td>
                <button className="text-blue-500 pr-4">Editar</button>
                <button className="text-red-500" onClick={() => deleteEntry(result._id)}>Eliminar</button>
              </tr>
            )) : <h3>No hay datos</h3>}
            </tbody>
          </table>
      </div>
    </>
  );
}
