<?php

// Para que el navegador no haga cache (fecha de expiración menor a la actual)
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
	
// Indicamos  al navegador que va a recibir contenido JSON
	header("Content-Type: application/json");
        
// Definimos la clase Superheroe con la que trabajaremos en este ejercicio
        class Superheroe{
        public $codigo;
        public $superheroe;
        public $identidad_secreta;
        public $super_poder;
        public $alineacion;
        public $fecha_aparicion;
		public $victorias;
		public $derrotas;
        
        // Creamos un constructor para que sea más cómodo
        function __construct($codigo,$superheroe,$identidad_secreta,$super_poder,$alineacion, $fecha_aparicion, $victorias, $derrotas)
        {
            $this->codigo = $codigo;
            $this->superheroe = $superheroe;
            $this->identidad_secreta = $identidad_secreta;
            $this->super_poder = $super_poder;
            $this->alineacion = $alineacion;
            $this->fecha_aparicion = $fecha_aparicion;
			$this->victorias = $victorias;
			$this->derrotas = $derrotas;
        }
    }
        
// Utilizar el fichero Superheroes.sql incluído en la carpeta bd para crear 
// la base de datos, usuario y tabla en tu servidor MySQL.
// Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
// Configuración BASE DE DATOS MYSQL
	$servidor = "localhost";
	$basedatos = "dwec_superheroes";
	$usuario = "dwec_superheroes";	
	$password = "dwec_superheroes";
        
//	 Si la no se reciben parámetros se hará una consulta de todos los Superheroes.
//	 
//	 Si se define uno o varios de los parámetros (a excepción de código) se 
//	 realizará una consulta de todos los Superheroes que cumplan las características indicadas.
//	 
 
	// Los Superheroes se almacenarán en el array $Superheroes
        $Superheroes = array();
        $sql="select * from superheroes";   // Consulta básica SQL con todos los Superheroes
        
        // Comprobamos si se ha indicado algún parámetro
        if(isset($_GET["superheroe"])||isset($_GET["identidad_secreta"])||isset($_GET["super_poder"])||isset($_GET["alineacion"])||
                isset($_GET["fecha_aparicion"])||isset($_GET["victorias"])||isset($_GET["derrotas"]))
        {
            // Si se ha indicado algún parámetro actualizaremos la consulta SQL
            $sql.= " WHERE ";
            $masDeUna = FALSE;      // masDeUna es una bandera para indicar si se ha añadido algún parámetro previamente y por tanto añadir un AND antes del nuevo elemento que añadamos a la consulta
            if(isset($_GET["superheroe"]))
            {
                $masDeUna = TRUE;
                $sql.= "superheroe LIKE '".$_GET["superheroe"]."'";
            }
            if(isset($_GET["identidad_secreta"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "identidad_secreta LIKE '".$_GET["identidad_secreta"]."'";
                
            }
            if(isset($_GET["super_poder"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "super_poder LIKE '".$_GET["super_poder"]."'";
            }
            if(isset($_GET["alineacion"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "alineacion LIKE '".$_GET["alineacion"]."'";
            }
			if(isset($_GET["fecha_aparicion"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "fecha_aparicion LIKE '".$_GET["fecha_aparicion"]."'";
            }
            if(isset($_GET["victorias"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "victorias LIKE ".$_GET["victorias"];
            }
			if(isset($_GET["derrotas"]))
            {
                if($masDeUna)
                {
                    $sql.= " AND ";
                }
                $masDeUna = TRUE;
                $sql.= "derrotas LIKE ".$_GET["derrotas"];
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
            // Para cada fila recibida generaremos una instancia de Superheroe, le asignaremos sus datos y lo añadiremos al array de salida.
            foreach($conexion->query($sql) as $fila)
            {  
                $superheroe = new Superheroe($fila["codigo"],$fila["superheroe"],$fila["identidad_secreta"],$fila["super_poder"],$fila["alineacion"],$fila["fecha_aparicion"],$fila["victorias"],$fila["derrotas"]);
                array_push($Superheroes, $superheroe);
            }
        } 
        catch (Exception $ex) 
        {
            throw new Exception("No se ha podido recuperar la lista: "+$ex);
        }
        finally{
                $conexion=null;        
        }        
        
        // Devolvemos codificada la colección de Superheroes
        echo json_encode($Superheroes);
?>