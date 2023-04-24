import fastify from "fastify";
import { ZodError } from 'zod'
import { env } from './env'



export const app = fastify()

//O método setErrorHandler é usado para definir a função
//que será chamada sempre que ocorrer um erro dentro do aplicativo.
//Essa função recebe três parâmetros: o erro(error), 
//a solicitação(_) e a resposta(replay).

app.setErrorHandler((error, _, replay) => {
//Se o erro for uma instância da classe ZodError, 
//significa que houve uma falha na validação de entrada, 
//de acordo com o esquema definido pela biblioteca zod.Nesse caso, 
//a função de tratamento de erros responde com um status HTTP 400(Bad Request)
//e envia uma mensagem de erro que inclui as informações detalhadas sobre a validação falhada.
if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: "Validation error", issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } 
  return replay.status(500).send({ message: 'Internal server error' })
})