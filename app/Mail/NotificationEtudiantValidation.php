<?php

namespace App\Mail;

use App\Convention;
use Request;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotificationEtudiantValidation extends Mailable
{
    use Queueable, SerializesModels;

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
        $this->url = Request::root() . '/etudiant/mes-demandes';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      return $this->from('petitepatateendiablee@gmail.com', 'Demande de prêt audiovisuel UPEM')
                  ->subject('[Demande de prêt audiovisuel] Validation de la demande ' . $this->convention->num_eng)
                  ->view('emails.notification-etudiant-validation')
                  ->with([
                        'num_eng' => $this->convention->num_eng,
                        'nom_projet' => $this->convention->nom_projet,
                        'formation' => $this->convention->emprunteur_formation,
                        'enseignant' => $this->convention->enseignant_nom,
                        'bureau' => $this->convention->bureaupret['nom'],
                        'url' => $this->url,
                        'debug' => true
                    ]);
    }
}
