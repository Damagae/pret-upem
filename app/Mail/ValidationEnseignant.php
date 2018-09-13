<?php

namespace App\Mail;

use App\Convention;
use Request;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ValidationEnseignant extends Mailable
{
    use Queueable, SerializesModels;

    protected $etudiant;
    protected $convention;
    protected $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($convention)
    {
        $this->convention = $convention;
        $this->etudiant = $convention->emprunteur_prenom . ' ' . $convention->emprunteur_nom;
        $this->url = Request::root() . '/enseignant/' . $convention->token_convention;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      return $this->from('petitepatateendiablee@gmail.com', 'Demande de prêt audiovisuel UPEM')
                  ->subject('[Demande de prêt audiovisuel] Validation de la demande émise par ' . $this->etudiant)
                  ->view('emails.validation-enseignant')
                  ->with([
                        'etudiant' => $this->etudiant,
                        'nom_projet' => $this->convention->nom_projet,
                        'formation' => $this->convention->emprunteur_formation,
                        'url' => $this->url,
                        'debug' => true
                    ]);
    }
}
