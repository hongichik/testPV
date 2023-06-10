<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait HttpResponses
{

    /**
     * Generate a JSON response with a success message.
     *
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\Response
     */
    protected function successResponse($message,$data = null, $statusCode = 200,)
    {
        return response()->json(
            [
                'success' => true,
                'message' => $message,
                'data' => $data,
            ],
            $statusCode
        );
    }

    /**
     * Generate a JSON response with an error message.
     *
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\Response
     */
    protected function errorResponse($message, $statusCode = 400)
    {
        return response()->json(['success' => false, 'message' => $message], $statusCode);
    }

    /**
     * Generate a JSON response with data.
     *
     * @param mixed $data
     * @param int $statusCode
     * @return \Illuminate\Http\Response
     */
    protected function dataResponse($data, $statusCode = 200)
    {
        return response()->json(['success' => true, 'data' => $data], $statusCode);
    }

    /**
     * Generate a JSON response with a pagination result.
     *
     * @param mixed $data
     * @param int $total
     * @param int $statusCode
     * @return \Illuminate\Http\Response
     */
    protected function paginationResponse($data, $total, $statusCode = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'total' => $total,
        ], $statusCode);
    }

    /**
     * Generate a JSON response with a validation error message.
     *
     * @param string $message
     * @param array $errors
     * @param int $statusCode
     * @return \Illuminate\Http\Response
     */
    protected function validationErrorResponse($message, $errors, $statusCode = 422)
    {
        return response()->json(['success' => false, 'message' => $message, 'errors' => $errors], $statusCode);
    }
}
