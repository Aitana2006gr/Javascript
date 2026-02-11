<?php
//Clase para conectarse y autentificar.
/*Los usuarios LDAP admins y editores no se registran en la web, no se guardan contraseñas, el login se hace en formulario que va al LDAP, verifica si esta correcto en la base de datos*/
/*Los usuarios clientes de web si se registran en la web, no existen en LDAP, contraseña password_has, el login es en formulario, se mete en bd y se hace el password verify*/
/*Nota: se podrá desde la web interna, de forma muy limitada, crear un admin o editor. 
*/
/*“La base de datos es la fuente principal de usuarios.
LDAP se utiliza exclusivamente como sistema de autorización
para roles elevados, nunca como registro público.”
*/
//En esta clase no se crean usuarios LDAP, solo se autentica y se obtiene los grupos, y se tiene en cuenta los privilegios
namespace Modelos;

use Exception;
use PDO;

require_once "Conexion.php";

class LdapAutentificador
{
    //Configuración LDAP
    private $conexionLDAP;
    //private $host = "ldap://192.168.1.100"; //Modificar la IP según la MV que se utilice
    private $host = "ldap://ldap";
    private $port = 389; //Puerto estándar LDAP
    //private $base_dn = "dc=tu_dominio,dc=local"; //DN base del árbol LDAP, debe coincidir con el servidor
    private $base_dn = "dc=eljardindelasmariposas,dc=com";
    private $ou_users = "ou=people"; //Unidad organizativa donde están los usuarios
    private $ou_groups = "ou=groups"; //Unidad organizativa donde están los grupos

    private $db; //Conexión a la base de datos

    //Constructor para crear el objeto
    public function __construct()
    {
        //Conexión con el servidor LDAP
        $this->conexionLDAP = ldap_connect($this->host, $this->port);

        if (!$this->conexionLDAP) {
            throw new Exception("Error de conexión: No se pudo conectar con el servidor LDAP");
        }

        //Establece las opciones necesarias para que LDAP funcione correctamente
        ldap_set_option($this->conexionLDAP, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($this->conexionLDAP, LDAP_OPT_REFERRALS, 0);

        //Conexión a la BD usando la clase Conexion
        $conexionBD = new Conexion();
        $this->db = $conexionBD->crearConexion();
    }


    //Verifica si el usuario existe en LDAP y obtiene sus grupos
    public function verificarPrivilegiosLDAP($usuario, $contrasena)
    {
        $dn = "uid=$usuario," . $this->ou_users . "," . $this->base_dn;

        if (!@ldap_bind($this->conexionLDAP, $dn, $contrasena)) {
            return null; // No existe en LDAP o credenciales incorrectas
        }

        return $this->obtenerGrupos($usuario);
    }

    //Obtiene los grupos LDAP del usuario
    private function obtenerGrupos($usuario)
    {
        $filtro = "(memberUid=$usuario)";
        $base = $this->ou_groups . "," . $this->base_dn;

        $search = ldap_search($this->conexionLDAP, $base, $filtro);

        if (!$search) return [];

        $entries = ldap_get_entries($this->conexionLDAP, $search);
        $grupos = [];

        for ($i = 0; $i < $entries["count"]; $i++) {
            $grupos[] = strtolower($entries[$i]["cn"][0]);
        }

        return $grupos;
    }

    //Traduce grupos LDAP a rol de la aplicación
    public function obtenerRolDesdeLDAP(array $grupos)
    {
        $rol = "CLIENTE";

        if (in_array("admins", $grupos)) {
            $rol = "ADMIN";
        } elseif (in_array("empleados", $grupos)) {
            $rol = "EDITOR";
        }

        $stmt = $this->db->prepare("SELECT id_rol FROM rol WHERE nombre_rol = ?");
        $stmt->execute([$rol]);

        return $stmt->fetchColumn();
    }

    //Obtiene datos del usuario desde LDAP
    public function obtenerDatosUsuarioLDAP($usuario)
    {
        $filtro = "(uid=$usuario)";
        $base = $this->ou_users . "," . $this->base_dn;

        $search = ldap_search($this->conexionLDAP, $base, $filtro);

        if (!$search) {
            return null;
        }

        $entries = ldap_get_entries($this->conexionLDAP, $search);

        if ($entries["count"] === 0) {
            return null;
        }
        /*En el LDAP(inetOrgPerson): cn es el nombre, sn apellidos, y mail el email*/ 
        return [
            "nombre"    => $entries[0]["cn"][0] ?? null,
            "apellidos" => $entries[0]["sn"][0] ?? null,
            "email"     => $entries[0]["mail"][0] ?? null
        ];
    }

    
    public function cerrarConexion()
    {
        if ($this->conexionLDAP) {
            ldap_close($this->conexionLDAP);
        }
    }
}
