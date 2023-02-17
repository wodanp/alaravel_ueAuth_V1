<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $roles = array_map(
            function ($role) {
                return $role['name'];
            },
            $this->roles->toArray(),
        );

        $permissions = array_map(
            function ($permission) {
                return $permission['name'];
            },
            $this->getAllPermissions()->toArray()
        );

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,

            'roles' => $roles,
            'permissions' => $permissions,
        ];
    }
}
