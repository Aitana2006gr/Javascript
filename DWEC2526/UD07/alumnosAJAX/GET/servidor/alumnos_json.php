<?php

// Para que el navegador no haga cache (fecha de expiración menor a la actual)
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
	
// Indicamos  al navegador que va a recibir contenido JSON
	header("Content-Type: application/json");
        
// Definimos la clase Alumno con la que trabajaremos en este ejercicio
        class Alumno{
            public $codigo;
            public $apellidos;
            public $nombre;
            public $fecha_nacimiento;
            public $curso;
            public $nota_media;
        
        // Creamos un constructor para que sea más cómodo
        function __construct($codigo,$apellidos,$nombre,$fecha_nacimiento,$curso, $nota_media)
        {
            $this->codigo = $codigo;
            $this->apellidos = $apellidos;
            $this->nombre = $nombre;
            $this->fecha_nacimiento = $fecha_nacimiento;
            $this->curso = $curso;
            $this->nota_media = $nota_media;
        }
    }
        
// Utilizar el fichero alumnos.sql incluído en la carpeta bd para crear 
// la base de datos, usuario y tabla en tu servidor MySQL.
// Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
// Configuración BASE DE DATOS MYSQL
	$servidor = "localhost";
	$basedatos = "dwec_alumnos";
	$usuario = "gestor";	
	$password = "secreto";
        
//	 Si la no se reciben parámetros se hará una consulta de todos los alumnos.
//	 
//	 Si se define uno o varios de los parámetros (a excepción de código) se 
//	 realizará una consulta de todos los alumnos que cumplan las características indicadas.
//	 
 
	// Los alumnos se almacenarán en el array $alumnos
        $alumnos = array();
        $sql="select * from alumnos";   // Consulta básica SQL con todos los alumnos
        
        // Comprobamos si se ha indicado algún parámetro
        if(isset($_GET["apellidos"])||isset($_GET["nombre"])||isset($_GET["fecha_nacimiento"])||isset($_GET["curso"])||
                isset($_GET["nota_media"]))
        {
            // Si se ha indicado algún parámetro actualizaremos la consulta SQL
            $sql.= " WHERE ";
            $masDeUna = FALSE;      // masDeUna es una bandera para indicar si se ha añadido algún parámetro previamente y por tanto añadir un AND antes del nuevo elemento que añadamos a la consulta
            if(isset($_GET["apellidos"]))
            {
                $masDeUna = TRUE;
                $sql.= "apellidos LIKE '".$_GET["apellidos"]."'";
            }
            if(isset($_GET["nombre"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "nombre LIKE '".$_GET["nombre"]."'";
                
            }
            if(isset($_GET["fecha_nacimiento"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "fecha_nacimiento LIKE '".$_GET["fecha_nacimiento"]."'";
            }
            if(isset($_GET["curso"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "curso LIKE '".$_GET["curso"]."'";
            }
            if(isset($_GET["nota_media"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "nota_media LIKE ".$_GET["nota_media"];
            }
        }
        
        try
        {
            $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
            $conexion = new PDO('mysql:host='.$servidor.';dbname='.$basedatos,$usuario,$password, $opciones);

            //Configura el nivel de error
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $p){
            echo "<p>Error al conectar ".$p->getMessage()."</p>";
            exit();
        }

        try
        {
            // Para cada fila recibida generaremos una instancia de Alumno, le asignaremos sus datos y lo añadiremos al array de salida.
            foreach($conexion->query($sql) as $fila)
            {  
                $alumno = new Alumno($fila["codigo"],$fila["apellidos"],$fila["nombre"],$fila["fecha_nacimiento"],$fila["curso"],$fila["nota_media"]);
                array_push($alumnos, $alumno);
            }
        } 
        catch (Exception $ex) 
        {
            throw new Exception("No se ha podido recuperar la lista: "+$ex);
        }
        finally{
                $conexion=null;        
        }        
        
        // Devolvemos codificada la colección de alumnos
        echo json_encode($alumnos);
?>