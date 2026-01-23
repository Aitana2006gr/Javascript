<?php

// Para que el navegador no haga cache (fecha de expiración menor a la actual)
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
	
// Indicamos  al navegador que va a recibir contenido XML
	header("Content-Type: text/xml"); 
        
	
// Utilizar el fichero alumnos.sql incluído en la carpeta bd para crear 
// la base de datos, usuario y tabla en tu servidor MySQL.
// Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
// Configuración BASE DE DATOS MYSQL
	$servidor = "localhost";
	$basedatos = "dwec_alumnos";
	$usuario = "dwec_alumnos";	
	$password = "dwec_alumnos";
        
//	 Si la no se reciben parámetros se hará una consulta de todos los alumnos.
//	 
//	 Si se define uno o varios de los parámetros (a excepción de código) se 
//	 realizará una consulta de todos los alumnos que cumplan las características indicadas.
//	 
//	 La estructura del XML generadio
//                <alumnos>
//                    <alumno>
//                        <codigo>1018</codigo>
//                        <apellidos>Mínguez Guitierrez</apellidos>
//                        <nombre>Iván</nombre>
//                        <fecha_nacimiento>2003-06-01</fecha_nacimiento>
//                        <curso>DAM2</curso>
//                        <nota_media>7</nota_media>
//                    </alumno>
//                    <alumno>
//                        <codigo>1020</codigo>
//                        <apellidos>Pérez Oporto</apellidos>
//                        <nombre>Lucía</nombre>
//                        <fecha_nacimiento>2003-04-10</fecha_nacimiento>
//                        <curso>DAM2</curso>
//                        <nota_media>7</nota_media>
//                    </alumno>
//                </alumnos>
//	  Si No existe ningún alumno que cumpla las características indicadas se devolverá:
//	  	 <alumnos>
//	         </alumnos>  

        $ficheroxml="<?xml version=\"1.0\" encoding=\"utf-8\"?>\t";     // Inicio del archivo XML respuesta de la consulta
        $ficheroxml.="<alumnos>";       // Inicio de la estructura del archivo XML
	
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
            // Para cada fila recibida generaremos un elemento "alumno" en el documento XML con todos sus datos.
            foreach($conexion->query($sql) as $fila)
            {  
                $ficheroxml.="<alumno>";
                    $ficheroxml.="<codigo>".$fila["codigo"]."</codigo>";
                    $ficheroxml.="<apellidos>".$fila["apellidos"]."</apellidos>";
                    $ficheroxml.="<nombre>".$fila["nombre"]."</nombre>";
                    $ficheroxml.="<fecha_nacimiento>".$fila["fecha_nacimiento"]."</fecha_nacimiento>";
                    $ficheroxml.="<curso>".$fila["curso"]."</curso>";
                    $ficheroxml.="<nota_media>".$fila["nota_media"]."</nota_media>";
                $ficheroxml.="</alumno>";       
            }
        } 
        catch (Exception $ex) 
        {
            throw new Exception("No se ha podido recuperar la lista: "+$ex);
        }
        finally{
                $conexion=null;        
        }
        
        $ficheroxml.="</alumnos>";
        echo $ficheroxml;
?>