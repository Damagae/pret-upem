<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\User;
use App\Usertype;
use App\Usertyperel;
use App\Signature;
use App\Userbureaurel;
use App\Bureaupret;

class UserController extends Controller
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

    public function getAllUser() {
        $users = User::all();
        for ($i = 0; $i < count($users); ++$i) {
          $users[$i]['type'] = Usertype::join('usertyperels', 'usertypes.id', '=', 'usertyperels.usertype_id')
                                      ->where('usertyperels.user_id', $users[$i]['id'])
                                      ->get();
          $users[$i]['bureaux'] = Bureaupret::join('userbureaurels', 'bureauprets.id', '=', 'userbureaurels.bureaupret_id')
                                            ->where('userbureaurels.user_id', $users[$i]['id'])
                                            ->get();
          $users[$i]['signature'] = Signature::where('user_id', $users[$i]['id'])->first();
        }
		    return response()->json($users);
    }

		public function getUser($id) {
        $user = User::find($id);
        $user['type'] = Usertype::join('usertyperels', 'usertypes.id', '=', 'usertyperels.usertype_id')
                                      ->where('usertyperels.user_id', $user['id'])
                                      ->get();
        $user['bureaux'] = Bureaupret::join('userbureaurels', 'bureauprets.id', '=', 'userbureaurels.bureaupret_id')
                                          ->where('userbureaurels.user_id', $user['id'])
                                          ->get();
        $user['signature'] = Signature::where('user_id', $user['id'])->first();
		    return response()->json($user);
    }

    public function getUserByMail($mail) {
        $user = User::where('mail', $mail)->first();
        $user['type'] = Usertype::join('usertyperels', 'usertypes.id', '=', 'usertyperels.usertype_id')
                                      ->where('usertyperels.user_id', $user['id'])
                                      ->get();
        $user['bureaux'] = Bureaupret::join('userbureaurels', 'bureauprets.id', '=', 'userbureaurels.bureaupret_id')
                                          ->where('userbureaurels.user_id', $user['id'])
                                          ->get();
        $user['signature'] = Signature::where('user_id', $user['id'])->first();
		    return response()->json($user);
    }

    public function getUserByUsertypeId($usertypeId) {
		    return response()->json(User::join('usertyperel', 'users.id', '=', 'usertyperel.userid')
                                    ->where('usertyperel.usertypeid', $usertypeId)
                                    ->get()
                                );
    }

    public function getSignature($user_id) {
      return response()->file($this->getSignaturePath($user_id));
    }

    public function getSignaturePath($user_id) {
      $signature = Signature::where('user_id', $user_id)->first();
      $path = storage_path() . "/app/" . $signature["url"];
      return $path;
    }

		public function create(Request $request) {
      $this->validate($request, [
          'prenom' => 'required|unique:users,prenom,NULL,id,deleted_at,NULL',
          'nom' => 'required|unique:users,nom,NULL,id,deleted_at,NULL',
          'mail' => 'required|email|unique:users,mail,NULL,id,deleted_at,NULL'
          ]);
  		$User = User::create($request->all());
  		return response()->json($User, 201);
		}

    public function addUsertype(Request $request) {
      $this->validate($request, [
          'user_id' => 'required|exists:users,id',
          'usertype_id' => 'required|exists:usertypes,id'
          ]);
  		$Usertyperel = Usertyperel::create($request->all());
  		return response()->json($Usertyperel, 201);
		}

    public function deleteAllUsertypes($user_id) {
      $rel = Usertyperel::where('user_id', $user_id)->get();
      for ($i = 0; $i < count($rel); ++$i) {
        Usertyperel::findOrFail($rel[$i]['id'])->delete();
      }
      return response('Deleted Successfully', 200);
    }

    public function deleteAllBureaux($user_id) {
      $rel = Userbureaurel::where('user_id', $user_id)->get();
      for ($i = 0; $i < count($rel); ++$i) {
        Userbureaurel::findOrFail($rel[$i]['id'])->delete();
      }
      return response('Deleted Successfully', 200);
    }

    public function addBureaupret(Request $request) {
      $this->validate($request, [
          'user_id' => 'required|exists:users,id',
          'bureaupret_id' => 'required|exists:bureauprets,id',
          ]);
        $Userbureaurel = Userbureaurel::create($request->all());
    		return response()->json($Userbureaurel, 201);
		}

		public function update($id, Request $request) {
      $this->validate($request, [
          'prenom' => 'required|unique:users,prenom,'.$id.',id,deleted_at,NULL',
          'nom' => 'required|unique:users,nom,'.$id.',id,deleted_at,NULL',
          'mail' => 'required|email|unique:users,mail,'.$id.',id,deleted_at,NULL'
                  ]);
  		$User = User::findOrFail($id); $User->update($request->all());
  		return response()->json($User, 200);
    }

		public function delete($id) {
  		User::findOrFail($id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
