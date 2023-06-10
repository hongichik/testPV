<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\getUserRequest;
use App\Http\Requests\User\passwordResetRequest;
use App\Http\Requests\User\registerUserRequest;
use App\Mail\MailPasswordResetNotify;
use App\Models\Role;
use App\Models\User;
use App\Traits\HttpResponses;
use App\Traits\Pagination;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $pagination;
    protected $user;
    public function __construct()
    {
        $this->pagination = new Pagination();
        $this->user = new User();
    }

    public function login(getUserRequest $request)
    {
        $data = $request->only('email', 'password');

        if (Auth::attempt($data)) {
            $user = Auth::user();
            $user['role_name'] = $user->role->name;
            $user['role_slug'] = $user->role->slug;
            unset($user->role);
            unset($user->role_id);
            unset($user->created_at);
            unset($user->email_verified_at);
            unset($user->updated_at);
            $token = $user->createToken('authToken')->plainTextToken;
            $data = [
                'token' => $token,
                'data' => $user
            ];
            return $this->successResponse('Đăng nhập thành công', $data);
        } else {
            return $this->errorResponse('Đăng nhập thất bại tài khoản hoặc mật khẩu sai', 401);
        }
    }

    public function register(registerUserRequest $request)
    {
        $data = $request->only('name', 'email', 'password');
        $data['password'] = Hash::make($data['password']);
        $data['role_id'] = Role::where('slug', 'user')->first()->id;

        $user = User::create($data);
        $token = $user->createToken('authToken')->plainTextToken;
        $user['role_name'] = $user->role->name;
        $user['role_slug'] = $user->role->slug;
        unset($user->role);
        unset($user->role_id);
        unset($user->created_at);
        unset($user->email_verified_at);
        unset($user->updated_at);
        $token = $user->createToken('authToken')->plainTextToken;
        $data = [
            'token' => $token,
            'data' => $user
        ];
        return $this->successResponse('Đăng ký thành công', $data);
    }

    public function getInfo()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $user['role_name'] = $user->role->name;
            $user['role_slug'] = $user->role->slug;
            unset($user->role);
            unset($user->role_id);
            unset($user->created_at);
            unset($user->email_verified_at);
            unset($user->updated_at);
            return $this->successResponse('Đã đăng nhập', $user);
        } else {
            return $this->errorResponse('Lỗi chưa đăng nhập', 400);
        }
    }

    public function logout()
    {
        $user = Auth::user();

        $user->currentAccessToken()->delete();
        return $this->successResponse('Đăng xuất thành công');
    }

    public function passwordResetToken(Request $request)
    {
        if (isset($request->email)) {
            $user = User::where('email', $request->email)->first();

            if ($user) {
                $token = Str::random(20);

                DB::table('password_resets')->updateOrInsert(
                    ['email' => $user->email],
                    ['token' => $token, 'created_at' => now()]
                );

                Mail::to($user->email)->send(new MailPasswordResetNotify($token));
                return $this->successResponse('Gửi mã thành công');
            } else {
                return $this->successResponse('Gửi mã thất bại');
            }
        } else {
            return $this->successResponse('Gửi mã thất bại');
        }
    }

    public function passwordReset(passwordResetRequest $request)
    {
        $email = $request['email'];
        $token = $request['token'];
        $password = $request['password'];

        $passwordReset = DB::table('password_resets')->where('email', $email)->where('token', $token)->first();

        if ($passwordReset) {
            $user = User::where('email', $email)->first();

            if ($user) {
                $user->password = Hash::make($password);
                $user->save();

                DB::table('password_resets')
                ->where('email', $email)
                ->where('token', $token)
                ->delete();

                return $this->successResponse('Cập nhật mật khẩu thành công');
            }
        }

        return $this->errorResponse('Cập nhật mật khẩu thất bại');
    }

    public function permission($slug)
    {
        if (Auth::user()->hasPermission($slug)) {
            return $this->successResponse('Có quyền truy cập');
        }
    }
    public function index(Request $request)
    {
        Auth::user()->hasPermission('view_all_user');

        $perPage = $request['perPage'] ?? 5; // để 5 để test phân trang
        $page = $request['page'] ?? 1;
        $search = $request['search'] ?? '';


        if (isset($request['orderBy'])) {
            $orderByArr = explode(',', $request['orderBy']);
            if (count($orderByArr) === 2) {
                $orderByColumn = $orderByArr[0];
                $orderBy = strtolower($orderByArr[1]);
                if ($orderBy === 'desc' || $orderBy === 'asc') {
                    $table = $this->user->getTable();
                    if (!Schema::hasColumn($table, $orderByColumn)) {
                        return $this->successResponse('Thành công', $table);
                    }
                } else {
                    return $this->errorResponse('column_name,asc or column_name,desc', 400);
                }
            } else {
                return $this->errorResponse('column_name,asc or column_name,desc', 400);
            }
        }

        $query = new User();
        if ($search != '') {
            $query = $query->where('name', 'LIKE', "%{$search}%");
        }
        if (isset($orderByColumn) && isset($orderBy))
            $query = $query->orderBy($orderByColumn, $orderBy);
        if (isset($request['from']) && isset($request['to'])) {
            $query->whereBetween('created_at', [$request['from'], $request['to']]);
        } elseif (isset($request['from'])) {
            $query->where('created_at', '>=', $request['from']);
        } elseif (isset($request['to'])) {
            $query->where('created_at', '<=', $request['to']);
        }
        $query = $query->paginate($perPage, ['*'], 'page', $page);
        foreach($query as $item){
            $item['role_name'] = $item->role->name;
            $item['role_slug'] = $item->role->slug;
            unset($item->role);
            unset($item->role_id);
            unset($item->created_at);
            unset($item->email_verified_at);
            unset($item->updated_at);
        }

        $data = [
            'data' => $query->items(),
            'pagination' => $this->pagination->pagination($query),
        ];
        return $this->successResponse('Thành công', $data);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        Auth::user()->hasPermission('view_user');

        $user = $this->user->find($id);
        $user['role_name'] = $user->role->name;
        $user['role_slug'] = $user->role->slug;
        unset($user->role);
        unset($user->role_id);
        unset($user->created_at);
        unset($user->email_verified_at);
        unset($user->updated_at);
        return $this->successResponse('Thành công', $user);
    }

    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Auth::user()->hasPermission('edit_user');
        if(!isset($request['role']))
        {
            return $this->errorResponse('Sửa thất bại');
        }

        $role = Role::where('slug',$request['role'])->first();
        $data = $this->user->find($id)->update([
            'role_id' => $role->id
        ]);
        return $this->successResponse('Sửa thành công', $data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Auth::user()->hasPermission('delete_user');

        $data = $this->user->find($id)->delete();
        return $this->successResponse('Xóa thành công', $data);
    }
}
