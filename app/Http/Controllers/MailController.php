<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ValidationEnseignant;
use App\Mail\NotificationEtudiantRefus;
use App\Mail\NotificationEtudiantValidation;
use App\Mail\NotificationCN;
use App\Mail\NotificationEtudiantValidationCN;
use App\Convention;
use App\Http\Controllers\ConventionController;
use App\User;
use App\Http\Controllers\Controller;

class MailController extends Controller
{

    protected $convention_ctrl;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->convention_ctrl = new ConventionController();
    }

    // public function sendValidationEnseignezfzefzefantMail($mail_enseignant, $nom_etudiant) {
    //   $to = $mail_enseignant;
    //   $subject = "[Prêt de matériel audiovisuel] Validation du projet de ".$nom_etudiant;
    //   $txt = "<h1 style='font-family: sans-serif; max-width: 100%; background-color: #EA5A0B; text-align: right; padding: 40px 40px 40px 0; color: white;'>Demande de prêt de matériel audiovisuel</h1>
    //   <h2 style='font-family: sans-serif'>Validation du projet par l'enseignant</h2>
    //   <div style='font-family: sans-serif; background-color: red; color: white;'>
    //     <h2> APPLICATION EN PHASE DE TEST </h2>
    //     <p> Veuillez ne pas tenir compte de ce mail et nous excuser pour la gêne occasionnée. </p>
    //   </div>
    //   <div style='font-family: sans-serif'>
    //     <p> L'étudiant Cécile MOURIER (formation DUT MMI) souhaite emprunter du matériel audiovisuel.</p>
    //     <p> Vous avez été renseigné(e) comme enseignant(e) responsable du projet \"Film de fin d'année\".</p>
    //     <p> Pour que l'étudiant puisse emprunter le matériel, vous devez valider le projet. </p>
    //     <p> Veuillez cliquer sur ce lien pour valider ou annuler le projet :</p>
    //     <p> <a href='http://localhost:8000/personnel'>http://localhost:8000/personnel</a> </p>
    //   </div>
    //   <p style='font-family: sans-serif; font-size: 0.8rem;'> Ce mail est envoyé automatiquement, veuillez ne pas répondre. </p>";
    //   $headers = "From: Prêt de matériel audiovisuel";
    //
    //   try {
    //     mail($to,$subject,$txt,$headers);
    //   }
    //   catch (Exception $e) {
    //     return $e;
    //   }
    //   return response("Le mail est envoyé", 200);
    // }

    public function sendValidationEnseignantMail($convention_id) {
      $convention = $this->convention_ctrl->getConvention($convention_id);

      //Mail::to($convention->enseignant_mail)
      Mail::to('daphnegm.rose@gmail.com')
          ->send(new ValidationEnseignant($convention));
      return response('Mail de validation envoyé', 200);
    }

    public function sendValidationEtudiantMail($convention_id) {
      $convention = $this->convention_ctrl->getConvention($convention_id);

      //Mail::to($convention->emprunteur_mail)
      Mail::to('daphnegm.rose@gmail.com')
          ->send(new NotificationEtudiantValidation($convention));
      return response('Mail de validation envoyé', 200);
    }

    public function sendRefusEtudiantMail($convention_id) {
      $convention = $this->convention_ctrl->getConvention($convention_id);

      //Mail::to($convention->emprunteur_mail)
      Mail::to('daphnegm.rose@gmail.com')
          ->send(new NotificationEtudiantRefus($convention));
      return response('Mail de validation envoyé', 200);
    }

    public function sendNotificationCN() {
      // $users = User::join('usertyperels', 'user.id', '=', 'usertyperels.user_id')
      //                     ->where('usertyperels.usertype_id', 2) // 2 -> id des délégataires
      //                     ->get();
      // for ($i = 0; $i < count($users); ++$i) {
      //   Mail::to($mails[$i]->mail)
      //       ->send(new NotificationCN());
      // }
      // return response('Mail de validation envoyé', 200);

      Mail::to('daphnegm.rose@gmail.com')
          ->send(new NotificationCN());
      return response('Mail de validation envoyé', 200);
    }

    public function sendEtudiantValidationCN($convention_id) {
      $convention = $this->convention_ctrl->getConvention($convention_id);

      //Mail::to($convention->emprunteur_mail)
      Mail::to('daphnegm.rose@gmail.com')
          ->send(new NotificationEtudiantValidationCN($convention));
      return response('Mail de validation envoyé', 200);
    }

  }
