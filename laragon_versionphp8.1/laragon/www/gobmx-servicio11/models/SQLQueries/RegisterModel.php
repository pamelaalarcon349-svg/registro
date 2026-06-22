<?php

namespace models\SQLQueries;

include 'DBConnectionModel.php';

use models\SQLQueries\DBConnectionModel;

class RequestModel {


    /**
     * Construct
     */
    public function __construct() {
    }

    /**
     * @param string $name
     * @param string $last_name
     * @param string $email
     * @param string $curp
     * @param string|null $second_last_name
     * 
     * @return $this
     */
    function InsertData(string $name, string $last_name, string $email, string $curp, string $second_last_name = null) {
        try {


            $dbc = new DBConnectionModel();
            $dbc->createConnection();
            $conn = $dbc->getConnection();

            $tsql = "INSERT dbo.request (name, last_name, second_last_name, email, curp) OUTPUT"
                . " INSERTED.id VALUES ('" . $name . "', '" . $last_name . "', '" . $second_last_name . "', '" . $email . "', '" . $curp . "')";
            //Insert query
            $insertReview = sqlsrv_query($conn, $tsql);
            if ($insertReview == FALSE) {
                $status = false;
                $data = ['errors'=>sqlsrv_errors()];
                die(print_r(compact('status', 'data')));
            }

            $id = null;
            while ($row = sqlsrv_fetch_array($insertReview, SQLSRV_FETCH_ASSOC)) {
                $id = ($row['id']);
            }
            sqlsrv_free_stmt($insertReview);
            sqlsrv_close($conn);

            $status = true;
            $data = ['id' => $id];

            return compact('status', 'data');

        } catch (Exception $e) {

            $status = false;
            $data = 'Error';

            return compact('status', 'data');
        }
    }

    public function insertRegister(array $data){
        try {

            $dbc = new DBConnectionModel();
            $dbc->createConnection();
            $conn = $dbc->getConnection();

            $tsql = "INSERT dbo.requests (
            CURP, Nombres, Paterno, Materno, Sexo, FechaNacimiento,LugarNacimiento, Lada, TelFijo, TelMovil, Email, FechaRegistro, Nacionalidad,
            LadaEmergencia,TelFijoEmergencia,ExtensionEmergencia,TelMovilEmergencia,Parentesco,AnioIngreso,PeriodoIngreso,Posgrado,InstitucionAnterior,
            GradoAnterior,AnioGradoAnterior,Promedio,Titulacion,formaEval,tipoPosgrado,otraTitulacion,CP,Estado,Municipio,Localidad,Colonia,TipoCalle,Calle,
            NumExterior,NumInterior,Pais,NombreEmpresa,TipoExperiencia,PuestoFunciones,TiempoLaborado,Escrito,Oral,Lectura,Auditivo,RazonInteres,Medio,Titulo,
            Descripcion,Extension
            ) OUTPUT"
                . " INSERTED.IDgenerales VALUES ('" . $data['CURP'] . "', '" . $data['Nombres'] . "', '" . $data['Paterno'] . "', '" . $data['Materno'] . "'
                , '" . $data['Sexo'] . "', '" . $data['FechaNacimiento'] . "', '" . $data['LugarNacimiento'] . "', '" . $data['Lada'] . "', '" . $data['TelFijo'] . "', '" . $data['TelMovil'] . "', '" . $data['Email'] . "'
                , '" . $data['FechaRegistro'] . "', '" . $data['Nacionalidad'] . "', '" . $data['LadaEmergencia'] . "', '" . $data['TelFijoEmergencia'] . "', '" . $data['ExtensionEmergencia'] . "', '" . $data['TelMovilEmergencia'] . "'
                , '" . $data['Parentesco'] . "', '" . $data['AnioIngreso'] . "', '" . $data['PeriodoIngreso'] . "', '" . $data['Posgrado'] . "', '" . $data['InstitucionAnterior'] . "', '" . $data['GradoAnterior'] . "'
                , '" . $data['AnioGradoAnterior'] . "', '" . $data['Promedio'] . "', '" . $data['Titulacion'] . "', '" . $data['formaEval'] . "', '" . $data['tipoPosgrado'] . "', '" . $data['otraTitulacion'] . "'
                , '" . $data['CP'] . "', '" . $data['Estado'] . "', '" . $data['Municipio'] . "', '" . $data['Localidad'] . "', '" . $data['Colonia'] . "', '" . $data['TipoCalle'] . "'
                , '" . $data['Calle'] . "', '" . $data['NumExterior'] . "', '" . $data['NumInterior'] . "', '" . $data['Pais'] . "', '" . $data['NombreEmpresa'] . "', '" . $data['TipoExperiencia'] . "'
                , '" . $data['PuestoFunciones'] . "', '" . $data['TiempoLaborado'] . "', '" . $data['Escrito'] . "', '" . $data['Oral'] . "', '" . $data['Lectura'] . "', '" . $data['Auditivo'] . "'
                , '" . $data['RazonInteres'] . "', '" . $data['Medio'] . "', '" . $data['Titulo'] . "', '" . $data['Descripcion'] . "', '" . $data['Extension'] . "')";
            //Insert query
            $insertReview = sqlsrv_query($conn, $tsql);
            if ($insertReview == FALSE) {
                $status = false;
                $data = ['errors'=>sqlsrv_errors()];
                die(print_r(compact('status', 'data')));
            }

            $id = null;
            while ($row = sqlsrv_fetch_array($insertReview, SQLSRV_FETCH_ASSOC)) {
                $id = ($row['IDgenerales']);
            }
            sqlsrv_free_stmt($insertReview);
            sqlsrv_close($conn);

            $status = true;
            $data = ['IDgenerales' => $id];

            return compact('status', 'data');

        } catch (Exception $e) {

            $status = false;
            $data = 'Error';

            return compact('status', 'data');
        }
    
        
    }

}