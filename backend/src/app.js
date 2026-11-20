require('dotenv').config();const express=require('express');const cors=require('cors');const path=require('path');const app=express();const allowedOrigins = (process.env.FRONTEND_URL || '').split(',').map(value => value.trim()).filter(Boolean);
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes('*') ||
      allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin) ||
      /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) return callback(null, true);
  return callback(new Error('Origem não permitida pelo CORS.'));
} }));app.use(express.json({limit:'15mb'}));app.use('/uploads',express.static(path.join(__dirname,'../uploads')));app.get('/',(req,res)=>res.json({message:'Digital Store API funcionando',version:'1.0.0'}));app.use('/v1/user',require('./routes/userRoutes'));app.use('/v1/category',require('./routes/categoryRoutes'));app.use('/v1/product',require('./routes/productRoutes'));app.use((req,res)=>res.status(404).json({message:'Rota não encontrada.'}));app.use(require('./middleware/errors'));module.exports=app;
