<?php

namespace App\Mail;

use App\Convention;
use App\Http\Controllers\ConventionController;
use Request;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotificationCN extends Mailable
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
    public function __construct()
    {
        $controller = new ConventionController();
        $this->conv_nbr = $controller->getConventionNbrCN();
        $this->url = Request::root() . '/campus-numerique/';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      return $this->from('petitepatateendiablee@gmail.com', 'Demande de prêt audiovisuel UPEM')
                  ->subject('[Demande de prêt audiovisuel] Vous avez ' . $this->conv_nbr . ' convention(s) en attente de validation')
                  ->view('emails.notification-cn')
                  ->with([
                        'conv_nbr' => $this->conv_nbr,
                        'url' => $this->url,
                    ]);
    }
}
