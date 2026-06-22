<?php

namespace models\SQLQueries;


include 'DBConnectionModel.php';
include 'Catalogs.php';

use models\SQLQueries\DBConnectionModel;
use models\SQLQueries\Catalogs;

class VerifyModel {


    /**
     * Construct
     */
    public function __construct() {
    }
    
    /**
     * 
     * @return $this
     */
  
        function VerifyData(string $name, string $last_name, string $email, string $curp, string $second_last_name, 
                            string $id_general, string $gender, string $birth_date, string $birth_place, string $mobile_number, string $register_date,
                            string $nationality, string $admission_period, string $academic_area, string $degree, string $country) {

        try { 
            $catalogo = new Catalogs();
            //agregar validaciones de BD
            /*
            1.- duplicidad de correo electrónico y susuario
            2.- curp para nacionales
            3.- usuario no duplicado y longitud
            4.- fecha validad
            */

            //curp
             /*
            $resultCurp = $this->verifyCurp($curp);
            if($resultCurp['status'])
            {

            }


            //vaidar fecha

            $redultAge = $this->verifyAge($birth_date);
            //validar formato de correo
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                //$resultEmailVerification = $this-> verifyEmail( $email );
                $resultEmailVerification = $this-> verifyEmail( $email );
            }
            */
            $resultEmailVerification = $this-> verifyEmail( $email );
           if ( $resultEmailVerification['status'] ) 
           {
                $status = true;
                $data = $resultEmailVerification['data']['count'];

           }
           else
           {
                $status = false;
                $data = "Error ";
                return compact('status', 'data');
            }

            return compact('status', 'data');

        } catch (Exception $e) {

            $status = false;
            $data = 'Error';

            return compact('status', 'data');
        }


    }


    function verifyEmail(string $email = null) {

        try {

            $dbc = new DBConnectionModel();
            $dbc->createConnection();
            $conn = $dbc->getConnection();

             $tsql = "SELECT COUNT(*) AS count FROM sga_persona WHERE correo_electronico = '$email'";

            //select query
            $selectReview = sqlsrv_query($conn, $tsql);
            if ($selectReview == FALSE) {
                $status = false;
                $data = ['errors'=>sqlsrv_errors()];
                die(print_r(compact('status', 'data')));
            }

            $count = null;
            while ($row = sqlsrv_fetch_array($selectReview, SQLSRV_FETCH_ASSOC)) {
                $count = ($row['count']);
            }
            sqlsrv_free_stmt($selectReview);
            sqlsrv_close($conn);

            // Obtenemos el status de la inserción y el data_id
            $status = true;
            $data = ['count' => $count];
      
            return compact('status', 'data');

        } catch (Exception $e) {

            $status = false;
            $data = 'Error';

            return compact('status', 'data');
        }
    }

/*
    
    function verifyCurp( $curp = '' ){

        
        // TRANSFORMARMOS EN STRING EN MAYÚSCULAS RESPETANDO LAS Ñ PARA EVITAR ERRORES
                $curp = mb_strtoupper($curp, "UTF-8");
        // EL REGEX POR @MARIANO
                $pattern = "/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/";
                $validate = preg_match($pattern, $curp, $match);
                if( $validate === false ){
        // SI EL STRING NO CUMPLE CON EL PATRÓN REQUERIDO RETORNA FALSE
                    return false;
                }
                
                // ASIGNAMOS VALOR DE 0 A 36 DIVIDIENDO EL STRING EN UN ARRAY
                $ind = preg_split( '//u', '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', null, PREG_SPLIT_NO_EMPTY );
                    // REVERTIMOS EL CURP Y LE COLOCAMOS UN DÍGITO EXTRA PARA QUE EL VALOR DEL PRIMER CARACTER SEA 0 Y EL DEL PRIMER DIGITO DE LA CURP (INVERSA) SEA 1
                $vals = str_split( strrev( $match[0]."?" ) );
                  // ELIMINAMOS EL CARACTER ADICIONAL Y EL PRIMER DIGITO DE LA CURP (INVERSA)
                unset( $vals[0] );
                unset( $vals[1] );
                $tempSum = 0;
                foreach( $vals as $v => $d ){
                    // SE BUSCA EL DÍGITO DE LA CURP EN EL INDICE DE LETRAS Y SU CLAVE(VALOR) SE MULTIPLICA POR LA CLAVE(VALOR) DEL DÍGITO. TODO ESTO SE SUMA EN $tempSum
                    $tempSum = (array_search( $d, $ind ) * $v)+$tempSum;
                }
                 // ESTO ES DE @MARIANO NO SUPE QUE ERA
                $digit = 10 - $tempSum % 10;
                 // SI EL DIGITO CALCULADO ES 10 ENTONCES SE REASIGNA A 0
                $digit = $digit == 10 ? 0 : $digit;
                // SI EL DIGITO COINCIDE CON EL ÚLTIMO DÍGITO DE LA CURP RETORNA TRUE, DE LO CONTRARIO FALSE
                return $match[2] == $digit;
    }
*/

    /*
    function verifyAge($birth_date)
    {

        $mayor=20;

        //Creamos objeto bi$birth_date desde los valores recibidos
        $nacio = DateTime::createFromFormat('Y-m-d', $birth_date);

        //Calculamos usando diff y la bi$birth_date actual
        $calculo = $nacio->diff(new DateTime());

        //Obtenemos la edad
        $edad=  $calculo->y;    

        if ($edad < $mayor) 
        {
            echo "Usted es menor de edad. Su edad es: $edad\n";
            return false;  
         }else{
            echo "Usted es mayor de edad. Su edad es: $edad\n";
            return true;  
        }
    }
    */
}