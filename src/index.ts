import * as dotenv from 'dotenv';
import app from './config/app';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log('server started at ' + PORT);
})