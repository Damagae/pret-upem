<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materiel extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nom', 'quantite', 'convention_id'
    ];

    public $timestamps = false;
}
