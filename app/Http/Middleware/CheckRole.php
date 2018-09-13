<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use App\Usertype;

class CheckRole
{
    /**
     * Détermine si un utilisateur possède un certain type
     *
     * @param  User  $user
     * @param  interface  $type_id
     * @return boolean
     */
    public function hasType($user, $type_id) {
        $user_types = Usertype::join('usertyperels', 'usertypes.id', '=', 'usertyperels.usertype_id')
                              ->where('usertyperels.user_id', $user['id'])
                              ->get();
        for ($i = 0; $i < count($user_types); ++$i) {
          if ($user_types[$i]['usertype_id'] == $type_id) {
            return true;
          }
        }
        return false;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {

        $etudiant = (object) [
            'mail' => 'hgranger@etud.u-pem.fr',
            'nom' => 'Granger',
            'prenom' => 'Hermione',
            'status' => 'etudiant'
          ];
        $enseignant = (object) [
            'mail' => 'eikichi.onizuka@u-pem.fr',
            'nom' => 'Onizuka',
            'prenom' => 'Eikichi',
            'status' => 'personnel'
          ];
        $agent = (object) [
            'mail' => 'david.bowie@u-pem.fr',
            'nom' => 'Bowie',
            'prenom' => 'David',
            'status' => 'personnel'
          ];
        $agent2 = (object) [
            'mail' => 'sarah.connor@u-pem.fr',
            'nom' => 'Connor',
            'prenom' => 'Sarah',
            'status' => 'personnel'
          ];
        $delegataire = (object) [
            'mail' => 'leia.organa@u-pem.fr',
            'nom' => 'Organa',
            'prenom' => 'Leïa',
            'status' => 'personnel'
          ];
        $administrateur = (object) [
            'mail' => 'charles.xavier@u-pem.fr',
            'nom' => 'Xavier',
            'prenom' => 'Charles',
            'status' => 'personnel'
          ];

        //$attributes = cas()->getAttributes();
        $attributes = $delegataire;

        if ( $role != 'etudiant' ) {
              $user = User::where('mail', $attributes->mail)->first();

              if ($user) {
                    if ($role == "agent" && !$this->hasType($user, 1)) {
                      return redirect('/accesrefuse');
                    }
                    if ($role == "delegataire" && !$this->hasType($user, 2)) {
                      return redirect('/accesrefuse');
                    }
                    if ($role == "administrateur" && !$this->hasType($user, 3)) {
                      return redirect('/accesrefuse');
                    }
              } else if ($role != "enseignant") {
                    return redirect('/accesrefuse');
              }
        } else {
          if ( $attributes->status != $role ) {
               return redirect('/accesrefuse');
          }
        }

        return $next($request);
    }
}
