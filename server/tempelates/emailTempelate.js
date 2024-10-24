const serverErrorTemplate = () => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Error Notification</title>
        <style>
            body {
                background-color: #f4f6f8;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: auto;
            }
    
            .container {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                padding: 30px;
                text-align: center;
                border: 1px solid #e0e0e0;
                transition: transform 0.2s;
            }
    
            .container:hover {
                transform: translateY(-5px);
            }
    
            .logo {
                max-width: 120px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 28px;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 15px;
            }
    
            .body {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
                color: #555;
            }
    
            .cta {
                display: inline-block;
                padding: 12px 25px;
                background-color: #3498db;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                transition: background-color 0.3s, transform 0.2s;
            }
    
            .cta:hover {
                background-color: #2980b9;
                transform: scale(1.05);
            }
    
            .support {
                font-size: 14px;
                color: #999;
                margin-top: 20px;
            }
    
            @media (max-width: 600px) {
                .container {
                    padding: 20px;
                    width: 90%;
                }
                .message {
                    font-size: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <a href="https://kanerika.com">
                <img class="logo" src="https://i.ibb.co/fG2m3Lb/logo-kanerika.png" alt="Kanerika Logo">
            </a>
            <div class="message">Oops! Something Went Wrong</div>
            <div class="body">
                <p>Dear User,</p>
                <p>We encountered an error while processing your request. Our team has been notified, and we are working to resolve the issue as quickly as possible.</p>
                <p>We apologize for any inconvenience this may have caused. Please try again later.</p>
            </div>
            <a href="#" class="cta">Return to Homepage</a>
            <div class="support">
                If you have any questions or need further assistance, please contact us at 
                <a href="mailto:support@kanerika.com">support@kanerika.com</a>. We're here to help!
            </div>
        </div>
    </body>
    </html>`;
};

// Export the function using CommonJS syntax
module.exports = serverErrorTemplate;
