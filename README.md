
# SKIINBOX — Demo con Test funcional + Mock de pago

Esta versión incluye:
- Test de estilo que guarda respuestas en `data/profiles.json` mediante `/api/save-profile`.
- Mock de pago (visual) que registra pagos en `data/payments.json` mediante `/api/mock-pay`.
- Frontend Next.js + Tailwind, listo para correr localmente.

## Ejecutar
1. `npm install`
2. `npm run dev`
3. Abrir http://localhost:3000

## Notas
- El mock de pago **no procesa dinero**. Simula el flujo y almacena un registro en `data/payments.json`.
- Para integrar un pago real usa Stripe/PayU/Culqi en el endpoint `/api/create-checkout-session`.
