<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Bureaupret;
use App\User;
use App\Userbureaurel;
use App\Http\Controllers\Controller;

class BureaupretController extends Controller
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

    public function getAllBureaupret() {
        $Bureaux = Bureaupret::all();
        for ($i = 0; $i < count($Bureaux); ++$i) {
          $Bureaux[$i]['agents'] = User::join('userbureaurels', 'users.id', '=', 'userbureaurels.user_id')
                                      ->where('userbureaurels.bureaupret_id', $Bureaux[$i]['id'])
                                      ->get();
        }
		    return response()->json($Bureaux);
    }

		public function getBureaupret($id) {
       $bureau = Bureaupret::find($id);
       $rel = Userbureaurel::where('bureaupret_id', $id)->get();
       $bureau['agents'] = User::join('userbureaurels', 'users.id', '=', 'userbureaurels.user_id')
                                   ->where('userbureaurels.bureaupret_id', $id)
                                   ->get();
		   return response()->json($bureau);
    }

    public function getBureaupretByName($nom) {
		    return response()->json(Bureaupret::where('nom', $nom)->get());
    }

    public function getBureaupretByAgentId($agentid) {
		    return response()->json(Bureaupret::where('agent_id', $agentid)->get());
    }

		public function create(Request $request) {
      $this->validate($request, [
          'nom' => 'required|unique:bureauprets,nom,NULL,id,deleted_at,NULL',
          // 'agent_id' => [
          //             'required',
          //             Rule::exists('usertyperel', 'user_id')->where(function ($query) {
          //               $query->where('usertyperel.usertype_id', 1); // L'ID DOIT CORRESPONDRE AU TYPE "agent"
          //             })
          //           ]

                  ]);
  		$Bureaupret = Bureaupret::create($request->all());
  		return response()->json($Bureaupret, 201);
		}

    public function addAgent(Request $request) {
      $this->validate($request, [
          'bureaupret_id' => 'required|exists:bureauprets,id',
          'user_id' => 'required|exists:users,id'
          ]);
  		$Userbureaurel = Userbureaurel::create($request->all());
  		return response()->json($Userbureaurel, 201);
		}

    public function deleteAllAgents($bureau_id) {
      $rel = Userbureaurel::where('bureaupret_id', $bureau_id)->get();
      for ($i = 0; $i < count($rel); ++$i) {
        Userbureaurel::findOrFail($rel[$i]['id'])->delete();
      }
      return response('Deleted Successfully', 200);
    }

		public function update($id, Request $request) {
      $this->validate($request, [
          'nom' => 'required|unique:bureauprets,nom,'.$id.',id,deleted_at,NULL'
                  ]);
  		$Bureaupret = Bureaupret::findOrFail($id);
      $Bureaupret->update($request->all());
  		return response()->json($Bureaupret, 200);
    }

		public function delete($id) {
  		Bureaupret::findOrFail($id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
