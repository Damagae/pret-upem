<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Usertype;

class UsertypeController extends Controller
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

    public function getAllUsertype() {
		    return response()->json(Usertype::all());
    }

		public function getUsertype($id) {
		    return response()->json(Usertype::find($id));
    }

		public function create(Request $request) {
      $this->validate($request, [
          'nom' => 'required'
                  ]);
  		$Usertype = Usertype::create($request->all());
  		return response()->json($Usertype, 201);
		}

		public function update($id, Request $request) {
      $this->validate($request, [
          'nom' => 'required'
                  ]);
  		$Usertype = Usertype::findOrFail($id); $Usertype->update($request->all());
  		return response()->json($Usertype, 200);
    }

		public function delete($id) {
  		Usertype::findOrFail($id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
