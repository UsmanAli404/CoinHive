import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 465,
  secure:true,
  auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASSWORD
  },
  logger: true,
  debug: true
});

export default transporter;