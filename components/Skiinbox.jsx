
import React, { useEffect, useRef, useState } from 'react';

export default function SKIINBOX() {
  const heroRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [profileStatus, setProfileStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    const onScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrolled * 0.12}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const plans = [
    { name: 'Básico', price: 5, display: '$5' },
    { name: 'Estándar', price: 20, display: '$20' },
    { name: 'Premium', price: 25, display: '$25' },
  ];

  async function handleSubmitProfile(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      nombre: form.nombre.value,
      ocasiones: form.occasions.value,
      colores: form.colores.value,
      prioridad: form.prioridad.value,
      presupuesto: form.presupuesto.value,
      talla_arriba: form.talla_arriba.value,
      talla_abajo: form.talla_abajo.value,
      timestamp: new Date().toISOString()
    };
    setProfileStatus('Guardando...');
    try {
      const res = await fetch('/api/save-profile', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(data)
      });
      const j = await res.json();
      if (res.ok) {
        setProfileStatus('Perfil guardado ✅');
      } else {
        setProfileStatus('Error al guardar: ' + j.message);
      }
    } catch (err) {
      setProfileStatus('Error de red: ' + err.message);
    }
  }

  function openCheckout(plan) {
    setSelectedPlan(plan);
    setModalOpen(true);
    setPaymentStatus('');
  }

  async function confirmMockPayment() {
    setPaymentStatus('Procesando pago...');
    try {
      const res = await fetch('/api/mock-pay', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          plan: selectedPlan.name,
          amount: selectedPlan.price,
          timestamp: new Date().toISOString()
        })
      });
      const j = await res.json();
      if (res.ok) {
        setPaymentStatus('Pago simulado realizado ✅ (ID: ' + j.paymentId + ')');
        setModalOpen(false);
      } else {
        setPaymentStatus('Error pago: ' + j.message);
      }
    } catch (err) {
      setPaymentStatus('Error de red: ' + err.message);
    }
  }

  return (
    <div className="min-h-screen font-ui text-gray-800 bg-[#FAF6F0]">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#060606] flex items-center justify-center text-white font-medium">SB</div>
            <span className="text-xl font-serif">SKIINBOX</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#how" className="hover:text-[#0b3b66]">Cómo funciona</a>
            <a href="#plans" className="hover:text-[#0b3b66]">Planes</a>
            <a href="#lookbook" className="hover:text-[#0b3b66]">Lookbook</a>
            <a href="#test" className="hover:text-[#0b3b66]">Test de estilo</a>
            <button className="px-4 py-2 border rounded-md text-sm" style={{ borderColor:'#C9A36B' }}>Iniciar sesión</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden>
            <div ref={heroRef} className="w-full h-full transform transition-transform duration-700 ease-out">
              <img src="/assets/hero.jpg" alt="Hero SKIINBOX" className="w-full h-[70vh] object-cover opacity-95" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF6F0]/80" />
          </div>
          <div className="relative max-w-6xl mx-auto px-6 py-28">
            <div className="max-w-2xl reveal transition duration-600 opacity-0 translate-y-6">
              <h1 className="text-5xl leading-tight font-serif text-[#060606]">SKIINBOX — Moda que te entiende</h1>
              <p className="mt-6 text-lg text-gray-700">Asesoría de estilo y prendas de alta costura seleccionadas para ti. Sin esfuerzo.</p>
              <div className="mt-8 flex gap-4">
                <a href="#test" className="inline-flex items-center px-6 py-3 rounded-md font-medium" style={{ background:'#060606', color:'#FAF6F0' }}>Hacer test de estilo</a>
                <a href="#plans" className="inline-flex items-center px-6 py-3 rounded-md border" style={{ borderColor:'#C9A36B' }}>Ver planes</a>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="reveal opacity-0 translate-y-6 transition">
              <h2 className="text-3xl font-serif">Cómo funciona</h2>
              <p className="mt-4 text-gray-700">Personalización híbrida: IA + estilistas humanos. Rápido, simple y con sentido.</p>

              <ol className="mt-6 space-y-4 text-gray-700">
                <li><strong>Paso 1 — Test de estilo:</strong> Responde nuestro test interactivo y sube una foto si quieres.</li>
                <li><strong>Paso 2 — Selección:</strong> IA y estilista crean una caja con prendas sugeridas.</li>
                <li><strong>Paso 3 — Recibe y decide:</strong> Pruébate en casa, paga lo que te quedas y devuelve el resto.</li>
              </ol>
            </div>

            <div className="reveal opacity-0 translate-y-6 transition">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src="/assets/how-1.jpg" alt="Cómo funciona" className="w-full h-72 object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="plans" className="bg-white/60 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-serif mb-6">Planes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map(p => (
                <div key={p.name} className="reveal bg-[#FAF6F0] border rounded-2xl p-6 shadow-sm opacity-0 translate-y-6 transition">
                  <h4 className="font-serif text-xl">{p.name}</h4>
                  <p className="mt-2 text-3xl font-semibold">${p.price}</p>
                  <ul className="mt-4 space-y-2 text-gray-600">
                    <li>• Suscripción mensual</li>
                    <li>• Selección curada por estilista + IA</li>
                  </ul>
                  <div className="mt-6">
                    <button onClick={() => openCheckout(p)} className="px-5 py-2 rounded-md font-medium border" style={{ borderColor:'#C9A36B' }}>Suscribirme — ${p.price}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="lookbook" className="max-w-6xl mx-auto px-6 py-16">
          <h3 className="text-2xl font-serif mb-6">Lookbook</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <figure key={i} className="overflow-hidden rounded-xl reveal opacity-0 translate-y-6 transition">
                <img src={`/assets/lookbook-${i+1}.jpg`} alt={`Look ${i+1}`} className="w-full h-64 object-cover" />
              </figure>
            ))}
          </div>
        </section>

        <section id="test" className="bg-white/60 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-2xl font-serif mb-4">Test de estilo</h3>
            <p className="text-gray-700">Responde estas preguntas para definir tu perfil. (Los datos se guardan en el servidor - mock)</p>

            <form onSubmit={handleSubmitProfile} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nombre" placeholder="Nombre" className="p-2 border rounded-md md:col-span-2" required />
              <label className="flex flex-col text-sm">
                Ocasiones principales
                <select name="occasions" className="mt-2 p-2 border rounded-md">
                  <option>Oficina</option>
                  <option>Casual</option>
                  <option>Eventos</option>
                  <option>Deportivo</option>
                </select>
              </label>

              <label className="flex flex-col text-sm">
                Colores preferidos
                <input name="colores" placeholder="Neutros, azules, tierra" className="mt-2 p-2 border rounded-md" />
              </label>

              <label className="flex flex-col text-sm">
                ¿Qué priorizas?
                <select name="prioridad" className="mt-2 p-2 border rounded-md">
                  <option>Comodidad</option>
                  <option>Tendencia</option>
                  <option>Marca</option>
                  <option>Sostenibilidad</option>
                </select>
              </label>

              <label className="flex flex-col text-sm">
                Presupuesto por prenda
                <input name="presupuesto" placeholder="S/ 100 - S/ 400" className="mt-2 p-2 border rounded-md" />
              </label>

              <label className="flex flex-col text-sm">
                Talla - arriba
                <input name="talla_arriba" placeholder="M, L, S" className="mt-2 p-2 border rounded-md" />
              </label>

              <label className="flex flex-col text-sm">
                Talla - abajo
                <input name="talla_abajo" placeholder="32, 34, S" className="mt-2 p-2 border rounded-md" />
              </label>

              <div className="md:col-span-2">
                <button type="submit" className="px-6 py-3 rounded-md" style={{ background:'#060606', color:'#FAF6F0' }}>Generar perfil</button>
                <span className="ml-4 text-sm text-green-700">{profileStatus}</span>
              </div>
            </form>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 reveal opacity-0 translate-y-6 transition">
          <h3 className="text-2xl font-serif mb-4">Nuestra filosofía</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold">Misión</h4>
              <p className="mt-2">El arte de vestir con propósito. Elevamos la experiencia de vestirse combinando sensibilidad artesanal y tecnología.</p>
            </div>
            <div>
              <h4 className="font-semibold">Visión</h4>
              <p className="mt-2">Humanizar la moda del futuro: lujo consciente y tecnología con alma.</p>
            </div>
          </div>
        </section>

        <footer className="border-t py-8 mt-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#060606] flex items-center justify-center text-white">SB</div>
                <div>
                  <div className="font-serif">SKIINBOX</div>
                  <div className="text-sm text-gray-600">Moda por suscripción · Perú</div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 max-w-sm">© {new Date().getFullYear()} SKIINBOX. Todos los derechos reservados.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <a className="block">Términos</a>
                <a className="block mt-2">Privacidad</a>
                <a className="block mt-2">Envíos</a>
              </div>
              <div>
                <a className="block">Contacto</a>
                <a className="block mt-2">FAQ</a>
                <a className="block mt-2">Blog</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Mock checkout modal */}
      {modalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h4 className="text-xl font-semibold">Suscripción — {selectedPlan.name}</h4>
            <p className="mt-2">Precio: ${selectedPlan.price} / mes</p>
            <p className="mt-4 text-sm text-gray-600">Este es un pago simulado para demo. No se procesará dinero real.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={confirmMockPayment} className="px-4 py-2 rounded-md" style={{ background:'#060606', color:'#FAF6F0' }}>Pagar ${selectedPlan.price}</button>
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-md border">Cancelar</button>
            </div>
            <div className="mt-4 text-sm text-green-700">{paymentStatus}</div>
          </div>
        </div>
      )}

      <style jsx>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .reveal { transition: opacity 600ms ease, transform 600ms cubic-bezier(.22,.9,.2,1); }
        .reveal.revealed, .reveal.revealed.revealed { opacity: 1 !important; transform: translateY(0) !important; }
        .revealed { opacity: 1; transform: translateY(0); }
        .reveal { opacity: 0; transform: translateY(12px); }
      `}</style>
    </div>
  );
}
