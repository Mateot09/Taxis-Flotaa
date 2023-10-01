import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface Taxi {
  ID_Taxi: number;
  Modelo: string;
}

interface Conductor {
  ID_Conductor: number;
  Nombre: string;
  ID_Taxi: number;
}

interface Viaje {
  ID_Viaje: number;
  Origen: string;
  Destino: string;
  ID_Conductor: number;
  ID_Pasajero: number;
}

interface Pasajero {
  ID_Pasajero: number;
  Nombre: string;
}

const App: React.FC = () => {


  const [activeTab, setActiveTab] = useState('taxis');
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [pasajeros, setPasajeros] = useState<Pasajero[]>([]);

  useEffect(() => {
    fetchTaxis();
    fetchConductores();
    fetchViajes();
    fetchPasajeros();
  }, []);

  const fetchTaxis = async () => {
    try {
      const response = await axios.get<Taxi[]>('http://localhost:3001/api/taxis');
      setTaxis(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de taxis:', error);
    }
  };

  const fetchConductores = async () => {
    try {
      const response = await axios.get<Conductor[]>('http://localhost:3001/api/conductores');
      setConductores(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de conductores:', error);
    }
  };

  const fetchViajes = async () => {
    try {
      const response = await axios.get<Viaje[]>('http://localhost:3001/api/viajes');
      setViajes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de viajes:', error);
    }
  };

  const fetchPasajeros = async () => {
    try {
      const response = await axios.get<Pasajero[]>('http://localhost:3001/api/pasajeros');
      setPasajeros(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de pasajeros:', error);
    }
  };

  const addTaxi = async (taxi: Taxi) => {

    console.log("TAXIIIII ", taxi) // pero aqui si esta el valor correcto
    try {
      await axios.post('http://localhost:3001/api/hola', taxi);
      fetchTaxis();
    } catch (error) {
      console.error('Error al agregar el nuevo taxi:', error);
    }
  };

  const assignConductor = async (conductor: Conductor) => {
    try {
      await axios.put(`http://localhost:3001/api/conductores/${conductor.ID_Conductor}`, conductor);
      fetchConductores();
    } catch (error) {
      console.error('Error al asignar el conductor:', error);
    }
  };

  const addViaje = async (viaje: Viaje) => {
    try {
      await axios.post('http://localhost:3001/api/viajes', viaje);
      fetchViajes();
    } catch (error) {
      console.error('Error al agregar el nuevo viaje:', error);
    }
  };

  

  return (
<div className="container">
  <h1 className="bg-warning text-white p-3 mt-5">TAXXIS</h1>

  <ul className="nav nav-tabs">
    <li className="nav-item">
      <a className={`nav-link ${activeTab === 'taxis' ? 'active' : ''}`} href="#taxis" onClick={() => setActiveTab('taxis')}>
        Taxis
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${activeTab === 'agregar-taxi' ? 'active' : ''}`} href="#agregar-taxi" onClick={() => setActiveTab('agregar-taxi')}>
        Agregar Nuevo Taxi
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${activeTab === 'conductores' ? 'active' : ''}`} href="#conductores" onClick={() => setActiveTab('conductores')}>
        Conductores
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${activeTab === 'registrar-viaje' ? 'active' : ''}`} href="#registrar-viaje" onClick={() => setActiveTab('registrar-viaje')}>
        Registrar Viaje
      </a>
    </li>
    <li className="nav-item">
      <a className={`nav-link ${activeTab === 'viajes' ? 'active' : ''}`} href="#viajes" onClick={() => setActiveTab('viajes')}>
        Listado de Viajes
      </a>
    </li>
  </ul>
  <div className="tab-content">
    <div className={`tab-pane fade ${activeTab === 'taxis' ? 'show active' : ''}`} id="taxis">
    <div className='mt-5'>
      <h2>Listado de Taxis</h2>
      <table className="table table-hover">
        <thead className="table-warning">
          <tr>
            <th>ID Taxi</th>
            <th>Modelo</th>
          </tr>
        </thead>
        <tbody>
          {taxis.map((taxi) => (
            <tr key={taxi.ID_Taxi}>
              <td>{taxi.ID_Taxi}</td>
              <td>{taxi.Modelo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    <div className={`tab-pane fade ${activeTab === 'agregar-taxi' ? 'show active' : ''}`} id="agregar-taxi">
      <br /><br />
      <h2>Agregar Nuevo Taxi</h2>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const taxi: Taxi = {
            ID_Taxi: 0, // El ID se generará automáticamente en el servidor
            Modelo: e.currentTarget.modelo.value,
          };

          taxi.Modelo = taxi.Modelo
          addTaxi(taxi);
          e.currentTarget.reset();
        }}
      >
        <input type="text" name="modelo" placeholder="Modelo" className='form-control' required />
        <br />
        <button type="submit" className='btn btn-success'>Agregar Taxi</button>
      </form>
    </div>

    <div className={`tab-pane fade ${activeTab === 'conductores' ? 'show active' : ''}`} id="conductores">
      <br />
      <div>
      <h2>Listado de Conductores</h2>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>ID Taxi</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {conductores.map((conductor) => (
            <tr key={conductor.ID_Conductor}>
              <td>{conductor.Nombre}</td>
              <td>{conductor.ID_Taxi}</td>
              <td>
                <button
                  onClick={() => {
                    const newID_Taxi = Number(prompt('Ingrese el nuevo ID del Taxi asignado') || '');
                    if (newID_Taxi) {
                      const updatedConductor = {
                        ...conductor,
                        ID_Taxi: newID_Taxi,
                      };
                      assignConductor(updatedConductor);
                    }
                  }}
                  className="btn btn-primary"
                >
                  Asignar Taxi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    <div className={`tab-pane fade ${activeTab === 'registrar-viaje' ? 'show active' : ''}`} id="registrar-viaje">
      <br />
      <h2>Registrar Viaje</h2>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const viaje: Viaje = {
            ID_Viaje: 0, // El ID se generará automáticamente en el servidor
            Origen: e.currentTarget.origen.value,
            Destino: e.currentTarget.destino.value,
            ID_Conductor: Number(e.currentTarget.conductor.value),
            ID_Pasajero: Number(e.currentTarget.pasajero.value),
          };
          addViaje(viaje);
          e.currentTarget.reset();
        }}
      >
        <input type="text" name="origen" placeholder="Origen" className='form-control mb-3' required />
        <input type="text" name="destino" placeholder="Destino" className='form-control mb-3' required />
        <select name="conductor" className='form-control mb-3' required>
          <option value="">Seleccionar Conductor</option>
          {conductores.map((conductor) => (
            <option key={conductor.ID_Conductor} value={conductor.ID_Conductor}>
              {conductor.Nombre}
            </option>
          ))}
        </select>
        <select name="pasajero" className='form-control mb-3' required>
          <option value="">Seleccionar Pasajero</option>
          {pasajeros.map((pasajero) => (
            <option key={pasajero.ID_Pasajero} value={pasajero.ID_Pasajero}>
              {pasajero.Nombre}
            </option>
          ))}
        </select>
        <button type="submit" className='btn btn-success'>Registrar Viaje</button>
      </form>
    </div>
    
    <div className={`tab-pane fade ${activeTab === 'viajes' ? 'show active' : ''}`} id="viajes">
      <br />
      <div>
  <h2>Listado de Viajes</h2>
  <table className="table table-hover">
    <thead className="table-warning">
      <tr>
        <th>Origen</th>
        <th>Destino</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {viajes.map((viaje) => (
        <tr key={viaje.ID_Viaje}>
          <td>{viaje.Origen}</td>
          <td>{viaje.Destino}</td>
          <td>
            <button onClick={() => (viaje.ID_Viaje)}>Editar</button>
            <button onClick={() => (viaje.ID_Viaje)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  </div>
</div>

  );
};

export default App;
