<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Signature;

class SignatureController extends Controller
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

    public function getAllSignature() {
		    return response()->json(Signature::all());
    }

		public function getSignature($id) {
		    return response()->json(Signature::find($id));
    }

    public function getSignatureByUserId($userId) {
		    return response()->json(Signature::where('userId', $userId)->get());
    }

		public function create(Request $request) {
      $this->validate($request, [
          'user_id' => 'required|exists:users,id',
          'signature' => 'required'
          ]);
      $path_signature = $request->signature->store('public/signatures');
      $request['url'] = $path_signature;
  		$Signature = Signature::create($request->all());
      return response()->json($Signature, 201);
		}

		public function update($id, Request $request) {
      $this->validate($request, [
          'user_id' => 'required|exists:users,id',
          'url' => 'required|URL'
                  ]);
  		$Signature = Signature::findOrFail($id); $Signature->update($request->all());
  		return response()->json($Signature, 200);
    }

		public function delete($user_id) {
  		Signature::where('user_id', $user_id)->delete();
  		return response('Deleted Successfully', 200);
    }

    public function deleteForce($user_id) {
  		Signature::where('user_id', $user_id)->forceDelete();
  		return response('Deleted Successfully', 200);
    }
}
