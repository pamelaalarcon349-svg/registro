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
            $country=trim($country);
            //agregar validaciones de BD
            /*
            1.- duplicidad de correo electrónico y susuario
            2.- curp para nacionales
            3.- usuario no duplicado y longitud 
            4.- fecha validad
            */

           $resultEmailVerification = $this-> verifyEmail( $email );
            
           if ($resultEmailVerification['status'] ) 
           {   
                $status = true;
                $data = $resultEmailVerification['data']['count'];
                
                $nacionalidad = $catalogo->countryCatalog($country);
                switch($nacionalidad){
                    case 76:
                        $resultCurpVerification = $this-> verifyCURP($curp);
                            if($resultCurpVerification['status'] && $curp !== "null" ){
        
                            $status = true;
                            $data = $resultCurpVerification['data']['datac'];  
                            }
                            else if( $curp === "null"){
                                $status=false;
                                $data=$resultEmailVerification['data']['count'];
                                return compact('status', 'data');
                            }
                            else {
                                $status = false;
                                $data = $data=$resultEmailVerification['data']['count'];
                                return compact('status', 'data');
                            } 
                    break;
                    default:
                        $status = true;
                        $data = $resultEmailVerification['data']['count'];
                        return compact('status', 'data');
                    break;

                }
            
           } 
           else 
           { 
                $status = false;
                $data = "Error ";
                return compact('status', 'data');
            }
            $data = $resultEmailVerification['data']['count'];
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

   
    function verifyCURP(string $curp) {
                    
        try {
            // Expresión regular para validar CURP
            $patron = '/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/';
            // Verificar si el CURP coincide con el patrón
            if (preg_match($patron, $curp)) {  
                $status = true;           
                $datac = 0;                
            } else {
                $status = false;
                $datac = 1;
               
                return compact('status','data');
            }
            $data=['datac'=>$datac];
            return compact('status','data');
        }
        catch(Exception $e){
            $status = false;
            $data = "error curp";
            return compact('status','data');
        }
       

    }


    
     
    function verifyAge($birth_date)
    {
        
        try {
            // Usando la función date() con una fecha específica
            $fechaNacimiento = new DateTime($birth_date);
            // Obtener la fecha actual
            $fechaActual = new DateTime();

            //Calculamos usando diff y la bi$birth_date actual
            $diferencia = $fechaNacimiento ->diff($fechaActual);

            if ($diferencia->y > 18) 
            {
                //echo "Usted es menor de edad. Su edad es: $diferencia\n";
                $status = true;
                $datae= 0;
                
             }else{
                //echo "Usted es mayor de edad. Su edad es: $diferencia\n";
                $status = false;
                $datae= 1;              
                
            }
            $data=['datae'=>$datae];
            return  compact('status','data');
        }
        catch(Exception $e){
            $status = false;
            $data= 1;
            return compact('status','data');
        }       
        
    }
    

}