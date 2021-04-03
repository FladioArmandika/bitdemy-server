import * as dotenv from 'dotenv';
dotenv.config();

import app from './config/app';


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log('server started at ' + PORT);
})