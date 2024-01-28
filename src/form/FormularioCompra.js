import React from 'react'

const FormularioCompra = ({item, onChange}) => {
  return(
    <div className="" style={{display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <div className="py-2">
        <label className="block font-medium">Nombre</label>
        <input type="text" name="name" className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" onChange={(e) => onChange(e)}></input>
      </div>
      <div className="py-2">
        <label className="block font-medium">Apellido</label>
        <input type="text" name="surname"  className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" onChange={(e) => onChange(e)}></input>
      </div>
      <div className="py-2">
        <label className="block font-medium">Película</label>
        <input type="text" name="film"  className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" onChange={(e) => onChange(e)}></input>
      </div>
      <div className="py-2">
        <label className="block font-medium">Cantidad de entradas</label>
        <input type="number" name="quantity"  className="bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" onChange={(e) => onChange(e)}></input>
      </div>
    </div>
  )
}

export default FormularioCompra