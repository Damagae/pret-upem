<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Bureaupret;
use App\Http\Controllers\Controller;
use Dompdf\Dompdf;
use App;
use PDF;

class PdfController extends Controller
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

    public function create(Request $request) {
      $pdf = \App::make('dompdf.wrapper');
      $pdf->loadHTML($request['html']);
      $pdfencoded = base64_encode($pdf->stream());
      return ('data:application/pdf;base64,' . $pdfencoded);
    }

    public function test(Request $request) {
      return response('Ca marche', 200);
    }

}
