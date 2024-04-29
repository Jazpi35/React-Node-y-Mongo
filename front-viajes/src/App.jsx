import React, { useState, useEffect } from 'react';
import './App.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Swal from 'sweetalert2';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';


function App() {
  const [origen, setOrigen] = useState(null);
  const [destino, setDestino] = useState(null);
  const [fecha, setFecha] = useState('');
  const [paises, setPaises] = useState([]);
  const [reservas, setReservas] = useState();

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/paises'
        );

        if (!response.ok) {
          throw new Error('Error al obtener los países');
        }

        const data = await response.json();
        //console.log(data);
        setPaises(data);
        //console.log(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    
    fetchPaises();
  }, []);

  useEffect(() => {
    const obtenerlistadoreservas = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/reservas`
        );

        const data = await response.json();

        if (data) {

          console.log(data);
          setReservas(data);
        } else {
          console.error("La respuesta del servidor no tiene la estructura esperada.");
        }
      } catch (error) {
        console.error("Error al obtener las reservas: ", error);
      }
    };
    obtenerlistadoreservas();
  }, []);

  


  const handleChangeOrigen = (value) => {
    setOrigen(value);
  };

  const handleChangeDestino = (value) => {
    setDestino(value);
  };

  const handleChangeFecha = (event) => {
    setFecha(event.target.value);
  };

  const crearReserva = async (event) => {
    event.preventDefault();

    console.log(origen, destino, fecha);

    try {
      const response = await fetch(
        'http://localhost:8080/api/reservas',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            origen,
            destino,
            fecha
          }),
        });

        if (!response.ok) {
          if (response.status === 400) {
            Swal.fire({
              title: "Ya existe una reserva con esta fecha",
              text: "Por favor seleccione otra fecha!",
              icon: "info"
            });
          }
          throw new Error('Error al enviar datos');
        }

      Swal.fire({
        title: "Reserva Creada Exitosamente!",
        text: "Gracias por reservar!",
        icon: "success"
      });

      setOrigen("");
      setDestino("");
      setFecha("");

      obtenerlistadoreservas();

    } catch (error) {
      console.error('Error:', error.message);
      //console.log('reserva existente');

    }

  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toISOString().split('T')[0]; // Formato: AAAA-MM-DD
  };

  return (
    <>

      <div className="card">
        <h3>Prepara tu Viaje</h3>

        <Autocomplete
          id="origen-autocomplete"
          options={paises}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setOrigen(newValue)} // Aquí actualizamos el estado "origen" con la opción seleccionada
          value={origen} // Aquí establecemos el valor seleccionado del componente
          renderInput={(params) => <TextField {...params} label="Origen" variant="outlined" />}
        />

        <Autocomplete
          id="destino-autocomplete"
          options={paises}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setDestino(newValue)} // Aquí actualizamos el estado "origen" con la opción seleccionada
          value={destino} // Aquí establecemos el valor seleccionado del componente
          renderInput={(params) => <TextField {...params} label="Destino" variant="outlined" />}
        />

        <TextField
          id="date"
          label="Fecha de viaje"
          type="date"
          value={fecha} // Mantén solo la prop `value`
          onChange={handleChangeFecha}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <div>
          <Button variant="contained" color="primary" onClick={crearReserva}>
            Crear viaje
          </Button>
        </div>
      </div>

      <br />


      <div className="cardTabla">

        <h3>Listado de Viajes</h3>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ORIGEN</TableCell>
              <TableCell>DESTINO</TableCell>
              <TableCell>FECHA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservas && reservas.map(({ _id, origen, destino, fecha }) => (
              <TableRow key={_id}>
                <TableCell>{origen.nombre}</TableCell>
                <TableCell>{destino.nombre}</TableCell>
                <TableCell>{formatFecha(fecha)}</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default App;