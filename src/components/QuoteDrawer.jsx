import React, { useState } from 'react';
import { useQuote } from '../context/QuoteContext';

export default function QuoteDrawer() {
  const { basket, isDrawerOpen, closeDrawer, removeFromBasket, updateItem } = useQuote();
  const [generalNotes, setGeneralNotes] = useState('');

  if (!isDrawerOpen) return null;

  const compileWhatsAppMessage = () => {
    let msg = `Hi Bespoke! 🎨✨\n\nI would like to request a custom signage & styling quote for the following items:\n\n`;
    basket.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}*\n`;
      if (item.options) {
        Object.entries(item.options).forEach(([key, val]) => {
          if (val) {
            // Capitalize key
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            msg += `   • ${label}: ${val}\n`;
          }
        });
      }
      if (item.customNotes) {
        msg += `   • Details: "${item.customNotes}"\n`;
      }
      msg += `\n`;
    });

    if (generalNotes.trim()) {
      msg += `*Additional Event Details / Date:*\n"${generalNotes.trim()}"\n\n`;
    }
    msg += `Thank you! Can't wait to hear back.`;
    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    const encoded = compileWhatsAppMessage();
    window.open(`https://wa.me/27662720491?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-lg h-full bg-[#080806] border-l border-[#E8DFD0]/10 flex flex-col text-[#E8DFD0] shadow-2xl z-10 animate-slide-in">
        
        {/* Header */}
        <div className="p-8 border-b border-[#E8DFD0]/10 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl tracking-wide">Quote Basket</h2>
            <p className="text-[#C9A96E] text-xs mt-1">{basket.length} {basket.length === 1 ? 'item' : 'items'} selected</p>
          </div>
          <button 
            onClick={closeDrawer}
            className="p-2 hover:bg-[#E8DFD0]/5 rounded-full transition-colors text-[#E8DFD0]/60 hover:text-[#E8DFD0]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {basket.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
              <svg className="text-[#C9A96E]/30" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <div>
                <p className="font-serif text-lg">Your basket is empty</p>
                <p className="text-[#E8DFD0]/40 text-sm mt-1">Browse our services and click 'Add to Basket' to configure your custom signs.</p>
              </div>
              <button 
                onClick={closeDrawer}
                className="btn-primary mt-4 py-3 px-6 text-sm"
              >
                Start building
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {basket.map((item) => (
                  <div key={item.id} className="p-5 bg-[#E8DFD0]/5 rounded-xl border border-[#E8DFD0]/5 flex gap-4 relative group">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="font-serif text-lg tracking-wide text-[#E8DFD0]">{item.name}</h4>
                        {item.type && <span className="text-xs text-[#C9A96E] uppercase tracking-wider">{item.type}</span>}
                      </div>

                      {/* Configured options */}
                      {item.options && Object.keys(item.options).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(item.options).map(([key, val]) => (
                            val && (
                              <div key={key} className="text-xs bg-[#E8DFD0]/10 border border-[#E8DFD0]/5 px-2.5 py-1 rounded-full text-[#E8DFD0]/80">
                                <span className="text-[#C9A96E] mr-1">{key}:</span> {val}
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      {/* Custom details / text */}
                      {item.customNotes && (
                        <p className="text-xs italic text-[#E8DFD0]/60 bg-black/20 p-3 rounded-lg border border-[#E8DFD0]/5">
                          "{item.customNotes}"
                        </p>
                      )}
                    </div>

                    <button 
                      onClick={() => removeFromBasket(item.id)}
                      className="text-[#E8DFD0]/40 hover:text-red-400 p-2 self-start rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Remove item"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* General Note */}
              <div className="space-y-3 pt-6 border-t border-[#E8DFD0]/10">
                <label className="block text-sm font-medium text-[#E8DFD0]/80">Event Details & Date (Optional)</label>
                <textarea 
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="e.g. Wedding Date: 2026-10-18, Palette: Sage & Gold, Venue: Cape Town..."
                  className="w-full h-28 bg-[#E8DFD0]/5 border border-[#E8DFD0]/10 rounded-xl p-4 text-[#E8DFD0] placeholder-[#E8DFD0]/30 focus:border-[#C9A96E]/50 focus:outline-none transition-colors text-sm resize-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {basket.length > 0 && (
          <div className="p-8 border-t border-[#E8DFD0]/10 space-y-4 bg-black/40">
            <div className="text-center text-xs text-[#E8DFD0]/50">
              ⚡ Selected items will compile into a WhatsApp message.
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-3 text-base shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.864L.053 23.27a.75.75 0 00.917.928l5.521-1.448A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.944-1.352l-.354-.211-3.674.964.979-3.567-.231-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
              Request Quote via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
