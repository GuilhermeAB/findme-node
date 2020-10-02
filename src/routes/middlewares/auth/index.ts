import jwt from 'jsonwebtoken';

export default function (req: any, res: any, next: any): any {
  const token = (req.cookies && req.cookies.token) || '';

  try {
    if (!token) {
      res.status(401).json({
        messages: {
          errors: ['Necessário realizar login'],
        },
      });
    } else {
      jwt.verify(req.cookies.token, process.env.SECRET_TOKEN_KEY || '', (err: any, decodedToken: any) => {
        if (!err) {
          req.userAccountId = decodedToken.id;
        }
      });

      next();
    }
  } catch (e) {
    res.status(500).json({
      messages: {
        errors: [e.toString()],
      },
    });
  }
}
