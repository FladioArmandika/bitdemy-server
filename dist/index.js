"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const app_1 = require("./config/app");
const PORT = process.env.PORT || 4000;
app_1.default.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log('server started at ' + PORT);
});
//# sourceMappingURL=index.js.map