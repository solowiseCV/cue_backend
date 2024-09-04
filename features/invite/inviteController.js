import { sendEmail } from '../../configs/sendMail.js';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sendTripInvitation = async (req, res) => {
  try {
    const { friendEmail, tripDetails } = req.body;
    const currentUser = req.user;

    const capitalizedFullName = capitalizeFirstLetter(currentUser.fullname);
 console.log(capitalizeFirstLetter);
    const emailData = {
      email: friendEmail,
      subject: `Invitation to join a trip on ${tripDetails.destination}`,
      html: `
        <h3>Hello!</h3>
        <p><span style="color: #333; font-weight: bold;">${capitalizedFullName}</span> has invited you to join a trip to <span style="color: #333; font-weight: bold;">${tripDetails.destination}</span> that was planned using the <span style="color: #1a73e8; font-weight: bold;">Cue </span> <img src="./Logo.png" alt="" style="vertical-align: middle; width: 20px; height: 20px; margin-left: 5px;"> Platform.</p>
        <p><strong>Trip Details:</strong></p>
        <ul>
          <li>Destination: <span style="color: #333; font-weight: bold;">${tripDetails.destination}</span></li>
          <li>Start Date: <span style="color: #333; font-weight: bold;">${tripDetails.startDate}</span></li>
          <li>End Date: <span style="color: #333; font-weight: bold;">${tripDetails.endDate}</span></li>
        </ul>
        <p>To accept the invitation, please <a href="${tripDetails.invitationLink}" style="color: #1a73e8; text-decoration: none;">click here</a>.</p>
        <p>Looking forward to seeing you!</p>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: './Logo.png',  
          cid: 'logo' 
        }
      ]
    };

    // Send the email
    await sendEmail(emailData);

    res.status(200).json({ message: 'Invitation email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send the invitation email', error: error.message });
  }
};
