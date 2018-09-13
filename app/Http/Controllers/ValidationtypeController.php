<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Validationtype;

class ValidationtypeController extends Controller
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

    public function getAllValidationtype() {
		    return response()->json(Validationtype::all());
    }

		public function getValidationtype($id) {
		    return response()->json(Validationtype::find($id));
    }

		public function create(Request $request) {
      $this->validate($request, [
          'nom' => 'required|unique:validationtypes'
                  ]);
  		$Validationtype = Validationtype::create($request->all());
  		return response()->json($Validationtype, 201);
		}

		public function update($id, Request $request) {
      $this->validate($request, [
          'nom' => 'required|unique:validationtypes'
                  ]);
  		$Validationtype = Validationtype::findOrFail($id);
      $Validationtype->update($request->all());
  		return response()->json($Validationtype, 200);
    }

		public function delete($id) {
  		Validationtype::findOrFail($id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
