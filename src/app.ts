import express, { Application, Request, Response } from 'express';
import typesenseClient from './utils/typesense/typesenseConfig';
import { databook } from './data/book';
const app: Application = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!');
});

// Ruta para indexar los datos en Typesense
app.get('/importdata', async (req: Request, res: Response) => {
  try {
    await typesenseClient.collections('books').documents().import(databook,{action: 'create'});
    res.send('Datos indexados en Typesense');
  } catch (error:any) {
    console.error('Error:', error);
    res.status(500).send('Error al indexar los datos en Typesense');
  }
});

app.get('/test', async (req: Request, res: Response) => {
  try {
    const response = await testConnection();
    res.json(response);
  } catch (error:any) {
    console.error('Error:', error.message);
    res.status(500).send('Error al indexar los datos en Typesense');
  }
});




// Función para verificar la conexión con el servidor Typesense
async function testConnection() {
  try {
    let searchParameters = {
      'q'         : 'de',
      'query_by'  : 'company_name',
      'sort_by'   : 'num_employees:desc'
    }
    // Crea un cliente de búsqueda para hacer la solicitud de prueba
    const searchClient = await typesenseClient.collections('companies').documents().search(searchParameters);
    return searchClient;
    // Realiza una búsqueda de prueba para obtener algunos resultados
    // const results = await searchClient.search('test', { per_page: 1 });
    
    // Si obtienes resultados, significa que la conexión es exitosa
    console.log('Conexión exitosa con Typesense');
    console.log('Resultado de la búsqueda:', searchClient);
  } catch (error: any) {
    // Si hay algún error, muestra un mensaje de error
    console.error('Error al conectar con Typesense:', error.message);
  }
}

app.listen(port, () => {
  console.log(`Servidor on http://localhost:${port}`);
});
