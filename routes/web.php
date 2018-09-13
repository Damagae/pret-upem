<?php

use App\Http\Controllers\RedirectionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*--------------------
   FAKE Cas
 ---------------------*/
 Route::get('/cas', function () {
     return view('./fakecas');
 });

 /*--------------------
    Accès refusé
  ---------------------*/
  Route::get('/accesrefuse', function () {
      return view('./unauthorized');
  });

/*--------------------
   Document
 ---------------------*/
// Pas oublier de mettre un middleware ici
 Route::get('/document/assurance/{num_eng}', 'ConventionController@getAssurance');
 Route::get('/document/carte/{num_eng}', 'ConventionController@getCarte');

 /*--------------------
    Signature
  ---------------------*/
 // Pas oublier de mettre un middleware ici
  Route::get('/document/signature/{user_id}', 'UserController@getSignature');

/*--------------------
   INTERFACE ETUDIANT
 ---------------------*/
 // Landing page
Route::get('/', function () {
    return view('./etudiant/landingpage');
});

Route::get('/etudiant', function () {
    return view('./etudiant/landingpage');
});

// Nouvelle demande
Route::get('/etudiant/nouvelle-demande', function () {
    $etudiant = (object) ['mail' => 'hgranger@etud.u-pem.fr', 'nom' => 'Granger', 'prenom' => 'Hermione', 'status' => 'etudiant'];
    return view('./etudiant/new', ['user' => $etudiant]);
})->middleware('role:etudiant');

// Confirmation de création de la nouvelle demande
Route::get('/etudiant/confirmation', function () {
    $etudiant = (object) ['mail' => 'hgranger@etud.u-pem.fr', 'nom' => 'Granger', 'prenom' => 'Hermione', 'status' => 'etudiant'];
    return view('./etudiant/confirmation', ['user' => $etudiant]);
})->middleware('role:etudiant');

Route::get('/etudiant/convention-pret-audiovisuel-upem', function () {
    $etudiant = (object) ['mail' => 'hgranger@etud.u-pem.fr', 'nom' => 'Granger', 'prenom' => 'Hermione', 'status' => 'etudiant'];
    return view('./etudiant/convention', ['user' => $etudiant]);
})->middleware('role:etudiant');

Route::get('/etudiant/mes-demandes', function () {
    $etudiant = (object) ['mail' => 'hgranger@etud.u-pem.fr', 'nom' => 'Granger', 'prenom' => 'Hermione', 'status' => 'etudiant'];
    return view('./etudiant/demandes', ['user' => $etudiant]);
})->middleware('role:etudiant');

Route::get('/etudiant/mes-demandes/{num_eng}', function () {
    $etudiant = (object) ['mail' => 'hgranger@etud.u-pem.fr', 'nom' => 'Granger', 'prenom' => 'Hermione', 'status' => 'etudiant'];
    return view('./etudiant/demande', ['user' => $etudiant]);
})->middleware('role:etudiant');

Route::get('/etudiant/mes-demandes/{num_eng}/suppression', function () {
    $etudiant = (object) ['mail' => 'hgranger@etud.u-pem.fr', 'nom' => 'Granger', 'prenom' => 'Hermione', 'status' => 'etudiant'];
    return view('./etudiant/confirmation-suppression', ['user' => $etudiant]);
})->middleware('role:etudiant');

/*--------------------
   INTERFACE Personnel
 ---------------------*/
 // Landing page
Route::get('/personnel', function () {
    return view('./personnel/landingpage');
});

// Redirection
Route::get('/personnel/redirection', function () {
     $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
     $delegataire = (object) ['mail' => 'leia.organa@u-pem.fr', 'nom' => 'Organa', 'prenom' => 'Leïa', 'status' => 'personnel'];
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     $user = $agent;
     return redirect(RedirectionController::personnelRedirection($user));
     //return RedirectionController::personnelRedirection($user);
});

// Conventions
Route::get('/personnel/conventions', function () {
   $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
   $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
   return view('./personnel/conventions', ['user' => $agent]);
})->middleware('role:agent');

Route::get('/personnel/conventions/{num_eng}', function () {
    $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
    $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
    return view('./personnel/convention', ['user' => $agent]);
})->middleware('role:agent');

// // Nouvelle demande
// Route::get('/personnel/nouvelle-convention', function () {
//     $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
//     $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
//     return view('./personnel/new', ['user' => $agent]);
// })->middleware('role:agent');
//
// Route::get('/personnel/convention-pret-audiovisuel-upem', function () {
//     $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
//     return view('./personnel/convention-UPEM', ['user' => $agent]);
// })->middleware('role:agent');
//
// // Confirmation de création de la nouvelle demande
// Route::get('/personnel/confirmation', function () {
//     $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
//     return view('./personnel/confirmation-creation', ['user' => $agent]);
// })->middleware('role:agent');

Route::get('/personnel/conventions/{num_eng}/suppression', function () {
    $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
    $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
    return view('./personnel/confirmation-suppression', ['user' => $agent]);
})->middleware('role:agent');

Route::get('/personnel/conventions/{num_eng}/modifier', function () {
    $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
    $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
    return view('./personnel/modifier', ['user' => $agent]);
})->middleware('role:agent');

Route::get('/personnel/conventions/{num_eng}/confirmation-modification', function () {
    $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
    $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
    return view('./personnel/confirmation-modification', ['user' => $agent]);
})->middleware('role:agent');

Route::get('/personnel/conventions/{num_eng}/validation', function () {
    $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
    $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
    return view('./personnel/confirmation-validation', ['user' => $agent]);
})->middleware('role:agent');

Route::get('/personnel/conventions/{num_eng}/remise', function () {
    $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
    $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
    return view('./personnel/confirmation-remise', ['user' => $agent]);
})->middleware('role:agent');

Route::get('/personnel/conventions/{num_eng}/reserve', function () {
    $agent = (object) ['mail' => 'david.bowie@u-pem.fr', 'nom' => 'Bowie', 'prenom' => 'David', 'status' => 'personnel'];
    $agent2 = (object) ['mail' => 'sarah.connor@u-pem.fr', 'nom' => 'Connor', 'prenom' => 'Sarah', 'status' => 'personnel'];
    return view('./personnel/confirmation-reserve', ['user' => $agent]);
})->middleware('role:agent');

/*--------------------
   INTERFACE Delegataire
 ---------------------*/
 // Conventions
 Route::get('/campus-numerique', function () {
    return redirect('/campus-numerique/conventions');
});

 // Conventions
 Route::get('/campus-numerique/conventions', function () {
    $delegataire = (object) ['mail' => 'leia.organa@u-pem.fr', 'nom' => 'Organa', 'prenom' => 'Leïa', 'status' => 'personnel'];
    $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
    return view('./delegataire/conventions', ['user' => $administrateur]);
})->middleware('role:delegataire');

 Route::get('/campus-numerique/conventions/{num_eng}', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     $delegataire = (object) ['mail' => 'leia.organa@u-pem.fr', 'nom' => 'Organa', 'prenom' => 'Leïa', 'status' => 'personnel'];
     return view('./delegataire/convention', ['user' => $administrateur]);
})->middleware('role:delegataire');

 Route::get('/campus-numerique/conventions/{num_eng}/validation', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     $delegataire = (object) ['mail' => 'leia.organa@u-pem.fr', 'nom' => 'Organa', 'prenom' => 'Leïa', 'status' => 'personnel'];
     return view('./delegataire/confirmation-validation', ['user' => $administrateur]);
})->middleware('role:delegataire');

 /*--------------------
    INTERFACE Admin
  ---------------------*/
  Route::get('/administration', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/administration', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/utilisateur/{id}', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/utilisateur', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/bureau/{id}', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/bureau', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/utilisateur/{id}/suppression', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/utilisateur-supprimer-confirmation', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/bureau/{id}', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/bureau', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/nouvel-utilisateur', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/nouvel-utilisateur', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/nouveau-bureau', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/nouveau-bureau', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/nouvel-utilisateur/confirmation', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/nouvel-utilisateur-confirmation', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/nouveau-bureau/confirmation', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/nouveau-bureau-confirmation', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/utilisateur/{id}/modifier', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/utilisateur-modifier', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/bureau/{id}/modifier', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/bureau-modifier', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/modification-utilisateur/confirmation', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/utilisateur-modifier-confirmation', ['user' => $administrateur]);
  })->middleware('role:administrateur');

  Route::get('/administration/modification-bureau/confirmation', function () {
     $administrateur = (object) ['mail' => 'charles.xavier@u-pem.fr', 'nom' => 'Xavier', 'prenom' => 'Charles', 'status' => 'personnel'];
     return view('./administration/bureau-modifier-confirmation', ['user' => $administrateur]);
  })->middleware('role:administrateur');

/*------------------------
   INTERFACE Enseignant
 -------------------------*/
 Route::get('/enseignant/{token}', function () {
    return view('./enseignant/validation');
  })->middleware('role:enseignant');

 Route::get('/enseignant/{token}/validation', function () {
    return view('./enseignant/confirmation-validation');
  })->middleware('role:enseignant');

 Route::get('/enseignant/{token}/annulation', function () {
    return view('./enseignant/confirmation-annulation');
  })->middleware('role:enseignant');
