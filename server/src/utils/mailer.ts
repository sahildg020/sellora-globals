import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

export default async function sendEnquiryMail({ fullName, email, message, product }: any){
  const adminEmail = process.env.ADMIN_EMAIL
  if(!adminEmail) return
  const html = `<p>New enquiry from <b>${fullName}</b> (${email})</p>
    <p>Product: ${product? product.name : 'N/A'}</p>
    <p>Message:</p><p>${message}</p>`
  await transporter.sendMail({ from: process.env.GMAIL_USER, to: adminEmail, subject: 'New enquiry', html })
}
