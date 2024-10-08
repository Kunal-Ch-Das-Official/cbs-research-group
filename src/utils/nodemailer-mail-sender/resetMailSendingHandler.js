/**
 * Reset Password Email Sender
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 * Last update: 08/10/2024
 * Description:
 * This function handles sending reset password emails to users who have
 * requested to reset their passwords. It manages the process of composing
 * and sending an email with a password reset link or instructions.
 *
 * Usage:
 * Use this function to send reset password emails as part of the password
 * recovery process. It ensures that users receive a secure and timely
 * email with the necessary information to reset their passwords.
 */

const nodemailer = require('nodemailer');
const {
  supportEmailHostProtocol,
  supportEmailPort,
  supportEmailHostUser,
  supportEmailHostPassword,
} = require('../../config/envConfig');
const envConfig = require('../../config/envConfig');
const sendPasswordResetEmail = async (
  sendTo,
  userName,
  corespondingLink,
  response
  // eslint-disable-next-line consistent-return
) => {
  const animatedHeader = envConfig.mailTemplateHeader;
  const mailBackground = envConfig.mailTemplateBody;
  const mailBottom = envConfig.mailTemplateFooter;
  const CBSLogo = envConfig.researchGroupLogo;

  try {
    const transporter = nodemailer.createTransport({
      host: supportEmailHostProtocol,
      port: supportEmailPort,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: supportEmailHostUser,
        pass: supportEmailHostPassword,
      },
    });
    const mailOptions = {
      from: supportEmailHostUser, // Sender address
      to: sendTo, // List of receivers
      subject: ' CBS Research Group - Reset Your Login Credentials.',
      html: `

   <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      sup,
      sub {
        line-height: 0;
        font-size: 75%;
      }

      @media (max-width: 620px) {
        .desktop_hide table.icons-inner {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }
    </style>




       <body
    class="body"
    style="
      background-color: #d9dffa;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #d9dffa;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #cfd6f4;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 600px;
                        margin: 0 auto;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-top: 20px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <div style="max-width: 600px">
                                      <img
                                        alt="Card Header with Border and Shadow Animated"
                                        height="auto"
                                        src=${animatedHeader}
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        title="Card Header with Border and Shadow Animated"
                                        width="600"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #d9dffa;
                background-image: url(${mailBackground});
                background-position: top center;
                background-repeat: repeat;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 600px;
                        margin: 0 auto;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 15px;
                              padding-left: 50px;
                              padding-right: 50px;
                              padding-top: 15px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #506bec;
                                      font-family: Helvetica Neue, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 38px;
                                      line-height: 70%;
                                      text-align: left;
                                      mso-line-height-alt: 45.6px;
                                    "
                                  >
                                  <h6> Dear, ${userName}</h6>
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <strong
                                        ><span style="word-break: break-word"
                                          >Forgot your password?</span
                                        ></strong
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #40507a;
                                      font-family: Helvetica Neue, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 16px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="word-break: break-word"
                                        >Hey, we received a request to reset
                                        your password.</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #40507a;
                                      font-family: Helvetica Neue, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 16px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="word-break: break-word"
                                        >Let’s get you a new one!</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="button_block block-4"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 20px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 20px;
                                    text-align: left;
                                  "
                                >
                                  <div align="left" class="alignment">
                                    <a
                                      href=${corespondingLink}
                                      style="
                                        background-color: #506bec;
                                        border-bottom: 0px solid TRANSPARENT;
                                        border-left: 0px solid TRANSPARENT;
                                        border-radius: 16px;
                                        border-right: 0px solid TRANSPARENT;
                                        border-top: 0px solid TRANSPARENT;
                                        color: #ffffff;
                                        display: inline-block;
                                        font-family: Helvetica Neue, Helvetica,
                                          Arial, sans-serif;
                                        font-size: 15px;
                                        font-weight: undefined;
                                        mso-border-alt: none;
                                        padding-bottom: 8px;
                                        padding-top: 8px;
                                        text-align: center;
                                        text-decoration: none;
                                        width: auto;
                                        word-break: keep-all;
                                      "
                                      target="_blank"
                                      ><span
                                        style="
                                          word-break: break-word;
                                          padding-left: 25px;
                                          padding-right: 20px;
                                          font-size: 15px;
                                          display: inline-block;
                                          letter-spacing: normal;
                                        "
                                        ><span style="word-break: break-word"
                                          ><span
                                            data-mce-style=""
                                            style="
                                              word-break: break-word;
                                              line-height: 30px;
                                            "
                                            ><strong
                                              >RESET MY PASSWORD</strong
                                            ></span
                                          ></span
                                        ></span
                                      ></a
                                    >
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-5"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #40507a;
                                      font-family: Helvetica Neue, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="word-break: break-word"
                                        >Having trouble?
                                        ${supportEmailHostUser}</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-6"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #40507a;
                                      font-family: Helvetica Neue, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      Didn’t request a password reset? You can
                                      ignore this message.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 600px;
                        margin: 0 auto;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <div style="max-width: 600px">
                                      <img
                                        alt="Card Bottom with Border and Shadow Image"
                                        height="auto"
                                        src=${mailBottom}
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        title="Card Bottom with Border and Shadow Image"
                                        width="600"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="image_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <div style="max-width: 145px">
                                      <a
                                        href="#"
                                        style="outline: none"
                                        tabindex="-1"
                                        target="_blank"
                                        ><img
                                          alt="Your Logo"
                                          height="auto"
                                          src=${CBSLogo}
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 100%;
                                          "
                                          title="Your Logo"
                                          width="145"
                                      /></a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 600px;
                        margin: 0 auto;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 20px;
                              padding-left: 10px;
                              padding-right: 10px;
                              padding-top: 10px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #000000;
                                      font-family: Helvetica Neue, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      This link will expire in the next 5
                                      minutes.<br />Please feel free to contact
                                      us at ${supportEmailHostUser}.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #000;
                                      font-family: Helvetica Neue, Helvetica,
                                        Arial, sans-serif;
                                      font-size: 12px;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 14.399999999999999px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="word-break: break-word"
                                        >Copyright© 2024 CBS Research
                                        Group.</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-5"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #ffffff;
              "
              width="100%"
            ></table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return response.status(500).json({
          issue: error.message,
          details:
            'Unable to send this mail due to technical problem, please try again later',
        });
      } else {
        return response.status(200).json({
          message: 'Email has been send successfully',
          resetLink: corespondingLink,
          notification: `Password reset link has been sended to this:${sendTo} email account.${info}`,
        });
      }
    });
  } catch (error) {
    return response.status(500).json({
      issue: error.message,
      details: 'Unable to perform this task due to some technical problem.',
      message:
        'Please try again later, or if the issue not resolve autometically then contact with your tech support team.',
    });
  }
};
module.exports = sendPasswordResetEmail;
