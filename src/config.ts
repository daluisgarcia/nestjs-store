import { registerAs } from '@nestjs/config';

// Allows to have a centered env info
export default registerAs('config', () => {
    return {
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        apiKey: process.env.API_KEY,
    };
});
