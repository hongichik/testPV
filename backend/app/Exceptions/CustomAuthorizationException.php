<?php

namespace App\Exceptions;

use App\Traits\HttpResponses;
use Illuminate\Auth\Access\AuthorizationException;

class CustomAuthorizationException extends AuthorizationException
{
    use HttpResponses;

    protected $errorMessage;

    public function __construct($message)
    {
        $this->errorMessage = $message;
    }

    public function render()
    {
        return $this->errorResponse($this->errorMessage, 403);
    }
}
