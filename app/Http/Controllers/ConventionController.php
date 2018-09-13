<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use App\Convention;
use App\Materiel;
use App\Bureaupret;
use App\Etatconvention;
use App\Validation;
use App\Validationtype;
use App\User;
use App\Signature;
use App\Modification;
use App\Http\Controllers\MailController;

class ConventionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function getAllConvention() {
		    $conventions = Convention::all();
        for ($i = 0; $i < count($conventions); $i++) {
          $conventions[$i]['bureaupret'] = Bureaupret::find($conventions[$i]['bureaupret_id']);
          $conventions[$i]['materiel'] = Materiel::where('convention_id', $conventions[$i]['id'])->get();
          $conventions[$i]['etat'] = Etatconvention::find($conventions[$i]['etat_id']);
        }
        return response()->json($conventions);
    }

		public function getConvention($id) {
		    $convention = Convention::find($id);
        $convention['bureaupret'] = Bureaupret::find($convention['bureaupret_id']);
        $convention['materiel'] = Materiel::where('convention_id', $convention['id'])->get();
        $convention['etat'] = Etatconvention::find($convention['etat_id']);
        return (object) $convention;
    }

    public function addModification($id, $user_id) {
      $inputs = [
        'user_id' => intval($user_id),
        'convention_id' => intval($id),
        'modificationtype_id' => 1
      ];
      $modification = Modification::create($inputs);
  		return response()->json($modification, 201);
    }

    public function addDeletion($id, $user_id) {
      $modification = Modification::create([
        'user_id' => $user_id,
        'convention_id' => $id,
        'modificationtype_id' => 2
      ]);
      return response()->json($modification, 201);
    }

    public function enseignantValidation($id) {
      $convention = Convention::findOrFail($id);
      $newConvention = $convention;
      $newConvention['etat_id'] = 2;
      $v = [
        'convention_id' => $id,
        'validationtype_id' => 1
      ];

  		$Validation = Validation::create($v);
      $convention->update($newConvention->toArray());
      return response()->json($Validation, 201);
    }

    public function agentValidation($id, $user_id) {
      $convention = Convention::findOrFail($id);
      $newConvention = $convention;
      $newConvention['etat_id'] = 3;
      $v = [
        'convention_id' => $id,
        'validationtype_id' => 2,
        'user_id' => $user_id
      ];

  		$Validation = Validation::create($v);
      $convention->update($newConvention->toArray());

      // Envoi du mail de notification au Campus Numérique
      $mail_controller = new MailController();
      $mail_controller->sendNotificationCN();

      return response()->json($Validation, 201);
    }

    public function delegataireValidation($id, $user_id) {
      $convention = Convention::findOrFail($id);
      $newConvention = $convention;
      $newConvention['etat_id'] = 4;
      $v = [
        'convention_id' => $id,
        'validationtype_id' => 3,
        'user_id' => $user_id
      ];

  		$Validation = Validation::create($v);
      $convention->update($newConvention->toArray());

      // Envoi du mail de notification à l'étudiant
      $mail_controller = new MailController();
      $mail_controller->sendEtudiantValidationCN($id);

      return response()->json($Validation, 201);
    }

    public function agentRemise($id, $user_id) {
      $convention = Convention::findOrFail($id);
      $newConvention = $convention;
      $newConvention['etat_id'] = 6;
      $v = [
        'convention_id' => $id,
        'validationtype_id' => 4,
        'user_id' => $user_id
      ];

  		$Validation = Validation::create($v);
      $convention->update($newConvention->toArray());
      return response()->json($Validation, 201);
    }

    public function agentReserve($id, $user_id) {
      $convention = Convention::findOrFail($id);
      $newConvention = $convention;
      $newConvention['etat_id'] = 5;
      $v = [
        'convention_id' => $id,
        'validationtype_id' => 5,
        'user_id' => $user_id
      ];

  		$Validation = Validation::create($v);
      $convention->update($newConvention->toArray());
      return response()->json($Validation, 201);
    }

    public function getConventionNbrCN() {
      // renvoie toutes les conventions dont l'etat_id vaut 3 ("en attente de validation par le Campus Numérique")
      return Convention::where('etat_id', 3)->count();
    }

    public function getValidations($convention_id) {
      $validations = Validation::where('convention_id', $convention_id)->get();
      for ($i = 0; $i < count($validations); $i++) {
        $validations[$i]['type'] = Validationtype::find($validations[$i]['validationtype_id']);
        $validations[$i]['user'] = User::withTrashed()->find($validations[$i]['user_id']);
        $validations[$i]['signature'] = Signature::where('user_id', $validations[$i]['user_id'])->first();
        }
      return $validations;
    }

    public function getModifications($id) {
      $modifications = Modification::where([
          ['convention_id', '=', $id],
          ['modificationtype_id', '=', '1']
      ])->get();
      for ($i = 0; $i < count($modifications); $i++) {
        $modifications[$i]['user'] = User::find($modifications[$i]['user_id']);
      }
      return $modifications;
    }

    public function getDeletion($id) {
      $deletion = Modification::where([
          ['convention_id', '=', $id],
          ['modificationtype_id', '=', '2']
      ])->first();
      if ($deletion != null) {
        $deletion['user'] = User::find($deletion['user_id']);
        return $deletion;
      }
    }

    public function getConventionByNumEng($num_eng) {
		    $convention = Convention::where('num_eng', $num_eng)->first();
        $convention['bureaupret'] = Bureaupret::withTrashed()->find($convention['bureaupret_id']);
        $convention['materiel'] = Materiel::where('convention_id', $convention['id'])->get();
        $convention['etat'] = Etatconvention::find($convention['etat_id']);
        $convention['validations'] = $this->getValidations($convention['id']);
        $convention['modifications'] = $this->getModifications($convention['id']);
        $convention['deletion'] = $this->getDeletion($convention['id']);
        return response()->json($convention);
    }

    public function getConventionByToken($token) {
		    $convention = Convention::where('token_convention', $token)->first();
        $convention['bureaupret'] = Bureaupret::withTrashed()->find($convention['bureaupret_id']);
        $convention['materiel'] = Materiel::where('convention_id', $convention['id'])->get();
        $convention['etat'] = Etatconvention::find($convention['etat_id']);
        $convention['validations'] = $this->getValidations($convention['id']);
        $convention['modifications'] = $this->getModifications($convention['id']);
        $convention['deletion'] = $this->getDeletion($convention['id']);
        return response()->json($convention);
    }

    public function getConventionByDateCreation($date_creation) {
        return response()->json(Convention::where('date_creation', $date_creation)->get());
    }

    public function getConventionByDateDebut($date_debut) {
        return response()->json(Convention::where('date_debut', $date_debut)->get());
    }

    public function getConventionByDateFin($date_fin) {
        return response()->json(Convention::where('date_fin', $date_fin)->get());
    }

    public function getConventionByDateRemise($date_remise) {
        return response()->json(Convention::where('date_remise', $date_remise)->get());
    }

    public function getAssurance($num_eng) {
        $convention = Convention::where('num_eng', $num_eng)->first();
        $path = storage_path() . "/app/" . $convention["assurance_url"];
        return response()->file($path);
    }

    public function getCarte($num_eng) {
        $convention = Convention::where('num_eng', $num_eng)->first();
        $path = storage_path() . "/app/" . $convention["carte_etud_url"];
        return response()->file($path);
    }

    public function getConventionByEmprunteurMail($emprunteur_mail) {
        $convention = Convention::where('emprunteur_mail', $emprunteur_mail)->get();
        for ($i = 0; $i < count($convention); $i++) {
          $convention[$i]['bureaupret'] = Bureaupret::withTrashed()->find($convention[$i]['bureaupret_id']);
          $convention[$i]['materiel'] = Materiel::where('convention_id', $convention[$i]['id'])->get();
          $convention[$i]['etat'] = Etatconvention::find($convention[$i]['etat_id']);
        }
        return response()->json($convention);
    }

    public function getConventionByEmprunteurFormation($emprunteur_formation) {
        return response()->json(Convention::where('emprunteur_formation', $emprunteur_formation)->get());
    }

    public function getConventionByEmprunteurCarteNum($emprunteur_carte_num) {
        return response()->json(Convention::where('emprunteur_carte_num', $emprunteur_carte_num)->get());
    }

    public function getConventionByEnseignantNom($enseignant_nom) {
        return response()->json(Convention::where('enseignant_nom', $enseignant_nom)->get());
    }

    public function getConventionByEnseignantMail($enseignant_mail) {
        return response()->json(Convention::where('enseignant_mail', $enseignant_mail)->get());
    }

    public function cancel($user_id, $id) {
      $convention = Convention::findOrFail($id);
      $newConvention = $convention;
      $newConvention['etat_id'] = 7;
      $convention->update($newConvention->toArray());
      $this->addDeletion($id, $user_id);
      return response('Convention annulée', 200);
    }

    public function cancelEtudiant($id) {
      $this->cancel(0, $id);
    }

    public function cancelEnseignant($id) {
      $this->cancel(null, $id);
    }

    public function getConventionByBureaupretId($bureaupret_id) {
      $convention = Convention::where('bureaupret_id', $bureaupret_id)->get();
      for ($i = 0; $i < count($convention); $i++) {
        $convention[$i]['bureaupret'] = Bureaupret::find($convention[$i]['bureaupret_id']);
        $convention[$i]['materiel'] = Materiel::where('convention_id', $convention[$i]['id'])->get();
        $convention[$i]['etat'] = Etatconvention::find($convention[$i]['etat_id']);
      }
      return response()->json($convention);
    }

    public function getConventionByEtatconventionId($etatconvention_id) {
        return response()->json(Convention::where('etatconvention_id', $etatconvention_id)->get());
    }

    public function generateNumEng() {
        $year = date("Y");
        $last_inserted = Convention::orderby('id', 'desc')->first();
        if ($last_inserted) {
          $nbr = substr($last_inserted["num_eng"], -4);
          $nbr = $nbr + 1;
        }
        else {
          $nbr = 1;
        }
        if ($nbr < 10) {
          $nbr = "000" . $nbr;
        } else if ($nbr < 100) {
          $nbr = "00" . $nbr;
        } else if ($nbr < 1000) {
          $nbr = "0" . $nbr;
        }
        return $year . "-CN" . $nbr;
    }

    public function generateToken($convention) {
        $tokenGeneric = "Up3moNt'4ime<3";
        $random_var = rand();
        $token = hash('sha256', $tokenGeneric . $convention['num_eng'] . $random_var);
        return $token;
    }

    /* Fonction de test à supprimer */
    public function generateTokenExample() {
        $tokenGeneric = "Up3moNt'4ime<3";
        $random_var = rand();
        $token = hash('sha256', $tokenGeneric . '2018-CN0987' . $random_var);
        return $token;
    }

		public function create(Request $request) {
      $this->validate($request, [
          'date_debut' => 'required|date',
          'date_fin' => 'required|date',
          'emprunteur_adr' => 'required',
          'emprunteur_ville' => 'required',
          'emprunteur_postal' => 'required',
          'emprunteur_mail' => 'required|email', // VERIFICATION LDAP
          'emprunteur_tel' => 'required|digits:10',
          'emprunteur_formation' => 'required',
          'emprunteur_carte_num' => 'required|digits:6',
          'assurance_nom' => 'required',
          'assurance_num' => 'required',
          'enseignant_nom' => 'required',
          'enseignant_mail' => 'required|email', // VERIFICATION LDAP
          'bureaupret_id' => 'required|exists:bureauprets,id'
          ]);
      $inputs = $request->all();
      if ($request['assurance']) {
        $path_assurance = $request->assurance->store('doc');
        $inputs['assurance_url'] = $path_assurance;
      }
      if ($request['carte_etud']) {
        $path_carte = $request->carte_etud->store('doc');
        $inputs['carte_etud_url'] = $path_carte;
      }
      $inputs['etat_id'] = 1;
      $inputs['num_eng'] = $this->generateNumEng();
      $inputs['token_convention'] = $this->generateToken($inputs);
  		$Convention = Convention::create($inputs);
  		return response()->json($Convention, 201);
		}

    public function createPersonnel(Request $request) {
      $this->validate($request, [
          'date_debut' => 'required|date',
          'date_fin' => 'required|date',
          'emprunteur_adr' => 'required',
          'emprunteur_mail' => 'required|email', // VERIFICATION LDAP
          'emprunteur_tel' => 'required|digits:10',
          'emprunteur_formation' => 'required',
          'emprunteur_carte_num' => 'required|digits:6',
          'assurance_nom' => 'required',
          'assurance_num' => 'required',
          'bureaupret_id' => 'required|exists:bureauprets,id'
          ]);
      $inputs = $request->all();
      if ($request['assurance']) {
        $path_assurance = $request->assurance->store('public/doc');
        $inputs['assurance_url'] = $path_assurance;
      }
      if ($request['carte_etud']) {
        $path_carte = $request->carte_etud->store('public/doc');
        $inputs['carte_etud_url'] = $path_carte;
      }
      $inputs['etat_id'] = 2;
      $inputs['num_eng'] = $this->generateNumEng();
      $inputs['token_convention'] = $this->generateToken($inputs);
  		$Convention = Convention::create($inputs);
  		return response()->json($Convention, 201);
		}

		public function update($user_id, $id, Request $request) {
      $Convention = Convention::findOrFail($id);

      $this->validate($request, [
        'date_debut' => 'required|date',
        'date_fin' => 'required|date',
        'emprunteur_adr' => 'required',
        'emprunteur_ville' => 'required',
        'emprunteur_postal' => 'required',
        'emprunteur_tel' => 'required|digits:10',
        'emprunteur_carte_num' => 'required|digits:6',
        'assurance_nom' => 'required',
        'assurance_num' => 'required'
          ]);
      $inputs = $request->all();
      if ($request['assurance']) {
        $path_assurance = $request->assurance->store('public/doc');
        $inputs['assurance_url'] = $path_assurance;
      }
      if ($request['carte_etud']) {
        $path_carte = $request->carte_etud->store('public/doc');
        $inputs['carte_etud_url'] = $path_carte;
      }
      $inputs['etat_id'] = $Convention['etat_id'];
      $inputs['num_eng'] = $Convention['num_eng'];

      $Convention->update($inputs);
      $this->addModification($id, $user_id);
  		return response()->json($Convention, 200);
    }

		public function delete($id) {
  		Convention::findOrFail($id)->delete();
      Materiel::where('convention_id', $id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
