import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const response = await next();
    return response;
  } catch (error) {
    console.error("Middleware caught error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    });

    return new Response(`Server Error: ${error.message}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
});
