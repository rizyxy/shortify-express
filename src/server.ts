import express from "express";
import authRouter from "./routes/auth.route";
import linkRouter from "./routes/link.route";
import redirectRouter from "./routes/redirect.route";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Server is running");
});

app.use('/auth', authRouter);
app.use('/links', linkRouter);

app.use('/', redirectRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

