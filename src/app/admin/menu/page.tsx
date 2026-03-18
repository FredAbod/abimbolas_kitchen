"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Upload, Loader2, X } from "lucide-react";
import { IProduct } from "@/types";
import toast from "react-hot-toast";

const AdminMenuPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<IProduct>>({
    title: "",
    description: "",
    price: 0,
    category: "rice",
    type: "dish",
    isAvailable: true,
    isFeatured: false,
    imageUrl: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const handledValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: handledValue });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setFormData({ ...formData, imageUrl: result.secure_url, imagePublicId: result.public_id });
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingProduct ? "PATCH" : "POST";
      const url = editingProduct ? `/api/products/${editingProduct._id}` : "/api/products";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingProduct ? "Updated!" : "Created!");
        setIsModalOpen(false);
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      toast.success("Deleted!");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Menu <span className="text-accent italic">Management</span></h1>
            <p className="text-white/40 text-sm tracking-widest uppercase">Manage your restaurant catalog</p>
          </div>
          <button 
            onClick={() => {
              setEditingProduct(null);
              setFormData({ title: "", description: "", price: 0, category: "rice", type: "dish", isAvailable: true, isFeatured: false, imageUrl: "" });
              setIsModalOpen(true);
            }}
            className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl"
          >
            <Plus size={16} /> Add New Dish
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item._id} className="bg-secondary border border-white/5 relative group">
              <div className="aspect-video overflow-hidden bg-charcoal">
                <img src={item.imageUrl || 'https://via.placeholder.com/400x300'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-1">{item.category}</span>
                    <h3 className="text-xl font-serif text-white">{item.title}</h3>
                  </div>
                  <p className="text-white font-bold">£{item.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button 
                    onClick={() => {
                      setEditingProduct(item);
                      setFormData(item);
                      setIsModalOpen(true);
                    }}
                    className="p-3 bg-white/5 text-white/40 hover:text-accent hover:bg-white/10 transition-all"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id!)}
                    className="p-3 bg-white/5 text-white/40 hover:text-red-500 hover:bg-white/10 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className="bg-secondary border border-white/5 w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-2xl font-serif text-white">{editingProduct ? 'Edit' : 'Add'} <span className="text-accent">Dish</span></h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Title</label>
                    <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Price (£)</label>
                    <input required name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Description</label>
                  <textarea name="description" rows={3} value={formData.description} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-accent appearance-none">
                      <option value="rice">Rice Dishes</option>
                      <option value="soups">Soups & Stews</option>
                      <option value="grills">The Grills</option>
                      <option value="platters">Party Platters</option>
                      <option value="drinks">Native Drinks</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Featured</label>
                    <div className="flex items-center gap-4 h-[58px]">
                      <input name="isFeatured" type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-6 h-6 rounded-none bg-white/5 border-white/10 text-accent focus:ring-accent" />
                      <span className="text-white/60 text-sm">Display in featured sections</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Image</label>
                  <div className="flex gap-4">
                    <div className="flex-grow">
                       <input value={formData.imageUrl} readOnly className="w-full bg-white/5 border border-white/10 p-4 text-white/40 text-xs mb-4" placeholder="Upload an image..." />
                       <label className="flex items-center justify-center gap-3 p-4 border border-dashed border-white/20 text-white/60 hover:text-accent hover:border-accent transition-all cursor-pointer">
                          {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                          <span className="text-xs font-bold uppercase tracking-widest">{uploading ? 'Uploading...' : 'Choose File'}</span>
                          <input type="file" className="hidden" onChange={handleImageUpload} />
                       </label>
                    </div>
                    <div className="w-32 h-32 bg-charcoal border border-white/10 overflow-hidden">
                        {formData.imageUrl && <img src={formData.imageUrl} className="w-full h-full object-cover" />}
                    </div>
                  </div>
                </div>

                <button className="w-full py-5 bg-primary text-white font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl">
                  {editingProduct ? 'Save Changes' : 'Add Item to Menu'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
  );
};

export default AdminMenuPage;
