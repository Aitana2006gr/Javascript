<?php
//Esta clase sirve para crear usuarios LDAP desde /admin. Solo la podrán usar los administradores, con cuenta administrativa, no es un login público
namespace Modelos;

use Exception;
//En el panel de administración, solo el admin o el editor, puede crear usuarios en el ldap, y asi elevar los privilegios
class LdapAdminService
{
    private $conn;

    //private $host = "ldap://localhost";//"ldap://192.168.35.212";
    private $host = "ldap://ldap";
    private $port = 389;
    private $base_dn = "dc=eljardindelasmariposas,dc=com";
    private $ou_users = "ou=people";
    private $ou_groups = "ou=groups";

    private $admin_dn = "cn=admin,dc=eljardindelasmariposas,dc=com";
    private $admin_password;

    public function __construct()
    {
        $this->conn = ldap_connect($this->host, $this->port);

        if (!$this->conn) {
            throw new Exception("No se pudo conectar con LDAP");
        }

        ldap_set_option($this->conn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($this->conn, LDAP_OPT_REFERRALS, 0);

        //Nunca se debe guardar password admin en código, por eso se carga desde .env
        $this->admin_password = getenv("LDAP_ADMIN_PASSWORD");

        if (!$this->admin_password) {
            throw new Exception("LDAP_ADMIN_PASSWORD no definida");
        }

        if (!ldap_bind($this->conn, $this->admin_dn, $this->admin_password)) {
            throw new Exception("Credenciales LDAP admin incorrectas");
        }
    }

    private function generarPasswordSSHA($password)
    {
        $salt = random_bytes(4);
        return "{SSHA}" . base64_encode(sha1($password . $salt, true) . $salt);
    }

    public function existeUsuario($uid)
    {
        $filtro = "(uid=$uid)";
        $base = $this->ou_users . "," . $this->base_dn;

        $search = ldap_search($this->conn, $base, $filtro);

        if (!$search) return false;

        $entries = ldap_get_entries($this->conn, $search);
        return $entries["count"] > 0;
    }

    public function crearUsuario($uid, $nombre, $apellidos, $email, $password)
    {
        if ($this->existeUsuario($uid)) {
            throw new Exception("El usuario LDAP ya existe");
        }

        $dn = "uid=$uid," . $this->ou_users . "," . $this->base_dn;

        $entry = [
            "objectClass" => ["inetOrgPerson"],
            "uid" => $uid,
            "cn" => $nombre,
            "sn" => $apellidos,
            "mail" => $email,
            "userPassword" => $this->generarPasswordSSHA($password)
        ];

        if (!ldap_add($this->conn, $dn, $entry)) {
            throw new Exception("No se pudo crear el usuario LDAP");
        }
    }

    public function agregarAGrupo($uid, $grupo)
    {
        $grupoDn = "cn=$grupo," . $this->ou_groups . "," . $this->base_dn;

        if (!@ldap_read($this->conn, $grupoDn, "(cn=$grupo)")) {
            throw new Exception("Grupo LDAP no existe: $grupo");
        }

        @ldap_mod_add($this->conn, $grupoDn, [
            "memberUid" => $uid
        ]);
    }


    public function quitarDeGrupo($uid, $grupo)
    {
        $grupoDn = "cn=$grupo," . $this->ou_groups . "," . $this->base_dn;

        @ldap_mod_del($this->conn, $grupoDn, [
            "memberUid" => $uid
        ]);
    }

    public function eliminarUsuario($uid)
    {
        $dn = "uid=$uid," . $this->ou_users . "," . $this->base_dn;

        if ($this->existeUsuario($uid)) {
            @ldap_delete($this->conn, $dn);
        }
    }

    public function cerrarConexion()
    {
        if ($this->conn) {
            ldap_close($this->conn);
        }
    }

    public function __destruct()
    {
        $this->cerrarConexion();
    }
}
