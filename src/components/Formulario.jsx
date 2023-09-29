import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  useEffect(() => {
      if(Object.keys(paciente)){ // -->> Para saber cuando el objeto tenga algo
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
      }
  }, [paciente])

  useEffect ( ()=> {

  }, [])

  //Vamos a generar un número random + fecha para que sea un número aleatorio
  //Dificil de coincidir con el fin que sea diferente para cada usuario.
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay al menos un campo vacio')

      setError(true);
      return;

    }

    //Construir Objeto de paciente
    //Se ve que el objeto no lleva clave porque la variable clave se llama igual a la llave
    const ObjetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //Editando Registro
      // objetoPaciente será la versión actualizada y paciente será la información que tengo en el momento de oprimir editar
      ObjetoPaciente.id = paciente.id
                                                    //lo que esta en el State y no en el actualizado
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === 
        paciente.id ? ObjetoPaciente : pacienteState )
      //Con el iterador anterior lo que hace es mirar los que tienen el id igual para decir que se va a editar

      setPacientes(pacientesActualizados)
      setPaciente({}) // Cuando actualizamos el arreglo con la edición que se hizo, se queda
                      // la información en otro arreglo entonces para reiniciarlo o hacemos
                      // de esa manera

    }else{
      //Nuevo Registro
      ObjetoPaciente.id = generarId() // Agreamos el numero generado aleatorio para ser un nuevo valor en el objeto
                    // Manera inmutable para generar un nuevo arreglo sin necesidad de reescribir el anterior
      setPacientes([...pacientes, ObjetoPaciente]);


    }

    //Reiniciar formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento 
      Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
          Añade pacientes y {""} 
          <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && <Error><p>Todos los campos son obligatorios</p></Error> }
          <div className="mb-5">
              <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                  NOMBRE MASCOTA
              </label> 

              <input
                id="mascota"
                type="text"
                placeholder="Nombre Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={ (e)=> setNombre(e.target.value) }
              />{/** w-full para que tome todo el ancho del contenedor */}

              
          </div>
          <div className="mb-5">
              <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                  NOMBRE PROPIETARIO
              </label> 

              <input
                id="propietaro"
                type="text"
                placeholder="Nombre del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={ (e)=> setPropietario(e.target.value) }
              />{/** w-full para que tome todo el ancho del contenedor */}

              
          </div>

          <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                  Email
              </label> 

              <input
                id="email"
                type="email"
                placeholder="Email Contacto Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={ (e)=> setEmail(e.target.value) }
              />{/** w-full para que tome todo el ancho del contenedor */}

              
          </div>


          <div className="mb-5">
              <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                  Fecha
              </label> 

              <input
                id="alta"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={ (e)=> setFecha(e.target.value) }
              />{/** w-full para que tome todo el ancho del contenedor */}

              
          </div>

          <div className="mb-5">
              <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                  SINTOMAS
              </label> 

              <textarea
                  id="sintomas"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  placeholder="Describe los sintomas"
                  value={sintomas}
                  onChange={ (e)=> setSintomas(e.target.value) }
              />

              
          </div>

          <input
              type="submit"
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
              hover:bg-indigo-700 cursor-pointer transition-colors"
              value={ paciente.id ? 'Editar paciente' : 'Agregar paciente' }
          />
          
      </form>
    </div>
  )
}

export default Formulario
