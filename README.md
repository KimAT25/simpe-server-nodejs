How to run server:

create .env file and setup these properties:
PORT=3000
DATABASE_URL=here should be link to your DB;
JWT_SECRET="cookie" - testing value, you can use what you want.

1. run command npm i to install all dependencies;
2. run command npx prisma migrate dev --name init to inint new DB Prisma migration;
3. run server with command npm run dev;

Enjoy that you run the server!