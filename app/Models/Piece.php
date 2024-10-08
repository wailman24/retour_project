<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Piece extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'product_id', 'quantity'];

    public function prodnames()
    {
        return $this->belongsTo(Prodname::class);
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }

    public function magazines()
    {
        return $this->hasMany(Magazine::class);
    }
    /* public function issues()
    {
        return $this->belongsTo(Issue::class);
    } */

    public function retours()
    {
        return $this->belongsToMany(Retour::class, 'piece_issue_reteur')
            ->withPivot('issue_id');
    }

    public function issues()
    {
        return $this->belongsToMany(Issue::class, 'piece_issue_reteur');
    }
}
