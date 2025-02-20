import { d as defineMiddleware, s as sequence } from './chunks/index_C4b-IsDM.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CGyNwpcb.mjs';
import 'kleur/colors';
import './chunks/astro/server_u1eknVN-.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  try {
    const response = await next();
    return response;
  } catch (error) {
    console.error("Middleware caught error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    return new Response(`Server Error: ${error.message}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
