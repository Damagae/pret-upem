<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use App\Usertype;

class RedirectionController extends Controller
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

    /**
     * Détermine si un utilisateur possède un certain type
     *
     * @param  User  $user
     * @param  interface  $type_id
     * @return boolean
     */
    public static function hasType($user, $type_id) {
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

    public static function personnelRedirection($attributes) {
		    $user = User::where('mail', $attributes->mail)->first();

        if (RedirectionController::hasType($user, 1)) { // agent
          return '/personnel/conventions';
        }
        else if (RedirectionController::hasType($user, 2)) { // delegataire
          return '/campus-numerique/conventions';
        }
    }
}
