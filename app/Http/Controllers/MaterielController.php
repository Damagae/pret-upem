<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Materiel;

class MaterielController extends Controller
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

    public function getAllMateriel() {
		    return response()->json(Materiel::all());
    }

		public function getMateriel($id) {
		    return response()->json(Materiel::find($id));
    }

    public function getMaterielByName($nom) {
		    return response()->json(Materiel::where('nom', $nom)->get());
    }

    public function getMaterielByConventionId($conventionId) {
		    return response()->json(Materiel::where('convention_id', $conventionId)->get());
    }

		public function create(Request $request) {
      $this->validate($request, [
          'nom' => 'required|unique:bureauprets',
          'quantite' => 'required|integer',
          'convention_id' => 'required|exists:conventions,id'
                  ]);
  		$Materiel = Materiel::create($request->all());
  		return response()->json($Materiel, 201);
		}

		public function update($id, Request $request) {
      $this->validate($request, [
          'nom' => 'required|unique:bureauprets',
          'quantite' => 'required|integer',
          'convention_id' => 'required|exists:conventions,id'
                  ]);
  		$Materiel = Materiel::findOrFail($id);
      $Materiel->update($request->all());
  		return response()->json($Materiel, 200);
    }

    public function deleteAll($id_convention) {
      $materiel_array = Materiel::where('convention_id', $id_convention)->get();

      for ($i = 0; $i < count($materiel_array); ++$i) {
        Materiel::findOrFail($materiel_array[$i]['id'])->delete();
      }
      
  		return response('Deleted Successfully', 200);
    }

		public function delete($id) {
  		Materiel::findOrFail($id)->delete();
  		return response('Deleted Successfully', 200);
    }
}
