import 'dotenv/config'
import { z } from 'zod'

// zod.
// A primeira biblioteca, dotenv, permite carregar as variáveis de ambiente do arquivo.env na aplicação,
// facilitando a configuração do ambiente de desenvolvimento.
// A segunda biblioteca, zod, é uma biblioteca de validação de tipos de dados, 
//que permite validar os valores das variáveis de ambiente para garantir que elas tenham os tipos corretos e sejam válidos para a aplicação.

const envSchema = z.object({
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev')
})
//O método safeParse da biblioteca zod é usado para analisar as variáveis de ambiente com base no esquema definido.
const _env = envSchema.safeParse(process.env)



if (_env.success === false) {
    console.error('Invalid environment variable', _env.error.format())
    throw new Error('Invalid environment variable')
    
}

export const env = _env.data