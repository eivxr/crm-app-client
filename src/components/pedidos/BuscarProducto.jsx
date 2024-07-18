import React from 'react'

const BuscarProducto = ({change, submit}) => {
  return (
    <form onSubmit={submit}>
    <legend>Busca un Producto y agrega una cantidad</legend>

    <div className="campo">
      <label>Productos:</label>
      <input type="text" placeholder="Nombre Productos" name="productos" onChange={change}/>
    </div>

    <input type="submit" value="Buscar producto"  className='btn-azul btn-block btn'/>
    </form>
  )
}

export default BuscarProducto