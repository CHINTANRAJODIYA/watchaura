import { Button, Card, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function CategoryManager() {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('productCategories');
    return savedCategories ? JSON.parse(savedCategories) : [
      "rolex",
      "zenith",
      "breitling",
      "seiko",
      "longines",
      "hublot",
      "titan",
      "omega",
      "tagheuer"
    ];
  });
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('productCategories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      toast.error('Please enter a category name');
      return;
    }
    const categoryToAdd = newCategory.toLowerCase();
    
    // Check if category already exists
    if (categories.includes(categoryToAdd)) {
      toast.error('This category already exists');
      return;
    }

    // Add the new category to the categories array
    setCategories([...categories, categoryToAdd]);
    setNewCategory('');
    toast.success('Category added successfully');
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter(category => category !== categoryToDelete));
    toast.success('Category deleted successfully');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Categories</h1>
      
      {/* Add New Category Form */}
      <Card className="mb-6">
        <form onSubmit={handleAddCategory} className="flex gap-4">
          <TextInput
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Add Category
          </Button>
        </form>
      </Card>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category} className="relative">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold capitalize">{category}</h3>
              <Button
                color="failure"
                size="sm"
                onClick={() => handleDeleteCategory(category)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager; 