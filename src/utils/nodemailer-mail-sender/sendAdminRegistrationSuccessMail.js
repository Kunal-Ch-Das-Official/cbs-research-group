/**
 * Request Accepted Response
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 22/08/2024
 *
 * Description:
 * This function handles sending a response email to individuals whose
 * requests to become users of the CBS Research Group have been accepted.
 * It manages the process of composing and sending an acceptance email
 * with relevant information or instructions.
 *
 * Usage:
 * Use this function to send acceptance emails to individuals whose
 * applications or requests have been approved. It ensures that new
 * users are welcomed and provided with the necessary information to
 * proceed.
 */

const nodemailer = require("nodemailer");
const {
  emailHostProtocol,
  emailPort,
  emailHostUser,
  emailHostPassword,
} = require("../../config/envConfig");

const sendAdminRegistrationSuccessMail = async (
  sendTo,
  userName,
  loginId,
  loginPassword,
  response
) => {
  const CBSLogo =
    "https://res.cloudinary.com/dmgs52isy/image/upload/v1724431697/email-assets/pdz67r83witpewa82owg.png";
  const emailIllustration =
    "https://res.cloudinary.com/dmgs52isy/image/upload/v1724435282/email-assets/rhje0fzumnwilzqwjqy7.png";
  const loginLink = "https://www.kunalchandradas.tech";
  try {
    const transporter = nodemailer.createTransport({
      host: emailHostProtocol,
      port: emailPort,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: emailHostUser,
        pass: emailHostPassword,
      },
    });
    const mailOptions = {
      from: emailHostUser, // Sender address
      to: sendTo, // List of receivers
      subject: "Welcome to CBS Research Group - Your Admin Login Details",
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

	@media (max-width: 700px) {
	  .desktop_hide table.icons-inner {
		display: inline-block !important;
	  }

	  .icons-inner {
		text-align: center;
	  }

	  .icons-inner td {
		margin: 0 auto;
	  }

	  .image_block div.fullWidth {
		max-width: 100% !important;
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

	  .row-3 .column-1 .block-2.paragraph_block td.pad > div {
		text-align: left !important;
		font-size: 14px !important;
	  }

	  .row-3 .column-1 .block-1.heading_block h1 {
		text-align: left !important;
	  }

	  .row-3 .column-1 .block-1.heading_block h1 {
		font-size: 20px !important;
	  }

	  .row-3 .column-1 {
		padding: 0 24px 48px !important;
	  }
	}
  </style>
  <body
    class="body"
    style="
      background-color: #f8f6ff;
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
        background-color: #f8f6ff;
        background-image: none;
        background-position: top left;
        background-size: auto;
        background-repeat: no-repeat;
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
                        background-color: #a797ff;
                        color: #000000;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
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
                              padding-bottom: 32px;
                              padding-left: 45px;
                              padding-top: 32px;
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
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  <div
                                    align="left"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <div style="max-width: 96px">
                                      <img
                                        alt="An open email illustration"
                                        height="auto"
                                        src="${CBSLogo}"
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        title="An open email illustration"
                                        width="96"
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
                        background-color: #a797ff;
                        color: #000000;
                        border-radius: 0;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
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
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <div
                                      class="fullWidth"
                                      style="max-width: 640px"
                                    >
                                      <img
                                        alt="An open email illustration"
                                        height="auto"
                                        src="${emailIllustration}"
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        title="An open email illustration"
                                        width="640"
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
                        background-color: #ffffff;
                        border-radius: 0;
                        color: #000000;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
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
                              padding-bottom: 48px;
                              padding-left: 48px;
                              padding-right: 48px;
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
                              class="heading_block block-1"
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
                                    padding-top: 12px;
                                    text-align: center;
                                    width: 100%;
                                  "
                                >
                                  <h1
                                    style="
                                      margin: 0;
                                      color: #292929;
                                      direction: ltr;
                                      font-family: 'Helvetica Neue', Helvetica,
                                        Arial, sans-serif;
                                      font-size: 32px;
                                      font-weight: 700;
                                      letter-spacing: normal;
                                      line-height: 120%;
                                      text-align: left;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      mso-line-height-alt: 38.4px;
                                    "
                                  >
                                    <span
                                      class="tinyMce-placeholder"
                                      style="word-break: break-word"
                                      >Dear ${userName}, We have confirmed your
                                      registration request!</span
                                    >
                                  </h1>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
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
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: 'Helvetica Neue', Helvetica,
                                        Arial, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 16px">
                                      We are pleased to inform you that your
                                      request to become an admin on CBS Research
                                      Group has been approved. Below are your
                                      login credentials:
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      <strong>Login ID:</strong>
                                      ${loginId}.<br />
                                      <strong>Password:</strong>${loginPassword}
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      You can log in to the admin dashboard by
                                      clicking the following link:
                                      <a href="${loginLink}">Login Link</a
                                      ><br /><br />Please make sure to keep your
                                      credentials secure and do not share them
                                      with anyone. We recommend that you change
                                      your password after logging in for the
                                      first time.<br /><br />If you have any
                                      questions or need assistance, feel free to
                                      reach out to us. 
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                       
                                    </p>
                                    <p style="margin: 0">
                                      Welcome aboard!<br />
                                      <br />
                                      Best regards,
                                      <br />
                                      Aditya Poddar
                                      <br />
                                      Site Admin
                                      <br />
                                      CBS Research Group
                                      <br />
                                      ${emailHostUser}
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
                        background-color: #ffffff;
                        border-radius: 0;
                        color: #000000;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
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
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <div
                              class="spacer_block block-1"
                              style="
                                height: 56px;
                                line-height: 56px;
                                font-size: 1px;
                              "
                            >
                               
                            </div>
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
                        background-color: #ffffff;
                        color: #000000;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
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
                              padding-top: 5px;
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
                              class="icons_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                text-align: center;
                                line-height: 0;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    vertical-align: middle;
                                    color: #1e0e4b;
                                    font-family: 'Inter', sans-serif;
                                    font-size: 15px;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                    text-align: center;
                                  "
                                ></td>
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
          </td>
        </tr>
      </tbody>
    </table>
  </body>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return response.status(500).json({
          issue: error.message,
          details:
            "Unable to drop this mail due to some technical problem. Please try again later.",
          alert:
            "If the issue not resolve autometically then contact to your tech support team.",
        });
      } else {
        transporter.close();
        return response.status(200).json({
          message: "Email has been dropped successfully.",
          sending_id: info.messageId,
          notification: `The mail has been successfully droppet to this:${sendTo} account.`,
        });
      }
    });
  } catch (error) {
    return response.status(500).json({
      issue: error.message,
      details:
        "Unable to perform this task due to some internal server problem.",
      message:
        "Please try again later, or if the issue not resolve autometically then contact with your tech support team.",
    });
  }
};
module.exports = sendAdminRegistrationSuccessMail;
