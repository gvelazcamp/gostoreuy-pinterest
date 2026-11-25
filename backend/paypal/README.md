# PayPal Sandbox · Gostoreuy

La web pública sigue sin cobrar. Este código implementa el inicio de una orden, aprobación en PayPal y captura verificada exclusivamente en sandbox. Los precios se validan en el servidor con el catálogo fijo; no se aceptan importes del navegador. No entrega archivos.

## Activación de pruebas
1. Crear una app Sandbox en https://developer.paypal.com/dashboard/applications/sandbox (cuenta propia).
2. Crear un proyecto Supabase exclusivo de Gostoreuy (no reutilizar Girá y Adiviná).
3. En Edge Functions > Secrets, configurar PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET y CHECKOUT_SIGNING_KEY (aleatoria, mínimo 32 caracteres). No poner secretos en GitHub, el chat ni el frontend.
4. Desplegar index.ts de esta carpeta como función gostoreuy-paypal, con verificación JWT desactivada para checkout de invitados. El código aplica validación de origen y firma de pedido; CORS no es autenticación ni límite de abuso. Solo pruebas.
5. Configurar en paypal-config.js la URL HTTPS del endpoint /functions/v1/gostoreuy-paypal. Probar con una cuenta comprador Sandbox; nunca dinero real.

## Antes de producción
Se requieren pruebas reales de sandbox, rate limiting, persistencia de órdenes y recibos idempotentes, webhooks verificados y control de propiedad/autorización de descargas, almacenamiento privado de archivos finales, políticas de venta y derechos comerciales. Actualizar el catálogo del servidor al cambiar productos/precios. Mantener los pagos reales deshabilitados hasta completar todo.
