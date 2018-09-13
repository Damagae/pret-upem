<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Convention extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'num_eng', 'nom_projet', 'membres_equipe', 'date_creation', 'date_debut', 'date_fin', 'date_remise', 'emprunteur_nom', 'emprunteur_prenom', 'emprunteur_adr', 'emprunteur_ville', 'emprunteur_postal', 'emprunteur_mail', 'emprunteur_formation', 'emprunteur_tel', 'emprunteur_carte_num', 'assurance_nom', 'assurance_num', 'enseignant_nom', 'enseignant_mail', 'bureau_pret', 'assurance_url', 'carte_etud_url', 'etat_id', 'bureaupret_id', 'token_convention',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}
