import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import Email from 'email-templates'

dotenv.config()

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const email = new Email({
  transport,
  send: true,
  preview: false,
  views: {
    options: {
      extension: 'ejs'
    }
  },
  message: {
    from: 'suport@greatquotes.com'
  }
})

export default email
