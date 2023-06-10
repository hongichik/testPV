<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ApiRequest extends FormRequest
{

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        $formattedErrors = "";
        $index = 0;
        foreach ($errors as $messages) {
            if($index >0)
            $formattedErrors .= " AND ";
            $formattedErrors .= $messages[0];
            $index++;
        }

        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $formattedErrors,
        ], 422));

    }
}
