<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', 'ConventionController@generateTokenExample');

/*-------------
   Mails
 -------------*/
Route::put('/mail/validation-enseignant/{convention_id}', 'MailController@sendValidationEnseignantMail');
Route::put('/mail/etudiant/validation/{convention_id}', 'MailController@sendValidationEtudiantMail');
Route::put('/mail/etudiant/refus/{convention_id}', 'MailController@sendRefusEtudiantMail');
Route::put('/mail/campus-numerique/', 'MailController@sendNotificationCN');
Route::put('/mail/etudiant/validation/campus-numerique/{convention_id}', 'MailController@sendEtudiantValidationCN');

/*-------------
   PDF
 -------------*/
Route::post('/pdf', 'PdfController@create');

/*-------------
   Documents
 -------------*/
Route::get('/assurance/{num_eng}', 'ConventionController@getAssurance');
Route::get('/carte/{num_eng}', 'ConventionController@getCarte');

/*-------------
   GET all
 -------------*/
// GET ALL BUREAUPRET
Route::get('/b', 'BureaupretController@getAllBureaupret');
// GET ALL CONVENTION
Route::get('/c', 'ConventionController@getAllConvention');
// GET ALL USER
Route::get('/u', 'UserController@getAllUser');
// GET ALL USERTYPE
Route::get('/ut', 'UsertypeController@getAllUsertype');
// GET ALL VALIDATIONTYPE
Route::get('/vt', 'ValidationtypeController@getAllValidationtype');
// GET ALL VALIDATION
Route::get('/v', 'ValidationController@getAllValidation');
// GET ALL ETATCONVENTION
Route::get('/ec', 'EtatconventionController@getAllEtatconvention');
// GET ALL MATERIEL
Route::get('/m', 'MaterielController@getAllMateriel');
// GET ALL SIGNATURE
Route::get('/s', 'SignatureController@getAllSignature');

/*-------------
   GET par id
 -------------*/
// GET BUREAUPRET BY ID
Route::get('/b/{id}', 'BureaupretController@getBureaupret')->where('id', '[0-9]+');
// GET CONVENTION BY ID
Route::get('/c/{id}', 'ConventionController@getConvention')->where('id', '[0-9]+');
// GET USER BY ID
Route::get('/u/{id}', 'UserController@getUser')->where('id', '[0-9]+');
// GET USERTYPE BY ID
Route::get('/ut/{id}', 'UsertypeController@getUsertype')->where('id', '[0-9]+');
// GET VALIDATIONTYPE BY ID
Route::get('/vt/{id}', 'ValidationtypeController@getValidationtype')->where('id', '[0-9]+');
// GET VALIDATION BY ID
Route::get('/v/{id}', 'ValidationController@getValidation')->where('id', '[0-9]+');
// GET ETATCONVENTION BY ID
Route::get('/ec/{id}', 'EtatconventionController@getEtatconvention')->where('id', '[0-9]+');
// GET MATERIEL BY ID
Route::get('/m/{id}', 'MaterielController@getMateriel')->where('id', '[0-9]+');
// GET SIGNATURE BY ID
Route::get('/s/{id}', 'SignatureController@getSignature')->where('id', '[0-9]+');

/*-------------
   Bureaupret
 -------------*/
 // GET BUREAUPRET BY NAME
 Route::get('/b/{id}', 'BureaupretController@getBureaupret');
// GET BUREAUPRET BY NAME
Route::get('/b/byname/{nom}', 'BureaupretController@getBureaupretByName');
// GET BUREAUPRET BY AGENTID
Route::get('/b/byagentid/{agentid}', 'BureaupretController@getBureaupretByAgentId');
// POST CREATE BUREAUPRET
Route::post('/b/new', 'BureaupretController@create');
// POST CREATE BUREAUPRET AND USER REL
Route::post('/ub/new', 'BureaupretController@addAgent');
// POST UPDATE BUREAUPRET
Route::post('/b/update/{id}', 'BureaupretController@update');
// DELETE BUREAUPRET
Route::delete('/b/delete/{id}', 'BureaupretController@delete');
// DELETE ALL BUREAUPRET REL FROM A USERID
Route::delete('/ub/delete/{user_id}', 'UserController@deleteAllBureaux');
// DELETE ALL BUREAUPRET REL FROM A BUREAUID
Route::delete('/ub/delete/b/{bureau_id}', 'BureaupretController@deleteAllAgents');



/*-------------
   Convention
 -------------*/
 // GET CONVENTION BY TOKEN
 Route::get('/c/bytoken/{token}', 'ConventionController@getConventionByToken');
// GET CONVENTION BY NUMENG
Route::get('/c/bynumeng/{num_eng}', 'ConventionController@getConventionByNumEng');
// GET CONVENTION BY DATECREATION
Route::get('/c/bydatecreation/{date_creation}', 'ConventionController@getConventionByDateCreation');
// GET CONVENTION BY DATEDEBUT
Route::get('/c/bydatedebut/{date_debut}', 'ConventionController@getConventionByDateDebut');
// GET CONVENTION BY DATEFIN
Route::get('/c/bydatefin/{date_fin}', 'ConventionController@getConventionByDateFin');
// GET CONVENTION BY DATEREMISE
Route::get('/c/bydateremise/{date_remise}', 'ConventionController@getConventionByDateRemise');
// GET CONVENTION BY EMPRUNTEURMAIL
Route::get('/c/byemprunteurmail/{emprunteur_mail}', 'ConventionController@getConventionByEmprunteurMail');
// GET CONVENTION BY EMPRUNTEURFORMATION
Route::get('/c/byemprunteurformation/{emprunteur_formation}', 'ConventionController@getConventionByEmprunteurFormation');
// GET CONVENTION BY EMPRUNTEURCARTENUM
Route::get('/c/byemprunteurcartenum/{emprunteur_carte_num}', 'ConventionController@getConventionByEmprunteurCarteNum');
// GET CONVENTION BY ENSEIGNANTNOM
Route::get('/c/byenseignantnom/{enseignant_nom}', 'ConventionController@getConventionByEnseignantNom');
// GET CONVENTION BY ENSEIGNANTMAIL
Route::get('/c/byenseignantmail/{enseignant_mail}', 'ConventionController@getConventionByEnseignantMail');
// GET CONVENTION BY BUREAUPRETID
Route::get('/c/bybureaupretid/{bureaupret_id}', 'ConventionController@getConventionByBureaupretId');
// GET CONVENTION BY ETATID
Route::get('/c/byetatconventionid/{etatConvention_id}', 'ConventionController@getConventionByEtatconventionId');
// POST CREATE CONVENTION
Route::post('/c/new', 'ConventionController@create');
// POST CREATE CONVENTION PERSONNEL
Route::post('/c/personnel/new', 'ConventionController@createPersonnel');
// PUT UPDATE CONVENTION
Route::post('/c/update/{user_id}/{id}', 'ConventionController@update');
// DELETE CONVENTION
Route::delete('/c/delete/{id}', 'ConventionController@delete');
// CANCEL CONVENTION
Route::put('/c/cancel/{user_id}/{id}', 'ConventionController@cancel');
// CANCEL CONVENTION ENSEIGNANT
Route::put('/c/enseignant/cancel/{id}', 'ConventionController@cancelEnseignant');
// CANCEL CONVENTION ETUDIANT
Route::put('/c/cancel/{id}', 'ConventionController@cancelEtudiant');

/*-------------
   Etatconvention
 -------------*/
// POST CREATE ETATCONVENTION
Route::post('/ec/new', 'EtatconventionController@create');
// PUT UPDATE ETATCONVENTION
Route::put('/ec/update/{id}', 'EtatconventionController@update');
// DELETE ETATCONVENTION
Route::delete('/ec/delete/{id}', 'EtatconventionController@delete');

/*-------------
   Materiel
 -------------*/
// GET MATERIEL BY CONVENTIONID
Route::get('/m/byconventionid/{convention_id}', 'MaterielController@getMaterielByConventionId');
// GET MATERIEL BY NOM
Route::get('/m/byname/{nom}', 'MaterielController@getMaterielByName');
// POST CREATE MATERIEL
Route::post('/m/new', 'MaterielController@create');
// PUT UPDATE MATERIEL
Route::put('/m/update/{id}', 'MaterielController@update');
// DELETE ALL MATERIEL FROM CONVENTION (WHEN UPDATE)
Route::delete('/m/deleteall/{id_convention}', 'MaterielController@deleteAll');
// DELETE MATERIEL
Route::delete('/m/delete/{id}', 'MaterielController@delete');

/*-------------
   Signature
 -------------*/
// POST CREATE SIGNATURE
Route::post('/s/new', 'SignatureController@create');
// PUT UPDATE SIGNATURE
Route::put('/s/update/{id}', 'SignatureController@update');
// DELETE SIGNATURE
Route::delete('/s/delete/{user_id}', 'SignatureController@delete');
// DELETE SIGNATURE
Route::delete('/s/delete-force/{user_id}', 'SignatureController@deleteForce');

/*-------------
   User
 -------------*/
// GET USER BY MAIL
Route::get('/u/bymail/{mail}', 'UserController@getUserByMail');
// GET USER BY USERTYPEID
Route::get('/u/byusertypeid/{usertype_id}', 'UserController@getUserByUsertypeId');
// POST CREATE USER
Route::post('/u/new', 'UserController@create');
// POST ADD USERTYPE
Route::post('/u/new-rel', 'UserController@addUsertype');
// POST ADD BUREAUPRET
Route::post('/u/new-bureau', 'UserController@addBureaupret');
// PUT UPDATE USER
Route::post('/u/update/{id}', 'UserController@update');
// DELETE USER
Route::delete('/u/delete/{id}', 'UserController@delete');

/*-------------
   Usertype
 -------------*/
// POST CREATE USERTYPE
Route::post('/ut/new', 'UsertypeController@create');
// PUT UPDATE USERTYPE
Route::put('/ut/update/{id}', 'UsertypeController@update');
// DELETE ALL USERTYPE
Route::delete('/ut/delete/{id}', 'UserController@deleteAllUsertypes');

/*-------------
   Validation
 -------------*/
// GET VALIDATION BY DATE
Route::get('/v/bydate/{date}', 'ValidationController@getValidationByDate');
// GET VALIDATION BY CONVENTIONID
Route::get('/v/byconventionid/{convention_id}', 'ValidationController@getValidationByConventionId');
// GET VALIDATION BY VALIDATIONTYPEID
Route::get('/v/byvalidationtypeid/{validationtype_id}', 'ValidationController@getValidationByValidationtypeId');
// GET VALIDATION BY USERID
Route::get('/v/byuserid/{user_id}', 'ValidationController@getValidationByUserId');
// POST CREATE VALIDATION
Route::post('/v/new', 'ValidationController@create');
// PUT UPDATE VALIDATION
Route::put('/v/update/{id}', 'ValidationController@update');
// DELETE VALIDATION
Route::delete('/v/delete/{id}', 'ValidationController@delete');

// ENSEIGNANT VALIDATION
Route::put('/v/enseignant/{id}', 'ConventionController@enseignantValidation');
// AGENT VALIDATION
Route::put('/v/validation/{id}/{user_id}', 'ConventionController@agentValidation');
// AGENT REMISE
Route::put('/v/remise/{id}/{user_id}', 'ConventionController@agentRemise');
// AGENT RESERVE
Route::put('/v/reserve/{id}/{user_id}', 'ConventionController@agentReserve');
// DELEGATAIRE VALIDATION
Route::put('/v/validation-delegataire/{id}/{user_id}', 'ConventionController@delegataireValidation');

/*-----------------
   Validationtype
 -----------------*/
// POST CREATE VALIDATION
Route::post('/vt/new', 'ValidationtypeController@create');
// PUT UPDATE VALIDATION
Route::put('/vt/update/{id}', 'ValidationtypeController@update');
// DELETE VALIDATION
Route::delete('/vt/delete/{id}', 'ValidationtypeController@delete');
