<?php

// Para que el navegador no haga cache (fecha de expiración menor a la actual)
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
	
// Indicamos  al navegador que va a recibir contenido XML
	header("Content-Type: text/xml"); 
        
	
// Utilizar el fichero superheroes.sql incluído en la carpeta bd para crear 
// la base de datos, usuario y tabla en tu servidor MySQL.
// Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
// Configuración BASE DE DATOS MYSQL
	$servidor = "localhost";
	$basedatos = "dwec_superheroes";
	$usuario = "gestor";	
	$password = "secreto";
        
//	 Si la no se reciben parámetros se hará una consulta de todos los superheroes.
//	 
//	 Si se define uno o varios de los parámetros (a excepción de código) se 
//	 realizará una consulta de todos los superheroes que cumplan las características indicadas.
//	 
//	 La estructura del XML generado:
//			<superheroes>
//				<personaje>
//					<codigo>1025</codigo>
//					<superheroe>Mujer Pez</superheroe>
//					<identidad_secreta>Elena Pacheco Cuesta</identidad_secreta>
//					<super_poder>Oído Absurdo</super_poder>
//					<alineacion>Heroe</alineacion>
//					<fecha_aparicion>2011-01-05</fecha_aparicion>
//					<victorias>10</victorias>
//					<derrotas>1</derrotas>
//				</personaje>
//				<personaje>
//					<codigo>1083</codigo>
//					<superheroe>Mujer Roca</superheroe>
//					<identidad_secreta>Cristina Jar Pacheco</identidad_secreta>
//					<super_poder>Ritmo Tántrico</super_poder>
//					<alineacion>Villano</alineacion>
//					<fecha_aparicion>2009-10-14</fecha_aparicion>
//					<victorias>10</victorias>
//					<derrotas>19</derrotas>
//				</personaje>
//			</superheroes>
//                
//	  Si No existe ningún superheroe que cumpla las características indicadas se devolverá:
//			<superheroes>
//			</superheroes>


        $ficheroxml="<?xml version=\"1.0\" encoding=\"utf-8\"?>\t";     // Inicio del archivo XML respuesta de la consulta
        $ficheroxml.="<superheroes>";       							// Inicio de la estructura del archivo XML
	
        $sql="select * from superheroes";   // Consulta básica SQL con todos los superheroes
        
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
            // Para cada fila recibida generaremos un elemento "alumno" en el documento XML con todos sus datos.
            foreach($conexion->query($sql) as $fila)
            {  
                $ficheroxml.="<personaje>";
                $ficheroxml.="<codigo>".$fila["codigo"]."</codigo>";
                $ficheroxml.="<superheroe>".$fila["superheroe"]."</superheroe>";
                $ficheroxml.="<identidad_secreta>".$fila["identidad_secreta"]."</identidad_secreta>";
                $ficheroxml.="<super_poder>".$fila["super_poder"]."</super_poder>";
                $ficheroxml.="<alineacion>".$fila["alineacion"]."</alineacion>";
                $ficheroxml.="<fecha_aparicion>".$fila["fecha_aparicion"]."</fecha_aparicion>";
				$ficheroxml.="<victorias>".$fila["victorias"]."</victorias>";
				$ficheroxml.="<derrotas>".$fila["derrotas"]."</derrotas>";
                $ficheroxml.="</personaje>";       
            }
        } 
        catch (Exception $ex) 
        {
            throw new Exception("No se ha podido recuperar la lista: "+$ex);
        }
        finally{
                $conexion=null;        
        }
        
        $ficheroxml.="</superheroes>";
        echo $ficheroxml;
?>