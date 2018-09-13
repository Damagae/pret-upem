<?php

namespace App\Http\Controllers;
use App\Etatconvention;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EtatconventionController extends Controller
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

    public function getAllEtatconvention() {
		    return response()->json(Etatconvention::all());
    }

		public function getEtatconvention($id) {
		    return response()->json(Etatconvention::find($id));
    }

		public function create(Request $request) {
      $this->validate($request, [
        'nom' => 'required'
      ]);
  		$Etatconvention = Etatconvention::create($request->all());
  		return response()->json($Etatconvention, 201);
		}

		public function update($id, Request $request) {
      $this->validate($request, [
        'nom' => 'required'
      ]);
  		$Etatconvention = Etatconvention::findOrFail($id);
      $Etatconvention->update($request->all());
  		return response()->json($Etatconvention, 200);
    }

		public function delete($id) {
  		Etatconvention::findOrFail($id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
