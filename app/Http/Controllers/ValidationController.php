<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Validation;

class ValidationController extends Controller
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

    public function getAllValidation() {
		    return response()->json(Validation::all());
    }

		public function getValidation($id) {
		    return response()->json(Validation::find($id));
    }

    public function getValidationByDate($date) {
		    return response()->json(Validation::where('date', $date)->get());
    }

    public function getValidationByConventionId($conventionId) {
		    return response()->json(Validation::where('conventionId', $conventionId)->get());
    }

    public function getValidationByValidationtypeId($validationtypeId) {
		    return response()->json(Validation::where('validationtypeId', $validationtypeId)->get());
    }

    public function getValidationByUserId($userId) {
		    return response()->json(Validation::where('userId', $userId)->get());
    }

		public function create(Request $request) {
      $this->validate($request, [
          'date' => 'required|date',
          'convention_id' => 'required|exists:conventions,id',
          'validationtype_id' => 'required|exists:validationtypes,id',
          'user_id' => 'exists:users,id'
                  ]);
  		$Validation = Validation::create($request->all());
  		return response()->json($Validation, 201);
		}

		public function update($id, Request $request) {
      $this->validate($request, [
          'date' => 'required|date',
          'convention_id' => 'required|exists:conventions,id',
          'validationtype_id' => 'required|exists:validationtypes,id',
          'user_id' => 'required|exists:users,id'
                  ]);
  		$Validation = Validation::findOrFail($id);
      $Validation->update($request->all());
  		return response()->json($Validation, 200);
    }

		public function delete($id) {
  		Validation::findOrFail($id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
