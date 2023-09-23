const nodemailer = require("nodemailer");
class MailController {
  sendMail = (req, res) => {
    const { email, username } = req.body;
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "socialsphereteam@outlook.com",
        pass: "SSTeam2023",
      },
    });

    const mailOptions = {
      from: "socialsphereteam@outlook.com",
      to: email,
      subject: "SocialSphere Verification",
      html: `
      
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
  </head>
  <body>
    <div
      class="wrapper"
      style="
        width: fit-content;
        padding: 20px;
        background-color: rgb(214, 213, 213);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <table
        style="
          width: 550px;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
        "
      >
        <tr>
          <td style="text-align: center; padding: 10px">
            <h1>Welcome to SocialSphere</h1>
          </td>
        </tr>
        <tr style="font-size: 20px">
          <td style="padding: 10px">Hi <strong>@${username}</strong>👋🏼,</td>
        </tr>
        <tr style="font-size: 20px">
          <td style="padding: 10px">Thank you for registration!</td>
        </tr>
        <tr style="font-size: 20px">
          <td style="padding: 10px">
            You're just one step away from becoming a part of the SocialSphere
            family. 🚀🌟
          </td>
        </tr>
        <tr style="font-size: 20px">
          <td style="padding: 10px">
            Press the button below to verify your account. 👇🏼
          </td>
        </tr>
        <tr>
          <td style="font-size: 20px; padding: 20px; text-align: center">
            <a
              href="http://localhost:3000/get-started/${username}"
              style="
                text-decoration: none;
                background-color: rgb(80, 117, 228);
                color: white;
                padding: 10px;
                border-radius: 5px;
              "
            >
              Verify Your Account</a
            >
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>


      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail was sent to the user " + username);
        res.json();
      }
    });
  };

  forgotPassword = (req, res) => {
    const { username, email } = req.body;
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "socialsphereteam@outlook.com",
        pass: "SSTeam2023",
      },
    });

    const mailOptions = {
      from: "socialsphereteam@outlook.com",
      to: email,
      subject: "Password Reset",
      html: `
      
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
  </head>
  <body>
    <div
      class="wrapper"
      style="
        width: fit-content;
        padding: 20px;
        background-color: rgb(214, 213, 213);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <table
        style="
          width: 550px;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
        "
      >
        <tr>
          <td style="text-align: center; padding: 10px">
            <h1>Password reset </h1>
          </td>
        </tr>
        <tr style="font-size: 20px">
          <td style="padding: 10px">Hi <b>${username}</b>👋🏼,</td>
        </tr>
        <tr style="font-size: 20px">
          <td style="padding: 10px">Here is your code</td>
        </tr>
        <tr style="font-size: 20px">
          <td style="padding: 10px">
           ${randomNumber}
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>


      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        // console.log("Mail was sent to the user " + username);
        res.json(randomNumber);
      }
    });
  };
}

module.exports = MailController;
