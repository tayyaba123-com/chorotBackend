import "dotenv/config"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{ 
        type:"OAuth2",
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRECT,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN
    }
})


transporter.verify((error,success)=>{
    if(error){
        console.log("Error while connecting to email server",error)
    }
    else{
        console.log("Connected to email server successfully")
    }
})

export const sendEmail = async (to,subject,text,html)=>{
    try {
        const info = await transporter.sendMail({
            from:process.env.GOOGLE_USER,
            to, 
            subject,
            text,
            html
        })

        console.log("Email sent successfully",info)

    } catch (error) {
        console.log("Error while sending email",error)
    }

}
