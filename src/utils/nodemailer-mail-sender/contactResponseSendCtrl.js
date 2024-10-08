/**
 * Send Response to Contact User
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 20/08/2024
 * Last update: 08/10/2024
 * Description:
 * This function handles sending a response to individuals who have
 * submitted inquiries through the contact form. It manages the process
 * of composing and sending an appropriate reply to the contact us person.
 *
 * Usage:
 * Use this function to respond to contact form submissions. It ensures
 * that inquiries are addressed promptly and efficiently, providing
 * necessary information or acknowledgments to the inquirer.
 */

const nodemailer = require('nodemailer');
const {
  mainEmailHostProtocol,
  mainEmailPort,
  mainEmailHostUser,
  mainEmailHostPassword,
} = require('../../config/envConfig');
const envConfig = require('../../config/envConfig');
const {
  contactApplicationCache,
} = require('../../controller/contact-form-controllers/getContactInfoCtrl');
const {
  dashboardCache,
} = require('../../controller/dashboard-controllers/getAllData');
const contactResponseSendCtrl = async (
  sendTo,
  userName,
  subject,
  mailBody,
  response
  // eslint-disable-next-line consistent-return
) => {
  const date = new Date();
  const todaysDate = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const CBSLogo = envConfig.researchGroupLogo;

  try {
    const transporter = nodemailer.createTransport({
      host: mainEmailHostProtocol,
      port: mainEmailPort,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: mainEmailHostUser,
        pass: mainEmailHostPassword,
      },
    });
    const mailOptions = {
      from: mainEmailHostUser, // Sender address
      to: sendTo, // List of receivers
      subject,
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

      @media (max-width: 640px) {
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
      background-color: #ffffff;
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
                        color: #333;
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
                              padding-left: 10px;
                              padding-right: 10px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="50%"
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
                                    padding-bottom: 15px;
                                    padding-top: 15px;
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
                                    <div style="max-width: 73px">
                                      <img
                                        alt="Image"
                                        height="auto"
                                        src=${CBSLogo}
                                        style="
                                          display: block;
                                          height: auto;
                                          border: 0;
                                          width: 100%;
                                        "
                                        title="Image"
                                        width="73"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-left: 10px;
                              padding-right: 10px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="50%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
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
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 15px;
                                    padding-top: 15px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: TimesNewRoman,
                                        'Times New Roman', Times, Baskerville,
                                        Georgia, serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: right;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <em>${todaysDate}</em>
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
                        color: #000000;
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
                              class="divider_block block-1"
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
                                    padding-bottom: 15px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="divider_inner"
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px solid #222222;
                                          "
                                        >
                                          <span style="word-break: break-word"
                                            > </span
                                          >
                                        </td>
                                      </tr>
                                    </table>
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
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
                              class="text_block block-1"
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
                                    padding-bottom: 30px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class=""
                                      style="
                                        font-size: 12px;
                                        font-family: 'Lato', Tahoma, Verdana,
                                          Segoe, sans-serif;
                                        mso-line-height-alt: 18px;
                                        color: #71777d;
                                        line-height: 1.5;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          mso-line-height-alt: 21px;
                                        "
                                      >
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #000000;
                                            font-size: 14px;
                                          "
                                          ><strong
                                            >Hi
                                            <span
                                              style="
                                                word-break: break-word;
                                                font-size: 14px;
                                              "
                                              >${userName}</span
                                            ></strong
                                          ></span
                                        >,
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          mso-line-height-alt: 18px;
                                        "
                                      >
                                        
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          mso-line-height-alt: 21px;
                                        "
                                      >
                                        ${mailBody}
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          mso-line-height-alt: 18px;
                                        "
                                      >
                                        
                                      </p>
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
                        color: #333;
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
                            width="50%"
                          >
                            <div
                              class="spacer_block block-1"
                              style="
                                height: 20px;
                                line-height: 20px;
                                font-size: 1px;
                              "
                            >
                              
                            </div>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-left: 10px;
                              padding-right: 10px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="50%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
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
                                <td class="pad" style="padding-top: 15px">
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: 'Lato', Tahoma, Verdana,
                                        Segoe, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: right;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span
                                        style="
                                          word-break: break-word;
                                          color: #000000;
                                        "
                                        ><strong>Aditya Poddar</strong></span
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
                                <td class="pad" style="padding-bottom: 5px">
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: 'Lato', Tahoma, Verdana,
                                        Segoe, sans-serif;
                                      font-size: 12px;
                                      line-height: 120%;
                                      text-align: right;
                                      mso-line-height-alt: 14.399999999999999px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="word-break: break-word"
                                        >Group Admin - CBS Research Group</span
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
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
                              class="divider_block block-1"
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
                                  "
                                >
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="divider_inner"
                                          style="
                                            font-size: 1px;
                                            line-height: 1px;
                                            border-top: 1px dotted #cccccc;
                                          "
                                        >
                                          <span style="word-break: break-word"
                                            > </span
                                          >
                                        </td>
                                      </tr>
                                    </table>
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
              class="row row-6"
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
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
                                <td
                                  class="pad"
                                  style="
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: 'Lato', Tahoma, Verdana,
                                        Segoe, sans-serif;
                                      font-size: 12px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 14.399999999999999px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="word-break: break-word"
                                        >Copyright © ${todaysDate} CBS Research
                                        Group. All rights reserved. </span
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
              class="row row-7"
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
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
                                <td
                                  class="pad"
                                  style="
                                    padding-left: 10px;
                                    padding-right: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: 'Lato', Tahoma, Verdana,
                                        Segoe, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                       <br />
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
              class="row row-8"
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
                        width: 620px;
                        margin: 0 auto;
                      "
                      width="620"
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
            'Unable to send this mail, due to some technical problem. Please try again later.',
          alert:
            'If the issue not resolve autometically then contact to your tech support team.',
        });
      } else {
        contactApplicationCache.del('single_contact_application');
        contactApplicationCache.del('all_contact_application');
        dashboardCache.del('aggregated_data');
        return response.status(200).json({
          message: 'Email has been send successfully!',
          sending_id: info.messageId,
          notification: `The mail has been successfully send to this:${sendTo} adress.`,
        });
      }
    });
  } catch (error) {
    return response.status(500).json({
      issue: error.message,
      details:
        'Unable to perform this task due to some technical problem, please try again later.',
    });
  }
};
module.exports = contactResponseSendCtrl;
