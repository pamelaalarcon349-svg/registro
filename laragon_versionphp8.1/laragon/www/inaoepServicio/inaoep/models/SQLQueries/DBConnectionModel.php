<?php

namespace models\SQLQueries;

//include '../../src/assets/settings.php';

class DBConnectionModel {

    private $server;
    private $username;
    private $password;
    private $database;
    private $connection;

    /**
     * Constructor
     */
    public function __construct() {
        //$this->server = 'DESKTOP-TVVAI8R\SQLEXPRESS01';
		/*$this->server 	= '192.168.73.173';
        $this->username = 'sga_admin';
        $this->password = '4dm1n@s1sg3a';
        $this->database = 'DbSga';*/
        //$this->server = '192.168.73.34';
        //$this->server 	= 'DESKTOP-TP432F5\MSSQLSERVER2022';
        $this->server ='JOSERZS\SQLEXPRESS';
        $this->username = 'sga';
        $this->password = '123456';
        //$this->database =  'demo_db';
        $this->database = 'DbSga';
    }

    /**
     * Crea la conexion con SQLServer
     * 
     * @return $this
     */
    public function createConnection() {

        $connectionOptions = [
            "Database" => $this->database,
            "CharacterSet" => "UTF-8",
            "Uid" => $this->username,
            "PWD" => $this->password
        ];

        $this->connection = sqlsrv_connect($this->server, $connectionOptions);

        if (!$this->connection) {
            die(print_r(sqlsrv_errors(), true));
        }

        return $this;
    }

    /**
     * 
     * Para hacer queries
     * 
     * @return DBConnection
     */
    public function getConnection() {
        return $this->connection;
    }
}
