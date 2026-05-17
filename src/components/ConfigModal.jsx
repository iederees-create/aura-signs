import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ConfigModal({ isOpen, onClose, product, onConfirm }) {
  const { t } = useLanguage();

  if (!isOpen || !product) return null;

  const [options, setOptions] = useState({});
  const [customNotes, setCustomNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Set default options based on the product
  useEffect(() => {
    setCustomNotes('');
    setQuantity(1);
    
    const name = product.name.toLowerCase();
    
    if (name.includes('wedding signage') || name.includes('acrylic displays') || name.includes('qr code')) {
      setOptions({
        material: 'Clear Acrylic',
        size: 'A1 (841 x 594 mm)',
        color: 'Ivory text'
      });
    } else if (name.includes('seating charts')) {
      setOptions({
        material: 'Clear Acrylic',
        guests: '50 - 100 guests',
        size: 'A1'
      });
    } else if (name.includes('mirror')) {
      setOptions({
        type: 'Gold Mirror',
        size: 'A1'
      });
    } else if (name.includes('stationery')) {
      setOptions({
        itemType: 'Invitations',
        paperStock: 'Premium Matte'
      });
      setQuantity(50);
    } else if (name.includes('backdrops') || name.includes('hire')) {
      setOptions({
        backdropType: 'Arch Board',
        hireDuration: '1 Day'
      });
    } else if (name.includes('balloon')) {
      setOptions({
        length: '3 Meters',
        density: 'Standard Organic'
      });
    } else if (name.includes('business cards')) {
      setOptions({
        cardStock: 'Premium Matte (350gsm)',
        finish: 'Soft-touch lamination'
      });
      setQuantity(250);
    } else if (name.includes('stickers') || name.includes('labels')) {
      setOptions({
        shape: 'Round',
        size: '50mm diameter'
      });
      setQuantity(500);
    } else if (name.includes('decals') || name.includes('window')) {
      setOptions({
        vinylType: 'Permanent Outdoor',
        installation: 'DIY Application'
      });
    } else {
      setOptions({
        requirements: 'Custom design consultation'
      });
    }
  }, [product]);

  const handleOptionChange = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onConfirm({
      name: product.name,
      type: product.type || 'Custom Service',
      options: {
        ...options,
        quantity: quantity.toString()
      },
      customNotes
    });
    onClose();
  };

  const name = product.name.toLowerCase();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#080806] border border-[#E8DFD0]/10 rounded-2xl text-[#E8DFD0] shadow-2xl flex flex-col max-h-[76vh] overflow-hidden z-10 animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E8DFD0]/10 flex items-center justify-between">
          <div>
            <span className="text-[#C9A96E] text-xs font-medium uppercase tracking-widest">{t('config.configureOption')}</span>
            <h3 className="font-serif text-2xl tracking-wide mt-1">{product.name}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#E8DFD0]/5 rounded-full transition-colors text-[#E8DFD0]/60 hover:text-[#E8DFD0]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Dynamic Configuration Form Options */}
          
          {/* Group 1: Signage Materials, Sizes, Colors */}
          {(name.includes('wedding signage') || name.includes('acrylic displays') || name.includes('qr code')) && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.material')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Clear Acrylic', 'Frosted Acrylic', 'Gold Mirror', 'Foam Board'].map((mat) => (
                    <button
                      key={mat}
                      onClick={() => handleOptionChange('material', mat)}
                      className={`py-3 px-4 text-sm text-left border rounded-lg transition-all ${options.material === mat ? 'bg-[#E8DFD0]/10 border-[#C9A96E] text-[#E8DFD0]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/60 hover:border-[#E8DFD0]/20'}`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.size')}</label>
                <select
                  value={options.size}
                  onChange={(e) => handleOptionChange('size', e.target.value)}
                  className="w-full bg-[#080806] text-[#E8DFD0] border border-[#E8DFD0]/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                >
                  <option className="bg-[#080806] text-[#E8DFD0]" value="A1 (841 x 594 mm)">A1 (841 x 594 mm) — Recommended for welcomes</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="A2 (594 x 420 mm)">A2 (594 x 420 mm)</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="A3 (420 x 297 mm)">A3 (420 x 297 mm)</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Custom size">Custom Dimensions (mention in details below)</option>
                </select>
              </div>
            </div>
          )}

          {/* Group 2: Seating Charts */}
          {name.includes('seating charts') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.guestCount')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Under 50 guests', '50 - 100 guests', '100 - 150 guests', '150+ guests'].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleOptionChange('guests', g)}
                      className={`py-3 px-4 text-sm text-left border rounded-lg transition-all ${options.guests === g ? 'bg-[#E8DFD0]/10 border-[#C9A96E] text-[#E8DFD0]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/60 hover:border-[#E8DFD0]/20'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.baseMaterial')}</label>
                <select
                  value={options.material}
                  onChange={(e) => handleOptionChange('material', e.target.value)}
                  className="w-full bg-[#080806] text-[#E8DFD0] border border-[#E8DFD0]/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                >
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Clear Acrylic">Clear Acrylic Board</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Frosted Acrylic">Frosted Acrylic Board</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Gold Mirror">Luxury Gold Mirror</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Eco Foam Board">Eco-friendly Foam Board</option>
                </select>
              </div>
            </div>
          )}

          {/* Group 3: Mirror and Vinyl Signage */}
          {name.includes('mirror') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.mirrorStyle')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Gold Mirror', 'Silver Mirror', 'Rose Gold Mirror', 'Bespoke Vintage Mirror'].map((mir) => (
                    <button
                      key={mir}
                      onClick={() => handleOptionChange('type', mir)}
                      className={`py-3 px-4 text-sm text-left border rounded-lg transition-all ${options.type === mir ? 'bg-[#E8DFD0]/10 border-[#C9A96E] text-[#E8DFD0]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/60 hover:border-[#E8DFD0]/20'}`}
                    >
                      {mir}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 4: Wedding Stationery */}
          {name.includes('stationery') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.stationeryItem')}</label>
                <select
                  value={options.itemType}
                  onChange={(e) => handleOptionChange('itemType', e.target.value)}
                  className="w-full bg-[#080806] text-[#E8DFD0] border border-[#E8DFD0]/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                >
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Invitations">Main Wedding Invitations</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Menus">Table Menus</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Place Cards">Name / Place Cards</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Ceremony Programs">Service / Ceremony Programs</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Complete Suite">Complete Stationery Suite</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.paperStock')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Premium Matte', 'Linen Textured', 'Handmade Deckled Edge', 'Metallic Pearl'].map((stock) => (
                    <button
                      key={stock}
                      onClick={() => handleOptionChange('paperStock', stock)}
                      className={`py-3 px-4 text-sm text-left border rounded-lg transition-all ${options.paperStock === stock ? 'bg-[#E8DFD0]/10 border-[#C9A96E] text-[#E8DFD0]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/60 hover:border-[#E8DFD0]/20'}`}
                    >
                      {stock}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 5: Backdrops & Hire */}
          {(name.includes('backdrops') || name.includes('hire')) && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.backdropType')}</label>
                <select
                  value={options.backdropType}
                  onChange={(e) => handleOptionChange('backdropType', e.target.value)}
                  className="w-full bg-[#080806] text-[#E8DFD0] border border-[#E8DFD0]/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                >
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Arch Board">Wooden Arch Backdrop Board</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Sail Board Panel">Modern Sail Board Panel (Set of 2)</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Circle Ring Mesh">Golden Circle Ring / Mesh Frame</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Shimmer Wall">Glitter Shimmer Wall Panels</option>
                </select>
              </div>
            </div>
          )}

          {/* Group 6: Balloon Garlands */}
          {name.includes('balloon') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.length')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['2 Meters', '3 Meters', '4+ Meters'].map((len) => (
                    <button
                      key={len}
                      onClick={() => handleOptionChange('length', len)}
                      className={`py-3 px-4 text-xs text-center border rounded-lg transition-all ${options.length === len ? 'bg-[#E8DFD0]/10 border-[#C9A96E] text-[#E8DFD0]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/60 hover:border-[#E8DFD0]/20'}`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 7: Business Cards */}
          {name.includes('business cards') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.finishOptions')}</label>
                <select
                  value={options.finish}
                  onChange={(e) => handleOptionChange('finish', e.target.value)}
                  className="w-full bg-[#080806] text-[#E8DFD0] border border-[#E8DFD0]/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                >
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Soft-touch lamination">Luxury Soft-touch Lamination (Velvet feel)</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Spot UV detailing">Premium Matte + Spot UV Gloss Details</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Gold foil stamping">Gold / Silver Foil Stamped Accents</option>
                  <option className="bg-[#080806] text-[#E8DFD0]" value="Standard Silk">Standard Silk Matte (Classic)</option>
                </select>
              </div>
            </div>
          )}

          {/* Group 8: Stickers & Packaging */}
          {name.includes('stickers') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.shape')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Round', 'Square', 'Custom Die-cut'].map((sh) => (
                    <button
                      key={sh}
                      onClick={() => handleOptionChange('shape', sh)}
                      className={`py-3 px-4 text-xs text-center border rounded-lg transition-all ${options.shape === sh ? 'bg-[#E8DFD0]/10 border-[#C9A96E] text-[#E8DFD0]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/60 hover:border-[#E8DFD0]/20'}`}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Group 9: Window Decals */}
          {name.includes('decals') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider mb-2">{t('config.installationType')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {['DIY Application', 'Professional installation requested'].map((inst) => (
                    <button
                      key={inst}
                      onClick={() => handleOptionChange('installation', inst)}
                      className={`py-3 px-4 text-sm text-left border rounded-lg transition-all ${options.installation === inst ? 'bg-[#E8DFD0]/10 border-[#C9A96E] text-[#E8DFD0]' : 'bg-[#E8DFD0]/5 border-[#E8DFD0]/10 text-[#E8DFD0]/60 hover:border-[#E8DFD0]/20'}`}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="pt-4 border-t border-[#E8DFD0]/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider">{t('config.quantity')}</span>
            <div className="flex items-center gap-4 bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 rounded-full px-4 py-2">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - (name.includes('card') || name.includes('sticker') ? 50 : 1)))}
                className="text-[#E8DFD0]/60 hover:text-[#E8DFD0] transition-colors font-semibold"
              >
                —
              </button>
              <span className="font-serif font-medium w-12 text-center text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + (name.includes('card') || name.includes('sticker') ? 50 : 1))}
                className="text-[#E8DFD0]/60 hover:text-[#E8DFD0] transition-colors font-semibold"
              >
                +
              </button>
            </div>
          </div>

          {/* Details / Text area */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#E8DFD0]/60 uppercase tracking-wider">{t('config.customNotesLabel')}</label>
            <textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder={t('config.customNotesPlaceholder')}
              className="w-full h-24 bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 rounded-lg p-4 text-[#E8DFD0] placeholder-[#E8DFD0]/30 focus:border-[#C9A96E]/50 focus:outline-none transition-colors text-sm resize-none"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#E8DFD0]/10 bg-black/20 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-[#E8DFD0]/10 py-3.5 hover:bg-[#E8DFD0]/5 transition-colors uppercase tracking-widest text-xs font-medium rounded-lg"
          >
            {t('config.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 btn-primary py-3.5 flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase rounded-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            {t('config.addToQuote')}
          </button>
        </div>

      </div>
    </div>
  );
}
