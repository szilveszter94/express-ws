// TODO 1: express

// TODO 3: middlewares

function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}

// TODO 11: routes

// TODO 4: send response to client "Popular programming languages API 2.0"

// TODO 2: main function
