/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Ticket, Clock, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const TICKET_PRICE = 22;
const MAX_TICKETS = 10;

interface BookingState {
  name: string;
  tickets: number;
  date: string;
  time: string;
}

export default function App() {
  const [booking, setBooking] = useState<BookingState>({
    name: '',
    tickets: 1,
    date: new Date().toISOString().split('T')[0],
    time: '10:00'
  });

  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const totalPrice = booking.tickets * TICKET_PRICE;

  const validateNameString = (name: string) => {
    if (name.length > 0 && !/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Inserire solo lettere");
      return false;
    }
    setNameError(null);
    return true;
  };

  const checkAvailability = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDay(); // 0 (Sun) to 6 (Sat)
    const [hours, minutes] = timeStr.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;

    // Tuesday (2) is closed
    if (day === 2) return "Ingresso non disponibile (Chiuso il Martedì)";

    // Friday (5): 9:00 - 21:45
    if (day === 5) {
      if (timeInMinutes < 9 * 60 || timeInMinutes > 21 * 60 + 45) {
        return "Ingresso non disponibile (Venerdì: 9:00-21:45)";
      }
    } else {
      // Mon, Wed, Thu, Sat, Sun: 9:00 - 18:00
      if (timeInMinutes < 9 * 60 || timeInMinutes > 18 * 60) {
        return "Ingresso non disponibile (9:00-18:00)";
      }
    }

    return null;
  };

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate Name
    if (!booking.name.trim()) {
      setError("Inserire il nome del visitatore");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(booking.name)) {
      setError("Il nome può contenere solo lettere");
      return;
    }

    // Validate Tickets
    if (booking.tickets > MAX_TICKETS) {
      setError("Numero massimo superato");
      return;
    }

    if (booking.tickets < 1) {
      setError("Inserire almeno un biglietto");
      return;
    }

    // Validate Time
    const timeError = checkAvailability(booking.date, booking.time);
    if (timeError) {
      setError(timeError);
      return;
    }

    // If all pass
    setSuccess(true);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-louvre-cream overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full bg-louvre-cream text-louvre-dark flex overflow-hidden relative"
      >
        {/* Left Side: Brand & Visual */}
        <div className="w-1/2 p-12 flex flex-col justify-between relative border-r border-louvre-gold/30 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1499856126354-53941ec5562d?q=80&w=3540&auto=format&fit=crop" 
              alt="Louvre Museum" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to a solid color if image fails
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-louvre-dark/40 backdrop-blur-[2px]"></div>
          </div>

          <div className="z-10 text-louvre-cream">
            <p className="text-louvre-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-3">PRENOTAZIONE</p>
            <h1 className="text-6xl font-serif leading-tight italic">Musée du Louvre</h1>
            <div className="w-16 h-[1px] bg-louvre-gold mt-6"></div>
          </div>
          
          <div className="z-10 text-louvre-cream">
            <p className="text-lg text-louvre-cream/80 leading-relaxed mb-10 font-serif italic max-w-sm">
              "L'arte è un appello a cui troppi non rispondono."
            </p>
            <div className="text-xs uppercase tracking-widest text-louvre-gold flex flex-col gap-4 font-bold">
              <div className="flex items-center gap-3">
                <Clock size={16} />
                <span>LUN, MER, GIO, SAB, DOM: 9:00 – 18:00</span>
              </div>
              <div className="flex items-center gap-3 text-louvre-cream">
                <Clock size={16} />
                <span>VENERDÌ: 9:00 – 21:45</span>
              </div>
              <div className="flex items-center gap-3 opacity-40">
                <AlertCircle size={16} />
                <span>MARTEDÌ: CHIUSO</span>
              </div>
            </div>
          </div>
          
          <div className="z-10 text-louvre-cream/40 text-[10px] uppercase tracking-widest">
            Louvre Pyramid, Paris
          </div>
        </div>

        {/* Right Content: Form Area */}
        <div className="w-1/2 p-20 flex flex-col justify-center relative bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div 
                key="form-container"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-md mx-auto w-full"
              >
                <header className="mb-12 text-center">
                  <h2 className="text-4xl font-serif text-louvre-dark mb-2">Biglietteria Ufficiale</h2>
                  <p className="text-louvre-gold text-[10px] uppercase tracking-[0.2em] font-bold">Ticket Tariffa Unica — 22.00 €</p>
                </header>

                <form onSubmit={handleBooking} className="space-y-8">
                  {/* Visitor Name */}
                  <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-widest text-louvre-gold mb-1 font-black">Nome del Visitatore</label>
                    <input 
                      id="visitor_name"
                      type="text" 
                      required
                      placeholder="ES. LEONARDO DA VINCI"
                      className={`w-full bg-transparent border-b border-louvre-gold/40 py-3 focus:outline-none focus:border-louvre-gold transition-all font-serif italic text-xl uppercase tracking-wider ${nameError ? 'text-red-500 border-red-500' : 'text-louvre-dark'}`}
                      value={booking.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBooking({ ...booking, name: val });
                        validateNameString(val);
                      }}
                    />
                    {nameError && (
                      <p className="text-red-500 text-[10px] uppercase mt-1 font-bold">
                        {nameError}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    {/* Ticket Count */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-louvre-gold mb-1 font-black">N. Biglietti</label>
                      <input 
                        id="tickets_count"
                        type="number" 
                        min="1" 
                        max="15" 
                        className="w-full bg-transparent border-b border-louvre-gold/40 py-3 focus:outline-none focus:border-louvre-gold transition-all font-serif italic text-xl"
                        value={booking.tickets}
                        onChange={(e) => setBooking({ ...booking, tickets: parseInt(e.target.value) || 0 })}
                      />
                      {booking.tickets > MAX_TICKETS && (
                        <p className="text-red-600 text-[10px] uppercase mt-2 font-bold flex items-center gap-1">
                          <AlertCircle size={10} /> Numero massimo superato
                        </p>
                      )}
                    </div>
                    {/* Visit Date */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-louvre-gold mb-1 font-black">Data di Visita</label>
                      <input 
                        id="visit_date"
                        type="date" 
                        className="w-full bg-transparent border-b border-louvre-gold/40 py-3 focus:outline-none focus:border-louvre-gold transition-all font-serif italic text-lg"
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Entry Time */}
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-louvre-gold mb-1 font-black">Orario d'Ingresso</label>
                    <input 
                      id="visit_time"
                      type="time" 
                      className="w-full bg-transparent border-b border-louvre-gold/40 py-3 focus:outline-none focus:border-louvre-gold transition-all font-serif italic text-xl"
                      value={booking.time}
                      onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    />
                  </div>

                  {/* General Error (Time/Day) */}
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50/50 border-l-2 border-red-600 p-3"
                      >
                        <p className="text-red-700 text-[10px] uppercase font-bold tracking-wider leading-relaxed">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Total Price Display */}
                  <div className="pt-8 border-t border-louvre-gold/10 flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-louvre-gold font-bold">Totale da Pagare</span>
                    <span className="text-5xl font-serif text-louvre-dark tracking-tighter">
                      {totalPrice.toFixed(2).replace('.', ',')} €
                    </span>
                  </div>

                  {/* Action */}
                  <button 
                    id="submit_booking"
                    type="submit"
                    className="w-full mt-4 bg-louvre-dark text-louvre-cream py-6 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-louvre-gold transition-all duration-700 shadow-lg"
                  >
                    Conferma la Prenotazione
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto w-full text-center space-y-10"
              >
                <div className="space-y-4">
                  <h3 className="text-5xl font-serif text-louvre-dark italic font-light">Merci, {booking.name.split(' ')[0]}</h3>
                  <p className="text-louvre-gold text-[10px] uppercase tracking-[0.2em] font-bold max-w-xs mx-auto leading-relaxed">
                    La tua prenotazione è stata completata con successo.
                  </p>
                </div>

                <div className="bg-[#fffcf7] border-y-8 border-louvre-dark shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col text-left">
                  {/* Decorative Side Punch Holes */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-10 bg-white rounded-r-full border-r border-louvre-gold/20"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-10 bg-white rounded-l-full border-l border-louvre-gold/20"></div>
                  
                  <div className="p-10 space-y-10">
                    <div className="flex justify-between items-start border-b border-louvre-gold/10 pb-8">
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-louvre-gold font-bold">BILLETERIE</p>
                        <p className="font-serif italic text-3xl leading-none">Musée du Louvre</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-[8px] font-bold opacity-30 uppercase mb-2">VALIDITY PASS</p>
                        <div className="bg-louvre-dark text-louvre-cream px-3 py-1 text-[10px] font-mono tracking-tighter rounded-sm">
                          #LOUVRE-{Math.floor(100000 + Math.random() * 900000)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase font-bold text-louvre-gold tracking-widest opacity-60">Visitatore</p>
                        <p className="font-serif italic text-lg uppercase truncate border-b border-louvre-gold/10 pb-1">{booking.name}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase font-bold text-louvre-gold tracking-widest opacity-60">Ingressi</p>
                        <p className="font-serif italic text-lg border-b border-louvre-gold/10 pb-1">{booking.tickets} ADULTI</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase font-bold text-louvre-gold tracking-widest opacity-60">Data Visita</p>
                        <p className="font-serif italic text-lg border-b border-louvre-gold/10 pb-1">{new Date(booking.date).toLocaleDateString('it-IT')}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase font-bold text-louvre-gold tracking-widest opacity-60">Heure d'Entrée</p>
                        <p className="font-serif italic text-lg border-b border-louvre-gold/10 pb-1">{booking.time}</p>
                      </div>
                    </div>
                    
                    <div className="pt-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase font-bold text-louvre-gold tracking-tight opacity-50">Totale Transazione</p>
                        <p className="text-3xl font-serif text-louvre-dark font-medium leading-none">{totalPrice.toFixed(2).replace('.', ',')} €</p>
                      </div>
                      <div className="flex gap-[3px] h-14 items-end opacity-90 pr-4">
                        {[4, 2, 10, 6, 12, 4, 10, 2, 4, 8, 12, 4, 2, 8, 6, 12].map((h, i) => (
                          <div key={i} className="bg-louvre-dark w-[2.5px]" style={{ height: `${h * 2.5}px` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSuccess(false)}
                  className="text-[10px] uppercase tracking-[0.5em] text-louvre-gold font-bold hover:text-louvre-dark transition-all"
                >
                  Nuova Prenotazione
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

