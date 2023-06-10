<?php

namespace App\Traits;

class Pagination
{
    public function pagination($query)
    {
        $sumPage = ceil($query->total() / $query->perPage());
        $previousPage = $query->currentPage() - 1;
        if ($query->currentPage() == $sumPage) {
            $nextPage = 0;
        } else {
            $nextPage = $query->currentPage() + 1;
        }

        $from = ($query->currentPage() - 1) * $query->perPage();
        if ($from <= 0)
            $from = 1;
        $to = $from + $query->perPage() - 1;
        if ($to > $query->total())
            $to = $query->total();
        // Thêm thông tin phân trang
        $pagination = [
            'total' => $query->total(),
            'from' => $from,
            'to' => $to,
            'per_page' => $query->perPage(),
            'current_page' => $query->currentPage(),
            'last_page' => $query->lastPage(),
            'prev_page_url' => $previousPage,
            'next_page_url' => $nextPage,
        ];
        return $pagination;
    }
}
