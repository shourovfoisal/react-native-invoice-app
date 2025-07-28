import { BillForm } from "@/app/create-bill";
import dateFormat from "dateformat";

function getTime() {
  const date = new Date();

  let hours = parseInt(dateFormat(date, "hh"));
  let twelveHourFormat = hours % 12;
  twelveHourFormat = twelveHourFormat === 0 ? 12 : twelveHourFormat;
  let stringHours = twelveHourFormat < 10 ? "0" + twelveHourFormat : twelveHourFormat.toString();

  let ampm = hours >= 12 ? "AM" : "PM";

  let minutes = parseInt(dateFormat(date, "MM"));
  let stringMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  return `${stringHours}:${stringMinutes} ${ampm}`
}

export function PdfTemplate({
  name,
  address,
  mobileNumber,
  quantity,
  invoiceNumber,
  product,
  total,
  receivedAmount,
  paymentMethod,
  balanceDue,
}: BillForm) {
  return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body >
    <div style="min-height: auto;
    width: 100%;
    height : 97vh;
    border: solid 2px #000;"  >
    <div style="height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* padding: 20px; */
    justify-content: space-between;
    align-items: center;">
    <div class="data-title">
        <div style="display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 2rem;  
        padding-left: 20px;">Shourov Ltd.<br></div>
    <div style="
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    padding-left: 20px;
    ">Full-Stack React Native and Spring Boot developer.</div>
    </div>
   
        <img style="
        height: 90px;
    width: 90px;
    margin-right:15px;
        " src="https://i.ibb.co/Rv9KpGf/logo.png" />
    </div>
    <hr />
        <hr/>


        <div style="
        width: 100%;
        height: auto;
        padding: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        ">
            <div style="
            width: 50%;
            align-items: flex-start;
            ">
                <p class="invoice-user">
                    Bill To : <br/>
                    Name : ${name} <br/>
                    Address : ${address} <br/>
                    Phone No : ${mobileNumber}
                </p>
            </div>
            <div style="align-items: flex-end;">
                <p>Invoice No : ${invoiceNumber}<br/>
                Date : ${dateFormat(Date.now(), "dd-mm-yyyy")}<br/>
                Time : ${getTime()}</p>
                <br/>
                <br/>
                <p>Mobile No :- <br/>
                +88 01760646412<br/>
                +88 01401280714
                </p>
            </div>
        </div>
        <hr/>
        <hr/>
        <div style="height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;">
            <table style="width:100%; border-collapse: collapse;">
                <tr style="background-color: rgba(255, 0, 62, 0.8); color: white;">
                  <th style="height: 30px;">Index</th>
                  <th style="height: 30px;">Product Name</th>
                  <th style="height: 30px;">Price Per Unit</th>
                  <th style="height: 30px;">Units</th>
                  <th style="height: 30px;">Total</th>
                </tr>
                <tr style="background-color: rgba(246, 221, 178, 0.8);">
                  <td style="text-align: center;height: 30px;">1</td>
                  <td style="text-align: center;height: 30px;">${product}</td>
                  <td style="text-align: center;height: 30px;">${(
                    parseFloat(total) / parseFloat(quantity)
                  ).toFixed(2)}</td>
                  <td style="text-align: center;height: 30px;">${quantity}</td>
                  <td style="text-align: center;height: 30px;">$ ${total}</td>
                </tr>
               
              </table>
              
                <!-- <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Received balance :  1</div>
          
              <hr/>
              <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Grand Total : 1</div>
              <hr/>
              <div style="align-self: flex-end;margin-right: 10px;font-style: bold;">Payment Mode : Cash</div>
              <hr/> -->
              <div style="width:100%;align-self: flex-end; display: flex; flex-direction: row;">
                <div style="width:40%"></div>
                  <table style="width: 50%; align-self: flex-end;">
                  <tr>
                  <th style="text-align: start;">Grand Total : </th>
                  <td style="text-align: center;height: 30px;">$ ${total}</td>
              </tr>
                        <tr style="border-bottom: solid ;">
                            <th style="text-align: start;">Received Balance : </th>
                            <td style="text-align: center;height: 30px;">$ ${receivedAmount}</td>
                        </tr>
                       
                        <tr style="border-bottom: solid ;">
                        <th style="text-align: start;">Balance Due : </th>
                        <td style="text-align: center;height: 30px;">$ ${balanceDue}</td>
                    </tr>
                        <tr>
                            <th style="text-align: start;">Payment Method: </th>
                            <td style="text-align: center;height: 30px;">${paymentMethod}</td>
                        </tr>
                  </table>
              </div>
        </div>
        <hr/>
        <hr/>
        <div style="height:auto; padding: 20px;">

            <p>Account Details - <br/>
            Bank Name: ABCD BANK, DHAKA<br/>
            Bank Account no : 0000 0000 00000<br/>
            Bank Branch code : ABCD0000<br/>
            </p>

        </div>

    </div>
  </body>
</html>
`;
}
