import app from "./src/app.js"
import {createServer } from "http"
import {Server} from "socket.io"

const httpServer = createServer(app)
const io  = new Server(httpServer,{})

io.on("connection",(socket)=>{
    console.log("client connected to socket.io")


    socket.on("message",()=>{

        io.emit(abc)
    })
    
})

httpServer.listen(3000,()=>{
    console.log("Server is runing on port 3000")
})

