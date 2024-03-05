<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhosphorIcon;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::get();
        $categoriesWithIcon = PhosphorIcon::getIcon($categories);

        return response()->json($categoriesWithIcon);
    }

    public function update(Request $request)
    {
        $category = Category::find($request->id);
        $category->phosphor_icon_id = $request->phosphor_icon_id;
        $category->save();

        return response()->json(['message' => 'Category Updated Successfully!']);
    }
}
