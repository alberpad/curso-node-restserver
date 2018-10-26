const jwt = require('jsonwebtoken');
// Verificar Token
let verificaToken = (req: any, res: any, next: any) => {
  let token = req.get('token');
  jwt.verify(token, process.env.SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
};

//Verifica AdminRole
let verificaAdminRole = (req: any, res: any, next: any) => {
  let usuario = req.usuario;
  if (usuario.role === 'ADMIN_ROLE') {
    next();
  } else {
    return res.json({
      ok: false,
      message: 'El usuario no es adminsitrador'
    });
  }
};

// export default verificaToken;
module.exports = {
  verificaToken,
  verificaAdminRole
};
