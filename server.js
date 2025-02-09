
import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema.js';
import { ruruHTML } from "ruru/server"

const root = {
    quoteOfTheDay() {
        return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
    },
    random() {
        return Math.random()
    },
    rollDice({ numDice, numSides }) {
        let output = []
        for (let i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)))
        }
        return output
    },
}

const app = express();

app.all(
    '/graphql',
    createHandler({
         schema: schema,
         rootValue: root,
        })
);

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen({ port: 4000 });
console.log('Listening to port 4000');