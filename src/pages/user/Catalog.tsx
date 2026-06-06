import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { CatalogProduct, Store, StoreProduct } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle2, PackageOpen, DownloadCloud, X } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Catalog() {
  const { userProfile } = useAuth();
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>([]);
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [activeProduct, setActiveProduct] = useState<CatalogProduct | null>(null);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    sellingPrice: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pSnap = await getDocs(query(collection(db, 'products')));
        const activeProducts = pSnap.docs.map(d => ({ id: d.id, ...d.data() } as CatalogProduct)).filter(p => p.status === 'active');
        setCatalogProducts(activeProducts);

        if (userProfile?.storeId) {
          const sDoc = await getDoc(doc(db, 'stores', userProfile.storeId));
          if (sDoc.exists()) {
            setStore({ id: sDoc.id, ...sDoc.data() } as Store);
            
            const spSnap = await getDocs(query(collection(db, 'storeProducts'), where('storeId', '==', userProfile.storeId), where('isActive', '==', true)));
            const myStoreProducts = spSnap.docs.map(d => ({ id: d.id, ...d.data() } as StoreProduct));
            setStoreProducts(myStoreProducts);
          }
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'products');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userProfile]);

  const openAddModal = (p: CatalogProduct) => {
    setActiveProduct(p);
    setFormState({
      title: p.title || '',
      description: p.shortDescription || p.longDescription || '',
      thumbnailUrl: p.thumbnailUrl || '',
      sellingPrice: p.basePrice || 0
    });
  };

  const handleSaveToStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !activeProduct) return;
    
    if (formState.sellingPrice < activeProduct.basePrice) {
      alert(`Selling price must be at least ₹${activeProduct.basePrice}`);
      return;
    }

    setSaving(true);
    try {
      const storeProductId = `${store.id}_${activeProduct.id}`;
      const newSp: StoreProduct = {
        id: storeProductId,
        storeId: store.id,
        catalogProductId: activeProduct.id,
        customTitle: formState.title,
        customDescription: formState.description,
        customThumbnailUrl: formState.thumbnailUrl,
        sellingPrice: formState.sellingPrice,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'storeProducts', storeProductId), newSp);
      setStoreProducts(prev => [...prev.filter(sp => sp.id !== storeProductId), newSp]);
      setActiveProduct(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'storeProducts');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFromStore = async (catalogProductId: string) => {
    if (!store) return;
    const storeProductId = `${store.id}_${catalogProductId}`;
    try {
      await updateDoc(doc(db, 'storeProducts', storeProductId), { isActive: false });
      setStoreProducts(prev => prev.filter(sp => sp.catalogProductId !== catalogProductId));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'storeProducts');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-6 w-full max-w-5xl mx-auto">
        <div className="h-10 w-64 bg-bg-surface animate-shimmer rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-bg-card rounded-2xl animate-shimmer"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pb-16">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          {store && storeProducts.length === 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-4">
              Step 2 of 2: Add Products
            </div>
          )}
          <h2 className="text-4xl font-black text-text-main tracking-tight mb-2 flex items-center gap-3">
             <DownloadCloud className="w-8 h-8 text-primary" /> Curated Catalog
          </h2>
          <p className="text-text-muted text-lg font-medium max-w-2xl">
            Plug-and-play proven winners. Add these market-tested digital products to your store with one click.
          </p>
        </div>
        {store && storeProducts.length === 0 ? (
          <div className="md:text-right shrink-0 mt-4 md:mt-0">
             <div className="text-alert font-bold bg-alert/10 px-4 py-2 rounded-xl animate-pulse text-sm">
               Select at least one product
             </div>
          </div>
        ) : (
          <div className="md:text-right shrink-0 mt-4 md:mt-0">
             <a href="/app/store" className="neo-button bg-text-main text-bg-base font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform text-sm shadow-xl">
               View Store Settings
             </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogProducts.map((p, i) => {
          const existingSp = storeProducts.find(sp => sp.catalogProductId === p.id);
          const isSelected = !!existingSp;
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={p.id} 
              className={`neo-card flex flex-col group relative overflow-hidden transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-primary border-primary shadow-[0_0_20px_rgba(57,255,20,0.15)] bg-primary/5' 
                  : 'hover:shadow-xl hover:border-border-strong bg-bg-card'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 p-4 z-10">
                   <div className="bg-primary text-bg-base text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                     <CheckCircle2 className="w-3 h-3" /> ACTIVE ON STORE
                   </div>
                </div>
              )}
              
              <div className="aspect-video bg-bg-surface relative overflow-hidden rounded-t-2xl">
                 {p.thumbnailUrl ? (
                    <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted bg-gradient-to-br from-bg-surface to-bg-card">
                       <PackageOpen className="w-12 h-12 mb-2 opacity-30" />
                    </div>
                  )}
                 {/* Premium overlay gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight leading-tight">{p.title}</h3>
                <p className="text-sm text-text-muted line-clamp-2 mb-6 font-medium leading-relaxed">{p.shortDescription}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-xs text-text-muted font-bold tracking-wider uppercase mb-0.5">Base Margin</span>
                     <div className="flex items-center gap-1 text-text-main font-black text-xl">
                       ₹{p.basePrice?.toFixed(2) || '0.00'}
                     </div>
                  </div>
                  <button
                    disabled={!store}
                    onClick={() => isSelected ? handleRemoveFromStore(p.id) : openAddModal(p)}
                    className={`h-11 px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      isSelected 
                        ? 'bg-alert/10 text-alert hover:bg-alert/20' 
                        : 'bg-text-main text-bg-base hover:scale-105 shadow-md active:scale-95'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Setup & Add'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
        {catalogProducts.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
             <PackageOpen className="w-16 h-16 text-text-muted opacity-30 mb-4" />
             <h3 className="text-xl font-bold text-text-main mb-2">No Products Available</h3>
             <p className="text-text-muted">The admin has not uploaded any curated products yet.</p>
          </div>
        )}
      </div>

      {/* Add/Edit StoreProduct Modal */}
      <AnimatePresence>
        {activeProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               onClick={() => !saving && setActiveProduct(null)}
             />
             <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-bg-card border border-border-subtle rounded-3xl shadow-2xl relative w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
             >
                <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between shrink-0">
                  <h3 className="text-xl font-bold text-text-main">Customize Product Listing</h3>
                  <button onClick={() => !saving && setActiveProduct(null)} className="p-2 hover:bg-bg-surface rounded-full text-text-muted">
                     <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <form id="add-product-form" onSubmit={handleSaveToStore} className="space-y-6">
                      <div className="neo-card p-4 bg-primary/5 border border-primary/20 mb-6 flex items-start gap-4">
                        <div className="shrink-0 mt-1"><CheckCircle2 className="w-5 h-5 text-primary" /></div>
                        <div>
                          <p className="text-sm text-text-main font-bold">Base Price: ₹{activeProduct.basePrice}</p>
                          <p className="text-xs text-text-muted mt-1">This is the minimum price. Anything above this is your profit, split 80% to you and 20% system fee.</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-text-main mb-2">Selling Price (₹)</label>
                        <input 
                           type="number" 
                           min={activeProduct.basePrice} 
                           required 
                           value={formState.sellingPrice || ''} 
                           onChange={e => setFormState({...formState, sellingPrice: Number(e.target.value)})} 
                           className="neo-input w-full h-12 text-lg font-black" 
                        />
                        {formState.sellingPrice > activeProduct.basePrice && (
                          <div className="mt-2 text-xs font-bold text-primary">
                             Est. Profit per sale: ₹{((formState.sellingPrice - activeProduct.basePrice) * 0.8).toFixed(2)}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-border-subtle">
                         <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Overrides (Optional)</h4>
                         
                         <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-text-main mb-1">Custom Title</label>
                              <input type="text" value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="neo-input w-full" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-text-main mb-1">Custom Description</label>
                              <textarea rows={3} value={formState.description} onChange={e => setFormState({...formState, description: e.target.value})} className="neo-input w-full resize-none p-3 text-sm" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-text-main mb-1">Custom Thumbnail Image URL</label>
                              <input type="url" value={formState.thumbnailUrl} onChange={e => setFormState({...formState, thumbnailUrl: e.target.value})} className="neo-input w-full" placeholder="https://..." />
                            </div>
                         </div>
                      </div>
                    </form>
                </div>
                <div className="p-6 border-t border-border-subtle flex justify-end gap-3 shrink-0">
                   <button type="button" onClick={() => setActiveProduct(null)} className="px-6 py-3 rounded-xl text-sm font-bold hover:bg-bg-surface text-text-muted">Cancel</button>
                   <button type="submit" form="add-product-form" disabled={saving} className="neo-button px-8 py-3 bg-text-main text-bg-base text-sm rounded-xl font-bold">
                     {saving ? 'Adding...' : 'Add to Store'}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
