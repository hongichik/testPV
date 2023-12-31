<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;

class passwordResetRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|nullable|string|min:8|confirmed',
            'token' => 'required|string'
        ];
    }
}
